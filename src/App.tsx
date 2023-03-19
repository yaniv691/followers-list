import { Grid, GridItem } from '@chakra-ui/react';
import Followers from 'features/followers/Followers';
import UserInfo from 'features/user-info/UserInfo';
import UserSearch from './features/user-search/UserSearch';
import Header from 'features/header/Header';
import { useAppSelector } from 'app/hooks';


function App() {
    const username = useAppSelector((state) => state.userSearch.value);
    return (
        <Grid
            templateAreas={[
                `"header" 
                "sidebar" 
                "main"`,
                `"header header"
                  "sidebar main"`,
            ]}
            templateRows={['repeat(3, auto)', 'auto minmax(0, 1fr)']}
            // templateColumns={'20vw 1fr'}
            templateColumns={['1fr', '20vw 1fr']}
            gap={[4, 12]}
            p={[6, 10]}
            h={['100vh']}
        >
            <GridItem area={'header'}>
                <Header />
                <UserSearch />
            </GridItem>

            {username && (
                <>
                    <GridItem area={'sidebar'}>
                        <UserInfo />
                    </GridItem>
                    <GridItem area={'main'} minHeight="0">
                        <Followers />
                    </GridItem>
                </>
            )}
        </Grid>
    );
}

export default App;
