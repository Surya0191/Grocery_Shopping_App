import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  isEditMode:boolean = false;
  id:number;
  recipeForm:FormGroup;

  constructor(private route:ActivatedRoute, private recipeService:RecipeService){}

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id = +params['id']
      this.isEditMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm(){
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    if(this.isEditMode){
      const currentRecipe = this.recipeService.getRecipeByID(this.id);
      recipeName = currentRecipe.name;
      recipeDescription = currentRecipe.description;
      recipeImagePath = currentRecipe.imagePath;
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription)
    })
  }

}
