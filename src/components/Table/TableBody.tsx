import { Tbody, Tr, Td, Skeleton } from '@chakra-ui/react';
import { flexRender } from '@tanstack/react-table';
import { Table } from '@tanstack/table-core';
import { FollowersListUser } from 'app/types';

interface TableBodyProps {
    table: Table<FollowersListUser>;
    isLoading: boolean;
}
export default function TableBody({ table, isLoading }: TableBodyProps) {
    return (
        <Tbody>
            {table.getRowModel().rows.map((row) => (
                <Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                        <Td key={cell.id} py={3}>
                            <Skeleton isLoaded={!isLoading}>
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
