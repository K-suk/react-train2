import { supabase } from "@/utils/supabase";
import { GetAllStudyRecords } from "./studyrecords";

export async function AddStudyRecords(about: string, hour: number) {
    const response = await supabase
        .from('study-record')
        .insert([{ title: about, time: hour}])
        .select();
    if (response.error) {
        alert("Failed adding");
    }
    const studyRecordsData = await GetAllStudyRecords();
    return studyRecordsData;
}