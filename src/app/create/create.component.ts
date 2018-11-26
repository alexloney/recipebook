import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { AngularFireDatabase } from '@angular/fire/database';
import { defineBase } from '@angular/core/src/render3';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Recipe, RecipeJson } from '../models/recipe';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less']
})
export class CreateComponent implements OnInit {
  private recipes: AngularFirestoreCollection<RecipeJson>;

  prepTime: string;
  cookTime: string;
  readyIn: string;
  servings: string;
  yield: string;
  title: string;
  description: string;
  ingredients: string;
  directions: string;
  source: string;
  tips: string;

  msgs = [];
  prepTimeError = '';
  cookTimeError = '';
  readyInError = '';
  servingsError = '';
  yieldError = '';
  titleError = '';
  descriptionError = '';
  ingredientsError = '';
  directionsError = '';
  sourceError = '';
  tipsError = '';

  // private itemDoc: AngularFirestoreDocument<Recipe>;
  // items: Observable<any[]>;

  constructor(private afs: AngularFirestore,
    private router: Router) {

    // Create a handle to the recipes collection
    this.recipes = afs.collection<RecipeJson>('recipes');


    // this.items = this.afs.collection('items').snapshotChanges().pipe(map(actions => {
    //   return actions.map(a => {
    //     const data = a.payload.doc.data() as Recipe;

    //     const id = a.payload.doc.id;

    //     return {id, ...data };
    //   })
    // }));
    
    // console.log(this.items);
  }

  ngOnInit() { }

  validateFields() {
    let valid = true;

    if (!this.prepTime || this.prepTime.length == 0) {
      this.prepTimeError = 'Required';
      valid = false;
    }

    if (!this.cookTime || this.cookTime.length == 0) {
      this.cookTimeError = 'Required';
      valid = false;
    }

    if (!this.servings || this.servings.length == 0) {
      this.servingsError = 'Required';
      valid = false;
    }

    if (!this.title || this.title.length == 0) {
      this.titleError = 'Required';
      valid = false;
    }

    if (!this.description || this.description.length == 0) {
      this.descriptionError = 'Required';
      valid = false;
    }

    if (!this.ingredients || this.ingredients.length == 0) {
      this.ingredientsError = 'Required';
      valid = false;
    }

    if (!this.directions || this.directions.length == 0) {
      this.directionsError = 'Required';
      valid = false;
    }

    if (!this.source || this.source.length == 0) {
      this.sourceError = 'Required';
      valid = false;
    }

    return valid;
  }

  saveClick() {
    if (!this.validateFields()) {
      return;
    }
    // let itemDoc = this.afs.doc<Recipe>('recipes/1');

    // Build the recipe document to insert
    let recipe = new Recipe();
    recipe.prepTime = this.prepTime;
    recipe.cookTime = this.cookTime;
    recipe.servings = this.servings;
    recipe.title = this.title;
    recipe.description = this.description;
    recipe.ingredients = this.ingredients;
    recipe.directions = this.directions;
    recipe.submittedBy = 'test'; // TODO: Update with user ID
    recipe.submittedDate = new Date();
    recipe.source = this.source;
    
    if (this.readyIn && this.readyIn.length > 0)
      recipe.readyIn = this.readyIn;
    if (this.yield && this.yield.length > 0)
      recipe.yield = this.yield;
    if (this.tips && this.tips.length > 0)
      recipe.tips = this.tips;


    // TODO: Enable saving state

    // add the document
    this.recipes.add(recipe.toJson()).then(
      success => {
        // TODO: Disable saving state

        // TODO: Redirect to recipe success.id
        this.router.navigate(['recipe', success.id]);
      },
      failure => {
        // TODO: Disable saving state

        // TODO: Display error message
        this.msgs.push({severity: 'error', summary: failure.code, detail: failure.message});
        console.error(failure);
      }
    );

    // itemDoc.update(item);
  }

}
