import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Input,
    InputGroup,
    InputLeftElement,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { githubApi } from 'services/github-api';
import { useAppDispatch } from 'app/hooks';
import { updateSearchValue } from 'features/user-search/userSearchSlice';

export default function UserSearch() {
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
    return (
        <form onSubmit={handleSubmit}>
            <Flex width={['auto', '600px']}>
                <FormControl isInvalid={!isValid}>
                    <InputGroup>
                        <InputLeftElement
                            h="100%"
                            pointerEvents="none"
                            children={<Search2Icon color="gray.300" />}
                        />

                        <Input
                            autoFocus
                            value={username}
                            placeholder="Github username"
                            onChange={handleChange}
                            size="lg"
                        />
                    </InputGroup>
                    {isValid ? (
                        <FormHelperText>&nbsp;</FormHelperText>
                    ) : (
                        <FormErrorMessage>Usernames can only contain alphanumeric characters and dashes (-)</FormErrorMessage>
                    )}
                </FormControl>
                <Button
                    isDisabled={!isValid || !username}
                    onClick={handleSubmit}
                    ml={4}
                    size="lg"
                    colorScheme="blue"
                >
                    Search
                </Button>
            </Flex>
        </form>
    );
}
