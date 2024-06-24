import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {

  recipeUpdated = new Subject<Recipe[]>;

  private recipes: Recipe[] = [
    new Recipe(
      1,
      'Biryani',
      'Finger Licking Good Hyderabadi Dum Biryani',
      'https://www.licious.in/blog/wp-content/uploads/2022/06/chicken-hyderabadi-biryani-01.jpg',
      [
        new Ingredient('Chicken',1),
        new Ingredient('Oil',1),
        new Ingredient('Rice',1),
        new Ingredient('Onions',2),
        new Ingredient('Mirchi',1)
      ]
    ),
    new Recipe(
      2,
      'Noodles',
      'Round Round Noodles',
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bm9vZGxlc3xlbnwwfHwwfHx8MA%3D%3D',
      [
        new Ingredient('Noodles',1),
        new Ingredient('Oil',1),
        new Ingredient('Bell Pepper',2),
        new Ingredient('Onions',2),
        new Ingredient('Soy Sauce',1)
      ]
    ),
  ];

  constructor(private shoppingListService:ShoppingListService){}

  getRecipes():Recipe[]{
    return this.recipes.slice();
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
