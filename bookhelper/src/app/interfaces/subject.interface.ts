import { SubjectsWorkInterface } from './subjects-work.interface';
export interface SubjectInterface {
  subject_type: string;
  name: string;
  key: string;
  ebook_count?: number;
  works: SubjectsWorkInterface[];
  work_count: number;
}
