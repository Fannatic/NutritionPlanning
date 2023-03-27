import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// interface Recipe {
//     name: string;
//     kcal: number;
//     carbs: number;
//     fat: number;
//     proteins: number;
//     steps: number;
//   }

//   interface IngridientInRecipeXref {
//     id: number;
//     recipeId: number;
//     ingridientId: number;
//   }

export const recipesApi = createApi({
    reducerPath: "recipesApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:8000/",
    }),
    tagTypes: ["Recipes"],
    endpoints: (builder) => ({
    getAllRecipes: builder.query<any,void>({
      query: () => `/Recipes`,
      providesTags: ["Recipes"],
    }),
    getXrefsForRecipes: builder.query<any,void>({
      query: () => `/Recipes/Ingridients`,
      providesTags: ["Recipes"],
    }),
      addRecipe: builder.mutation({
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
      updateRecipe: builder.mutation({
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
      addXref: builder.mutation({
        query: (payload) => ({
          url: `/Recipes/Ingridients`,
          method: "POST",
          body: payload,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }),
        invalidatesTags: ["Recipes"],
      }),
      deleteRecipe: builder.mutation({
        query: (id) => ({
          url: `/Recipes/${id}`,  
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }),
        invalidatesTags: ["Recipes"],
      }),
      deleteXref: builder.mutation({
        query: (id) => ({
          url: `/Recipes/Ingridients/${id}`,
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