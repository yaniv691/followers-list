import { useGetUserByUsernameQuery } from 'services/github-api';
import { useAppSelector } from 'app/hooks';
import {
    Image,
    Flex,
    Box,
    Link,
    Heading,
    SkeletonCircle,
    SkeletonText,
    Text,
    Stack,
} from '@chakra-ui/react';
import { LinkIcon } from '@chakra-ui/icons';
import { isFetchBaseQueryError } from 'app/utils';
import { useErrorToast } from 'app/hooks';

export default function UserInfo() {
    const username = useAppSelector((state) => state.userSearch.value);
    const {
        data: userInfo,
        error,
        isLoading,
    } = useGetUserByUsernameQuery(username);
    const {
        avatar_url,
        name,
        login,
        followers,
        following,
        bio,
        html_url,
        blog,
    } = userInfo || {};
    const numberFormatter = Intl.NumberFormat('en', { notation: 'compact' });

    const errorToast = useErrorToast(
        true,
        isFetchBaseQueryError(error) && error.status === 404
            ? 'User not found.'
            : 'Error fetching followers list, please try again later.',
        'user-error'
    );

    if (error) {
        errorToast();
        return null;
    }

    return (
        <>
            {isLoading ? (
                <Flex flexDirection="column">
                    <SkeletonCircle size={['100px', '250px']} />
                    <SkeletonText
                        mt="4"
                        noOfLines={4}
                        spacing="4"
                        skeletonHeight="2"
                    />
                </Flex>
            ) : (
                <>
                    <Stack
                        direction={['row', 'column']}
                        alignItems={['center', 'flex-start']}
                        spacing={2}
                    >
                        <Box>
                            <Link href={html_url} isExternal>
                                <Image
                                    borderRadius="full"
                                    boxSize="80%"
                                    src={avatar_url}
                                    alt={name ?? login}
                                />
                            </Link>
                        </Box>
                        <Stack
                            direction="column"
                            spacing={[2, 3]}
                            alignItems="flex-start"
                        >
                            <Box>
                                <Heading as="h3" size="lg">
                                    <Link href={html_url} isExternal>
                                        {name}
                                    </Link>
                                </Heading>
                                <Heading as="h4" size="md" fontWeight="normal">
                                    <Link href={html_url} isExternal>
                                        {login}
                                    </Link>
                                </Heading>
                            </Box>

                            {bio && <Text fontSize="sm">{bio}</Text>}
                            <Text fontSize="sm">
                                {numberFormatter.format(followers)} followers ·{' '}
                                {numberFormatter.format(following)} following
                            </Text>

                            {blog && (
                                <Flex alignItems="center" fontSize="sm">
                                    <LinkIcon mr={2} />
                                    <Link href={`https://${blog}`} isExternal>
                                        {blog}
                                    </Link>
                                </Flex>
                            )}
                        </Stack>
                    </Stack>
                </>
            )}
        </>
    );
}
