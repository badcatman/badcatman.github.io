import { AuthorsWorkInterface } from './authors.work.interface';
export interface SearchAuthorsWorksInterface {
  entries: AuthorsWorkInterface[];
  links: {self: string; author: string};
  size: number;
}
