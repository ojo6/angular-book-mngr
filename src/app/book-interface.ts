export interface IBook {
  id: string;
  position: number;
  name: string;
  description: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  bookWebsiteUrl: string;
  numberOfPages: number;
  printDate: Date;
  totalNumberOfBooks: number;
}
