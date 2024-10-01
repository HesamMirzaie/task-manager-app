import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TColumn } from '../../types/types';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Plus } from 'lucide-react'; // Make sure to import the Plus icon
import { BoardHeader } from './BoardHeader';

export const Board = ({ activeBoard, filteredData }: any) => {
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
      title: 'New Column Title', // You might want to make this dynamic
      boardId: activeBoard.id, // Use the ID of the active board
    };

    addColumnMutation.mutate(newColumn);
  };

  return (
    <main>
      <BoardHeader activeBoard={activeBoard} />

      <div className="m-auto flex min-h-full w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
        <div className="grid grid-cols-4 gap-4 p-6">
          {filteredData.map((d) => (
            <div key={d.id}>
              <p>{d.column_title}</p>
            </div>
          ))}
        </div>
        <button
          onClick={addColumn}
          className="flex justify-center items-center h-[20px] w-[350px] min-w-[350px] cursor-pointer border-b-2 p-4 hover:scale-105 transition"
        >
          <div className="flex gap-2">
            <Plus />
            Add Column
          </div>
        </button>
      </div>
    </main>
  );
};
