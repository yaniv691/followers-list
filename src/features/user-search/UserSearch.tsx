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
import useUserSearch from './useUserSearch';

export default function UserSearch() {
    const { isValid, username, handleSubmit, handleChange } = useUserSearch();

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
                        <FormErrorMessage>
                            Usernames can only contain alphanumeric characters
                            and dashes (-)
                        </FormErrorMessage>
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
