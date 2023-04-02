export interface Ingridient {
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

export interface IngridientInRecipeXref {
    id: number;
    recipeId: number;
    ingridientId: number;
}
