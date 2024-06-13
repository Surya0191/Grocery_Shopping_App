import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{

  ingredients:Ingredient[];
  private igChangedSub:Subscription;

  constructor(private shoppingListService:ShoppingListService){}
  
  ngOnInit(): void {
    this.ingredients = this.getLatestIngredients();
    this.igChangedSub = this.shoppingListService.ingredientsChanged.subscribe((latestIngredients:Ingredient[])=>{
      this.ingredients = latestIngredients;
    });
  }

  getLatestIngredients():Ingredient[]{
    return this.shoppingListService.getIngredients();
  }

  ngOnDestroy(): void {
    this.igChangedSub.unsubscribe();
  }


}
