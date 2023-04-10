import { useRef } from 'react';
import { TableContainer, Table as ChakraTable } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import Pagination from 'components/Pagination/Pagination';
import TableBody from './TableBody';
import TableHead from './TableHead';
import { useTable } from './useTable';
import { PaginationConfig } from 'components/Pagination/Pagination';

interface TableProps {
    isFetching?: boolean | undefined;
    columns: ColumnDef<any>[];
    data: unknown[];
    pagination?: PaginationConfig;
    emptyState?: JSX.Element;
}

export default function Table({
    columns,
    data,
    isFetching,
    pagination,
    emptyState,
}: TableProps) {
    const table = useTable(columns, data, pagination);

    const tableContainerRef = useRef<null | HTMLTableElement>(null);
    const paginationNavigation = {
        first: () => table.setPageIndex(0),
        last: () => table.setPageIndex(table.getPageCount() - 1),
        previous: () => table.previousPage(),
        next: () => table.nextPage(),
    };

    if (emptyState && !isFetching && data?.length === 0) {
        return emptyState;
    }

    return (
        <>
            <TableContainer
                height="100%"
                style={{ overflow: 'auto' }}
                ref={tableContainerRef}
            >
                <ChakraTable variant="striped">
                    <TableHead table={table} />
                    <TableBody
                        table={table}
                        isFetching={isFetching}
                        pageSize={pagination?.pageSize ?? 30}
                    />
                </ChakraTable>
                {pagination && (
                    <Pagination
                        totalPages={table.getPageCount()}
                        paginationNavigation={paginationNavigation}
                        pageIndex={pagination.pageIndex}
                        scrollToTopContainerRef={tableContainerRef}
                        pageIndexZeroBased
                    />
                )}
            </TableContainer>
        </>
    );
}
