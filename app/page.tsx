import LatestIssues from "@/app/LatestIssues";
import IssueSummary from "@/app/IssueSummary";
import prisma from "@/prisma/client";
import IssueChart from "@/app/IssueChart";
import {Flex, Grid} from "@radix-ui/themes";

export default async function Home() {
    const open = await prisma.issue.count({where: {status: 'OPEN'}});
    const inProgress = await prisma.issue.count({where: {status: 'IN_PROGRESS'}});
    const closed = await prisma.issue.count({where: {status: 'CLOSED'}});
    const data = {open, inProgress, closed};

    return (
        <Grid columns={{initial: "1", md: "2"}} gap="3">
            <Flex direction="column" gap="3">
                <IssueSummary {...data}/>
                <IssueChart {...data}/>
            </Flex>
            <LatestIssues/>
        </Grid>
    );
}
