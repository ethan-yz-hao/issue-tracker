'use client'
import {Button, TextField, Callout, Text} from '@radix-ui/themes';
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

type IssueForm = z.infer<typeof createValidationSchemas>;

const NewIssuePage = () => {
    const {register, control, handleSubmit, formState: {errors}} = useForm<IssueForm>({
        resolver: zodResolver(createValidationSchemas)
    });
    const router = useRouter();
    const [serverError, setServerError] = useState('');

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
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post('/api/issues', data);
                        router.push('/issues');
                    } catch (error) {
                        setServerError('An unexpected error occurred. Please try again.')
                    }
                })
                }>
                <TextField.Root placeholder="Title" {...register('title')} />
                {errors.title && <Text color="red" as="p">{errors.title.message}</Text>}
                <Controller
                    name="description"
                    control={control}
                    render={({field}) => (
                        <SimpleMDE {...field} placeholder="Description"/>
                    )}
                />
                {errors.description && <Text color="red" as="p">{errors.description.message}</Text>}
                <Button>Submit New Issue</Button>
            </form>
        </div>
    );
};

export default NewIssuePage;