'use client'
import {Button, TextField, Callout, Flex, Select, Box} from '@radix-ui/themes';
import "easymde/dist/easymde.min.css";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {InfoCircledIcon} from "@radix-ui/react-icons";
import {zodResolver} from "@hookform/resolvers/zod";
import {issueSchema} from "@/app/ValidationSchemas";
import {z} from "zod";
import {ErrorMessage, Spinner} from "@/app/components";
import {Issue} from "@prisma/client";
import SimpleMDE from 'react-simplemde-editor';
import {Status} from '@prisma/client'
import {statusMap} from "@/app/components/IssueStatusBadge";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({issue}: { issue?: Issue }) => {
    const {register, control, handleSubmit, formState: {errors}} = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema),
        defaultValues: {
            title: issue?.title ?? '',
            description: issue?.description ?? '',
            status: issue?.status ?? Status.OPEN
        }
    });
    const router = useRouter();
    const [serverError, setServerError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const statusOptions = Object.values(Status);
    const [selectedStatus, setSelectedStatus] = useState<Status | undefined>(issue?.status ?? undefined);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true);
            if (issue) {
                await axios.patch('/api/issues/' + issue.id, data)
            } else {
                await axios.post('/api/issues', data);
            }
            router.push('/issues/list');
            router.refresh();
        } catch (error) {
            setIsSubmitting(false);
            setServerError('An unexpected error occurred. Please try again.')
        }
    });

    return (
        <div className="max-w-xl">
            {serverError &&
                <Callout.Root color="red" className="mb-5">
                    <Callout.Icon>
                        <InfoCircledIcon/>
                    </Callout.Icon>
                    <Callout.Text>
                        {serverError}
                    </Callout.Text>
                </Callout.Root>
            }
            <form
                className="space-y-3"
                onSubmit={onSubmit}>
                <Flex justify="between">
                    <TextField.Root className={"w-full"}
                                    defaultValue={issue?.title} placeholder="Title" {...register('title')} />
                    {issue &&
                        <Controller
                            name="status"
                            control={control}
                            defaultValue={issue?.status}
                            render={({field: {onChange, value}}) =>
                                <Box ml="2">
                                    <Select.Root
                                        value={value}
                                        onValueChange={(value) => {
                                            setSelectedStatus(value as Status);
                                            onChange(value);
                                        }}>
                                        <Select.Trigger color={selectedStatus && statusMap[selectedStatus].color}
                                                        variant="soft"/>
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
                                </Box>
                            }/>
                    }
                </Flex>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    defaultValue={issue?.description}
                    render={({field: {onChange, value}}) => (
                        <SimpleMDE placeholder="Description" onChange={onChange} value={value}/>
                    )}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>
                    {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
                    {isSubmitting && <Spinner/>}
                </Button>
            </form>
        </div>
    );
};

export default IssueForm;