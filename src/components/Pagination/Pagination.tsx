import { MutableRefObject } from 'react';
import { ButtonGroup, Button, Flex, Box, Show } from '@chakra-ui/react';
import usePaginationNavigateTo, {
    PaginationNavigation,
} from './usePaginationNavigateTo';

interface PaginationProps {
    pageIndex: number;
    pageCount: number;
    paginationNavigation: PaginationNavigation;
    scrollToTopContainerRef?: MutableRefObject<HTMLElement | null>;
    pageIndexZeroBased?: boolean;
}

export default function Pagination({
    pageIndex,
    scrollToTopContainerRef,
    paginationNavigation,
    pageCount,
    pageIndexZeroBased = false,
}: PaginationProps) {
    const navigateTo = usePaginationNavigateTo(
        paginationNavigation,
        scrollToTopContainerRef
    );

    if (pageCount < 2) {
        return null;
    }

    return (
        <Flex
            position="sticky"
            bottom="0"
            pt={4}
            justifyContent={['center', 'flex-end']}
            alignItems="center"
            bg="white"
            pr={5}
        >
            <Show breakpoint="(min-width: 800px)">
                <Box as="span" mr={4}>
                    <Box as="span">Page </Box>
                    <strong>
                        {pageIndexZeroBased ? pageIndex + 1 : pageIndex} of{' '}
                        {pageCount}
                    </strong>
                </Box>
            </Show>
            <ButtonGroup
                isAttached
                justifyContent="flex-end"
                display="flex"
                variant="outline"
                colorScheme="blue"
            >
                <Button onClick={() => navigateTo('first')}>First</Button>
                <Button
                    disabled={pageIndex !== 0}
                    onClick={() => navigateTo('previous')}
                >
                    Prev
                </Button>
                {pageIndex < pageCount && (
                    <Button onClick={() => navigateTo('next')}>Next</Button>
                )}
                <Button onClick={() => navigateTo('last')}>Last</Button>
            </ButtonGroup>
        </Flex>
    );
}
