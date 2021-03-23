import { News } from "./news";
export class ResponseModel{
    status: string | null | undefined;
    totalResults: number | null | undefined;
    articles: News[] | null | undefined; 
}