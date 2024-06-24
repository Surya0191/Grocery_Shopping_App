import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  isEditMode: boolean = false;
  id: number;
  recipeForm: FormGroup;
  currentRecipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.isEditMode = params['id'] != null;
      this.initForm();
    });
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
  this.currentRecipe = new Recipe(
      this.isEditMode ? this.id : _.size(this.recipeService.getRecipes()) + 1,
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.ingredients
    );
    if (this.isEditMode) {
      this.recipeService.updateRecipe(this.id, this.currentRecipe);
    } else {
      this.recipeService.addRecipe(this.currentRecipe);
    }
    this.navigateBack(false);
  }

  addIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  navigateBack(isCancel: boolean) {
    if (isCancel || this.isEditMode) {
      this.router.navigate(['../'], { relativeTo: this.route });
    }else{
      this.router.navigate(['../',this.currentRecipe.id.toString()], { relativeTo: this.route });
    }
  }

  onCancel() {
    this.navigateBack(true);
  }

  onIngredientDelete(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    let recipeIngredients = new FormArray([]);
    if (this.isEditMode) {
      const currentRecipe = this.recipeService.getRecipeByID(this.id);
      recipeName = currentRecipe.name;
      recipeDescription = currentRecipe.description;
      recipeImagePath = currentRecipe.imagePath;
      if (currentRecipe['ingredients']) {
        for (let ingredient of currentRecipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }
}
