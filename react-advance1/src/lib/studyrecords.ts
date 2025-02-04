import { StudyRecord } from "@/domain/studyrecord";
import { supabase } from "@/utils/supabase";

export async function GetAllStudyRecords() {
    const response = await supabase.from("study-record").select("*")
    if (response.error) {
        alert("Failed loading");
    }
    const studyRecordData = response.data?.map((studyRecord) => {
        return new StudyRecord(studyRecord.id, studyRecord.title, studyRecord.time);
    });
    return studyRecordData;
}