import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Category } from '../models/category.model';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { CategoryService } from '../services/category.service';

@Component({
   selector: 'app-navbar',
   templateUrl: './navbar.component.html',
   styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

   constructor(private auth: AuthService, private categoryService:CategoryService) { }

   user: User;
   authenticated = false;
   authChange: Subscription;


   ngOnInit(): void {
      this.authenticated = this.auth.isAuthenticated();
      this.user = this.auth.getUser();
      this.authChange = this.auth.authChange
         .subscribe(res => {
            this.authenticated = res
            this.user = this.auth.getUser();
         });
   }


   onLogout() {
      this.auth.logout();
   }

}
