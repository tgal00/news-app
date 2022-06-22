import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article } from '../models/article.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

   articles: Article[] = null;
   articleSubject: BehaviorSubject<Article[]> = new BehaviorSubject(null);

   constructor(private dataService: DataService) {
      this.init()
   }
  
   init() {
      this.dataService.getArticles()
         .subscribe(res => {
            this.articles = Object(res)["articles"];
            this.articleSubject.next([...this.articles]);
         })
   }

   getArticles() {
      return this.articleSubject;
   }

   addArticle(article: Article) {
      
      this.dataService.addArticle(article)
         .subscribe((res => {
            article.id = Object(res)["insertId"];
            this.articles.push(article);
            this.articleSubject.next([...this.articles]);
         }));
   }

   deleteArticle(id:any){
      this.dataService.deleteArticle(id)
         .subscribe((res=>{
            this.articles = this.articles.filter(a => a.id!=id);
            this.articleSubject.next([...this.articles]);
         }));
   }

   editArticle(article:Article){
      this.dataService.editArticle(article)
         .subscribe(res=>{
            this.articles[this.articles.findIndex(a => a.id==article.id)]=article;
            this.articleSubject.next([...this.articles]);
         })
   }
}
