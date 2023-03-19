import { Flex, Heading, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import GithubLogo from 'github-logo.svg';
export default function Header() {
    return (
        <Link to="/followers-list">
            <Flex alignItems="center" mb={4}>
                <Image src={GithubLogo} style={{ width: 36 }} alt="Github" />
                <Heading ml={4} as="h1" size="lg">
                    Followers List
                </Heading>
            </Flex>
        </Link>
    );
}
