import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Recipe, IngredientInRecipeXref } from "../interfaces";

export const recipesApi = createApi({
    reducerPath: "recipesApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:8000/",
    }),
    tagTypes: ["Recipes"],
    endpoints: (builder) => ({
    getAllRecipes: builder.query<Recipe[],void>({
      query: () => `/Recipes`,
      providesTags: ["Recipes"],
    }),
    getXrefsForRecipes: builder.query<IngredientInRecipeXref[],void>({
      query: () => `/Recipes/Ingredients`,
      providesTags: ["Recipes"],
    }),
      addRecipe: builder.mutation<void, Partial<Recipe>>({
        query: (payload) => ({
          url: `/Recipes`,
          method: "POST",
          body: payload,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }),
        invalidatesTags: ["Recipes"],
      }),
      updateRecipe: builder.mutation<void, Partial<Recipe>>({
        query: (payload ) => ({
          url: `/Recipes`,
          method: "PUT",
          body: payload,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
            const patchResult = dispatch(
              recipesApi.util.updateQueryData('getAllRecipes', id, (draft) => {
                Object.assign(draft, patch)
              })
            )
            try {
              await queryFulfilled
            } catch {
              patchResult.undo()
            }
          },
        }),
        invalidatesTags: ["Recipes"],
      }),
      addXref: builder.mutation<void, Partial<IngredientInRecipeXref>>({
        query: (payload) => ({
          url: `/Recipes/Ingredients`,
          method: "POST",
          body: payload,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }),
        invalidatesTags: ["Recipes"],
      }),
      deleteRecipe: builder.mutation<void, string>({
        query: (id) => ({
          url: `/Recipes/${id}`,  
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }),
        invalidatesTags: ["Recipes"],
      }),
      deleteXref: builder.mutation<void, string>({
        query: (id) => ({
          url: `/Recipes/Ingredients/${id}`,
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }),
        invalidatesTags: ["Recipes"],
      })
    })
  });
  
  export const { useAddRecipeMutation, useGetAllRecipesQuery, useAddXrefMutation, useGetXrefsForRecipesQuery, useDeleteXrefMutation, useDeleteRecipeMutation, useUpdateRecipeMutation } = recipesApi;