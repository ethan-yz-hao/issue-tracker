import React from 'react';
import {Card, Flex, Text} from "@radix-ui/themes";
import {Status} from "@prisma/client";
import Link from "next/link";
import NextLink from "next/link";

interface Props {
    open: number;
    inProgress: number;
    closed: number;
}

const IssueSummary = ({open, inProgress, closed}: Props) => {
    const containers: {label:string, value: number, status: Status}[] = [
        {label: 'Open Issues', value: open, status: 'OPEN'},
        {label: 'In Progress Issues', value: inProgress, status: 'IN_PROGRESS'},
        {label: 'Closed Issues', value: closed, status: 'CLOSED'}
    ]
    return (
        <Flex gap="3">
            {containers.map((container) =>
                <Card key={container.status} className="w-full">
                    <Flex direction="column" gap="1">
                        <NextLink href={`/issues/list/?status=${container.status}`} className="text-sm font-medium">
                            {container.label}
                        </NextLink>
                    </Flex>
                    <Text size="5" className="font-bold">{container.value}</Text>
                </Card>
            )}
        </Flex>
    );
};

export default IssueSummary;