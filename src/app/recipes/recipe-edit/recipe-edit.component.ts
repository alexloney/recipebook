import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { AngularFireDatabase } from '@angular/fire/database';
import { defineBase } from '@angular/core/src/render3';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Recipe, RecipeJson } from '../recipe.model';
import { TagJson } from '../tag.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.less']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  private recipes: AngularFirestoreCollection<RecipeJson>;
  private sub: any;

  loading = false;

  id: string;
  allTags: TagJson[];
  tagResults: TagJson[];

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
  }

  ngOnInit() {
    this.getAllTags().subscribe((allTags) => {
      this.allTags = allTags as TagJson[];

      console.log(this.allTags);
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

    this.recipe = new Recipe(this.afs);
    this.loading = true;

    this.recipe.loadById(this.id).then(
      success => {
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

    this.recipe.save().then(
      (success: any) => {
        if (success && success.id) {
          this.router.navigate(['recipe', success.id]);
        } else if (this.recipe.id) {
          this.router.navigate(['recipe', this.recipe.id]);
        } else {
          this.msgs.push({severity: 'error', summary: 'Unknown ID', detail: 'Unable to determine ID to redirect to'});
        }
      },
      failure => {
        this.msgs.push({severity: 'error', summary: failure.code, detail: failure.message});
        console.error(failure);
      }
    )
  }

  getAllTags() {
    return this.afs.collection('tags')
      .snapshotChanges()
      .pipe(
        map((actions: DocumentChangeAction<TagJson>[]) => {
          return actions.map((a: DocumentChangeAction<TagJson>) => {
            const data: Object = a.payload.doc.data() as TagJson;
            const id = a.payload.doc.id;

            return { id, ...data };
          })
        })
      )
    return this.afs.collection('tags', ref => ref.orderBy('name')).valueChanges();
  }

  searchTags(event) {
    let exact = false;

    this.tagResults = [{ id: '', name: '(new) ' + event.query }];

    for (let i = 0; i < this.allTags.length; ++i) {
      if (this.allTags[i].name.toLowerCase().indexOf(event.query.toLowerCase()) != -1) {
        if (this.allTags[i].name.toLowerCase() == event.query.toLowerCase()) {
          exact = true;
        }
        this.tagResults.push(this.allTags[i]);
      }
    }

    if (exact) {
      this.tagResults.shift();
    }
  }

  selectTag(event: string) {

    // Remove the "(new)" tag if it's preasent
    for (let i = 0; i < this.recipe.tags.length; ++i)
    {
      if (this.recipe.tags[i].name.startsWith('(new) '))
      {
        this.recipe.tags[i].name = this.recipe.tags[i].name.substring(6);
      }
    }

    // And remove any duplicate items from the array
    let seen = {};
    this.recipe.tags = this.recipe.tags.filter((item) => {
      return seen.hasOwnProperty(item.name) ? false : (seen[item.name] = true);
    });

    console.log(this.recipe.tags);
  }


}
