import { configureStore } from "@reduxjs/toolkit";
import { ingredientApi } from "../app/IngredientsApi";
import { recipesApi } from "../app/recipesApi";
import { unitsApi } from "../app/unitsApi";
export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [ingredientApi.reducerPath]: ingredientApi.reducer,
    [recipesApi.reducerPath]: recipesApi.reducer,
    [unitsApi.reducerPath]: unitsApi.reducer,

  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ingredientApi.middleware).concat(recipesApi.middleware).concat(unitsApi.middleware)
});
