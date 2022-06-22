import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../models/category.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

   categories: Category[] = null;
   categorySubject: BehaviorSubject<Category[]> = new BehaviorSubject(null);

   constructor(private dataService: DataService) {
      this.init()
   }
  
   init() {
      this.dataService.getCategories()
         .subscribe(res => {
            this.categories = Object(res)["categories"];
            this.categorySubject.next([...this.categories]);
         })
   }

   getCategories() {
      return this.categorySubject;
   }

   addCategory(category: Category) {
      
      this.dataService.addCategory(category)
         .subscribe((res => {
            category.id = Object(res)["insertId"];
            console.log(category);
            this.categories.push(category);
            this.categorySubject.next([...this.categories]);
         }));
   }
}
