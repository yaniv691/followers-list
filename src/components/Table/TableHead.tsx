import { Thead, Tr, Th, Flex } from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { flexRender } from '@tanstack/react-table';
import { Table } from '@tanstack/table-core';
import { FollowersTableUser } from 'app/types';

interface TableHeadProps {
    table: Table<FollowersTableUser>;
}
export default function TableHead({ table }: TableHeadProps) {
    return (
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
                                        asc: <ArrowUpIcon ml={1} boxSize={4} />,
                                        desc: (
                                            <ArrowDownIcon ml={1} boxSize={4} />
                                        ),
                                    }[header.column.getIsSorted() as string] ??
                                        null}
                                </Flex>
                            )}
                        </Th>
                    ))}
                </Tr>
            ))}
        </Thead>
    );
}
