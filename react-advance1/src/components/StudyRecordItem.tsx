import { IconButton, DialogRoot, DialogTrigger } from "@chakra-ui/react";
import { MdEdit, MdOutlineDeleteOutline } from "react-icons/md";
import { StudyRecordForm } from "./StudyRecordForm";
import { StudyRecord } from "../domain/studyrecord";
import { FormData } from "../types/formData";

type Props = {
    studyRecord: StudyRecord;
    onEditSubmit: (value: FormData, id: string) => void;
    onClickDelete: (id: string) => void;
}

export const StudyRecordItem: React.FC<Props> = ({ studyRecord, onEditSubmit, onClickDelete }) => (
    <li>
        {studyRecord.title}
        <DialogRoot size={"md"}>
            <DialogTrigger>
                <IconButton ml={"10px"} my={"5px"} variant="outline">
                    <MdEdit />
                </IconButton>
            </DialogTrigger>
            <StudyRecordForm onSubmit={(value) => onEditSubmit(value, studyRecord.id)}
            defaultValues={{ title: studyRecord.title, time: studyRecord.time }} title="Edit Study Record" />
        </DialogRoot>
        <IconButton ml={"10px"} my={"5px"} variant="outline" onClick={() => onClickDelete(studyRecord.id)}>
            <MdOutlineDeleteOutline />
        </IconButton>
    </li>
);