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
  category = "";
  loading = true;
  constructor(private newsService:NewsService) { }

  ngOnInit(): void {
    this.refreshNews();
  }
  changeCountry(e: any) {
    this.country = e.target.value;
    this.refreshNews();
  }
  changeCategory(e: any) {
    this.category = e.target.value;
    this.refreshNews();
  }
  refreshNews(){
    this.loading = true;
    this.newsService.getNews(this.country,this.category).subscribe((response)=>{
      if(response.status==="ok"){
        this.news = response.articles as Array<News>;
        console.log(this.news);
      }
      this.loading = false;
    },(error)=>{
      console.log(error);
      this.loading = false;
    });
  }
}
