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

    return (
        <>
            {error ? (
                <>Error fetching user</>
            ) : isFetching ? (
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
                <Flex flexDirection="column">
                    <Flex
                        flexDirection={['row', 'column']}
                        alignItems={['center', 'initial']}
                    >
                        <Link href={html_url} isExternal>
                            <Image
                                borderRadius="full"
                                boxSize={['100px', '250px']}
                                src={avatar_url}
                                alt={name ?? login}
                                mb={[0, 4]}
                                mr={[4, 0]}
                            />
                        </Link>
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
                    </Flex>
                    {bio && <Text mt={4}>{bio}</Text>}
                    <Text mt={4}>
                        {numberFormatter.format(followers)} followers ·{' '}
                        {numberFormatter.format(following)} following
                    </Text>

                    {blog && (
                        <Flex alignItems="center" mt={4}>
                            <LinkIcon mr={2} />
                            <Link href={`https://${blog}`} isExternal>
                                {blog}
                            </Link>
                        </Flex>
                    )}
                </Flex>
            ) : null}
        </>
    );
}
