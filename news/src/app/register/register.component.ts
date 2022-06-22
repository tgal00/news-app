import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

   constructor(private userService:UserService, private router:Router) { }
   ngOnInit(): void {
   }

   password2 = "";
   user = { name: "", username: "", password: "", email: "", level:0,salt:"0" };

   register(){
      if (this.user.password != this.password2) {
         alert("Lozinke se ne podudaraju!");
         this.user.password = "";
         this.password2 = "";
      }
      else {
         this.userService.addUser(this.user);
         this.router.navigate(['/login']);
      }
   }
}
