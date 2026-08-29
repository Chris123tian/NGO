'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { uploadImage } from '@/lib/firebase/storage';
import { Upload, X, CheckCircle2, Loader2, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  currentImageUrl?: string;
  onUploadSuccess: (url: string) => void;
  folder?: string;
  label?: string;
}

export default function ImageUploader({
  currentImageUrl,
  onUploadSuccess,
  folder = 'general',
  label = 'Upload Image'
}: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string>(currentImageUrl || '');
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg('');
    setUploading(true);
    setProgress(10);

    // Show local preview immediately
    const localReader = new FileReader();
    localReader.onload = (ev) => {
      setPreviewUrl(ev.target?.result as string);
    };
    localReader.readAsDataURL(file);

    try {
      const downloadUrl = await uploadImage(file, folder, (percent) => {
        setProgress(percent);
      });
      setPreviewUrl(downloadUrl);
      onUploadSuccess(downloadUrl);
    } catch (err: any) {
      setErrorMsg(err.message || 'Image upload failed.');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleRemove = () => {
    setPreviewUrl('');
    onUploadSuccess('');
  };

  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
        {label}
      </label>

      {errorMsg && (
        <div className="bg-red-50 text-red-700 text-xs p-2.5 rounded-xl border border-red-200">
          {errorMsg}
        </div>
      )}

      {previewUrl ? (
        <div className="relative w-full h-48 rounded-2xl overflow-hidden border-2 border-gray-200 group bg-gray-900">
          <Image
            src={previewUrl}
            alt="Preview"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
            <button
              type="button"
              onClick={handleRemove}
              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-xl text-xs flex items-center space-x-1 font-bold shadow"
            >
              <X size={16} />
              <span>Remove</span>
            </button>
          </div>
        </div>
      ) : (
        <label className="border-2 border-dashed border-gray-300 hover:border-brand-green-600 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-gray-50 hover:bg-emerald-50/40 text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-brand-green-100 text-brand-green-700 flex items-center justify-center">
            <Upload size={20} />
          </div>
          <span className="text-xs font-bold text-gray-700">Click to upload image</span>
          <span className="text-[10px] text-gray-400">Supports JPG, PNG, WEBP (Max 8MB)</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>
      )}

      {uploading && (
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between items-center text-xs font-bold text-brand-green-800">
            <span className="flex items-center space-x-1">
              <Loader2 size={12} className="animate-spin text-amber-500" />
              <span>Uploading to Firebase Storage...</span>
            </span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
