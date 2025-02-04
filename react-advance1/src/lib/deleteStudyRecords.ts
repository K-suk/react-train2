import { supabase } from "@/utils/supabase";
import { GetAllStudyRecords } from "./studyrecords";

export async function DeleteStudyRecords(id: string) {
    const response = await supabase
        .from('study-record')
        .delete()
        .match({id})
    if (response.error) {
        alert("Failed adding");
    }
    const studyRecordsData = await GetAllStudyRecords();
    return studyRecordsData;
}