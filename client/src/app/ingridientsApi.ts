import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Ingridient {
  id: number;
  name: string;
  kcal: number;
  carbs: number;
  fat: number;
  protein: number;
  unitId: number;
}

export const ingridientsApi = createApi({
  reducerPath: "ingridientsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
  }),

  tagTypes: ["Ingridients"],
  endpoints: (builder) => ({
    getAllIngridients: builder.query<any,void>({
      query: () => `/Ingridients`,
      providesTags: ["Ingridients"],
    }),
    addIngridient: builder.mutation({
      query: (payload) => ({
        url: `/Ingridients`,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Ingridients"],
    }),
    updateIngridient: builder.mutation({
      query: (payload ) => ({
        url: `/Ingridients/${payload.id}`,
        method: "PUT",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            ingridientsApi.util.updateQueryData('getAllIngridients', id, (draft) => {
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
      invalidatesTags: ["Ingridients"],
    }),
    deleteIngridient: builder.mutation({
      query: (id) => ({
        url: `/Ingridients/${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Ingridients"],
    })
  }),
});

export const { useAddIngridientMutation, useGetAllIngridientsQuery, useDeleteIngridientMutation, useUpdateIngridientMutation } = ingridientsApi;






