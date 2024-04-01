import Link from "next/link";
import {Button} from "@radix-ui/themes";

const IssueToolbar = () => {
    return (
        <div className="mb-5">
            <Link href="/issues/new"><Button>New Issue</Button></Link>
        </div>
    );
};

export default IssueToolbar;