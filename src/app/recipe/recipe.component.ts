import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.less']
})
export class RecipeComponent implements OnInit, OnDestroy {
  private sub: any;

  recipe: Recipe;
  loading: boolean;
  msgs = [];

  private recipesCollection: AngularFirestoreCollection<Recipe>;

  recipes: Observable<Recipe[]>;

  id: string;

  constructor(private route: ActivatedRoute,
    private afs: AngularFirestore) { }

  ngOnInit() {
    this.loading = true;
    this.recipe = null;
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];

      this.loadRecipe();
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadRecipe() {
    this.afs.firestore.doc('/recipes/' + this.id).get().then(
      success => {
        if (success.exists) {
          this.recipe = success.data() as Recipe;
        } else {
          this.msgs.push({severity: 'error', summary: 'Does Not Exist',
            detail: 'The recipe you\'re attempting to find does not appear to exist'});
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
}
