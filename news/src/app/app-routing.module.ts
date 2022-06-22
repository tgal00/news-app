import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddArticleComponent } from './add-article/add-article.component';
import { AdminComponent } from './admin/admin.component';
import { AuthenticationGuard } from './auth.guard';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OtherCategoriesComponent } from './other-categories/other-categories.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ViewArticleComponent } from './view-article/view-article.component';
import { ViewByCategoryComponent } from './view-by-category/view-by-category.component';

const routes: Routes = [
   { path: "", component: MainComponent },
   { path: "register", component: RegisterComponent },
   { path: "login", component: LoginComponent },
   { path: "addArticle", component: AddArticleComponent,canActivate:[AuthenticationGuard] },
   { path: "admin", component: AdminComponent,canActivate:[AuthenticationGuard] },
   { path: "profile", component: ProfileComponent},
   { path: "other", component: OtherCategoriesComponent},
   { path: ":category", component: ViewByCategoryComponent },
   { path: "edit/:id", component: EditArticleComponent,canActivate:[AuthenticationGuard] },
   { path: "article/:id", component: ViewArticleComponent },
];

@NgModule({
   imports: [RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload'
   })],
   exports: [RouterModule]
})
export class AppRoutingModule { }
