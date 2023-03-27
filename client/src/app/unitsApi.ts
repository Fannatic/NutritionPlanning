import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Unit {
  id: number;
  name: string;
}

export const unitsApi = createApi({
  reducerPath: "unitsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
  }),
  tagTypes: ["Units"],
  endpoints: (builder) => ({
    getAllUnits: builder.query<
    Unit[],
      {
        name: string;
        kcal: number;
        carbs: number;
        fat: number;
        protein: number;
        unitId: number;
      }
    >({
      query: () => `/Units`,
      providesTags: ["Units"],
    })
  }),
});

export const { useGetAllUnitsQuery } = unitsApi;






