import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   users: User[] = null;
   userSubject: BehaviorSubject<User[]> = new BehaviorSubject(null);

   constructor(private dataService: DataService) {
      this.init()
   }

   init() {
      this.dataService.getUsers()
         .subscribe(res => {
            this.users = Object(res)["users"];
            this.userSubject.next([...this.users]);
         })
   }

   getUsers() {
      return this.userSubject;
   }

   addUser(user: User) {

      this.dataService.addUser(user)
         .subscribe((res => {
            console.log(res);
            user.id = Object(res)["insertId"];
            this.users.push(user);
            this.userSubject.next([...this.users]);
         }));
   }
}
