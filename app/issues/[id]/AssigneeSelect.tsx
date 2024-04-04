'use client'
import {Avatar, Flex, Select} from "@radix-ui/themes";
import {Issue, User} from "@prisma/client";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {Skeleton} from "@/app/components";
import toast, {Toaster} from "react-hot-toast";
import {useRouter} from "next/navigation";
import DefaultAvatar from "@/app/DefaultAvatar";

const AssigneeSelect = ({issue}: { issue: Issue }) => {
    const {data: users, error, isLoading} = useUsers();
    const router = useRouter();

    if (isLoading) return <Skeleton/>;

    if (error) return null;

    const assignIssue = (userId: string) => {
        axios.patch(`/api/issues/${issue.id}`, {
            assignedToUserId: userId !== 'unassigned' ? userId : null
        })
            .then(() => router.refresh())
            .catch(() => {
                toast.error('Failed to update assignee');
            });
    }
    const assignedUser = users?.find(user => user.id === issue.assignedToUserId);

    return (
        <>
            <Flex align="center" justify="end">
                {assignedUser && <Avatar src={assignedUser.image!} fallback={<DefaultAvatar/>} radius="full"/>}
            </Flex>
                <Select.Root
                    defaultValue={issue.assignedToUserId ? issue.assignedToUserId : 'unassigned'}
                    onValueChange={assignIssue}>
                    <Select.Trigger placeholder="Assign..."/>
                    <Select.Content className="w-full">
                        <Select.Group>
                            <Select.Label>Suggestions</Select.Label>
                            <Select.Item value="unassigned">Unassigned</Select.Item>
                            {users?.map((user) => (
                                <Select.Item key={user.id} value={user.id}>
                                    {user.name}
                                </Select.Item>
                            ))}
                        </Select.Group>
                    </Select.Content>
                </Select.Root>
            <Toaster/>
        </>
    );
};

const useUsers = () => useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 1000, // 1 minute
    retry: 3,
})

export default AssigneeSelect;
