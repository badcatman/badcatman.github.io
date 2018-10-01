export interface SubjectsWorkInterface {
  printdisabled?: boolean;
  cover_id?: number;
  ia_collection?: string[];
  has_fulltext: boolean;
  edition_count: number;
  checked_out?: boolean;
  title: string;
  public_scan?: boolean;
  cover_edition_key?: string;
  lendinglibrary?: boolean;
  lending_edition: string;
  first_publish_year?: string;
  key: string;
  authors: {name: string, key: string}[];
  ia?: string;
  lending_identifier?: string;
  subject: string[];
}
