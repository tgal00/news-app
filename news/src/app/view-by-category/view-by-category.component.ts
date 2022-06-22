import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Article } from '../models/article.model';
import { ArticleService } from '../services/article.service';

@Component({
   selector: 'app-view-by-category',
   templateUrl: './view-by-category.component.html',
   styleUrls: ['./view-by-category.component.css']
})
export class ViewByCategoryComponent implements OnInit {

   constructor(private articleService: ArticleService, private route: ActivatedRoute) {

   }

   articles: Article[] = null;
   articleSubject: BehaviorSubject<Article[]> = null;
   articleSubscription: Subscription = null;

   temp: Article[] = null;
   category: any;

   ngOnInit(): void {

      this.articleSubject = this.articleService.getArticles();
      this.articleSubscription = this.articleSubject
         .subscribe(res => {
            this.articles = res;
            this.temp = this.articles;
            this.temp = this.temp.filter(c => c.category == this.category)
         })

      this.route.params.subscribe(
         params => {
            this.category = params['category'];
            this.temp = this.articles;
            this.temp = this.temp.filter(c => c.category == this.category)

         })


   }

}
