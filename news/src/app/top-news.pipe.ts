import { Pipe, PipeTransform } from '@angular/core';
import { Article } from './models/article.model';

@Pipe({
   name: 'topNews'
})
export class TopNewsPipe implements PipeTransform {

   transform(value: Article[], category: string, limit: number): Article[] {


      return value.filter(c => c.category == category)
         .sort((a, b) => +new Date(b.datePublished)- +new Date(a.datePublished))
         .slice(0, limit);
   }

}
