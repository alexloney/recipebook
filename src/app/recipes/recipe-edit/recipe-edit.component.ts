import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { AngularFireDatabase } from '@angular/fire/database';
import { defineBase } from '@angular/core/src/render3';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Recipe, RecipeJson } from '../recipe.model';

export interface TagJson {
  name: string;
}

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.less']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  private recipes: AngularFirestoreCollection<RecipeJson>;
  private sub: any;

  loading = false;

  id: number;
  allTags: TagJson[];
  tagResults: string[];

  recipe: Recipe;

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
  tagsError = '';

  // private itemDoc: AngularFirestoreDocument<Recipe>;
  // items: Observable<any[]>;

  constructor(private route: ActivatedRoute,
    private afs: AngularFirestore,
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

  ngOnInit() {
    this.getAllTags().subscribe((allTags) => {
      this.allTags = allTags as TagJson[];
    });

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];

      this.loadRecipe();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadRecipe() {
    // TODO: Show loading screen

    this.recipe = new Recipe();
    this.loading = true;
    this.afs.firestore.doc('/recipes/' + this.id).get().then(
      success => {
        if (success.exists) {
          this.recipe.fromJson(success.data() as RecipeJson);
        }
        this.loading = false;
      },
      failure => {
        this.msgs.push({severity: 'error', summary: failure.code, detail: failure.message});

        console.error(failure);
        this.loading = false;
      }
    );

  }

  validateFields() {
    let valid = true;

    if (!this.recipe.prepTime || this.recipe.prepTime.length == 0) {
      this.prepTimeError = 'Required';
      valid = false;
    }

    if (!this.recipe.cookTime || this.recipe.cookTime.length == 0) {
      this.cookTimeError = 'Required';
      valid = false;
    }

    if (!this.recipe.servings || this.recipe.servings.length == 0) {
      this.servingsError = 'Required';
      valid = false;
    }

    if (!this.recipe.title || this.recipe.title.length == 0) {
      this.titleError = 'Required';
      valid = false;
    }

    if (!this.recipe.description || this.recipe.description.length == 0) {
      this.descriptionError = 'Required';
      valid = false;
    }

    if (!this.recipe.ingredients || this.recipe.ingredients.length == 0) {
      this.ingredientsError = 'Required';
      valid = false;
    }

    if (!this.recipe.directions || this.recipe.directions.length == 0) {
      this.directionsError = 'Required';
      valid = false;
    }

    if (!this.recipe.source || this.recipe.source.length == 0) {
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

    if (this.recipe.id) {
      this.recipe.updatedBy = 'test'; // TODO: Update with user ID
      this.recipe.updatedDate = new Date();
    } else {
      this.recipe.submittedBy = 'test'; // TODO: Update with user ID
      this.recipe.submittedDate = new Date();  
    }

    this.recipe.save(this.afs).then(
      (success: any) => {
        this.router.navigate(['recipe', success.id]);
      },
      failure => {
        this.msgs.push({severity: 'error', summary: failure.code, detail: failure.message});
        console.error(failure);
      }
    )

    // Build the recipe document to insert
    /*
    if (this.readyIn && this.readyIn.length > 0)
      recipe.readyIn = this.readyIn;
    if (this.yield && this.yield.length > 0)
      recipe.yield = this.yield;
    if (this.tips && this.tips.length > 0)
      recipe.tips = this.tips;
*/



    // itemDoc.update(item);
  }

  getAllTags() {
    return this.afs.collection('tags', ref => ref.orderBy('name')).valueChanges();
  }

  searchTags(event) {

    this.tagResults = ['(new) ' + event.query];

    console.log(this.recipe.tags);

    for (let i = 0; i < this.allTags.length; ++i) {
      if (this.allTags[i].name.toLowerCase().indexOf(event.query.toLowerCase()) != -1) {
        this.tagResults.push(this.allTags[i].name)
      }
    }
  }

  selectTag(event: string) {

    // Remove the "(new)" tag if it's preasent
    for (let i = 0; i < this.recipe.tags.length; ++i)
    {
      if (this.recipe.tags[i].startsWith('(new) '))
      {
        this.recipe.tags[i] = this.recipe.tags[i].substring(6);
      }
    }

    // And remove any duplicate items from the array
    let seen = {};
    this.recipe.tags = this.recipe.tags.filter((item) => {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
  }

}
