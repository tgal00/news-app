import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Article } from '../models/article.model';
import { Category } from '../models/category.model';
import { Comment } from '../models/comment.model';
import { User } from '../models/user.model';
import { ArticleService } from '../services/article.service';
import { AuthService } from '../services/auth.service';
import { CategoryService } from '../services/category.service';
import { CommentService } from '../services/comment.service';
import { UserService } from '../services/user.service';

@Component({
   selector: 'app-view-article',
   templateUrl: './view-article.component.html',
   styleUrls: ['./view-article.component.css']
})
export class ViewArticleComponent implements OnInit {

   constructor(private articleService: ArticleService, private route: ActivatedRoute,
      private auth: AuthService, private usersService: UserService, private commentService: CommentService) { }

   article: Article;
   articles: Article[] = null;
   articleSubject: BehaviorSubject<Article[]> = null;
   articleSubscription: Subscription = null;

   id: any;


   commentText = "";
   editingIndex = -1;
   editComment: Comment;
   newComment = false;
   users: User[];
   userSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);
   userSubscription: Subscription = null;
   user: User;
   authenticated = false;
   authChange: Subscription;

   comments: Comment[] = null;
   commentSubject: BehaviorSubject<Comment[]> = null;
   commentSubscription: Subscription = null;

   ngOnInit(): void {

      this.articleSubject = this.articleService.getArticles();
      this.articleSubscription = this.articleSubject
         .subscribe(res => {
            this.id = this.route.snapshot.params['id'];
            this.article = res.find(i => i.id == this.id);
         });

      this.commentSubject = this.commentService.getComments();
      this.commentSubscription = this.commentSubject
         .subscribe(res => {
            this.comments = res.filter(c => c.articleId == this.id);
         })

      this.authenticated = this.auth.isAuthenticated();
      this.user = this.auth.getUser();
      this.authChange = this.auth.authChange
         .subscribe(res => {
            this.authenticated = res
         });



      this.userSubject = this.usersService.getUsers();
      this.userSubscription = this.userSubject.subscribe(res => this.users = res);

   }

   onComment() {
      const comm = { userId: this.user.id, datePublished: new Date(), comment: this.commentText, articleId: this.id };
      this.commentService.addComment(comm);
      this.commentText = "";
      this.newComment = false;
   }

   getUserById(id:any){
      return this.users.filter(u => u.id == id).map(u => u.username);
   }

   deleteComment(i:any){
      let comm = this.comments[i];
      this.commentService.deleteComment(comm.id);
   }

}
