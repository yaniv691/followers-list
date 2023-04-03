import { extendTheme } from '@chakra-ui/react';

const breakpoints = {
    sm: '768px',
    md: '1024px',
    lg: '1280px',
    xl: '1400px',
    '2xl': '1536px',
};

const theme = extendTheme({ breakpoints });

export default theme;
