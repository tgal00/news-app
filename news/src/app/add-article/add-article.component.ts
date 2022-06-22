import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Article } from '../models/article.model';
import { Category } from '../models/category.model';
import { ArticleService } from '../services/article.service';
import { CategoryService } from '../services/category.service';

@Component({
   selector: 'app-add-article',
   templateUrl: './add-article.component.html',
   styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {


   categories: Category[] = null;
   categorySubject: BehaviorSubject<Category[]> = null;
   categorySubscription: Subscription = null;

   article = { headline: "", category: "", imgUrl: "", story: "",datePublished: new Date() }

   constructor(private categoryService: CategoryService, private articleService:ArticleService, private router:Router) { this.ngOnInit() }
   ngOnInit(): void {
      this.categorySubject = this.categoryService.getCategories();
      this.categorySubscription = this.categorySubject
         .subscribe(res => {
            this.categories = res;
         })
   }



   post() {
      this.article.datePublished = new Date(); 
      this.articleService.addArticle(this.article);
      this.router.navigate(['/admin']);   
   }
}
