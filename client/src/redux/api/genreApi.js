import { apiSlice } from './apiSlice'
import { GENRE_URL } from '../constants'

export const genreApi = createApi({
    endpoints: (builder) => ({
        createGenre: builder.mutation({
            query: (newGenre) => ({
                url: `${apiSlice}/create-genre`,
                method: 'POST',
                body: newGenre
            })
        }),

        updateGenre: builder.mutation({
            query: ({ id, updateGenre }) => ({
                url: `${GENRE_URL}/update-genre/${id}`,
                method: 'PUT',
                body: updateGenre
            })
        }),

        deleteGenre: builder.mutation({
            query: (id) => ({
                url: `${GENRE_URL}/remove-genre/${id}`,
                method: 'DELETE'
            })
        }),

        fetchGenres: builder.query({
            query: () => `${GENRE_URL}/genres`
        })
    })
})

export const {
    useCreateGenreMutation,
    useUpdateGenreMutation,
    useDeleteGenreMutation,
    useFetchGenresQuery,
} = genreApi