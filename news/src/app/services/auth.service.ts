import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, map, Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
   providedIn: 'root'
})
export class AuthService {

   user:User;
   authUrl: string = environment.API_URL + '/authenticate/login';
   authChange: Subject<boolean> = new Subject<boolean>();

   constructor(private http: HttpClient, private router:Router) {
   }

   login(user: { username: string, password: string }) {
      this.http.post(this.authUrl, user)
         .subscribe((res) => {
            if (Object(res)["status"] == 200) {
               this.user = Object(res)["user"];
               localStorage.setItem('user', JSON.stringify(this.user));
               this.authChange.next(true);
               this.router.navigate([""]) 
            }if (Object(res)["status"] == "NOT OK"){
               alert("Krivi podaci");
            }
            if (Object(res)["status"] == 150){
               alert("Kriva lozinka");
            }
         })
   }


   logout(){
      this.user = null;
      localStorage.removeItem("user");
      this.authChange.next(false);
      this.router.navigate(['']);
   }

   getUser(){
      if (!this.user) this.user = JSON.parse(localStorage.getItem("user"));
      return {...this.user};
   }

   isAuthenticated(){
      return this.user!=null;
   }

}
