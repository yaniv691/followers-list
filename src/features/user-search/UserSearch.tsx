import { useState } from 'react';
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

export default function UserSearch() {
    const [username, setUsername] = useState('');
    const dispatch = useAppDispatch();
    const handleChange = (e: React.FormEvent<HTMLInputElement>): void =>
        setUsername(e.currentTarget.value);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(githubApi.util.resetApiState());
        dispatch(updateSearchValue(username));
    };
    return (
        <form onSubmit={handleSubmit}>
            <Flex width="600px" maxWidth="100%">
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
                    />
                </InputGroup>
                <Button onClick={handleSubmit} ml={4} size="lg">
                    Search
                </Button>
            </Flex>
        </form>
    );
}
