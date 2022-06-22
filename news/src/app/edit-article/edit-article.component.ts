import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Article } from '../models/article.model';
import { Category } from '../models/category.model';
import { Comment } from '../models/comment.model';
import { User } from '../models/user.model';
import { ArticleService } from '../services/article.service';
import { CategoryService } from '../services/category.service';
import { CommentService } from '../services/comment.service';
import { UserService } from '../services/user.service';

@Component({
   selector: 'app-edit-article',
   templateUrl: './edit-article.component.html',
   styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {


   constructor(private articleService: ArticleService, private route: ActivatedRoute,
      private categoryService: CategoryService, private router: Router,
      private commentService: CommentService, private usersService: UserService) { }

   article: Article;
   editArticle:Article;

   articles: Article[] = null;
   articleSubject: BehaviorSubject<Article[]> = null;
   articleSubscription: Subscription = null;
   
   categories: Category[] = null;
   categorySubject: BehaviorSubject<Category[]> = null;
   categorySubscription: Subscription = null;

   id: any;

   users: User[];
   userSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);
   userSubscription: Subscription = null;

   comments: Comment[] = null;
   commentSubject: BehaviorSubject<Comment[]> = null;
   commentSubscription: Subscription = null;


   ngOnInit(): void {

      this.articleSubject = this.articleService.getArticles();
      this.articleSubscription = this.articleSubject
         .subscribe(res => {
            this.id = this.route.snapshot.params['id'];
            //this.article = res.find(i => i.id == this.id);
            this.articles = res;
            this.editArticle ={ ...this.articles.find(i => i.id == this.id)};
           
         })
         
      this.categorySubject = this.categoryService.getCategories();
      this.categorySubscription = this.categorySubject
         .subscribe(res => {
            this.categories = res;
         })

      this.commentSubject = this.commentService.getComments();
      this.commentSubscription = this.commentSubject
         .subscribe(res => {
            this.comments = res.filter(c => c.articleId == this.id);
         })

      this.userSubject = this.usersService.getUsers();
      this.userSubscription = this.userSubject.subscribe(res => this.users = res);
   }

   edit() {
      this.editArticle.datePublished = new Date();
      this.articleService.editArticle(this.editArticle);
      this.router.navigate(['/admin']);
   }

   getUserById(id: any) {
      return this.users.filter(u => u.id == id).map(u => u.username);
   }

   deleteComment(id:any){
      let comm = this.comments[id];
      this.commentService.deleteComment(comm.id);
   }
}
