import { ButtonGroup, Button, Flex, Box } from '@chakra-ui/react';

export default function Pagination({
    table,
    pageIndex,
    tableContainerRef,
}: any) {
    if (table.getPageCount() < 2) {
        return null;
    }
    return (
        <Flex
            position="sticky"
            bottom="0"
            pt={4}
            justifyContent="flex-end"
            alignItems="center"
            bg="white"
        >
            <Box as="span" mr={4}>
                <Box as="span">Page </Box>
                <strong>
                    {table.getState().pagination.pageIndex + 1} of{' '}
                    {table.getPageCount()}
                </strong>
            </Box>
            <ButtonGroup isAttached justifyContent="flex-end" display="flex">
                <Button onClick={() => table.setPageIndex(1)}>First</Button>
                {pageIndex !== 0 && (
                    <Button onClick={() => table.previousPage()}>Prev</Button>
                )}
                {pageIndex < table.getPageCount() && (
                    <Button onClick={() => table.nextPage()}>Next</Button>
                )}
                <Button
                    onClick={() => {
                        table.setPageIndex(table.getPageCount() - 1);
                        tableContainerRef!.current!.scrollTop = 0;
                    }}
                >
                    Last
                </Button>
            </ButtonGroup>
        </Flex>
    );
}
