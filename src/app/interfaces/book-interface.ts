export interface IBook {
  id: number;
  name: string;
  description: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5 | null;
  bookWebsiteUrl: string | null;
  numberOfPages: number;
  printDate: Date | null;
  totalNumberOfBooks: number;
}
