import { useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    ColumnDef,
    SortingState,
    getSortedRowModel,
} from '@tanstack/react-table';
import { PaginationConfig } from 'components/Pagination/Pagination';

export function useTable(
    columns: ColumnDef<any>[],
    data: any[],
    pagination?: PaginationConfig
) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const table = useReactTable({
        data: data || [],
        columns: columns,
        pageCount: pagination?.totalPages,
        state: {
            sorting,
            pagination: pagination
                ? {
                      pageIndex: pagination?.pageIndex,
                      pageSize: pagination?.pageSize,
                  }
                : undefined,
        },
        onSortingChange: setSorting,
        onPaginationChange: pagination?.setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: pagination ? true : false,
        debugTable: false,
    });

    return table;
}
