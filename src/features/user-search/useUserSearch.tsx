import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { githubApi } from 'services/github-api';
import { useAppDispatch } from 'app/hooks';
import { updateSearchValue } from 'features/user-search/userSearchSlice';

export default function useUserSearch() {
    const params = useParams();
    const [username, setUsername] = useState<string>(params.username || '');
    const [isValid, setIsValid] = useState<boolean>(true);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (params.username) {
            dispatch(githubApi.util.resetApiState());
            dispatch(updateSearchValue(params.username));
        }
    }, [params.username, dispatch]);

    const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
        setIsValid(/^$|^[a-zA-Z0-9-]+$/.test(e.currentTarget.value));
        setUsername(e.currentTarget.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/${username}`);
        dispatch(githubApi.util.resetApiState());
        dispatch(updateSearchValue(username));
    };

    return {
        isValid,
        username,
        handleChange,
        handleSubmit,
    };
}
