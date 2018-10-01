export interface AuthorInterface {
    bio?: {type: string, value: string};
    name: string;
    links?: {url: string, type: {key: string}, title: string}[];
    personal_name: string;
    revision?: number;
    alternate_names?: string[];
    death_date?: string;
    wikipedia?: string;
    created: {type: string, value: string};
    photos?: number[];
    last_modified: {type: string, value: string};
    latest_revision: number;
    key: string;
    birth_date?: string;
    fuller_name?: string;
    type: {key: string};
    remote_ids?: {viaf: string, wikidata: string};
}
