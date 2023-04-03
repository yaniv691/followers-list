import { useMemo, useState, useEffect } from 'react';
import {
    PaginationState,
    useReactTable,
    getCoreRowModel,
    ColumnDef,
    SortingState,
    getSortedRowModel,
} from '@tanstack/react-table';
import { Avatar, Flex, Link } from '@chakra-ui/react';

import { useGetFollowersByUsernameQuery } from 'services/github-api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { FollowersListUser } from 'app/types';
import { updateTotalPages } from 'features/followers/followersSlice';
import NoFollowers from './NoFollowers';

const PAGE_SIZE = 30;

export default function useFollowersList() {
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: PAGE_SIZE,
    });
    const [sorting, setSorting] = useState<SortingState>([]);

    const totalPages = useAppSelector((state) => state.followers.totalPages);
    const username = useAppSelector((state) => state.userSearch.value);
    const dispatch = useAppDispatch();

    const { data, error, isLoading } = useGetFollowersByUsernameQuery({
        username,
        page: pageIndex + 1,
    });

    useEffect(() => {
        data?.totalPages && dispatch(updateTotalPages(data.totalPages));
    }, [data?.totalPages]);

    useEffect(() => {
        setPagination({ pageIndex: 0, pageSize: PAGE_SIZE });
    }, [username]);

    const columns = useMemo<ColumnDef<FollowersListUser>[]>(
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

    return {
        table,
        pageIndex,
        error,
        isLoading,
        noFollowers:
            data?.followers.length === 0
                ? () => <NoFollowers username={username} />
                : null,
    };
}
