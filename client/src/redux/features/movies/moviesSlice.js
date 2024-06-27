import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        moviesFilter: {
            searchTerm: "",
            selectedGenre: "",
            selectedYear: "",
            selectedSort: []
        },
        filteredMovies: [],
        movieYears: [],
        uniqueYear: []
    },
    reducers: {
        setMoviesFilter: (state, action) => {
            state.moviesFilter = { ...moviesFilter, ...action.payload }
        },
        setFilteredMovies: (state, action) => {
            state.filteredMovies = action.payload
        },
        setMovieYears: (state, action) => {
            state.movieYears = action.payload
        },
        setUniqueYear: (state, action) => {
            state.uniqueYear = action.payload
        }
    }
})

export const {
    setMoviesFilter,
    setFilteredMovies,
    setMovieYears,
    setUniqueYear
} = moviesSlice.actions
export default moviesSlice.reducer