# Rescue Foundation Ghana - Modern NGO Web Platform & Admin Portal

A modern, trustworthy, compassionate, and fully dynamic web application and management dashboard for **Rescue Foundation Ghana**, a Ghanaian non-governmental organization (NGO) dedicated to supporting underprivileged children, needy families, orphans, students, and deprived communities across Northern Ghana.

---

## 🌟 Key Features

### 🏛️ Public Website
- **Modern Responsive Design:** Built with Next.js 14 App Router, TypeScript, and Tailwind CSS. Tailored with a warm Ghanaian color palette (Deep Emerald Green, Amber Gold, Terracotta, Soft Cream).
- **Dynamic Hero Slider:** Managed in real-time from the admin dashboard with active slide toggles.
- **Animated Impact Counters:** Displays live statistics for Families Supported, Children Reached, Communities Reached, and Students Supported.
- **Core Programs Showcase:** Interactive cards and category filters for Food Support, Clothing Support, Education Support, Support for Orphans, Grassroots Outreach, and Emergency Relief.
- **Urgent Community Campaign:** Live fundraising campaign with target goals, amount raised progress bar, beneficiary count, and direct donation CTA.
- **News & Field Stories (Blog):** Full dynamic blog system with category filters, dynamic article pages, author metadata, and publication dates.
- **Masonry Photo Gallery:** Responsive image grid with category filtering and full-screen Lightbox photo preview.
- **Ghanaian Donation Architecture:** Secure donation flow supporting MTN Mobile Money, Telecel Cash, AT Money, and Cards via Paystack. Includes live GHS impact indicators, donation reference generation, and downloadable printable receipts.
- **Volunteer Application Portal:** Interactive multi-field application form storing submissions directly in Firestore.
- **Contact Us & WhatsApp Direct:** Instant communication options including direct WhatsApp integration and Firestore message inboxing.

---

### 🛡️ Admin Dashboard (`/admin`)
- **Authentication & Security:** Firebase Authentication integration with route protection, session tracking, and role-based permissions (`admin` vs `editor`).
- **Dashboard Overview:** Real-time KPI metrics, quick action shortcuts, and a **1-Click Seed Database Utility**.
- **Website Settings Manager:** Live editing of NGO name, tagline, phone numbers, official email, physical address, WhatsApp number, social handles, mission, vision, and about texts.
- **Hero Slider Manager:** Full CRUD for homepage slides, background image uploader, re-ordering, and enable/disable toggles.
- **Programs Manager:** Create, edit, publish/unpublish, and upload images for core programs.
- **Campaign Manager:** Update target amounts, raised funds, beneficiary counts, and campaign graphics.
- **Impact Stats Manager:** Live numerical counter editor.
- **News & Stories Manager:** Write, edit, publish, category tag, and upload cover photos for blog articles and beneficiary success stories.
- **Gallery Manager:** Upload high-resolution images to Firebase Storage with upload progress indicator, alt text, and category tags.
- **Donation Records Viewer:** Logged transactions with search, filter, and payment channel breakdown.
- **Volunteers Manager:** Review volunteer applications, check skills/motivations, update status (New, Under Review, Approved, Contacted).
- **Messages Inbox:** View contact inquiries, read/unread status tracking, reply links, and deletion.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Vanilla CSS & tokens)
- **Icons:** Lucide React (`lucide-react`)
- **Backend & Database:** Firebase (Firestore DB, Firebase Authentication, Firebase Storage)
- **Payments:** Paystack API Route Architecture (`/api/donations/paystack-initialize`)

---

## 🚀 Quick Start & Installation

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-repo/ghana-ngo-platform.git
cd ghana-ngo-platform
npm install
```

### 2. Environment Variables Setup
Create a `.env.local` file in the root directory and copy the contents from `.env.example`:

```env
# Firebase Public Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Paystack Ghanaian Payment Gateway Configuration
PAYSTACK_SECRET_KEY=sk_live_or_test_xxxxxx
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_or_test_xxxxxx
```

> **Note:** If environment variables are not yet provided, the application automatically runs in demo mode using an authentic Northern Ghana dataset.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Admin Authentication Credentials

- **Admin Login Route:** `/admin/login`
- **Demo Credentials:**
  - **Email:** `admin@rescuefoundationghana.org` (or `admin@hopereachghana.org`)
  - **Password:** `admin123`

---

## 🔒 Firebase Security Rules

### Firestore Security Rules (`firestore.rules`)
Deploy `firestore.rules` to your Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isAuthenticated() {
      return request.auth != null;
    }

    function isEditorOrAdmin() {
      return isAuthenticated() && 
        (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin' ||
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'editor');
    }

    match /settings/{docId} { allow read: if true; allow write: if isEditorOrAdmin(); }
    match /heroSlides/{slideId} { allow read: if true; allow write: if isEditorOrAdmin(); }
    match /programs/{progId} { allow read: if true; allow write: if isEditorOrAdmin(); }
    match /campaigns/{campId} { allow read: if true; allow write: if isEditorOrAdmin(); }
    match /impactStats/{statId} { allow read: if true; allow write: if isEditorOrAdmin(); }
    match /posts/{postId} { allow read: if true; allow write: if isEditorOrAdmin(); }
    match /successStories/{storyId} { allow read: if true; allow write: if isEditorOrAdmin(); }
    match /gallery/{itemId} { allow read: if true; allow write: if isEditorOrAdmin(); }

    match /messages/{msgId} { allow create: if true; allow read, update, delete: if isEditorOrAdmin(); }
    match /volunteers/{volId} { allow create: if true; allow read, update, delete: if isEditorOrAdmin(); }
    match /donations/{donId} { allow create: if true; allow read, update, delete: if isEditorOrAdmin(); }

    match /users/{userId} {
      allow read: if isAuthenticated() && (request.auth.uid == userId || isEditorOrAdmin());
      allow write: if isAuthenticated();
    }
  }
}
```

---

## 🌐 Production Deployment (Vercel / Netlify)

1. Push code to your Git repository (e.g. GitHub).
2. Connect your repository to Vercel or Netlify.
3. Configure the Environment Variables in the hosting dashboard.
4. Deploy! Next.js will build optimized static and server-rendered pages.
