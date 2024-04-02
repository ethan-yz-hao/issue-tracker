import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import {Box, Button, Card, Flex, Grid, Heading, Text} from "@radix-ui/themes";
import {IssueStatusBadge} from "@/app/components";
import ReactMarkdown from "react-markdown";
import {Pencil2Icon} from "@radix-ui/react-icons";
import Link from "next/link";

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
                <Heading>{issue.title}</Heading>
                <Flex gapX="3" my={"2"}>
                    <IssueStatusBadge status={issue.status}/>
                    <Text>{issue.createdAt.toDateString()}</Text>
                </Flex>
                <Card className="prose max-w-full" mt="4">
                    <ReactMarkdown>{issue.description}</ReactMarkdown>
                </Card>
            </Box>
            <Box>
                <Flex direction="column" gap="4">
                    <Button className="w-full">
                        <Pencil2Icon/>
                        <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
                    </Button>
                    <Button color="red" className="w-full">
                        <Link href={`/issues/${issue.id}/edit`}>Delete Issue</Link>
                    </Button>
                </Flex>
            </Box>
        </Grid>
    );
};

export default IssueDetailPage;