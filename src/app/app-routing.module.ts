import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NewRecipesComponent } from './new-recipes/new-recipes.component';
import { TopRecipesComponent } from './top-recipes/top-recipes.component';
import { CategoriesComponent } from './categories/categories.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { RecipeViewComponent } from 'src/app/recipes/recipe-view/recipe-view.component';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' }
  { path: '', component: HomeComponent },
  { path: 'new', component: NewRecipesComponent },
  { path: 'top', component: TopRecipesComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'edit', redirectTo: 'create' },
  { path: 'edit/:id', component: RecipeEditComponent },
  { path: 'create', component: RecipeEditComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recipe/:id', component: RecipeViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
