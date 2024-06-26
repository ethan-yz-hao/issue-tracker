'use client'
import {AlertDialog, Button, Flex} from "@radix-ui/themes";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {Spinner} from "@/app/components";

const DeleteIssueButton = ({issueId}: { issueId: number }) => {
    const router = useRouter();
    const [error, setError] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await axios.delete(`/api/issues/${issueId}`);
            router.push('/issues/list');
            router.refresh();
        } catch (error) {
            setIsDeleting(false);
            setError(true);
        }
    };

    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color="red" disabled={isDeleting}>
                        Delete Issue
                        {isDeleting && <Spinner />}
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        Are you sure you want to delete this issue?`
                    </AlertDialog.Description>
                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button variant="solid" color="red" onClick={handleDelete}>
                                Delete Issue
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>
                        An error occurred while deleting the issue. Please try again.
                    </AlertDialog.Description>
                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Action>
                            <Button variant="soft" color="gray" onClick={() => setError(false)}>
                                Close
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    );
};

export default DeleteIssueButton;
