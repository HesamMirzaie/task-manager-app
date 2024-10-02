import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '../../../ui/button';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export const CreateTaskColumn = ({ columnId }) => {
  const queryClient = useQueryClient();

  // Mutation برای اضافه کردن تسک جدید
  const addTaskMutation = useMutation({
    mutationFn: async (newTask: {
      id: string;
      title: string;
      columnId: string;
    }) => {
      return await axios.post('http://localhost:5000/tasks', newTask);
    },
    onSuccess: () => {
      // پس از موفقیت در اضافه کردن تسک، داده‌ها مجددا گرفته می‌شوند
      queryClient.invalidateQueries(['tasks']);
    },
  });

  const handleAddTask = () => {
    // تولید نام رندوم برای تسک

    addTaskMutation.mutate({
      id: uuidv4(),
      title: 'Task',
      columnId: columnId, // شناسه ستون مربوطه
    });
  };
  return (
    <Button
      className="w-full flex gap-2 items-center border rounded-md p-4 hover:bg-gray-50 text-blue-500 bg-white"
      onClick={handleAddTask}
      disabled={addTaskMutation.isLoading} // دکمه را غیرفعال کنید در حین درخواست
    >
      <Plus />
      Add New Task
    </Button>
  );
};
