export interface IBook {
  id: number;
  name: string;
  description: string;
  author: string;
  rating?: 1 | 2 | 3 | 4 | 5 | undefined;
  bookWebsiteUrl?: string;
  numberOfPages: number;
  printDate?: Date;
  totalNumberOfBooks: number;
}
