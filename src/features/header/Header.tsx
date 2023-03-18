import { Flex, Heading, Link, Image } from '@chakra-ui/react';
import GithubLogo from 'github-logo.svg';
export default function Header() {
    return (
        <Flex alignItems="center" mb={4}>
            <Link href="https://github.com/" isExternal>
                <Image src={GithubLogo} style={{ width: 36 }} alt="Github" />
            </Link>
            <Heading ml={4} as="h1" size="lg">
                Followers List
            </Heading>
        </Flex>
    );
}
