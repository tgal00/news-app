import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
   selector: 'app-profile',
   templateUrl: './profile.component.html',
   styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

   constructor(private http: HttpClient, private auth:AuthService) { }

   ngOnInit(): void {
      this.user = this.auth.getUser();
   }

   location="";
   showWeather = false;
   weather:any;
   user:User;

   getWeather() {
      this.showWeather = true;
      this.http.get(`http://api.weatherapi.com/v1/current.json?key=4cd26d1387fd48839c7162541221302&q=${this.location}&aqi=yes`)
         .subscribe(res => {
            this.weather = res;
            console.log(this.weather)
         })
   }
}
