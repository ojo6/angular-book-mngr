export interface IBook {
  id: string;
  position: number;
  name: string;
  description: string;
  author: string;
  rating: number;
  bookWebsiteUrl: string;
  numberOfPages: number;
  printDate: Date;
  totalNumberOfBooks: number;
}
