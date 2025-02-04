import { useEffect, useState } from 'react'
import './App.css'
import { Button, Center, DialogActionTrigger, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger, Heading, IconButton, Spinner } from '@chakra-ui/react'
import { GetAllStudyRecords } from './lib/studyrecords'
import { StudyRecord } from './domain/studyrecord'
import { useForm } from 'react-hook-form'
import { FormData } from './types/formData';
import { AddStudyRecords } from './lib/addStudyRecords'
import { MdEdit, MdOutlineDeleteOutline } from 'react-icons/md'
import { DeleteStudyRecords } from './lib/deleteStudyRecords'
import { EditStudyRecords } from './lib/editStudyRecords'

function App() {
  const defaultValues: FormData = {
    title: "demo",
    time: 1,
  }
  const [studyRecords, setStudyRecords] = useState<StudyRecord[]>()
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues,
    mode: 'onChange'
  });

  const onSubmit = async(value: FormData) => {
    setLoading(true);
    const newstudyRecordsData = await AddStudyRecords(value.title, value.time);
    setStudyRecords(newstudyRecordsData);
    setLoading(false);
    reset();
  };

  const onEditSubmit = async(value: FormData, id: string) => {
    setLoading(true);
    const newstudyRecordsData = await EditStudyRecords(value.title, value.time, id);
    setStudyRecords(newstudyRecordsData);
    setLoading(false);
    reset();
  }

  const onClickDelete = async(id: string) => {
    setLoading(true);
    const newstudyRecordsData = await DeleteStudyRecords(id);
    setStudyRecords(newstudyRecordsData);
    setLoading(false);
  }

  useEffect(() => {
    const getAllStudyRecords = async () => {
      setLoading(true);
      const studyRecordsData = await GetAllStudyRecords();
      setStudyRecords(studyRecordsData);
      setLoading(false)
    }
    getAllStudyRecords();
  }, [])
  return (
    <>
      {loading ? (
        <Center h={"100vh"}>
          <Spinner />
        </Center>
      ) : (
        <div>
          <Heading size={"5xl"}>New Study Record App</Heading>
          <ul>
            {studyRecords?.map((studyRecord) => (
              <li key={studyRecord.id}>
                {studyRecord.title}
                <DialogRoot size={"md"}>
                  <DialogTrigger>
                    <IconButton ml={"10px"} my={"5px"} variant="outline">
                      <MdEdit />
                    </IconButton>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Study Record</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit((value) => onEditSubmit(value,studyRecord.id))}>
                      <DialogBody>
                        <input id='title' type="text" 
                          {...register('title', {
                            required: 'title is mandatory',
                            maxLength: {
                              value: 30,
                              message: 'It has to be less than 30 letters'
                            }
                          })}
                        />
                        <input id='time' type="text" 
                          {...register('time', {
                            required: 'time is mandatory',
                            max: {
                              value: 100,
                              message: 'It has to be less than 3 digit'
                            },
                            min: {
                              value: 0,
                              message: "It has to be more than or equal to 0"
                            }
                          })}
                        />
                        <div className='errorMessage'>{errors.title?.message}</div>
                        <div className='errorMessage'>{errors.time?.message}</div>
                      </DialogBody>
                      <DialogFooter>
                        <DialogActionTrigger asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogActionTrigger>
                        <Button type='submit'>Edit</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </DialogRoot>
                <IconButton ml={"10px"} my={"5px"} variant="outline" onClick={() => onClickDelete(studyRecord.id)}>
                  <MdOutlineDeleteOutline />
                </IconButton>
              </li>
            ))}
          </ul>
          <DialogRoot size={"md"}>
            <DialogTrigger>
              <Button>Add Study Record</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Study Record</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <DialogBody>
                  <input id='title' type="text" 
                    {...register('title', {
                      required: 'title is mandatory',
                      maxLength: {
                        value: 30,
                        message: 'It has to be less than 30 letters'
                      }
                    })}
                  />
                  <input id='time' type="text" 
                    {...register('time', {
                      required: 'time is mandatory',
                      max: {
                        value: 100,
                        message: 'It has to be less than 3 digit'
                      },
                      min: {
                        value: 0,
                        message: "It has to be more than or equal to 0"
                      }
                    })}
                  />
                  <div className='errorMessage'>{errors.title?.message}</div>
                  <div className='errorMessage'>{errors.time?.message}</div>
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogActionTrigger>
                  <Button type='submit'>Button</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </DialogRoot>
        </div>
      )}
    </>
  )
}

export default App
