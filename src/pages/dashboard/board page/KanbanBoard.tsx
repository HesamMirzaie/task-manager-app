import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ColumnCard } from '../../../components/board/ColumnCard';
import { BoardPageHeader } from '../../../components/board/BoardPageHeader';

export interface Task {
  id: string;
  title: string;
  description: string;
}

export interface Column {
  id: string;
  title: string;
  boardId: string | undefined;
  tasks?: Task[];
}

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const { boardId } = useParams<{ boardId: string }>();

  // Fetch tasks for a specific column
  const fetchTasks = async (columnId: string) => {
    try {
      const response = await axios.get<Task[]>(
        `http://localhost:5000/tasks?columnId=${columnId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  };
  const fetchColumnsAndTasks = async () => {
    try {
      const response = await axios.get<Column[]>(
        `http://localhost:5000/columns`
      );
      const filteredColumns = response.data.filter(
        (column) => column.boardId === boardId
      );

      const columnsWithTasks = await Promise.all(
        filteredColumns.map(async (col) => {
          const tasks = await fetchTasks(col.id);
          return { ...col, tasks };
        })
      );

      setColumns(columnsWithTasks);
    } catch (error) {
      console.error('Error fetching columns or tasks:', error);
    }
  };

  // Fetch columns and their tasks
  useEffect(() => {
    fetchColumnsAndTasks();
  }, [boardId]);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-100">
      <BoardPageHeader
        columns={columns}
        setColumns={setColumns}
        boardId={boardId}
      />

      <div className="flex gap-6 overflow-x-auto pb-6">
        {columns.map((column) => (
          <ColumnCard
            column={column}
            columns={columns}
            setColumns={setColumns}
          />
        ))}
      </div>
    </div>
  );
}
