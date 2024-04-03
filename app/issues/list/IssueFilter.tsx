'use client'
import {Select} from "@radix-ui/themes";
import {Status} from "@prisma/client";
import {useRouter, useSearchParams} from "next/navigation";

const statusOptions: { label: string, value?: Status }[] = [
    {label: 'All'},
    {label: 'Open', value: 'OPEN'},
    {label: 'In Progress', value: 'IN_PROGRESS'},
    {label: 'Closed', value: 'CLOSED'},
];

const IssueFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    return (
        <Select.Root
            defaultValue={searchParams.get('status') || 'ALL'}
            onValueChange={(status) => {
                const params = new URLSearchParams(searchParams);
                if (status === 'ALL') {
                    params.delete('status');
                } else {
                    params.set('status', status);
                }
                if (searchParams.get('orderBy')) {
                    params.set('orderBy', searchParams.get('orderBy')!);
                }
                const query = params.size ? '?' + params.toString() : '';
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