import React from 'react';
import {Table} from "@radix-ui/themes";
import NextLink from "next/link";
import {ArrowUpIcon} from "@radix-ui/react-icons";
import {IssueStatusBadge, Link} from "@/app/components";
import {Issue, Status} from "@prisma/client";

export interface IssueQuery {
    status: Status,
    orderBy: keyof Issue,
    sortOrder: 'asc' | 'desc' | undefined,
    page: string,
}

interface Props {
    issues: Issue[],
    searchParams: IssueQuery
}

const IssueTable = ({issues, searchParams}: Props) => {
    const newSortOrder = getNewSortOrder(searchParams.sortOrder);
    return (
        <Table.Root variant="surface">
            <Table.Header>
                <Table.Row>
                    {columns.map((column) =>
                        <Table.ColumnHeaderCell key={column.value} className={column.className}>
                            <NextLink href={{
                                // pathname: "/issues/list",
                                query: {
                                    ...searchParams,
                                    orderBy: newSortOrder ? column.value : undefined,
                                    sortOrder: newSortOrder
                                }
                            }}>
                                {column.label}
                            </NextLink>
                            {searchParams.orderBy === column.value && (
                                <ArrowUpIcon
                                    className={`inline ${searchParams.sortOrder === 'desc' ? 'transform rotate-180' : ''}`}/>
                            )}
                        </Table.ColumnHeaderCell>)}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {issues.map((issue) =>
                    <Table.Row key={issue.id}>
                        <Table.Cell>
                            <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                            <div className="block md:hidden"><IssueStatusBadge status={issue.status}/></div>
                        </Table.Cell>
                        <Table.Cell className="hidden md:table-cell"><IssueStatusBadge
                            status={issue.status}/></Table.Cell>
                        <Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
    );
};

const getNewSortOrder = (currentSortOrder: 'asc' | 'desc' | undefined) => {
    switch (currentSortOrder) {
        case 'asc':
            return 'desc';
        case 'desc':
            return undefined;
        case undefined:
            return 'asc';
    }
};

const columns: { label: string, value: keyof Issue, className?: string }[] = [
    {label: 'Issue', value: 'title'},
    {label: 'Status', value: 'status', className: "hidden md:table-cell"},
    {label: 'Created', value: 'createdAt', className: "hidden md:table-cell"},
];

export const columnNames = columns.map(column => column.value);

export default IssueTable;