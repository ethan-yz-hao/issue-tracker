import prisma from "@/prisma/client";
import IssueToolbar from "@/app/issues/list/IssueToolbar";
import {Status} from "@prisma/client";
import Pagination from "@/app/components/Pagination";
import IssueTable, {columnNames, IssueQuery} from "@/app/issues/list/IssueTable";
import {Flex} from "@radix-ui/themes";
import {pageSizes} from "@/utils/constants";

interface Props {
    searchParams: IssueQuery
}

const IssuesPage = async ({searchParams}: Props) => {
    const statuses = Object.values(Status);
    const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
    const orderBy =
        columnNames.includes(searchParams.orderBy)
        && ['asc', 'desc', undefined].includes(searchParams.sortOrder)
            ? {[searchParams.orderBy]: searchParams.sortOrder} : undefined;
    const page = parseInt(searchParams.page) || 1;
    const pageSize = pageSizes.includes(parseInt(searchParams.pageSize)) ? parseInt(searchParams.pageSize) : 10;
    const where = {status: status};
    const issues = await prisma.issue.findMany({
        where,
        orderBy: orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize
    });
    const issueCount = await prisma.issue.count({where});
    return (
        <Flex direction="column" gap="3">
            <IssueToolbar/>
            <IssueTable issues={issues} searchParams={searchParams} />
            <Pagination itemCount={issueCount} pageSize={pageSize} currentPage={page}/>
        </Flex>
    );
};

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Issue Tracker - List',
    description: 'View all project issues',
}

export default IssuesPage;