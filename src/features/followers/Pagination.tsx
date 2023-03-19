import { MutableRefObject } from 'react';
import { ButtonGroup, Button, Flex, Box, Show } from '@chakra-ui/react';
import { Table } from '@tanstack/table-core';
import { User } from 'features/followers/Followers';

interface IProps {
    table: Table<User>;
    pageIndex: number;
    tableContainerRef: MutableRefObject<HTMLTableElement | null>;
}

export default function Pagination({
    table,
    pageIndex,
    tableContainerRef,
}: IProps) {
    // if (table.getPageCount() < 2) {
    //     return null;
    // }
    return (
        <Flex
            position="sticky"
            bottom="0"
            pt={4}
            justifyContent={['center', 'flex-end']}
            alignItems="center"
            bg="white"
        >
            <Show breakpoint="(min-width: 800px)">
                <Box as="span" mr={4}>
                    <Box as="span">Page </Box>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </strong>
                </Box>
            </Show>
            <ButtonGroup isAttached justifyContent="flex-end" display="flex">
                <Button onClick={() => table.setPageIndex(0)}>First</Button>
                {pageIndex !== 0 && (
                    <Button onClick={() => table.previousPage()}>Prev</Button>
                )}
                {pageIndex < table.getPageCount() && (
                    <Button onClick={() => table.nextPage()}>Next</Button>
                )}
                <Button
                    onClick={() => {
                        table.setPageIndex(table.getPageCount() - 1);
                        tableContainerRef!.current!.scrollTop = 0;
                    }}
                >
                    Last
                </Button>
            </ButtonGroup>
        </Flex>
    );
}
