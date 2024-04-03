import Link from "next/link";
import {Button, Flex} from "@radix-ui/themes";
import IssueFilter from "@/app/issues/list/IssueFilter";

const IssueToolbar = () => {
    return (
        <Flex justify="between">
            <IssueFilter/>
            <Button>
                <Link href="/issues/new">New Issue</Link>
            </Button>
        </Flex>
    );
};

export default IssueToolbar;