import Table from '../../components/Table/Table';
import { useErrorToast } from 'app/hooks';
import { isFetchBaseQueryError } from 'app/utils';
import useFollowersTable from './useFollowersTable';
import NoFollowers from './NoFollowers';

export default function FollowersTable() {
    const { data, columns, pagination, error, isFetching, username } =
        useFollowersTable();

    const errorToast = useErrorToast(
        isFetchBaseQueryError(error) && error.status !== 404,
        'Error fetching followers list, please try again later.',
        'followers-list-error'
    );

    if (error) {
        errorToast();
        return null;
    }

    return (
        <Table
            data={data}
            isFetching={isFetching}
            pagination={pagination}
            columns={columns}
            emptyState={<NoFollowers username={username} />}
        />
    );
}
