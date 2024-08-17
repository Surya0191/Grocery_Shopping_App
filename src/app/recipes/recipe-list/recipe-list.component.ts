import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy{

  recipes:Recipe[] = [];
  subscription:Subscription;

  constructor(private recipeService:RecipeService, private dataStorageService:DataStorageService) { 
  }

  ngOnInit(): void {
    this.subscription = this.recipeService.recipeUpdated.subscribe((recipes:Recipe[])=>{
      this.recipes = recipes;
    });
    //this.recipes = this.recipeService.getRecipes();
  }

  fetchRecipes(){
    this.dataStorageService.fetchData().subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
