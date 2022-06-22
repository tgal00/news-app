import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Article } from '../models/article.model';
import { Category } from '../models/category.model';
import { Comment } from '../models/comment.model';
import { ArticleService } from '../services/article.service';
import { CategoryService } from '../services/category.service';
import { CommentService } from '../services/comment.service';

@Component({
   selector: 'app-admin',
   templateUrl: './admin.component.html',
   styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

   constructor(private articleService: ArticleService, private router: Router,
      private commentService: CommentService, private categoryService: CategoryService) { this.ngOnInit() }




   articles: Article[] = null;
   articleSubject: BehaviorSubject<Article[]> = null;
   articleSubscription: Subscription = null;

   comments: Comment[] = null;
   commentSubject: BehaviorSubject<Comment[]> = null;
   commentSubscription: Subscription = null;

   categories: Category[] = null;
   categorySubject: BehaviorSubject<Category[]> = null;
   categorySubscription: Subscription = null;

   category = "";

   ngOnInit(): void {
     this.articleSubject = this.articleService.getArticles();
      this.articleSubscription = this.articleSubject
         .subscribe(res => {
            this.articles = res;
         })

      this.commentSubject = this.commentService.getComments();
      this.commentSubscription = this.commentSubject
         .subscribe(res => {
            this.comments = res;
         })

      this.categorySubject = this.categoryService.getCategories();
      this.categorySubscription = this.categorySubject
         .subscribe(res => {
            this.categories = res;
         })
   }


   delete(id: any) {
      let article = this.articles[id];
      this.articleService.deleteArticle(article.id);
   }

   edit(id: any) {
      this.router.navigate(["edit", id]);
   }

   getCommentsNumber(i: any) {
      const article = this.articles[i];
      return this.comments.filter(i => i.articleId == article.id).length;
   }

   addCategory(){
      if(this.categories.find(c=>c.category==this.category)) 
         alert("Kategorija postoji");
      else{
         const newCategory = {category:this.category}
         this.categoryService.addCategory(newCategory)
         this.category="";
      }
   }

}
