export interface AuthorsWorkInterface {
  description?: string;
  links?: {url: string, type: {key: string}, title: string}[];
  covers?: number[];
  last_modified: {type: string, value: string};
  latest_revision: number;
  key: string;
  authors: {type: {key: string}, author: {key: string}}[];
  excerpts?: {comment: string; excerpt: string; author: {key: string}}[];
  subjects?: string[];
  title: string;
  created: {type: string, value: string};
  subject_places?: string[];
  first_publish_date?: string;
  subject_people?: string[];
  subject_times?: string[];
  type: {key: string};
  revision: number;
}
