
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
    submittedBy: string;
    submittedDate: string;
    updatedDate?: string;
}

export class Recipe {
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
    private _submittedBy: string;
    private _submittedDate: Date;
    private _updatedDate: Date;

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



    constructor() {}

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
            submittedBy: this._submittedBy,
            submittedDate: this.submittedDateStr
        };

        if (this._readyIn) {
            ret.readyIn = this._readyIn;
        }

        if (this._yield) {
            ret.yield = this._yield
        }

        if (this._updatedDate) {
            ret.updatedDate = this.updatedDateStr;
        }

        if (this._tips) {
            ret.tips = this._tips;
        }

        return ret;
    }
}