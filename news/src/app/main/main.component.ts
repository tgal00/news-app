import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Article } from '../models/article.model';
import { Category } from '../models/category.model';
import { ArticleService } from '../services/article.service';
import { CategoryService } from '../services/category.service';

@Component({
   selector: 'app-main',
   templateUrl: './main.component.html',
   styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

   constructor(private articleService: ArticleService, private categoryService: CategoryService) { this.ngOnInit }


   articles: Article[] = null;
   articleSubject: BehaviorSubject<Article[]> = null;
   articleSubscription: Subscription = null;

   categories: Category[] = null;
   categorySubject: BehaviorSubject<Category[]> = null;
   categorySubscription: Subscription = null;


   ngOnInit(): void {
      this.articleSubject = this.articleService.getArticles();
      this.articleSubscription = this.articleSubject
         .subscribe(res => {
            this.articles = res;
         })

      this.categorySubject = this.categoryService.getCategories();
      this.categorySubscription = this.categorySubject
         .subscribe(res => {
            this.categories = res;
         })
   }


}
