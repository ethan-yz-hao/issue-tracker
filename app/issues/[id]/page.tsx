import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import {Card, Flex, Heading, Text} from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";

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
        <div>
            <Heading>{issue.title}</Heading>
            <Flex gapX="3" my={"2"}>
                <IssueStatusBadge status={issue.status}/>
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card>{issue.description}</Card>
        </div>
    );
};

export default IssueDetailPage;