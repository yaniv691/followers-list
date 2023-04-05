import { Tbody, Tr, Td, Skeleton } from '@chakra-ui/react';
import { flexRender } from '@tanstack/react-table';
import { Table } from '@tanstack/table-core';
import { FollowersListUser } from 'app/types';

interface TableBodyProps {
    table: Table<FollowersListUser>;
    isFetching: boolean;
}
export default function TableBody({ table, isFetching }: TableBodyProps) {
    return (
        <Tbody>
            {isFetching
                ? Array(30)
                      .fill({})
                      .map((row) => (
                          <Tr>
                              <Td width="60">
                                  <Skeleton h="50px" w="100%" />
                              </Td>
                              <Td width="40%">
                                  <Skeleton h="50px" w="100%" />
                              </Td>
                          </Tr>
                      ))
                : table.getRowModel().rows.map((row) => (
                      <Tr key={row.id}>
                          {row.getVisibleCells().map((cell) => (
                              <Td key={cell.id} py={3}>
                                  {flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext()
                                  )}
                              </Td>
                          ))}
                      </Tr>
                  ))}
        </Tbody>
    );
}
