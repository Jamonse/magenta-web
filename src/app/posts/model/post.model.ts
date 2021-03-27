export interface Post {
  id: number;
  title: string;
  createdBy: string;
  createdAt: Date;
  lastUpdated: Date;
  content: string;
  image: File;
}
