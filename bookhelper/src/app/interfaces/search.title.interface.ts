import { BookInterface } from './book.interface';
export interface SearchTitleInterface {
    start: number;
    num_found: number;
    numFound: number;
    docs: BookInterface[];
}
