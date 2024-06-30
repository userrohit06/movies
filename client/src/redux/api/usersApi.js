import { apiSlice } from './apiSlice'
import { USERS_URL } from '../constants'

export const usersApi = apiSlice.injectEndpoints({
    // useSignInMutation,
    // useSignUpMutation,
    // useSignoutMutation,
    // useProfileMutation,
    // useGetUsersQuery
    endpoints: (builder) => ({
        signIn: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/signin`,
                method: "POST",
                body: data
            })
        }),

        signUp: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/signup`,
                method: "POST",
                body: data
            })
        }),

        signout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/signout`,
                method: "POST"
            })
        }),

        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile/update-user`,
                method: 'PUT',
                body: data
            })
        }),

        getUsers: builder.query({
            query: () => ({
                url: `${USERS_URL}/all-users`
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
} = usersApi