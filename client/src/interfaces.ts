export interface Ingredient {
    id: number;
    name: string;
    kcal: number;
    carbs: number;
    fat: number;
    protein: number;
    unitId: number;
}

export interface Recipe {
    id: number;
    name: string;
    kcal: number;
    carbs: number;
    fat: number;
    proteins: number;
    steps: string;
}

export interface IngredientInRecipeXref {
    id: number;
    recipeId: number;
    ingredientId: number;
}
