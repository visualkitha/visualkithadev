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
  status: 'Published' | 'Draft';
  createdAt: string;
  imageUrl: string;
  excerpt: string;
  content: string;
};
