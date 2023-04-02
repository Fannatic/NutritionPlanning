import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Ingridient } from "../interfaces";

export const ingridientsApi = createApi({
  reducerPath: "ingridientsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
  }),

  tagTypes: ["Ingridients"],
  endpoints: (builder) => ({
    getAllIngridients: builder.query<Ingridient[],void>({
      query: () => `/Ingridients`,
      providesTags: ["Ingridients"],
    }),
    addIngridient: builder.mutation<void, Partial<Ingridient>>({
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
    updateIngridient: builder.mutation<void, Partial<Ingridient>>({
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
    deleteIngridient: builder.mutation<void, string>({
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






