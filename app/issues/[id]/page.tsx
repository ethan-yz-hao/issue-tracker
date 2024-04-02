import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import {Box, Flex, Grid} from "@radix-ui/themes";
import DeleteIssueButton from "@/app/issues/[id]/DeleteIssueButton";
import EditIssueButton from "@/app/issues/[id]/EditIssueButton";
import IssueDetail from "@/app/issues/[id]/IssueDetail";

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({params}: Props) => {
    if (!/^\d+$/.test(params.id)) notFound();

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    });
    if (!issue) {
        notFound();
    }

    return (
        <Grid columns={{initial: "1", "sm": "5"}} gap="5">
            <Box className="md:col-span-4">
                <IssueDetail issue={issue} />
            </Box>
            <Box>
                <Flex direction="column" gap="4" className="w-full">
                    <EditIssueButton issueId={issue.id} />
                    <DeleteIssueButton issueId={issue.id}/>
                </Flex>
            </Box>
        </Grid>
    );
};

export default IssueDetailPage;