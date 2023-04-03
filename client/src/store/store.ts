import { configureStore } from "@reduxjs/toolkit";
import { ingridientsApi } from "../app/IngredientsApi";
import { recipesApi } from "../app/recipesApi";
import { unitsApi } from "../app/unitsApi";
export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [ingridientsApi.reducerPath]: ingridientsApi.reducer,
    [recipesApi.reducerPath]: recipesApi.reducer,
    [unitsApi.reducerPath]: unitsApi.reducer,

  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ingridientsApi.middleware).concat(recipesApi.middleware).concat(unitsApi.middleware)
});
