import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {

  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes:Recipe[] = [
    new Recipe('Biryani','Finger Licking Good Hyderabadi Dum Biryani','https://www.licious.in/blog/wp-content/uploads/2022/06/chicken-hyderabadi-biryani-01.jpg'),
    new Recipe('Noodles','Round Round Noodles','https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bm9vZGxlc3xlbnwwfHwwfHx8MA%3D%3D')
  ]

  constructor() { }

  onRecipeSelected(recipeEl:Recipe){
    this.recipeWasSelected.emit(recipeEl)
  }

}
