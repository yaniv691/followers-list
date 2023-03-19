import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Input,
    InputGroup,
    InputLeftElement,
    Button,
    Flex,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { githubApi } from 'services/github-api';
import { useAppDispatch } from 'app/hooks';
import { updateSearchValue } from 'features/user-search/userSearchSlice';

const ALPHA_NUMERIC_DASH_REGEX = /^[a-zA-Z0-9-]+$/;

export default function UserSearch() {
    const params = useParams();
    const [username, setUsername] = useState<string>(params.username || '');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (params.username) {
            dispatch(githubApi.util.resetApiState());
            dispatch(updateSearchValue(params.username));
        }
    }, [params.username, dispatch]);

    const handleChange = (e: React.FormEvent<HTMLInputElement>): void =>
        setUsername(e.currentTarget.value);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/${username}`);
        dispatch(githubApi.util.resetApiState());
        dispatch(updateSearchValue(username));
    };
    return (
        <form onSubmit={handleSubmit}>
            <Flex width={['auto', '600px']}>
                <InputGroup>
                    <InputLeftElement
                        h="100%"
                        pointerEvents="none"
                        children={<Search2Icon color="gray.300" />}
                    />
                    <Input
                        value={username}
                        placeholder="Github username"
                        onChange={handleChange}
                        size="lg"
                        onKeyDown={(event) => {
                            if (!ALPHA_NUMERIC_DASH_REGEX.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                    />
                </InputGroup>
                <Button onClick={handleSubmit} ml={4} size="lg">
                    Search
                </Button>
            </Flex>
        </form>
    );
}
