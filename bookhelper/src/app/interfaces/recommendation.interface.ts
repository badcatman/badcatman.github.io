export interface RecommendationInterface {
  key: string;
  subject: string[];
  rating: number;
  authors: {name: string, key: string}[];
  title: string;
}
