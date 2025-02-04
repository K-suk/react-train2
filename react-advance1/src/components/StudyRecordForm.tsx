import { Button, DialogActionTrigger, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FormData } from "../types/formData";

type Props = {
    onSubmit: (valud: FormData) => void;
    defaultValues: FormData;
    title: string;
}

export const StudyRecordForm:React.FC<Props> = ({ onSubmit, defaultValues, title }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues,
        mode: "onChange"
    });

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogBody>
                    <input id="title" type="text"
                    {...register("title", {
                        required: "title is mandatory",
                        maxLength: { value: 30, message: "It has to be less than 30 letters" }
                    })}
                    />
                    <input id="time" type="text"
                    {...register("time", {
                        required: "time is mandatory",
                        max: { value: 100, message: "It has to be less than 3 digits" },
                        min: { value: 0, message: "It has to be more than or equal to 0" }
                    })}
                    />
                    <div className='errorMessage'>{errors.title?.message}</div>
                    <div className='errorMessage'>{errors.time?.message}</div>
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogActionTrigger>
                    <Button type='submit'>Submit</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
};