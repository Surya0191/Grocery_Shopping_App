import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Ingredient } from './ingredient.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService implements OnDestroy{
  userSubscription: any;
  userId: string;
  private defaultRecipes: Recipe[] = [
    new Recipe(
      1,
      'Biryani',
      'Finger Licking Good Hyderabadi Dum Biryani',
      'https://www.licious.in/blog/wp-content/uploads/2022/06/chicken-hyderabadi-biryani-01.jpg',
      [
        new Ingredient('Chicken', 1),
        new Ingredient('Oil', 1),
        new Ingredient('Rice', 1),
        new Ingredient('Onions', 2),
        new Ingredient('Mirchi', 1),
      ]
    ),
    new Recipe(
      2,
      'Pasta Carbonara',
      'Classic Italian Pasta Carbonara',
      'https://static01.nyt.com/images/2021/02/14/dining/carbonara-horizontal/carbonara-horizontal-articleLarge-v2.jpg',
      [
        new Ingredient('Pasta', 1),
        new Ingredient('Bacon', 1),
        new Ingredient('Eggs', 2),
        new Ingredient('Parmesan', 1),
        new Ingredient('Black Pepper', 1),
      ]
    ),
    new Recipe(
      3,
      'Tacos',
      'Mexican Street Tacos with Fresh Salsa',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/800px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg',
      [
        new Ingredient('Tortillas', 1),
        new Ingredient('Beef', 1),
        new Ingredient('Tomatoes', 2),
        new Ingredient('Onions', 1),
        new Ingredient('Cilantro', 1),
      ]
    ),
    new Recipe(
      4,
      'Sushi',
      'Traditional Japanese Sushi Rolls',
      'https://cdn.britannica.com/52/128652-050-14AD19CA/Maki-zushi.jpg',
      [
        new Ingredient('Sushi Rice', 1),
        new Ingredient('Nori', 1),
        new Ingredient('Salmon', 1),
        new Ingredient('Avocado', 1),
        new Ingredient('Cucumber', 1),
      ]
    ),
    new Recipe(
      5,
      'Margherita Pizza',
      'Classic Italian Margherita Pizza',
      'https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg',
      [
        new Ingredient('Pizza Dough', 1),
        new Ingredient('Tomato Sauce', 1),
        new Ingredient('Mozzarella', 1),
        new Ingredient('Basil', 1),
        new Ingredient('Olive Oil', 1),
      ]
    ),
    new Recipe(
      6,
      'Chocolate Cake',
      'Rich and Moist Chocolate Cake',
      'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FRecipes%2F2024-01-chocolate-cake%2Fchocolate-cake-0632-edit-32',
      [
        new Ingredient('Flour', 1),
        new Ingredient('Cocoa Powder', 1),
        new Ingredient('Sugar', 2),
        new Ingredient('Eggs', 2),
        new Ingredient('Butter', 1),
      ]
    ),
  ];
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeData() {
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.userId = user?.id;
    });
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://grocery-shopping-app-10b86-default-rtdb.firebaseio.com/' +
          this.userId +
          '/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchData() {
    return this.http
      .get<Recipe[]>(
        'https://grocery-shopping-app-10b86-default-rtdb.firebaseio.com/' +
          this.userId +
          '/recipes.json'
      )
      .pipe(
        map((recipes) => {
          if (recipes) {
            return recipes.map((recipe) => {
              return {
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : [],
              };
            });
          }
          return this.defaultRecipes.slice();
        }),
        tap((recipes) => { 
          this.recipeService.setRecipes(recipes);
        })
      );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
