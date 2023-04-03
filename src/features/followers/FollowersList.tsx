import Table from '../../components/Table/Table';
import { useErrorToast } from 'app/hooks';
import { isFetchBaseQueryError } from 'app/utils';
import useFollowersList from './useFollowersList';

export default function FollowersList() {
    const { table, pageIndex, error, isLoading, noFollowers } =
        useFollowersList();

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

    return <Table isLoading={isLoading} pageIndex={pageIndex} table={table} />;
}
