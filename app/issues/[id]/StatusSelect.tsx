'use client'
import {Select} from "@radix-ui/themes";
import {Issue, Status} from "@prisma/client";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import {statusMap} from "@/app/components/IssueStatusBadge";
import {useState} from "react";

const StatusSelect = ({issue}: { issue: Issue }) => {
    const [status, setStatus] = useState<Status>(issue.status);
    const statusOptions = Object.values(Status);
    const updateStatus = (selectedStatus: Status) => {
        const oldStatus = status;
        axios.patch(`/api/issues/${issue.id}`, {
            status: statusOptions.includes(selectedStatus) ? selectedStatus : Status.OPEN})
            .then(() => setStatus(selectedStatus))
            .catch(() => {
                setStatus(oldStatus);
                toast.error('Failed to update status');
        });
    }

    return (
        <>
            <Select.Root
                defaultValue={issue.status}
                onValueChange={(value)=>updateStatus(value as Status)}>
                <Select.Trigger placeholder="Status..."/>
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Issue Status</Select.Label>
                        {statusOptions.map((status) => (
                            <Select.Item key={status} value={status}>
                                {statusMap[status].label}
                            </Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster/>
        </>
    );
};

export default StatusSelect;
