import { useQuery } from '@tanstack/react-query';
import { Board } from '../../components/dashboard/Board';
import { Navbar } from '../../components/navbar/Navbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { useState } from 'react';
import { TBoard } from '../../types/types';
import axios from 'axios';

export const DashboardLayout = () => {
  const [activeBoard, setActiveBoard] = useState<TBoard | null>(null);

  const { data: columns = [] } = useQuery({
    queryKey: ['columns'],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:5000/columns`);
      return response.data;
    },
  });

  const filteredColumns = activeBoard
    ? columns
        .filter((d: any) => d.boardId === activeBoard.id) // فیلتر بر اساس boardId
        .sort((a: any, b: any) => a.order - b.order) // مرتب‌سازی بر اساس order
    : [];

  return (
    <div className="min-h-screen flex overflow-y-hidden">
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
