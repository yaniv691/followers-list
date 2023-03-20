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
    useToast,
    VStack,
} from '@chakra-ui/react';
import { LinkIcon } from '@chakra-ui/icons';

export default function UserInfo() {
    const username = useAppSelector((state) => state.userSearch.value);
    const { data, error, isFetching } = useGetUserByUsernameQuery(username);
    const {
        avatar_url,
        name,
        login,
        followers,
        following,
        bio,
        html_url,
        blog,
    } = data || {};
    const numberFormatter = Intl.NumberFormat('en', { notation: 'compact' });

    const toast = useToast();

    const toastId = 'user-info-error';
    if (error && !toast.isActive(toastId)) {
        toast({
            id: toastId,
            title: 'Oops!',
            description: 'Error fetching user info, please try again later.',
            status: 'error',
            position: 'top',
        });
    }

    return (
        <>
            {isFetching ? (
                <Flex flexDirection="column">
                    <SkeletonCircle size={['100px', '250px']} />
                    <SkeletonText
                        mt="4"
                        noOfLines={4}
                        spacing="4"
                        skeletonHeight="2"
                    />
                </Flex>
            ) : data ? (
                <Flex flexDirection={['row', 'column']}>
                    <Link href={html_url} isExternal>
                        <Image
                            borderRadius="full"
                            boxSize={['150px', '100%', '100%', '2xs']}
                            src={avatar_url}
                            alt={name ?? login}
                            mb={[0, 4]}
                            mr={[4, 0]}
                        />
                    </Link>
                    <VStack spacing={[2, 3]} alignItems="flex-start">
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
                    </VStack>
                </Flex>
            ) : null}
        </>
    );
}
