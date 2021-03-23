import { Source } from "./source";
export class News{
  author: string | null | undefined;
  content: string | null | undefined;
  description: string | null | undefined;
  title: string | null | undefined;
  publishedAt: Date | null | undefined;
  source: Source | null | undefined;
  url: string | null | undefined;
  urlToImage: string | null | undefined;
}