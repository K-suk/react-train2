import { Button, DialogBody, DialogFooter } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { FormData } from '../../types/formData';
import { AddStudyRecords } from '../../lib/addStudyRecords';

type Props = {
  onAddSuccess: (newRecords: FormData[]) => void; // 追加後にリストを更新するための関数
};

export const AddStudyRecordForm: React.FC<Props> = ({ onAddSuccess }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      title: "",
      time: 1,
    },
    mode: 'onChange'
  });

  const onSubmit = async (value: FormData) => {
    const newStudyRecords = await AddStudyRecords(value.title, value.time);
    onAddSuccess(newStudyRecords); // 追加後にリストを更新
    reset(); // フォームのリセット
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogBody>
        <input id='title' type="text"
          {...register('title', {
            required: 'Title is required',
            maxLength: {
              value: 30,
              message: 'Title must be less than 30 characters'
            }
          })}
        />
        {errors.title && <div className="errorMessage">{errors.title.message}</div>}

        <input id='time' type="number"
          {...register('time', {
            required: 'Time is required',
            min: {
              value: 0,
              message: 'Time must be at least 0'
            },
            max: {
              value: 100,
              message: 'Time must be less than 100'
            }
          })}
        />
        {errors.time && <div className="errorMessage">{errors.time.message}</div>}
      </DialogBody>
      <DialogFooter>
        <Button type="submit">Add Study Record</Button>
      </DialogFooter>
    </form>
  );
};