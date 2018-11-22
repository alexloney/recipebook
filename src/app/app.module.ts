import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { HeaderComponent } from './components/header/header.component';

import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NewRecipesComponent } from './new-recipes/new-recipes.component';
import { TopRecipesComponent } from './top-recipes/top-recipes.component';
import { CategoriesComponent } from './categories/categories.component';
import { CreateComponent } from './create/create.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewRecipesComponent,
    TopRecipesComponent,
    CategoriesComponent,
    CreateComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    InputTextareaModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
