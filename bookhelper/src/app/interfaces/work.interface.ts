export interface WorkInterface {
    key?: string;
    description?: {type: string, value: string};
    links?: {}[];
    title: string;
    created: {type: string, value: string};
    covers?: number[];
    first_sentence?: {type: string, value: string};
    subject_places?: string[];
    first_publish_date?: string;
    subject_people?: string[];
    last_modified: {type: string, value: string};
    authors?: {type: {}, author: {}}[];
    latest_revision: number;
    excerpts?: {excerpt: string}[];
    type: {key: string};
    subjects?: string[];
    revision: number;
}
