import { useMemo, useState, useEffect } from 'react';
import { PaginationState, ColumnDef } from '@tanstack/react-table';
import { Avatar, Flex, Link } from '@chakra-ui/react';
import { useGetFollowersByUsernameQuery } from 'services/github-api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { FollowersTableUser } from 'app/types';
import { updateTotalPages } from 'features/followers/followersSlice';

const PAGE_SIZE = 30;

export default function useFollowersTable() {
    const totalPages = useAppSelector((state) => state.followers.totalPages);
    const username = useAppSelector((state) => state.userSearch.value);
    const dispatch = useAppDispatch();

    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: PAGE_SIZE,
    });

    const { data, error, isFetching } = useGetFollowersByUsernameQuery({
        username,
        page: pageIndex + 1,
    });

    useEffect(() => {
        data?.totalPages && dispatch(updateTotalPages(data.totalPages));
    }, [data?.totalPages, dispatch]);

    useEffect(() => {
        setPagination({ pageIndex: 0, pageSize: PAGE_SIZE });
    }, [username]);

    const columns = useMemo<ColumnDef<FollowersTableUser>[]>(
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

    return {
        columns,
        pagination: {
            pageIndex,
            pageSize,
            setPagination,
            totalPages,
        },
        data: data?.followers,
        error,
        isFetching,
        username,
    };
}
