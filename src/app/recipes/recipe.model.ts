import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { TagJson } from './tag.model';

// export interface Recipe {
//     prepTime: string;
//     cookTime: string;
//     readyIn?: string;
//     servings: string;
//     yield?: string;
//     title: string;
//     description: string;
//     ingredients: string[];
//     directions: string[];
//    }

export interface RecipeJson {
    prepTime: string;
    cookTime: string;
    readyIn?: string;
    servings: string;
    yield?: string;
    title: string;
    description: string;
    ingredients: string[];
    directions: string[];
    tips?: string[];
    source: string;
    tags: string[];
    submittedBy: string;
    submittedDate: string;
    updatedBy?: string;
    updatedDate?: string;
}

export class Recipe {
    private _id: string;
    private _prepTime: string;
    private _cookTime: string;
    private _readyIn: string;
    private _servings: string;
    private _yield: string;
    private _title: string;
    private _description: string;
    private _ingredients: string[];
    private _directions: string[];
    private _tips: string[];
    private _source: string;
    private _tags: TagJson[] = [];
    private _submittedBy: string;
    private _submittedDate: Date;
    private _updatedBy: string;
    private _updatedDate: Date;

    get id() {
        return this._id;
    }
    set id(id: string) {
        this._id = id;
    }

    get prepTime() {
        return this._prepTime;
    }
    set prepTime(prepTime: string) {
        this._prepTime = prepTime;
    }

    get cookTime() {
        return this._cookTime;
    }
    set cookTime(cookTime: string) {
        this._cookTime = cookTime;
    }

    get readyIn() {
        return this._readyIn;
    }
    set readyIn(readyIn: string) {
        this._readyIn = readyIn;
    }

    get servings() {
        return this._servings;
    }
    set servings(servings: string) {
        this._servings = servings;
    }

    get yield() {
        return this._yield;
    }
    set yield(yieldStr: string) {
        this._yield = yieldStr;
    }

    get title() {
        return this._title;
    }
    set title(title: string) {
        this._title = title;
    }

    get description() {
        return this._description;
    }
    set description(description: string) {
        this._description = description;
    }

    get ingredients() {
        if (this._ingredients)
            return this._ingredients.join('\n');
        
        return null;
    }
    set ingredients(ingredients: string) {
        this._ingredients = ingredients.split('/[\r\n]+/');
    }

    get ingredientsArr() {
        return this._ingredients;
    }
    set ingredientsArr(ingredients: string[]) {
        this._ingredients = ingredients;
    }

    get directions() {
        if (this._directions)
            return this._directions.join('\n');
        
        return null;
    }
    set directions(directions: string) {
        this._directions = directions.split('/[\r\n]+/');
    }

    get directionsArr() {
        return this._directions;
    }
    set directionsArr(directions: string[]) {
        this._directions = directions;
    }

    get tips() {
        if (this._tips)
            return this._tips.join('\n');

        return null;
    }
    set tips(tips: string) {
        this._tips = tips.split('/[\r\n]+/');
    }

    get tipsArr() {
        return this._tips;
    }
    set tipsArr(tips: string[]) {
        this._tips = tips;
    }

    get source() {
        return this._source;
    }
    set source(source: string) {
        this._source = source;
    }

    get tags() {
        return this._tags;
    }
    set tags(tags: TagJson[]) {
        this._tags = tags;
    }

    get submittedBy() {
        return this._submittedBy;
    }
    set submittedBy(submittedBy: string) {
        this._submittedBy = submittedBy;
    }

    get submittedDate() {
        return this._submittedDate;
    }
    set submittedDate(submittedDate: Date) {
        this._submittedDate = submittedDate;
    }

    get submittedDateStr() {
        if (this._submittedDate)
            return this._submittedDate.toString();

        return null;
    }
    set submittedDateStr(submittedDate: string) {
        this._submittedDate = new Date(submittedDate);
    }

    get updatedBy() {
        return this._updatedBy;
    }
    set updatedBy(updatedBy: string) {
        this._updatedBy = updatedBy;
    }

    get updatedDate() {
        return this._updatedDate;
    }
    set updatedDate(updatedDate: Date) {
        this._updatedDate = updatedDate;
    }

    get updatedDateStr() {
        if (this._updatedDate)
            return this._updatedDate.toString();

        return null;
    }
    set updatedDateStr(updatedDate: string) {
        this._updatedDate = new Date(updatedDate);
    }



    constructor(private afs: AngularFirestore) {
        
    }

    loadById(id: string) {
        this.id = id;

        return new Promise ((resolve, reject) => {
            this.afs.firestore.doc('/recipes/' + this.id).get().then(
                success => {
                    if (success.exists) {
                        this.fromJson(success.data() as RecipeJson).then(
                            success2 => {
                                resolve(success);
                            },
                            reject
                        );
                    }
                    else {
                        resolve(success);
                    }
                },
                reject
            );
        })
    }

    public fromJson(json: RecipeJson) {
        this.prepTime = json.prepTime;
        this.cookTime = json.cookTime;
        this.servings = json.servings;
        this.title = json.title;
        this.description = json.description;
        this.ingredientsArr = json.ingredients;
        this.directionsArr = json.directions;
        this.source = json.source;
        this.submittedBy = json.submittedBy;
        this.submittedDateStr = json.submittedDate;

        if (json.readyIn)
            this.readyIn = json.readyIn;
        if (json.yield)
            this.yield = json.yield;
        if (json.updatedDate)
            this.updatedDateStr = json.updatedDate;
        if (json.tips)
            this.tipsArr = json.tips;

        return new Promise((resolve, reject) => {
            let promises = [];
            for (let i = 0; i < json.tags.length; ++i) {
                promises.push(this.afs.doc(json.tags[i]).ref.get());
            }

            Promise.all(promises).then(
                (success) => {
                    for (let i = 0; i < success.length; ++i) {
                        this.tags.push({
                            id: success[i].id,
                            name: success[i].data().name
                        });
                    }
                    resolve();
                },
                reject
            );
        // this.tags = json.tags;
        });
    }

    public toJson(): RecipeJson {
        let ret: RecipeJson = {
            prepTime: this._prepTime,
            cookTime: this._cookTime,
            servings: this._servings,
            title: this._title,
            description: this._description,
            ingredients: this._ingredients,
            directions: this._directions,
            source: this._source,
            tags: [],
            submittedBy: this._submittedBy,
            submittedDate: this.submittedDateStr
        };

        this.tags.forEach((tag) => {
            ret.tags.push('/tags/' + tag.id);
        });

        if (this._readyIn) {
            ret.readyIn = this._readyIn;
        }

        if (this._yield) {
            ret.yield = this._yield
        }

        if (this._updatedBy) {
            ret.updatedBy = this._updatedBy;
        }

        if (this._updatedDate) {
            ret.updatedDate = this.updatedDateStr;
        }

        if (this._tips) {
            ret.tips = this._tips;
        }

        return ret;
    }

    save(): Promise<any> {
        return new Promise((resolve, reject) => {
            let promises = [];

            this.tags.forEach(tag => {
                if (tag.id.length == 0) {
                    promises.push(this.afs.collection('tags').add({ name: tag.name }));
                }
            });

            if (promises.length > 0) {
                Promise.all(promises).then(
                    success => {
                        let pos = 0;
                        for (let i = 0; i < this.tags.length; ++i) {
                            if (this.tags[i].id.length == 0) {
                                this.tags[i].id = success[pos++].id;
                            }
                        }

                        if (this.id) {
                            this.afs.collection('recipes').doc(this.id).update(this.toJson()).then(
                                success => { resolve(success); }, failure => { reject(failure) }
                                );
                        } else {
                            this.afs.collection('recipes').add(this.toJson()).then(
                                success => { resolve(success); }, failure => { reject(failure) }
                                );
                        }
                    },
                    reject
                );
            } else {
                if (this.id) {
                    this.afs.collection('recipes').doc(this.id).update(this.toJson()).then(
                        success => { resolve(success); }, failure => { reject(failure) }
                        );
                } else {
                    this.afs.collection('recipes').add(this.toJson()).then(
                        success => { resolve(success); }, failure => { reject(failure) }
                        );
                }
            }
        });

        // TODO: First save tags



    }
}