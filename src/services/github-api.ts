import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

function parseLinkHeader(header: any) {
    if (header?.length === 0) {
        throw new Error('input must not be of zero length');
    }

    // Split parts by comma
    var parts = header.split(',');
    var links: any = {};
    // Parse each part into a named link
    for (var i = 0; i < parts.length; i++) {
        var section = parts[i].split(';');
        if (section.length !== 2) {
            throw new Error("section could not be split on ';'");
        }
        var url = section[0].replace(/<(.*)>/, '$1').trim();
        var name = section[1].replace(/rel="(.*)"/, '$1').trim();
        links[name] = url;
    }
    return links;
}

export const githubApi = createApi({
    reducerPath: 'githubApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/' }),
    endpoints: (builder) => ({
        getUserByUsername: builder.query<any, any>({
            query: (username: string) => `users/${username}`,
        }),
        getFollowersByUsername: builder.query<any, any>({
            query: ({ username, page }) =>
                `users/${username}/followers?page=${page ?? 1}`,
            transformResponse(followers, meta) {
                const linkHeader = meta?.response?.headers?.get('Link');
                const totalPages = linkHeader
                    ? parseLinkHeader(linkHeader).last?.split('page=')[1]
                    : 1;
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
