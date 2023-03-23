import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useToast } from '@chakra-ui/react';

export const parseLinkHeader = (header: string) => {
    if (header?.length === 0) {
        throw new Error('Input must not be of zero length');
    }

    const parts = header.split(',');
    const links: any = {};

    for (let i = 0; i < parts.length; i++) {
        const section = parts[i].split(';');
        if (section.length !== 2) {
            throw new Error("section could not be split on ';'");
        }
        const url = section[0].replace(/<(.*)>/, '$1').trim();
        const name = section[1].replace(/rel="(.*)"/, '$1').trim();
        links[name] = url;
    }
    return links;
};

export const isFetchBaseQueryError = (
    error: unknown
): error is FetchBaseQueryError => {
    return typeof error === 'object' && error != null && 'status' in error;
};

