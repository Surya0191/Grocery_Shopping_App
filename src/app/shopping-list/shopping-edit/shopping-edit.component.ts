import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {

  @ViewChild('nameInput', {static: true}) nameInput:ElementRef;
  @ViewChild('amountInput', {static: true}) amountInput:ElementRef;

  constructor(private shoppingListService:ShoppingListService){}

  onIngredientAdd(){
    const ingredientName = this.nameInput.nativeElement.value;
    const ingredientAmount = this.amountInput.nativeElement.value;
    const newIngredient = new Ingredient(ingredientName, ingredientAmount);
    this.shoppingListService.addIngredient(newIngredient); 
  }

}
