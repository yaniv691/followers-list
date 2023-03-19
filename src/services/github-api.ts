import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

function parseLinkHeader(header: string) {
    if (header?.length === 0) {
        throw new Error('Input must not be of zero length');
    }

    const parts = header.split(',');
    const links: any = {};

    for (let i = 0; i < parts.length; i++) {
        const section = parts[i].split(';');
        if (section.length !== 2) {
            throw new Error("Section could not be split on ';'");
        }
        const url = section[0].replace(/<(.*)>/, '$1').trim();
        const name = section[1].replace(/rel="(.*)"/, '$1').trim();
        links[name] = url;
    }
    return links;
}

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
