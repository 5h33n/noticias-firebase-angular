import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ResponseModel } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private _API_NEWS = "https://newsapi.org/v2/top-headlines";
  private _API_KEY = "79132fcdd4054272aa69b6c64cde3c2a";
  constructor(private http: HttpClient) { }
  getNews(country: string, category:string): Observable<ResponseModel>{
    const url_api = `${this._API_NEWS}?country=${country}&category=${category}&apiKey=${this._API_KEY}`;
    return this.http.get(url_api).pipe(
      map((response)=>response as ResponseModel)
    );
  }
}
