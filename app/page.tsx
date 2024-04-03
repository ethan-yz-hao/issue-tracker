import LatestIssues from "@/app/LatestIssues";
import IssueSummary from "@/app/IssueSummary";
import prisma from "@/prisma/client";
import IssueChart from "@/app/IssueChart";

export default async function Home() {
    const open = await prisma.issue.count({where: {status: 'OPEN'}});
    const inProgress = await prisma.issue.count({where: {status: 'IN_PROGRESS'}});
    const closed = await prisma.issue.count({where: {status: 'CLOSED'}});

    return (
        <>
            <IssueSummary open={open} inProgress={inProgress} closed={closed}/>
            <IssueChart open={open} inProgress={inProgress} closed={closed}/>
        </>
    );
}
