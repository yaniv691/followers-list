import { Link, Alert, Box } from '@chakra-ui/react';

interface NoFollowersProps {
    username: string | undefined;
}

export default function NoFollowers({ username }: NoFollowersProps) {
    return (
        <Alert status="warning" width="auto" display="inline-flex">
            <Box as="span" mr={2}>
                😥
            </Box>
            <Box as="span">
                Seems like <strong>{username}</strong> doesn't have any
                followers.&nbsp;
                <Link
                    href={`https://github.com/${username}`}
                    isExternal
                    textDecoration="underline"
                    _hover={{ textDecoration: 'none' }}
                >
                    Will you be the first one?
                </Link>
            </Box>
        </Alert>
    );
}
