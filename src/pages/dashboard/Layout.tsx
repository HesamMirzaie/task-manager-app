import { Navbar } from '../../components/navbar/Navbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { useState } from 'react';
import { TBoard, TColumn } from '../../types/types';
import { Board } from '../../components/dashboard/Board';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const DashboardLayout = () => {
  const [activeBoard, setActiveBoard] = useState<TBoard | null>(null);

  const { data } = useQuery({
    queryKey: ['columns'],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:5000/columns`);
      return response.data;
    },
  });

  const filteredData = activeBoard
    ? data?.filter((d) => d.board_id === activeBoard.id)
    : [];
  console.log(filteredData);

  return (
    <div className="min-h-screen flex overflow-y-hidden">
      <aside>
        <Sidebar activeBoard={activeBoard} setActiveBoard={setActiveBoard} />
      </aside>
      <div className="w-full h-full overflow-y-hidden">
        <Navbar />
        {/* Main Content */}
        {activeBoard ? (
          <Board activeBoard={activeBoard} filteredData={filteredData} />
        ) : (
          <div className=" p-6">Select a board to see its columns</div>
        )}
      </div>
    </div>
  );
};
