import { StudyRecordItem } from "./StudyRecordItem";
import { StudyRecord } from "../domain/studyrecord";
import { FormData } from "../types/formData";

type Props = {
    studyRecords?: StudyRecord[];
    onEditSubmit: (value: FormData, id: string) => void;
    onClickDelete: (id: string) => void;
}

export const StudyRecordList: React.FC<Props> = ({ studyRecords, onEditSubmit, onClickDelete }) => (
    <ul>
        {studyRecords?.map((studyRecord) => (
            <StudyRecordItem key={studyRecord.id} studyRecord={studyRecord} onEditSubmit={onEditSubmit} onClickDelete={onClickDelete} />
        ))}
    </ul>
);