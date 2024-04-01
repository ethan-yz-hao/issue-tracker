'use client'
import {Button, TextField, Callout} from '@radix-ui/themes';
import dynamic from 'next/dynamic';
import "easymde/dist/easymde.min.css";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {InfoCircledIcon} from "@radix-ui/react-icons";
import {zodResolver} from "@hookform/resolvers/zod";
import {createValidationSchemas} from "@/app/ValidationSchemas";
import {z} from "zod";
import {ErrorMessage, Spinner} from "@/app/components";
import {Issue} from "@prisma/client";

const SimpleMDE = dynamic(
    () => import('react-simplemde-editor'),
    { ssr: false }
);

type IssueFormData = z.infer<typeof createValidationSchemas>;

const IssueForm = ({issue}: {issue?: Issue}) => {
    const {register, control, handleSubmit, formState: {errors}} = useForm<IssueFormData>({
        resolver: zodResolver(createValidationSchemas)
    });
    const router = useRouter();
    const [serverError, setServerError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true);
            await axios.post('/api/issues', data);
            router.push('/issues');
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
                <TextField.Root defaultValue={issue?.title} placeholder="Title" {...register('title')} />
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
                <Button disabled={isSubmitting}>Submit New Issue{isSubmitting && <Spinner/>}</Button>
            </form>
        </div>
    );
};

export default IssueForm;