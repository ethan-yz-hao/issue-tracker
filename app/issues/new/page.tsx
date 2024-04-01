'use client'
import {Button, TextField, Callout} from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {InfoCircledIcon} from "@radix-ui/react-icons";

const NewIssuePage = () => {
    const {register, control, handleSubmit} = useForm();
    const router = useRouter();
    const [error, setError] = useState('');

    return (
        <div className="max-w-xl">
            {error &&
                <Callout.Root color="red" className="mb-5">
                    <Callout.Icon>
                        <InfoCircledIcon />
                    </Callout.Icon>
                    <Callout.Text>
                        {error}
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
                        setError('An unexpected error occurred. Please try again.')
                    }
                })
                }>
                <TextField.Root placeholder="Title" {...register('title')} />
                <Controller
                    name="description"
                    control={control}
                    render={({field}) => (
                        <SimpleMDE {...field} placeholder="Description"/>
                    )}
                />
                <Button>Submit New Issue</Button>
            </form>
        </div>
    );
};

export default NewIssuePage;