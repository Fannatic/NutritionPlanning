import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import RecipeNutritionInfo, {calculateTotalValue} from './components/RecipeNutritionInfo';

describe('App component', () => {
  test('it renders', async () => {
    render(<App />);
    expect(screen.getByText('Welcome in app')).toBeInTheDocument();
  });
 })

 describe('RecipeNutritionInfo component', () => {
  const editedRecipe = {
    "id": 20,
    "name": "Test",
    "proteins": 22,
    "fats": 22,
    "carbs": 22,
    "kcal": 22,
    "steps": ""
  }
  const ingredients = [{
    "id": 37,
    "name": "Test ingredient 1",
    "kcal": 1,
    "carbs": 1,
    "fat": 1,
    "protein": 1,
    "unitId": 1
  },{
    "id": 38,
    "name": "Test ingredient 2",
    "kcal": 10,
    "carbs": 10,
    "fat": 10,
    "protein": 10,
    "unitId": 10
  }
]
  const xrefs = [{
    "id": 1,
    "recipeId": 20,
    "ingredientId": 38
  },{
    "id": 2,
    "recipeId": 20,
    "ingredientId": 37
  }
]

  test('it renders', async () => {
    render(<RecipeNutritionInfo editedRecipe={editedRecipe} xrefs={xrefs} ingredients={ingredients}/>);
  });

  test('it counts nutrition details properly', async () => {
    expect(calculateTotalValue('kcal', xrefs, editedRecipe, ingredients)).toBe(11);
  });

 })

