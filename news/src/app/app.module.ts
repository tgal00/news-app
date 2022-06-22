import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { AdminComponent } from './admin/admin.component';
import { ViewArticleComponent } from './view-article/view-article.component';
import { ViewByCategoryComponent } from './view-by-category/view-by-category.component';
import { TopNewsPipe } from './top-news.pipe';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { AuthenticationGuard } from './auth.guard';
import { AuthService } from './services/auth.service';
import { ProfileComponent } from './profile/profile.component';
import { OtherCategoriesComponent } from './other-categories/other-categories.component';

@NgModule({
   declarations: [
      AppComponent,
      NavbarComponent,
      MainComponent,
      RegisterComponent,
      LoginComponent,
      AddArticleComponent,
      AdminComponent,
      ViewArticleComponent,
      ViewByCategoryComponent,
      TopNewsPipe,
      EditArticleComponent,
      ProfileComponent,
      OtherCategoriesComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule,
   ],
   providers: [AuthService, AuthenticationGuard],
   bootstrap: [AppComponent]
})
export class AppModule { }
