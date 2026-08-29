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

export const INITIAL_SETTINGS: WebsiteSettings = {
  orgName: "HopeReach Ghana Foundation",
  tagline: "Giving Hope & Building Brighter Futures Across Northern Ghana",
  phone: "+233 (0) 24 123 4567 / +233 (0) 37 209 8765",
  email: "info@hopereachghana.org",
  address: "Plot 14 Commercial Area, Opposite Jubilee Park, Tamale, Northern Region, Ghana",
  whatsapp: "233241234567",
  facebookUrl: "https://facebook.com/hopereachghana",
  instagramUrl: "https://instagram.com/hopereachghana",
  youtubeUrl: "https://youtube.com/@hopereachghana",
  tiktokUrl: "https://tiktok.com/@hopereachghana",
  twitterUrl: "https://twitter.com/hopereachghana",
  mission: "To improve the lives of vulnerable children, needy families, orphans, and deprived communities across Northern Ghana and beyond by providing essential nutrition, clothing, educational resources, emergency relief, and sustainable community outreach rooted in dignity and hope.",
  vision: "A Ghana where every child, family, and vulnerable individual in even the most remote and deprived communities has access to essential human needs, quality education, and opportunities to thrive with dignity.",
  aboutText: "HopeReach Ghana Foundation is a registered non-governmental, non-profit humanitarian organization operating at the grassroots level across Northern Ghana—including the Northern, Upper East, Upper West, Savannah, and North East Regions. Founded with a deep passion to bridge socio-economic inequalities, our outreach programs touch vulnerable children, orphans, single mothers, student scholars, and deprived rural communities. We operate with maximum transparency, compassion, and community involvement.",
  footerText: "HopeReach Ghana Foundation is a registered NGO under the Laws of the Republic of Ghana. Working tirelessly to transform lives across underserved communities in Northern Ghana."
};

export const INITIAL_HERO_SLIDES: HeroSlide[] = [
  {
    id: "hero-1",
    title: "Together, We Can Give Hope and Build Brighter Futures",
    subtitle: "We support vulnerable children, needy families, orphans, and underserved students across Northern Ghana with food, clothing, educational materials, and emergency relief.",
    button1Text: "Donate Now",
    button1Link: "/donate",
    button2Text: "Support Our Mission",
    button2Link: "/get-involved",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop",
    active: true,
    order: 1
  },
  {
    id: "hero-2",
    title: "Empowering Rural Students Through Quality Education",
    subtitle: "Over 1,200 children in remote villages now have textbooks, exercise books, school uniforms, and learning kits for school.",
    button1Text: "Sponsor a Student",
    button1Link: "/donate",
    button2Text: "Our Programs",
    button2Link: "/programs",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop",
    active: true,
    order: 2
  },
  {
    id: "hero-3",
    title: "Direct Food & Relief Distribution to Families in Need",
    subtitle: "Reaching deprived communities in Tamale, Yendi, Bolgatanga, and Wa with essential food parcels and clean water kits.",
    button1Text: "Help Feed a Family",
    button1Link: "/donate",
    button2Text: "Read Impact Stories",
    button2Link: "/stories",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1600&auto=format&fit=crop",
    active: true,
    order: 3
  }
];

export const INITIAL_IMPACT_STATS: ImpactStat[] = [
  {
    id: "stat-1",
    label: "Families Supported",
    value: 580,
    suffix: "+",
    description: "Received emergency food parcels, home supplies, and relief packages.",
    order: 1
  },
  {
    id: "stat-2",
    label: "Children Reached",
    value: 1450,
    suffix: "+",
    description: "Provided with clothing, nutrition support, and healthcare access.",
    order: 2
  },
  {
    id: "stat-3",
    label: "Communities Reached",
    value: 62,
    suffix: "+",
    description: "Underserved villages across Northern, Upper East, and Upper West Regions.",
    order: 3
  },
  {
    id: "stat-4",
    label: "Students Supported",
    value: 390,
    suffix: "+",
    description: "Equipped with textbooks, backpacks, uniforms, and scholarships.",
    order: 4
  }
];

export const INITIAL_PROGRAMS: Program[] = [
  {
    id: "prog-1",
    title: "Food Support & Nutrition Outreach",
    category: "Food",
    shortDescription: "Providing essential food packs containing rice, maize, cooking oil, and nutritious items to impoverished families.",
    fullDescription: "Food insecurity severely affects vulnerable households in rural Northern Ghana, especially during dry seasons. Our Food Support program distributes monthly food parcels to child-headed homes, widows, elderly guardians, and needy families. Each pack is designed to nourish a family of 5 for a month.",
    imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop",
    published: true,
    order: 1
  },
  {
    id: "prog-2",
    title: "Clothing & Essential Items Donation",
    category: "Clothing",
    shortDescription: "Distributing quality footwear, school uniforms, warm clothing, and personal hygiene products to children.",
    fullDescription: "Many children in remote communities walk barefoot and attend school with torn clothing. We gather, clean, package, and distribute quality clothing, shoes, and hygiene kits so that every child can feel comfortable, protected, and confident.",
    imageUrl: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=800&auto=format&fit=crop",
    published: true,
    order: 2
  },
  {
    id: "prog-3",
    title: "Educational Books & School Supplies",
    category: "Education",
    shortDescription: "Equipping rural pupils and teachers with government-curriculum textbooks, exercise books, pens, and school bags.",
    fullDescription: "Education is the greatest tool for breaking intergenerational poverty. We partner with local schools in Northern Ghana to donate core textbooks, writing stationery, mathematical sets, and desks so children have the tools to learn.",
    imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop",
    published: true,
    order: 3
  },
  {
    id: "prog-4",
    title: "Support for Orphans & Vulnerable Children",
    category: "Orphans",
    shortDescription: "Holistic care, school sponsorship, medical support, and mentorship for orphans and vulnerable kids.",
    fullDescription: "Orphans and child-headed households face extreme emotional and material vulnerability. We provide direct monthly stipends, medical insurance enrolment (NHIS), school fees, and emotional support to ensure no orphan is left behind.",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop",
    published: true,
    order: 4
  },
  {
    id: "prog-5",
    title: "Grassroots Community Outreach",
    category: "Outreach",
    shortDescription: "Conducting field visits to remote hamlets to assess needs, deliver medical screenings, and build community resilience.",
    fullDescription: "Our field team travels into hard-to-reach rural hamlets across Northern Ghana to identify marginalized families, conduct basic healthcare checkups, and deliver targeted humanitarian support directly at the doorstep.",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop",
    published: true,
    order: 5
  },
  {
    id: "prog-6",
    title: "Emergency Relief & Family Assistance",
    category: "Emergency",
    shortDescription: "Immediate emergency response packages for families hit by unexpected flood disasters, bushfires, or severe illness.",
    fullDescription: "During seasonal flooding or domestic crises in Northern Ghana, families lose homes and livelihoods overnight. We maintain an emergency fund to deploy blankets, temporary shelter kits, clean water, and emergency cash aid.",
    imageUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop",
    published: true,
    order: 6
  }
];

export const INITIAL_CAMPAIGN: Campaign = {
  id: "camp-1",
  title: "Northern Ghana Back-to-School & Learning Supplies Campaign 2026",
  description: "Help us reach 500 underprivileged pupils in remote communities across Yendi, Savelugu, and West Gonja with complete learning packages containing textbooks, uniforms, footwear, and backpacks before the next school term.",
  targetAmount: 75000, // GHS
  raisedAmount: 48500, // GHS
  beneficiaryCount: 500,
  imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
  active: true,
  category: "Education",
  location: "Yendi & West Gonja Districts, Northern Region"
};

export const INITIAL_POSTS: Post[] = [
  {
    id: "post-1",
    title: "Delivering 300 School Backpacks and Textbooks in Savelugu District",
    slug: "delivering-school-backpacks-savelugu",
    excerpt: "Over 300 primary school pupils in rural Savelugu received learning materials, exercise books, and brand new uniforms for the new academic term.",
    content: `
      Our dedicated field team spent the past week visiting three primary schools in the Savelugu District of Northern Ghana. Many of these young pupils previously had to share single worn-out textbooks or write on scrap papers.

      Thanks to generous donations from our partners and individual supporters, HopeReach Ghana Foundation successfully distributed:
      - 300 High-quality water-resistant backpacks
      - 1,800 Exercise books and writing stationery
      - 300 Mathematical sets and geometry toolkits
      - Supplementary reading books for school mini-libraries

      Headteacher Mr. Alhassan Expressed immense gratitude, noting that student attendance has already improved significantly following the distribution.
    `,
    category: "Education",
    author: "Aminu Ibrahim",
    publishedDate: "August 15, 2026",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
    published: true
  },
  {
    id: "post-2",
    title: "Community Food Relief Drive Reaches 120 Needy Households in Bolgatanga",
    slug: "food-relief-drive-bolgatanga",
    excerpt: "Nutritious food supplies including rice, oil, maize, and legumes were distributed to elderly citizens and child-headed homes.",
    content: `
      In response to seasonal food scarcity, our emergency team organized a two-day food relief distribution exercise in the peripheral communities of Bolgatanga in the Upper East Region.

      Each family package contained:
      - 25kg Bag of fortified rice
      - 10kg Bag of locally harvested white maize
      - 5 Litres of vegetable cooking oil
      - Protein legumes and canned fish supplies

      This distribution ensured that over 600 family members had guaranteed nutritious meals during a critical month.
    `,
    category: "Food Support",
    author: "Fatima Abdul-Rahman",
    publishedDate: "August 02, 2026",
    imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop",
    published: true
  },
  {
    id: "post-3",
    title: "Restoring Dignity: Clothing and Hygiene Kit Distribution in Damongo",
    slug: "clothing-hygiene-distribution-damongo",
    excerpt: "Children and young adults received warm clothing, footwear, and health kits during our outreach in the Savannah Region.",
    content: `
      Proper clothing and hygiene are essential to human dignity and health. During our recent outreach in Damongo, Savannah Region, our volunteers packaged and distributed over 500 sets of clean clothing and personal hygiene products.

      Special care was taken to provide young girls with sanitary hygiene supplies and educational guidance on personal wellness, breaking school absenteeism caused by period poverty.
    `,
    category: "Children",
    author: "David Kwame Mensah",
    publishedDate: "July 24, 2026",
    imageUrl: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=800&auto=format&fit=crop",
    published: true
  }
];

export const INITIAL_SUCCESS_STORIES: SuccessStory[] = [
  {
    id: "story-1",
    title: "From Walking 8km Barefoot to Class Prefect: Fuseini's Story",
    summary: "Fuseini, a 11-year-old pupil from a hamlet near Yendi, received full educational support, uniform, and bicycle assistance from HopeReach Ghana.",
    community: "Yendi District",
    programInvolved: "Education & Clothing Support",
    impact: "Fuseini is now top of his class and no longer misses school during rainy seasons.",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop",
    published: true
  },
  {
    id: "story-2",
    title: "Sustaining a Family of Six After Unexpected Loss",
    summary: "Widow Madam Mariama in Nalerigu received emergency food supplies and a micro-grant seed to start a petty trading business.",
    community: "Nalerigu, North East Region",
    programInvolved: "Emergency & Family Support",
    impact: "Madam Mariama now runs a sustainable gari and bean retail stall, providing three daily meals for her grandchildren.",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop",
    published: true
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: "gal-1",
    title: "School Books Distribution in Tamale",
    category: "Education",
    imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop",
    caption: "Pupils displaying their new textbooks provided by HopeReach donors.",
    published: true,
    createdAt: "2026-08-10"
  },
  {
    id: "gal-2",
    title: "Food Relief Packaging Team",
    category: "Food Distribution",
    imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop",
    caption: "Volunteers preparing 200 food parcels in Tamale central depot.",
    published: true,
    createdAt: "2026-08-05"
  },
  {
    id: "gal-3",
    title: "Rural Outreach Visit in West Gonja",
    category: "Community Outreach",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop",
    caption: "Field officers interacting with community elders and mothers.",
    published: true,
    createdAt: "2026-07-28"
  },
  {
    id: "gal-4",
    title: "Children's Joy at Clothing Donation",
    category: "Children",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop",
    caption: "Smiling children wearing brand new footwear and dresses.",
    published: true,
    createdAt: "2026-07-20"
  },
  {
    id: "gal-5",
    title: "Volunteer Health Screening Exercise",
    category: "Volunteers",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
    caption: "Volunteer nurse providing health checks to elderly villagers.",
    published: true,
    createdAt: "2026-07-12"
  },
  {
    id: "gal-6",
    title: "Student Learning Kit Delivery",
    category: "Education",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
    caption: "Students sitting eagerly in class with their new writing pads.",
    published: true,
    createdAt: "2026-06-30"
  }
];

export const DEMO_DONATIONS: DonationRecord[] = [
  {
    id: "don-101",
    reference: "HRG-20260825-892",
    fullName: "Kwaku Mensah",
    email: "kwaku.mensah@example.com",
    phone: "+233244112233",
    amount: 250,
    donationType: "one-time",
    paymentMethod: "momo",
    message: "Supporting education for pupils in Northern Ghana!",
    createdAt: "2026-08-25T14:30:00Z",
    status: "completed"
  },
  {
    id: "don-102",
    reference: "HRG-20260824-419",
    fullName: "Sarah Jenkins",
    email: "sarah.jenkins@example.org",
    phone: "+447911123456",
    amount: 1000,
    donationType: "monthly",
    paymentMethod: "card",
    message: "Monthly contribution for orphan nutrition and care.",
    createdAt: "2026-08-24T10:15:00Z",
    status: "completed"
  }
];

export const DEMO_VOLUNTEERS: VolunteerApplication[] = [
  {
    id: "vol-1",
    fullName: "Abena Osei",
    email: "abena.osei@example.com",
    phone: "+233209876543",
    location: "Tamale / Accra",
    age: 26,
    areaOfInterest: "Education & Teaching Support",
    skills: "Teaching, Photography, Public Speaking",
    availability: "Weekends & School Holidays",
    reason: "I want to dedicate my spare time to uplifting pupils in rural Northern Ghana through reading clubs.",
    status: "new",
    submittedAt: "2026-08-22T09:00:00Z"
  }
];

export const DEMO_MESSAGES: ContactMessage[] = [
  {
    id: "msg-1",
    name: "Dr. Emmanuel Yeboah",
    email: "e.yeboah@example.org",
    phone: "+233243009988",
    subject: "Corporate Partnership Inquiry for Desk Donations",
    message: "Greetings HopeReach team, our company would like to donate 100 wooden school desks to schools in your network. Please let us know the logistics process.",
    read: false,
    submittedAt: "2026-08-24T16:45:00Z"
  }
];
