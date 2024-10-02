import { useQuery } from '@tanstack/react-query';
import { Board } from '../../components/dashboard/boards/Board';
import { Navbar } from '../../components/navbar/Navbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { useState } from 'react';
import axios from 'axios';
import { IBoard, IColumn } from '../../types/types';

export const DashboardLayout = () => {
  const [activeBoard, setActiveBoard] = useState<IBoard | null>(null);

  const { data: columns = [] } = useQuery<IColumn[]>({
    queryKey: ['columns'],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:5000/columns`);
      return response.data;
    },
  });

  const filteredColumns = activeBoard
    ? columns
        .filter((column: IColumn) => column.boardId === activeBoard.id)
        .sort((a: IColumn, b: IColumn) => a.order - b.order)
    : [];

  return (
    <div className="h-screen w-screen flex overflow-y-hidden">
      <aside>
        <Sidebar activeBoard={activeBoard} setActiveBoard={setActiveBoard} />
      </aside>
      <div className="w-full h-full overflow-y-hidden">
        <Navbar />
        {/* محتوای اصلی */}
        {activeBoard ? (
          <Board activeBoard={activeBoard} filteredColumns={filteredColumns} />
        ) : (
          <div className="p-6">Choose one Board</div>
        )}
      </div>
    </div>
  );
};
