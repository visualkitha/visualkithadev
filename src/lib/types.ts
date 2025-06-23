export type Equipment = {
  id: string;
  name: string;
  specifications: string;
  description: string;
  imageUrl: string;
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

export type SiteImages = {
  id: 'main';
  // Homepage
  homeHero: string;
  homeWhyUs: string;
  homeProject1: string;
  homeProject2: string;
  homeProject3: string;
  homeProject4: string;
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
