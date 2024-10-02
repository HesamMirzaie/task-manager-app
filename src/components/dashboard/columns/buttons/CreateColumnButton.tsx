import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { IColumn } from '../../../../types/types';

export const CreateColumnButton = ({ activeBoard }: any) => {
  const queryClient = useQueryClient();

  // Mutation to add a new column
  const addColumnMutation = useMutation({
    mutationFn: async (newColumn: IColumn) => {
      const response = await axios.post<IColumn>(
        `http://localhost:5000/columns`,
        newColumn
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['columns'],
        (oldColumns: IColumn[] | undefined) => {
          return oldColumns ? [...oldColumns, data] : [data];
        }
      );
    },
    onError: (error) => {
      console.error('Error adding column:', error);
    },
  });

  const addColumn = () => {
    const newColumn: IColumn = {
      id: uuidv4(),
      title: 'New Column Title',
      boardId: activeBoard.id,
      order: 0,
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
