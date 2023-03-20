import { useMemo, useState, useRef, useEffect } from 'react';
import {
    PaginationState,
    useReactTable,
    getCoreRowModel,
    ColumnDef,
    SortingState,
    getSortedRowModel,
} from '@tanstack/react-table';

import {
    Table,
    TableContainer,
    Avatar,
    Flex,
    Link,
    useToast,
} from '@chakra-ui/react';
import Pagination from './Table/Pagination';
import { useGetFollowersByUsernameQuery } from 'services/github-api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { updateTotalPages } from 'features/followers/followersSlice';
import TableHead from './Table/TableHead';
import TableBody from './Table/TableBody';
import NoFollowers from './NoFollowers';

const PAGE_SIZE = 30;

export type User = {
    login: string;
    id: number;
    avatar_url?: string;
    html_url?: string;
};

export default function FollowersList() {
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: PAGE_SIZE,
    });

    const [sorting, setSorting] = useState<SortingState>([]);

    const toast = useToast();

    const columns = useMemo<ColumnDef<User>[]>(
        () => [
            {
                header: 'Username',
                accessorKey: 'login',
                cell: ({ cell }) => {
                    const { avatar_url, login, html_url } = cell.row.original;
                    return (
                        <Link href={html_url} isExternal>
                            <Flex alignItems="center">
                                <Avatar
                                    size={['sm', 'md']}
                                    src={avatar_url}
                                    name={login}
                                    mr={3}
                                />
                                {login}
                            </Flex>
                        </Link>
                    );
                },
            },
            {
                header: 'ID',
                accessorKey: 'id',
            },
        ],
        []
    );
    const username = useAppSelector((state) => state.userSearch.value);
    const totalPages = useAppSelector((state) => state.followers.totalPages);
    const { data, error, isFetching } = useGetFollowersByUsernameQuery({
        username,
        page: pageIndex + 1,
    });

    const dispatch = useAppDispatch();

    useEffect(() => {
        data?.totalPages && dispatch(updateTotalPages(data.totalPages));
    }, [data?.totalPages]);

    useEffect(() => {
        setPagination({ pageIndex: 0, pageSize: PAGE_SIZE });
    }, [username]);

    const tableContainerRef = useRef<null | HTMLTableElement>(null);

    const table = useReactTable({
        data: data?.followers ?? [],
        columns,
        pageCount: totalPages,
        state: {
            sorting,
            pagination: {
                pageIndex,
                pageSize,
            },
        },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
        debugTable: false,
    });

    const toastId = 'followers-error';
    if (error && !toast.isActive(toastId)) {
        toast({
            id: toastId,
            title: 'Oops!',
            description: 'Error fetching followers list, please try again later.',
            status: 'error',
            position: 'top',
        });
    }

    if (data?.followers.length === 0) {
        return <NoFollowers username={username} />;
    }

    if (error) return null;

    return (
        <TableContainer
            height="100%"
            style={{ overflow: 'auto' }}
            ref={tableContainerRef}
        >
            <Table variant="striped">
                <TableHead table={table} />
                <TableBody table={table} isFetching={isFetching} />
            </Table>
            <Pagination
                table={table}
                pageIndex={pageIndex}
                tableContainerRef={tableContainerRef}
            />
        </TableContainer>
    );
}
