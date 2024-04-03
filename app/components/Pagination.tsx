'use client'
import {Box, Button, Flex, Select, Text} from "@radix-ui/themes";
import {ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon} from "@radix-ui/react-icons";
import {useRouter, useSearchParams} from "next/navigation";
import { pageSizes } from '@/utils/constants';

interface Props {
    itemCount: number;
    pageSize: number;
    currentPage: number;
}

const Pagination = ({itemCount, pageSize, currentPage}: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const pageCount = Math.ceil(itemCount / pageSize);

    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push('?' + params.toString());
    }

    const changePageSize = (size: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('pageSize', size);
        params.delete('page');
        router.push('?' + params.toString());
    }


    return (
        <Flex justify="between">
            {pageCount > 1 ? (
            <Flex align="center" gap="2">
                <Text size="2">Page {currentPage} of {pageCount}</Text>
                <Button color="gray" variant="soft" disabled={currentPage === 1}
                        onClick={() => changePage(1)}>
                    <DoubleArrowLeftIcon/>
                </Button>
                <Button color="gray" variant="soft" disabled={currentPage === 1}
                        onClick={() => changePage(currentPage - 1)}>
                    <ChevronLeftIcon/>
                </Button>
                <Button color="gray" variant="soft" disabled={currentPage === pageCount}
                        onClick={() => changePage(currentPage + 1)}>
                    <ChevronRightIcon/>
                </Button>
                <Button color="gray" variant="soft" disabled={currentPage === pageCount}
                        onClick={() => changePage(pageCount)}>
                    <DoubleArrowRightIcon/>
                </Button>
            </Flex>) : <Box></Box>}
            <Flex className="items-center gap-2 hidden md:flex">
                <Text size="2">Items per page:</Text>
                <Select.Root defaultValue="10" onValueChange={changePageSize}>
                    <Select.Trigger>
                        {pageSize}
                    </Select.Trigger>
                    <Select.Content>
                        {pageSizes.map((size) => (
                            <Select.Item key={size} value={size.toString()}>
                                {size}
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Root>
            </Flex>
        </Flex>
    );
};

export default Pagination;
