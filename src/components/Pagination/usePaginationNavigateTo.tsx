import { MutableRefObject } from 'react';

export interface PaginationNavigation {
    first: () => void;
    last: () => void;
    previous: () => void;
    next: () => void;
}

export default function usePaginationNavigateTo(
    navigation: PaginationNavigation,
    scrollToTopRef?: MutableRefObject<HTMLElement | null>
) {
    return (location: keyof PaginationNavigation) => {
        navigation[location]();
        if (scrollToTopRef) {
            scrollToTopRef!.current!.scrollTop = 0;
        }
    };
}
