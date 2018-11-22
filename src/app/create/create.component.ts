import { Component, OnInit } from '@angular/core';

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
 };

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

  // private itemDoc: AngularFirestoreDocument<Recipe>;
  // items: Observable<any[]>;

  constructor(private afs: AngularFirestore) {

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
  }

  saveClick() {
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
        console.log(success);
      },
      failure => {
        // TODO: Disable saving state

        // TODO: Display error message
        console.log(failure);
      }
    );

    // itemDoc.update(item);
  }

}
