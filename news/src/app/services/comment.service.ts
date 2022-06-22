import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Comment } from '../models/comment.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

   comments: Comment[] = null;
   commentSubject: BehaviorSubject<Comment[]> = new BehaviorSubject(null);

   commentsForArticle: Comment[] = null;
   commentSubjectForArticle: BehaviorSubject<Comment[]> = new BehaviorSubject(null);

   constructor(private dataService: DataService) {
      this.init();
   }
  
   init() {
      this.dataService.getComments()
         .subscribe(res => {
            this.comments = Object(res)["comments"];
            this.commentSubject.next([...this.comments]);
         })
   }


   getComments() {
      return this.commentSubject;
   }

   getCommentsForArticle(id:any){
     
      return this.commentSubjectForArticle;
   }

   addComment(comment: Comment) {
      
      this.dataService.addComment(comment)
         .subscribe((res => {
            comment.id = Object(res)["insertId"];
            this.comments.push(comment);
            this.commentSubject.next([...this.comments]);
         }));
   }

   deleteComment(id:any){
      this.dataService.deleteComment(id)
         .subscribe((res=>{
            this.comments = this.comments.filter(c => c.id!=id);
            this.commentSubject.next([...this.comments]);
         }));
   }

   /*editComment(comment:Post){
      this.dataService.editComment(comment)
         .subscribe(res=>{
            this.posts[this.posts.findIndex(p => p._id==comment._id)]=comment;
            this.commentSubject.next([...this.posts]);
         })
   }*/
}


