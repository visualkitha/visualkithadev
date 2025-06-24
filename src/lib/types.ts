
export type InventoryItem = {
  id: string;
  name: string;
  specifications: string;
  description: string;
  imageUrl: string;
  status: 'Tersedia' | 'Dipinjam' | 'Maintenance';
};

export type Page = {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'Published' | 'Draft';
  createdAt: string;
  vision?: string;
  mission?: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  author: string;
  category: string;
  status: 'Published' | 'Draft';
  createdAt: string;
  imageUrl: string;
  excerpt: string;
  content: string;
};

export type BlogCategory = {
  id: string;
  name: string;
};

export type ClientLogo = {
  name: string;
  logoUrl: string;
};

export type SiteImages = {
  id: 'main';
  // Homepage
  homeHero: string;
  homeWhyUs: string;
  homeProject1: string;
  homeProject2: string;
  homeProject3: string;
  homeProject4: string;
  trustedByLogos: ClientLogo[];
  // About Us page
  aboutHero: string;
  aboutProfile: string;
  aboutPortfolio1: string;
  aboutPortfolio2: string;
  aboutPortfolio3: string;
  aboutPortfolio4: string;
  // Services page
  servicesWhyUs: string;
};

export type TechnicalNeed = {
  description: string;
  completed: boolean;
};

export type Client = {
  id: string;
  name: string;
  company?: string;
  contactEmail?: string;
  contactPhone?: string;
  notes?: string;
  createdAt: string;
};

export type CrewMember = {
  id: string;
  name: string;
  role: string;
  status: 'Available' | 'On Duty' | 'On Leave';
  createdAt: string;
};

export type Booking = {
  id: string;
  clientId: string;
  clientName: string;
  location: string;
  eventDate: string; // ISO string
  eventType: string;
  status: 'Draft' | 'Confirmed' | 'Ongoing' | 'Completed' | 'Cancelled';
  paymentStatus: 'Unpaid' | 'Down Payment' | 'Paid' | 'Refunded';
  totalAmount?: number;
  amountPaid?: number;
  technicalNeeds: TechnicalNeed[];
  crewTasks: TechnicalNeed[];
  assignedCrew: string[]; // Array of CrewMember IDs
  createdAt: string;
};
