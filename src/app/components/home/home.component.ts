import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news.service';
import { TruncatePipe } from '../pipes/truncate.pipe'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  news: News[] = new Array<News>();
  country = "us";
  constructor(private newsService:NewsService) { }

  ngOnInit(): void {
    this.refreshNews();
  }
  changeCountry(e: any) {
    this.country = e.target.value;
    this.refreshNews();
  }
  refreshNews(){
    this.newsService.getNews(this.country,"").subscribe((response)=>{
      if(response.status==="ok"){
        this.news = response.articles as Array<News>;
        console.log(this.news);
      }
    },(error)=>{
      console.log(error);
    });
  }
}
