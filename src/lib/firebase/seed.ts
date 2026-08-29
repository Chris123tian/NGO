import { doc, setDoc } from 'firebase/firestore';
import { db } from './config';
import {
  INITIAL_SETTINGS,
  INITIAL_HERO_SLIDES,
  INITIAL_IMPACT_STATS,
  INITIAL_PROGRAMS,
  INITIAL_CAMPAIGN,
  INITIAL_POSTS,
  INITIAL_SUCCESS_STORIES,
  INITIAL_GALLERY,
  DEMO_DONATIONS,
  DEMO_VOLUNTEERS,
  DEMO_MESSAGES
} from '@/data/demoData';

export async function seedFirestoreDatabase(): Promise<{ success: boolean; message: string }> {
  try {
    // 1. Settings
    await setDoc(doc(db, 'settings', 'general'), INITIAL_SETTINGS);

    // 2. Hero Slides
    for (const slide of INITIAL_HERO_SLIDES) {
      await setDoc(doc(db, 'heroSlides', slide.id), slide);
    }

    // 3. Impact Stats
    for (const stat of INITIAL_IMPACT_STATS) {
      await setDoc(doc(db, 'impactStats', stat.id), stat);
    }

    // 4. Programs
    for (const prog of INITIAL_PROGRAMS) {
      await setDoc(doc(db, 'programs', prog.id), prog);
    }

    // 5. Campaign
    await setDoc(doc(db, 'campaigns', INITIAL_CAMPAIGN.id), INITIAL_CAMPAIGN);

    // 6. Posts
    for (const post of INITIAL_POSTS) {
      await setDoc(doc(db, 'posts', post.id), post);
    }

    // 7. Success Stories
    for (const story of INITIAL_SUCCESS_STORIES) {
      await setDoc(doc(db, 'successStories', story.id), story);
    }

    // 8. Gallery
    for (const item of INITIAL_GALLERY) {
      await setDoc(doc(db, 'gallery', item.id), item);
    }

    // 9. Demo Donations
    for (const don of DEMO_DONATIONS) {
      await setDoc(doc(db, 'donations', don.id), don);
    }

    // 10. Demo Volunteers
    for (const vol of DEMO_VOLUNTEERS) {
      await setDoc(doc(db, 'volunteers', vol.id), vol);
    }

    // 11. Demo Messages
    for (const msg of DEMO_MESSAGES) {
      await setDoc(doc(db, 'messages', msg.id), msg);
    }

    return { success: true, message: 'Firestore database successfully populated with Northern Ghana demo dataset!' };
  } catch (error: any) {
    console.error('Seeding failed:', error);
    return { success: false, message: error.message || 'Seeding failed. Make sure your Firestore rules allow admin writes.' };
  }
}
