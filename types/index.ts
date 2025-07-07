export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  website: string;
}

export interface BlogPost extends Post {
  user: User;
  imageUrl: string;
  category: string;
  readTime: string;
  publishedAt: string;
}

export interface CarSpecs {
  modelYear: string;
  fuelType: string;
  topSpeed: string;
  price: string;
  engine: string;
  transmission: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}