import { extendTheme } from '@chakra-ui/react';

const breakpoints = {
    sm: '900px',
    md: '1000px',
    lg: '1100px',
    xl: '1200px',
    '2xl': '1536px',
};

const theme = extendTheme({ breakpoints });

export default theme;
