'use client'
import {Select} from "@radix-ui/themes";
import {Status} from "@prisma/client";
import {useRouter} from "next/navigation";

const statusOptions: { label: string, value?: Status }[] = [
    {label: 'All'},
    {label: 'Open', value: 'OPEN'},
    {label: 'In Progress', value: 'IN_PROGRESS'},
    {label: 'Closed', value: 'CLOSED'},
];

const IssueFilter = () => {
    const router = useRouter();
    return (
        <Select.Root onValueChange={(status) => {
            const query = status === 'ALL' ? '' : `?status=${status}`;
            router.push('/issues/list' + query);
        }}>
            <Select.Trigger placeholder="Filter by status..."/>
            <Select.Content>
                {statusOptions.map((status) => (
                    <Select.Item key={status.label} value={status.value || 'ALL'}>
                        {status.label}
                    </Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    );
};

export default IssueFilter;