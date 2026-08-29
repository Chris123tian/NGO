import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';
import { db, DEMO_MODE } from './config';
import {
  WebsiteSettings,
  HeroSlide,
  Program,
  Campaign,
  ImpactStat,
  Post,
  SuccessStory,
  GalleryItem,
  DonationRecord,
  VolunteerApplication,
  ContactMessage
} from '@/types';
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

// In-memory store for fallback mode
let memoryStore = {
  settings: { ...INITIAL_SETTINGS },
  heroSlides: [...INITIAL_HERO_SLIDES],
  impactStats: [...INITIAL_IMPACT_STATS],
  programs: [...INITIAL_PROGRAMS],
  campaigns: [{ ...INITIAL_CAMPAIGN }],
  posts: [...INITIAL_POSTS],
  successStories: [...INITIAL_SUCCESS_STORIES],
  gallery: [...INITIAL_GALLERY],
  donations: [...DEMO_DONATIONS],
  volunteers: [...DEMO_VOLUNTEERS],
  messages: [...DEMO_MESSAGES]
};

// --- WEBSITE SETTINGS ---
export async function getWebsiteSettings(): Promise<WebsiteSettings> {
  if (DEMO_MODE) return memoryStore.settings;
  try {
    const docRef = doc(db, 'settings', 'general');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as WebsiteSettings;
    }
  } catch (error) {
    console.warn("Firestore offline or fallback active, returning demo settings.");
  }
  return memoryStore.settings;
}

export async function updateWebsiteSettings(settings: WebsiteSettings): Promise<void> {
  memoryStore.settings = { ...settings };
  if (DEMO_MODE) return;
  try {
    const docRef = doc(db, 'settings', 'general');
    await setDoc(docRef, settings, { merge: true });
  } catch (error) {
    console.warn("Firestore update skipped, stored in demo memory.");
  }
}

// --- HERO SLIDES ---
export async function getHeroSlides(): Promise<HeroSlide[]> {
  if (DEMO_MODE) return memoryStore.heroSlides;
  try {
    const colRef = collection(db, 'heroSlides');
    const q = query(colRef, orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as HeroSlide[];
    }
  } catch (error) {
    console.warn("Firestore offline, returning demo hero slides.");
  }
  return memoryStore.heroSlides;
}

export async function saveHeroSlide(slide: Omit<HeroSlide, 'id'> & { id?: string }): Promise<HeroSlide> {
  const id = slide.id || `hero-${Date.now()}`;
  const newSlide: HeroSlide = { ...slide, id };
  const idx = memoryStore.heroSlides.findIndex(s => s.id === id);
  if (idx >= 0) memoryStore.heroSlides[idx] = newSlide;
  else memoryStore.heroSlides.push(newSlide);

  try {
    await setDoc(doc(db, 'heroSlides', id), newSlide);
  } catch (error) {
    console.warn("Firestore set doc skipped");
  }
  return newSlide;
}

export async function deleteHeroSlide(id: string): Promise<void> {
  memoryStore.heroSlides = memoryStore.heroSlides.filter(s => s.id !== id);
  try {
    await deleteDoc(doc(db, 'heroSlides', id));
  } catch (e) {}
}

// --- IMPACT STATS ---
export async function getImpactStats(): Promise<ImpactStat[]> {
  if (DEMO_MODE) return memoryStore.impactStats;
  try {
    const colRef = collection(db, 'impactStats');
    const q = query(colRef, orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as ImpactStat[];
    }
  } catch (e) {}
  return memoryStore.impactStats;
}

export async function saveImpactStat(stat: ImpactStat): Promise<void> {
  const idx = memoryStore.impactStats.findIndex(s => s.id === stat.id);
  if (idx >= 0) memoryStore.impactStats[idx] = stat;
  else memoryStore.impactStats.push(stat);

  try {
    await setDoc(doc(db, 'impactStats', stat.id), stat);
  } catch (e) {}
}

// --- PROGRAMS ---
export async function getPrograms(): Promise<Program[]> {
  if (DEMO_MODE) return memoryStore.programs;
  try {
    const colRef = collection(db, 'programs');
    const q = query(colRef, orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as Program[];
    }
  } catch (e) {}
  return memoryStore.programs;
}

export async function saveProgram(program: Omit<Program, 'id'> & { id?: string }): Promise<Program> {
  const id = program.id || `prog-${Date.now()}`;
  const item: Program = { ...program, id };
  const idx = memoryStore.programs.findIndex(p => p.id === id);
  if (idx >= 0) memoryStore.programs[idx] = item;
  else memoryStore.programs.push(item);

  try {
    await setDoc(doc(db, 'programs', id), item);
  } catch (e) {}
  return item;
}

export async function deleteProgram(id: string): Promise<void> {
  memoryStore.programs = memoryStore.programs.filter(p => p.id !== id);
  try {
    await deleteDoc(doc(db, 'programs', id));
  } catch (e) {}
}

// --- CAMPAIGNS ---
export async function getFeaturedCampaign(): Promise<Campaign> {
  if (DEMO_MODE) return memoryStore.campaigns[0];
  try {
    const colRef = collection(db, 'campaigns');
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Campaign;
    }
  } catch (e) {}
  return memoryStore.campaigns[0];
}

export async function saveCampaign(campaign: Campaign): Promise<void> {
  memoryStore.campaigns[0] = campaign;
  if (DEMO_MODE) return;
  try {
    await setDoc(doc(db, 'campaigns', campaign.id), campaign);
  } catch (e) {}
}

// --- POSTS / BLOG STORIES ---
export async function getPosts(): Promise<Post[]> {
  if (DEMO_MODE) return memoryStore.posts;
  try {
    const colRef = collection(db, 'posts');
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as Post[];
    }
  } catch (e) {}
  return memoryStore.posts;
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find(p => p.slug === slug || p.id === slug);
}

export async function savePost(post: Omit<Post, 'id'> & { id?: string }): Promise<Post> {
  const id = post.id || `post-${Date.now()}`;
  const slug = post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const item: Post = { ...post, id, slug };
  const idx = memoryStore.posts.findIndex(p => p.id === id);
  if (idx >= 0) memoryStore.posts[idx] = item;
  else memoryStore.posts.unshift(item);

  try {
    await setDoc(doc(db, 'posts', id), item);
  } catch (e) {}
  return item;
}

export async function deletePost(id: string): Promise<void> {
  memoryStore.posts = memoryStore.posts.filter(p => p.id !== id);
  try {
    await deleteDoc(doc(db, 'posts', id));
  } catch (e) {}
}

// --- SUCCESS STORIES ---
export async function getSuccessStories(): Promise<SuccessStory[]> {
  if (DEMO_MODE) return memoryStore.successStories;
  try {
    const colRef = collection(db, 'successStories');
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as SuccessStory[];
    }
  } catch (e) {}
  return memoryStore.successStories;
}

export async function saveSuccessStory(story: Omit<SuccessStory, 'id'> & { id?: string }): Promise<SuccessStory> {
  const id = story.id || `story-${Date.now()}`;
  const item: SuccessStory = { ...story, id };
  const idx = memoryStore.successStories.findIndex(s => s.id === id);
  if (idx >= 0) memoryStore.successStories[idx] = item;
  else memoryStore.successStories.unshift(item);

  try {
    await setDoc(doc(db, 'successStories', id), item);
  } catch (e) {}
  return item;
}

export async function deleteSuccessStory(id: string): Promise<void> {
  memoryStore.successStories = memoryStore.successStories.filter(s => s.id !== id);
  try {
    await deleteDoc(doc(db, 'successStories', id));
  } catch (e) {}
}

// --- GALLERY ---
export async function getGalleryItems(): Promise<GalleryItem[]> {
  if (DEMO_MODE) return memoryStore.gallery;
  try {
    const colRef = collection(db, 'gallery');
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as GalleryItem[];
    }
  } catch (e) {}
  return memoryStore.gallery;
}

export async function saveGalleryItem(item: Omit<GalleryItem, 'id'> & { id?: string }): Promise<GalleryItem> {
  const id = item.id || `gal-${Date.now()}`;
  const newItem: GalleryItem = { ...item, id };
  const idx = memoryStore.gallery.findIndex(g => g.id === id);
  if (idx >= 0) memoryStore.gallery[idx] = newItem;
  else memoryStore.gallery.unshift(newItem);

  try {
    await setDoc(doc(db, 'gallery', id), newItem);
  } catch (e) {}
  return newItem;
}

export async function deleteGalleryItem(id: string): Promise<void> {
  memoryStore.gallery = memoryStore.gallery.filter(g => g.id !== id);
  try {
    await deleteDoc(doc(db, 'gallery', id));
  } catch (e) {}
}

// --- DONATIONS ---
export async function getDonations(): Promise<DonationRecord[]> {
  if (DEMO_MODE) return memoryStore.donations;
  try {
    const colRef = collection(db, 'donations');
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as DonationRecord[];
    }
  } catch (e) {}
  return memoryStore.donations;
}

export async function createDonation(record: Omit<DonationRecord, 'id'>): Promise<DonationRecord> {
  const id = `don-${Date.now()}`;
  const item: DonationRecord = { ...record, id };
  memoryStore.donations.unshift(item);

  // Update campaign raised amount if active campaign
  if (memoryStore.campaigns[0]) {
    memoryStore.campaigns[0].raisedAmount += item.amount;
  }

  try {
    await setDoc(doc(db, 'donations', id), item);
  } catch (e) {}
  return item;
}

// --- VOLUNTEERS ---
export async function getVolunteers(): Promise<VolunteerApplication[]> {
  if (DEMO_MODE) return memoryStore.volunteers;
  try {
    const colRef = collection(db, 'volunteers');
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as VolunteerApplication[];
    }
  } catch (e) {}
  return memoryStore.volunteers;
}

export async function createVolunteerApplication(appData: Omit<VolunteerApplication, 'id' | 'status' | 'submittedAt'>): Promise<VolunteerApplication> {
  const id = `vol-${Date.now()}`;
  const item: VolunteerApplication = {
    ...appData,
    id,
    status: 'new',
    submittedAt: new Date().toISOString()
  };
  memoryStore.volunteers.unshift(item);

  try {
    await setDoc(doc(db, 'volunteers', id), item);
  } catch (e) {}
  return item;
}

export async function updateVolunteerStatus(id: string, status: VolunteerApplication['status']): Promise<void> {
  const v = memoryStore.volunteers.find(item => item.id === id);
  if (v) v.status = status;

  try {
    await updateDoc(doc(db, 'volunteers', id), { status });
  } catch (e) {}
}

export async function deleteVolunteer(id: string): Promise<void> {
  memoryStore.volunteers = memoryStore.volunteers.filter(v => v.id !== id);
  try {
    await deleteDoc(doc(db, 'volunteers', id));
  } catch (e) {}
}

// --- CONTACT MESSAGES ---
export async function getContactMessages(): Promise<ContactMessage[]> {
  if (DEMO_MODE) return memoryStore.messages;
  try {
    const colRef = collection(db, 'messages');
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as ContactMessage[];
    }
  } catch (e) {}
  return memoryStore.messages;
}

export async function createContactMessage(msg: Omit<ContactMessage, 'id' | 'read' | 'submittedAt'>): Promise<ContactMessage> {
  const id = `msg-${Date.now()}`;
  const item: ContactMessage = {
    ...msg,
    id,
    read: false,
    submittedAt: new Date().toISOString()
  };
  memoryStore.messages.unshift(item);

  try {
    await setDoc(doc(db, 'messages', id), item);
  } catch (e) {}
  return item;
}

export async function markMessageAsRead(id: string, read = true): Promise<void> {
  const m = memoryStore.messages.find(item => item.id === id);
  if (m) m.read = read;

  try {
    await updateDoc(doc(db, 'messages', id), { read });
  } catch (e) {}
}

export async function deleteContactMessage(id: string): Promise<void> {
  memoryStore.messages = memoryStore.messages.filter(m => m.id !== id);
  try {
    await deleteDoc(doc(db, 'messages', id));
  } catch (e) {}
}
