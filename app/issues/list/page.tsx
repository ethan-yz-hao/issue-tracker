import {Table} from "@radix-ui/themes";
import prisma from "@/prisma/client";
import NextLink from "next/link";
import {Link, IssueStatusBadge} from "@/app/components";
import IssueToolbar from "@/app/issues/list/IssueToolbar";
import {Issue, Status} from "@prisma/client";
import {ArrowUpIcon} from "@radix-ui/react-icons";

interface Props {
    searchParams: { status: Status, orderBy: keyof Issue, sortOrder: 'asc' | 'desc' | undefined }
}

const getNewSortOrder = (currentSortOrder: 'asc' | 'desc' | undefined) => {
    switch (currentSortOrder) {
        case 'asc':
            return 'desc';
        case 'desc':
            return undefined;
        case undefined:
            return 'asc';
    }
}

const IssuesPage = async ({searchParams}: Props) => {
    const columns: { label: string, value: keyof Issue, className?: string }[] = [
        {label: 'Issue', value: 'title'},
        {label: 'Status', value: 'status', className: "hidden md:table-cell"},
        {label: 'Created', value: 'createdAt', className: "hidden md:table-cell"},
    ];
    const statuses = Object.values(Status);
    const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
    const orderBy =
        columns.map(column => column.value).includes(searchParams.orderBy)
        && ['asc', 'desc', undefined].includes(searchParams.sortOrder)
            ? {[searchParams.orderBy]: searchParams.sortOrder} : undefined;

    const issues = await prisma.issue.findMany({
        where: {
            status: status
        },
        orderBy: orderBy
    });

    const newSortOrder = getNewSortOrder(searchParams.sortOrder);
    console.log(newSortOrder);
    return (
        <div>
            <IssueToolbar/>
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        {columns.map((column) =>
                            <Table.ColumnHeaderCell key={column.value} className={column.className}>
                                <NextLink href={{
                                    pathname: "/issues/list",
                                    query: {
                                        orderBy: newSortOrder ? column.value : undefined,
                                        sortOrder: newSortOrder
                                    }
                                }}>
                                    {column.label}
                                </NextLink>
                                {searchParams.orderBy === column.value && (
                                    <ArrowUpIcon className={`inline ${searchParams.sortOrder === 'desc' ? 'transform rotate-180' : ''}`}/>
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
        </div>
    );
};

export const dynamic = 'force-dynamic';

export default IssuesPage;