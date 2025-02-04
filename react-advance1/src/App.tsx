import { useEffect, useState } from "react";
import { Button, DialogRoot, DialogTrigger, Heading } from "@chakra-ui/react";
import { StudyRecordList } from "./components/StudyRecordList";
import { StudyRecordForm } from "./components/StudyRecordForm";
import LoadingSpinner from "./components/LoadingSpinner";
import { GetAllStudyRecords } from "./lib/studyrecords";
import { AddStudyRecords } from "./lib/addStudyRecords";
import { DeleteStudyRecords } from "./lib/deleteStudyRecords";
import { EditStudyRecords } from "./lib/editStudyRecords";
import { StudyRecord } from "./domain/studyrecord";
import { FormData } from "./types/formData";

function App() {
  const [studyRecords, setStudyRecords] = useState<StudyRecord[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      setStudyRecords(await GetAllStudyRecords());
      setLoading(false);
    };
    fetchRecords();
  }, []);

  const handleAdd = async (value: FormData) => {
    setLoading(true);
    setStudyRecords(await AddStudyRecords(value.title, value.time));
    setLoading(false);
  };

  const handleEdit = async (value: FormData, id: string) => {
    setLoading(true);
    setStudyRecords(await EditStudyRecords(value.title, value.time, id));
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    setStudyRecords(await DeleteStudyRecords(id));
    setLoading(false);
  };

  return (
    <>
      {loading ? <LoadingSpinner /> : (
        <div>
          <Heading size={"5xl"}>New Study Record App</Heading>
          <StudyRecordList studyRecords={studyRecords} onEditSubmit={handleEdit} onClickDelete={handleDelete} />
          <DialogRoot size={"md"}>
            <DialogTrigger>
              <Button>Add Study Record</Button>
            </DialogTrigger>
            <StudyRecordForm onSubmit={handleAdd} defaultValues={{ title: "", time: 0 }} title="New Study Record" />
          </DialogRoot>
        </div>
      )}
    </>
  );
}

export default App;