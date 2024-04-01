import Link from "next/link";
import {Button} from "@radix-ui/themes";

const IssueToolbar = () => {
    return (
        <div className="mb-5">
            <Button>
                <Link href="/issues/new">New Issue</Link>
            </Button>
        </div>
    );
};

export default IssueToolbar;