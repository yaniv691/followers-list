import { useMemo, useState, useRef } from 'react';
import {
    PaginationState,
    useReactTable,
    getCoreRowModel,
    flexRender,
    ColumnDef,
    SortingState,
    getSortedRowModel,
} from '@tanstack/react-table';

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Avatar,
    Flex,
    Link,
    useToast,
    Skeleton,
    Alert,
    AlertIcon,
    Box,
} from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import Pagination from './Pagination';
import { useGetFollowersByUsernameQuery } from 'services/github-api';
import { useAppSelector } from 'app/hooks';

export type User = {
    login: string;
    id: number;
    avatar_url?: string;
    html_url?: string;
};

export default function Followers() {
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 30,
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
                                <Avatar src={avatar_url} name={login} mr={3} />
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
    const { data, error, isFetching } = useGetFollowersByUsernameQuery({
        username,
        page: pageIndex + 1,
    });

    const tableContainerRef = useRef<null | HTMLTableElement>(null);

    const table = useReactTable({
        data: data?.followers ?? [],
        columns,
        pageCount: data?.totalPages,
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
            title: 'Task failed successfully',
            status: 'error',
        });
    }
    if (data?.followers.length === 0) {
        return (
            <Alert status="warning" width="auto" display="inline-flex">
                <Box as="span" mr={2}>
                    😥
                </Box>
                <Box as="span">
                    Seems like <strong>{username}</strong> doesn't have any
                    followers.&nbsp;
                    <Link
                        href={`https://github.com/${username}`}
                        isExternal
                        textDecoration="underline"
                        _hover={{ textDecoration: 'none' }}
                    >
                        Will you be the first one?
                    </Link>
                </Box>
            </Alert>
        );
    }

    return (
        <TableContainer
            height="100%"
            style={{ overflow: 'auto' }}
            ref={tableContainerRef}
        >
            <Table variant="striped">
                <Thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <Th
                                    key={header.id}
                                    position="sticky"
                                    top="0"
                                    bg="white"
                                    zIndex="1"
                                >
                                    {header.isPlaceholder ? null : (
                                        <Flex
                                            cursor={
                                                header.column.getCanSort()
                                                    ? 'pointer'
                                                    : 'default'
                                            }
                                            {...{
                                                onClick:
                                                    header.column.getToggleSortingHandler(),
                                            }}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {{
                                                asc: (
                                                    <ArrowUpIcon
                                                        ml={1}
                                                        boxSize={4}
                                                    />
                                                ),
                                                desc: (
                                                    <ArrowDownIcon
                                                        ml={1}
                                                        boxSize={4}
                                                    />
                                                ),
                                            }[
                                                header.column.getIsSorted() as string
                                            ] ?? null}
                                        </Flex>
                                    )}
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody>
                    {table.getRowModel().rows.map((row) => (
                        <Tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <Td key={cell.id}>
                                    <Skeleton isLoaded={!isFetching}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </Skeleton>
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <Pagination
                table={table}
                pageIndex={pageIndex}
                tableContainerRef={tableContainerRef}
            />
        </TableContainer>
    );
}
