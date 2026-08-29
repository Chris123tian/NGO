import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './config';

export interface UploadProgressCallback {
  (progressPercent: number): void;
}

export async function uploadImage(
  file: File,
  folder: string = 'general',
  onProgress?: UploadProgressCallback
): Promise<string> {
  // Validate file size (max 8MB)
  if (file.size > 8 * 1024 * 1024) {
    throw new Error('Image size must be less than 8MB');
  }

  // Validate image file type
  if (!file.type.startsWith('image/')) {
    throw new Error('Please select a valid image file (JPEG, PNG, WEBP, etc.)');
  }

  try {
    const filename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const storageRef = ref(storage, `${folder}/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(Math.round(progress));
        },
        (error) => {
          console.warn('Firebase storage upload fallback to local Data URL:', error);
          // Fallback to local Data URL for seamless offline/demo preview
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = () => reject(error);
          reader.readAsDataURL(file);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (err) {
            // Fallback to Data URL
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.readAsDataURL(file);
          }
        }
      );
    });
  } catch (error) {
    // Return Data URL if storage unavailable
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }
}
