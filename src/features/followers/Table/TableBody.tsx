import { Tbody, Tr, Td, Skeleton } from '@chakra-ui/react';
import { flexRender } from '@tanstack/react-table';
import { Table } from '@tanstack/table-core';
import { User } from 'features/followers/FollowersList';

interface TableBodyProps {
    table: Table<User>;
    isFetching: boolean;
}
export default function TableBody({ table, isFetching }: TableBodyProps) {
    return (
        <Tbody>
            {table.getRowModel().rows.map((row) => (
                <Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                        <Td key={cell.id} py={3}>
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
    );
}
