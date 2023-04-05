import { useRef } from 'react';
import { TableContainer, Table as ChakraTable } from '@chakra-ui/react';
import Pagination from '../Pagination/Pagination';
import TableBody from './TableBody';
import TableHead from './TableHead';
import { Table as TanstackTable } from '@tanstack/table-core';
import { FollowersListUser } from 'app/types';

interface TableProps {
    isFetching: boolean;
    pageIndex: number;
    table: TanstackTable<FollowersListUser>;
}

export default function Table({ table, isFetching, pageIndex }: TableProps) {
    const tableContainerRef = useRef<null | HTMLTableElement>(null);

    const paginationNavigation = {
        first: () => table.setPageIndex(0),
        last: () => table.setPageIndex(table.getPageCount() - 1),
        previous: () => table.previousPage(),
        next: () => table.nextPage(),
    };

    return (
        <>
            <TableContainer
                height="100%"
                style={{ overflow: 'auto' }}
                ref={tableContainerRef}
            >
                <ChakraTable variant="striped">
                    <TableHead table={table} />
                    <TableBody table={table} isFetching={isFetching} />
                </ChakraTable>
                <Pagination
                    pageCount={table.getPageCount()}
                    paginationNavigation={paginationNavigation}
                    pageIndex={pageIndex}
                    scrollToTopContainerRef={tableContainerRef}
                    pageIndexZeroBased
                />
            </TableContainer>
        </>
    );
}
