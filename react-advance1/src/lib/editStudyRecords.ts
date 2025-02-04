import { supabase } from "@/utils/supabase";
import { GetAllStudyRecords } from "./studyrecords";

export async function EditStudyRecords(about: string, hour: number, userId: string) {
    const response = await supabase
            .from('study-record')
            .update([{ title: about, time: hour}])
            .match({ id: userId });
        if (response.error) {
            alert("Failed adding");
        }
        const studyRecordsData = await GetAllStudyRecords();
        return studyRecordsData;
}