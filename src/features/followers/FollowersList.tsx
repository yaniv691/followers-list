import { useRef } from 'react';

import { Table, TableContainer } from '@chakra-ui/react';
import Pagination from './Table/Pagination';
import { useErrorToast } from 'app/hooks';
import TableHead from './Table/TableHead';
import TableBody from './Table/TableBody';
import { isFetchBaseQueryError } from 'app/utils';
import useFollowersList from './useFollowersList';

export default function FollowersList() {
    const { table, pageIndex, error, isFetching, noFollowers } =
        useFollowersList();

    const tableContainerRef = useRef<null | HTMLTableElement>(null);

    const errorToast = useErrorToast(
        isFetchBaseQueryError(error) && error.status !== 404,
        'Error fetching followers list, please try again later.',
        'followers-list-error'
    );

    if (error) {
        errorToast();
        return null;
    }

    if (noFollowers) {
        return noFollowers();
    }

    return (
        <>
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
        </>
    );
}
