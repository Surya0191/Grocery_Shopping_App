import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {

  recipeUpdated = new Subject<Recipe[]>;

  private recipes: Recipe[] = [];

  constructor(private shoppingListService:ShoppingListService){}

  getRecipes():Recipe[]{
    return this.recipes.slice();
  }

  setRecipes(recipes:Recipe[]){
    this.recipes = recipes;
    this.recipeUpdated.next(this.recipes.slice());
  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipeUpdated.next(this.recipes);
  }

  updateRecipe(id:number,recipe:Recipe){
    this.recipes[this.getRecipeIndexByID(id)] = recipe;
    this.recipeUpdated.next(this.recipes);
  }

  getRecipeByID(id: number): Recipe | undefined {
    return this.recipes.find(recipe => recipe.id === id);
  }

  getRecipeIndexByID(id: number): number {
    return this.recipes.findIndex(recipe => recipe.id === id);
  }

  addIngredientsToShoppingList(ingredients:Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }

  deleteRecipe(id:number){
    this.recipes.splice(this.getRecipeIndexByID(id),1)
    this.recipeUpdated.next(this.recipes);
  }

}
