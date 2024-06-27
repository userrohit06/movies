import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { GENRE_URL } from '../constants'

export const genreApiSlice = createApi({
    reducerPath: 'genreApiSlice',
    baseQuery: fetchBaseQuery({ baseUrl: GENRE_URL }),

    endpoints: (builder) => ({
        createGenre: builder.mutation({
            query: (newGenre) => ({
                url: '/create-genre',
                method: 'POST',
                body: newGenre
            })
        }),

        updateGenre: builder.mutation({
            query: ({ id, updateGenre }) => ({
                url: `/update-genre/${id}`,
                method: 'PUT',
                body: updateGenre
            })
        }),

        deleteGenre: builder.mutation({
            query: (id) => ({
                url: `/remove-genre/${id}`,
                method: 'DELETE'
            })
        }),

        fetchGenres: builder.query({
            query: () => `/genres`
        })
    })
})

export const {
    useCreateGenreMutation,
    useUpdateGenreMutation,
    useDeleteGenreMutation,
    useFetchGenresQuery,
} = genreApiSlice