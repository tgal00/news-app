import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Article } from '../models/article.model';
import { Comment } from '../models/comment.model';
import { Category } from '../models/category.model';
@Injectable({
   providedIn: 'root'
})
export class DataService {

   constructor(private http: HttpClient) { }


   getUsers() {

      return this.http.get(environment.API_URL + "/api/users");
   }
   addUser(user: User) {

      return this.http.post(environment.API_URL + "/authenticate/register", user);
   }


   getCategories() {

      return this.http.get(environment.API_URL + "/api/categories");
   }
   addCategory(category: Category) {

      return this.http.post(environment.API_URL + "/api/categories", category);
   }


   getArticles() {

      return this.http.get<Article[]>(environment.API_URL + "/api/articles")
   }
   addArticle(article: Article) {

      return this.http.post(environment.API_URL + "/api/articles", article);
   }

   editArticle(article: Article) {

      return this.http.put(environment.API_URL + "/api/articles", article);
   }
   deleteArticle(id: any) {

      return this.http.delete(environment.API_URL + `/api/articles/${id}`);
   }



   getComments() {

      return this.http.get<Comment[]>(environment.API_URL + "/api/comments")
   }


   addComment(comment: Comment) {

      return this.http.post(environment.API_URL + "/api/comments", comment);
   }

   deleteComment(id: any) {

      return this.http.delete(environment.API_URL+`/api/comments/${id}`);
   }
}
