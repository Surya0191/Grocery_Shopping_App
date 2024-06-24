import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{

  recipe:Recipe;

  constructor(private recipeService:RecipeService, private route:ActivatedRoute, private router:Router){}

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.recipe = this.recipeService.getRecipeByID(+params['id']);
    });
  }

  addIngredientToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  } 

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.recipe.id);
    this.router.navigate(['/recipes']);
  }

}
