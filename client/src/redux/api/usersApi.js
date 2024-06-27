import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query"
import { USERS_URL } from '../constants'

export const usersApiSlice = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: USERS_URL }),

    endpoints: (builder) => ({
        signIn: builder.mutation({
            query: (data) => ({
                url: `/signin`,
                method: 'POST',
                body: data
            })
        }),

        signUp: builder.mutation({
            query: (data) => ({
                url: `/signup`,
                method: 'POST',
                body: data
            })
        }),

        signout: builder.mutation({
            query: () => ({
                url: `/signout`,
                method: 'POST'
            })
        }),

        profile: builder.mutation({
            query: (data) => ({
                url: `/profile/update-user`,
                method: 'PUT',
                body: data
            })
        }),

        getUsers: builder.query({
            query: () => ({
                url: `/all-users`
            })
        })
    })
})

export const {
    useSignInMutation,
    useSignUpMutation,
    useSignoutMutation,
    useProfileMutation,
    useGetUsersQuery
} = usersApiSlice