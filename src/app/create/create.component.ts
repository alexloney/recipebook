import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { AngularFireDatabase } from '@angular/fire/database';
import { defineBase } from '@angular/core/src/render3';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Recipe {
  prepTime: string;
  cookTime: string;
  readyIn?: string;
  servings: string;
  yield?: string;
  title: string;
  description: string;
  ingredients: string[];
  directions: string[];
 }

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less']
})
export class CreateComponent implements OnInit {
  private recipes: AngularFirestoreCollection<Recipe>;

  prepTime: string;
  cookTime: string;
  readyIn: string;
  servings: string;
  yield: string;
  title: string;
  description: string;
  ingredients: string;
  directions: string;

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

  formValidation;

  // private itemDoc: AngularFirestoreDocument<Recipe>;
  // items: Observable<any[]>;

  constructor(private afs: AngularFirestore,
    private router: Router) {

    // Create a handle to the recipes collection
    this.recipes = afs.collection<Recipe>('recipes');


    // this.items = this.afs.collection('items').snapshotChanges().pipe(map(actions => {
    //   return actions.map(a => {
    //     const data = a.payload.doc.data() as Recipe;

    //     const id = a.payload.doc.id;

    //     return {id, ...data };
    //   })
    // }));
    
    // console.log(this.items);
  }

  ngOnInit() {
    this.formValidation = new FormGroup({
      'title': new FormControl(this.title, [
        Validators.required
      ])
    });
  }

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

    return valid;
  }

  saveClick() {
    if (!this.validateFields()) {
      return;
    }
    // let itemDoc = this.afs.doc<Recipe>('recipes/1');

    // Build the recipe document to insert
    let recpie: Recipe = {
      prepTime: this.prepTime,
      cookTime: this.cookTime,
      readyIn: this.readyIn,
      servings: this.servings,
      yield: this.yield,
      title: this.title,
      description: this.description,
      ingredients: this.ingredients.split(/[\r\n]+/),
      directions: this.directions.split(/[\r\n]+/)
    };

    // Add in optional params if they exist
    if (this.readyIn)
    {
      recpie.readyIn = this.readyIn;
    }
    if (this.yield)
    {
      recpie.yield = this.yield;
    }

    // TODO: Enable saving state

    // add the document
    this.recipes.add(recpie).then(
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
