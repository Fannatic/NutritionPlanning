import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Ingredient } from "../interfaces";

export const ingredientApi = createApi({
  reducerPath: "ingredientApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
  }),

  tagTypes: ["Ingredients"],
  endpoints: (builder) => ({
    getAllIngredients: builder.query<Ingredient[],void>({
      query: () => `/Ingredients`,
      providesTags: ["Ingredients"],
    }),
    addIngredient: builder.mutation<void, Partial<Ingredient>>({
      query: (payload) => ({
        url: `/Ingredients`,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Ingredients"],
    }),
    updateIngredient: builder.mutation<void, Partial<Ingredient>>({
      query: (payload ) => ({
        url: `/Ingredients/${payload.id}`,
        method: "PUT",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            ingredientApi.util.updateQueryData('getAllIngredients', id, (draft) => {
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
      invalidatesTags: ["Ingredients"],
    }),
    deleteIngredient: builder.mutation<void, string>({
      query: (id) => ({
        url: `/Ingridients/${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Ingredients"],
    })
  }),
});

export const { useAddIngredientMutation, useDeleteIngredientMutation, useGetAllIngredientsQuery, useUpdateIngredientMutation } = ingredientApi;






