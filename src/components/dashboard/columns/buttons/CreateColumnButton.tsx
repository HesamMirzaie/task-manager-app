import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { TColumn } from '../../../../types/types';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const CreateColumnButton = ({ activeBoard }: any) => {
  const queryClient = useQueryClient();

  // Mutation to add a new column
  const addColumnMutation = useMutation({
    mutationFn: async (newColumn: TColumn) => {
      const response = await axios.post<TColumn>(
        `http://localhost:5000/columns`,
        newColumn
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['columns'],
        (oldColumns: TColumn[] | undefined) => {
          return oldColumns ? [...oldColumns, data] : [data];
        }
      );
    },
    onError: (error) => {
      console.error('Error adding column:', error);
    },
  });

  const addColumn = () => {
    const newColumn: TColumn = {
      id: uuidv4(),
      title: 'New Column Title',
      boardId: activeBoard.id,
    };

    addColumnMutation.mutate(newColumn);
  };
  return (
    <button
      onClick={addColumn}
      className="flex justify-center items-center h-[20px] w-[350px] min-w-[350px] cursor-pointer border-b-2 p-4 hover:scale-105 transition"
    >
      <div className="flex gap-2">
        <Plus />
        Add Column
      </div>
    </button>
  );
};
