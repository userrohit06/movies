import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { genreApiSlice } from './api/genreApi'
import { moviesApiSlice } from './api/moviesApi'
import { usersApiSlice } from './api/usersApi'
import authReducer from './features/auth/authSlice'
import moviesReducer from './features/movies/moviesSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        movies: moviesReducer,
        [genreApiSlice.reducerPath]: genreApiSlice.reducer,
        [moviesApiSlice.reducerPath]: moviesApiSlice.reducer,
        [usersApiSlice.reducerPath]: usersApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(
                genreApiSlice.middleware,
                moviesApiSlice.middleware,
                usersApiSlice.middleware
            )
})

setupListeners(store.dispatch)
export default store