export type UserRole = 'admin' | 'editor';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: string;
}

export interface WebsiteSettings {
  orgName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  tiktokUrl: string;
  twitterUrl: string;
  mission: string;
  vision: string;
  aboutText: string;
  footerText: string;
  logoUrl?: string;
  faviconUrl?: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  button1Text: string;
  button1Link: string;
  button2Text: string;
  button2Link: string;
  imageUrl: string;
  active: boolean;
  order: number;
}

export interface Program {
  id: string;
  title: string;
  category: 'Food' | 'Clothing' | 'Education' | 'Orphans' | 'Outreach' | 'Emergency';
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  published: boolean;
  order: number;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  beneficiaryCount: number;
  imageUrl: string;
  active: boolean;
  category: string;
  location: string;
}

export interface ImpactStat {
  id: string;
  label: string;
  value: number;
  suffix: string; // e.g. "+"
  description: string;
  order: number;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Community' | 'Education' | 'Food Support' | 'Children' | 'Orphans' | 'Donations' | 'Events' | 'Volunteers' | 'Success Stories';
  author: string;
  publishedDate: string;
  imageUrl: string;
  published: boolean;
}

export interface SuccessStory {
  id: string;
  title: string;
  summary: string;
  community: string;
  programInvolved: string;
  impact: string;
  imageUrl: string;
  published: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Community Outreach' | 'Education' | 'Food Distribution' | 'Clothing Donations' | 'Children' | 'Events' | 'Volunteers';
  imageUrl: string;
  caption: string;
  published: boolean;
  createdAt: string;
}

export interface DonationRecord {
  id: string;
  reference: string;
  fullName: string;
  email: string;
  phone: string;
  amount: number;
  donationType: 'one-time' | 'monthly';
  paymentMethod: 'momo' | 'card';
  message?: string;
  createdAt: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface VolunteerApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  age: number;
  areaOfInterest: string;
  skills: string;
  availability: string;
  reason: string;
  status: 'new' | 'under-review' | 'approved' | 'contacted';
  submittedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  read: boolean;
  submittedAt: string;
}
