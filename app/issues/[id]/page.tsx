import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import {Box, Flex, Grid} from "@radix-ui/themes";
import DeleteIssueButton from "@/app/issues/[id]/DeleteIssueButton";
import EditIssueButton from "@/app/issues/[id]/EditIssueButton";
import IssueDetail from "@/app/issues/[id]/IssueDetail";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "@/app/issues/[id]/AssigneeSelect";

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({params}: Props) => {
    const session = await getServerSession(authOptions);

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
                <IssueDetail issue={issue}/>
            </Box>
            {session && (
                <Box>
                    <Flex direction="column" gap="4" className="w-full">
                        <AssigneeSelect issue={issue}/>
                        <EditIssueButton issueId={issue.id}/>
                        <DeleteIssueButton issueId={issue.id}/>
                    </Flex>
                </Box>
            )}
        </Grid>
    );
};

export async function generateMetadata({params}: Props) {
    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    });

    return {
        title: issue?.title,
        description: 'Details of issue ' + issue?.id,
    };
}

export default IssueDetailPage;