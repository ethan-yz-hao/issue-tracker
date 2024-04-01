'use client'
import {Button, TextField, Callout} from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {InfoCircledIcon} from "@radix-ui/react-icons";
import {zodResolver} from "@hookform/resolvers/zod";
import {createValidationSchemas} from "@/app/ValidationSchemas";
import {z} from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type IssueForm = z.infer<typeof createValidationSchemas>;

const NewIssuePage = () => {
    const {register, control, handleSubmit, formState: {errors}} = useForm<IssueForm>({
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
                <TextField.Root placeholder="Title" {...register('title')} />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    render={({field}) => (
                        <SimpleMDE {...field} placeholder="Description"/>
                    )}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>Submit New Issue{isSubmitting && <Spinner/>}</Button>
            </form>
        </div>
    );
};

export default NewIssuePage;