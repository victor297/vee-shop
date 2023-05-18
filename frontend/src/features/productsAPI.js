import { createAPI, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const productsAPI = createAPI({
    reducerPath: "productsAPI",
    baseQuery:fetchBaseQuery({})
})