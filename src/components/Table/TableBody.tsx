import { Tbody, Tr, Td, Skeleton } from '@chakra-ui/react';
import { flexRender } from '@tanstack/react-table';
import { Table } from '@tanstack/table-core';
import { FollowersTableUser } from 'app/types';

interface TableBodyProps {
    table: Table<FollowersTableUser>;
    isFetching?: boolean | boolean;
    pageSize: number;
}
export default function TableBody({
    table,
    isFetching,
    pageSize,
}: TableBodyProps) {
    return (
        <Tbody>
            {isFetching
                ? Array(pageSize)
                      .fill({})
                      .map((_, index) => (
                          <Tr key={`table-skeleton-row-${index}`}>
                              {table.getAllColumns().map((column) => (
                                  <Td key={column.id}>
                                      <Skeleton
                                          h={['20px', '30px', '50px']}
                                          w="100%"
                                      />
                                  </Td>
                              ))}
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
