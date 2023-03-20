import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { parseLinkHeader } from 'app/utils';

export const githubApi = createApi({
    reducerPath: 'githubApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/' }),
    endpoints: (builder) => ({
        getUserByUsername: builder.query<any, string | undefined>({
            query: (username: string) => `users/${username}`,
        }),

        getFollowersByUsername: builder.query<
            any,
            { username: string | undefined; page: number }
        >({
            query: ({ username, page }) =>
                `users/${username}/followers?page=${page ?? 1}`,

            transformResponse(followers, meta, arg) {
                const linkHeader = meta?.response?.headers?.get('Link');
                const totalPages = !linkHeader
                    ? 1
                    : arg.page === 1
                    ? parseLinkHeader(linkHeader).last?.split('page=')[1]
                    : undefined;

                return {
                    followers,
                    totalPages,
                };
            },
        }),
    }),
});

export const { useGetUserByUsernameQuery, useGetFollowersByUsernameQuery } =
    githubApi;
