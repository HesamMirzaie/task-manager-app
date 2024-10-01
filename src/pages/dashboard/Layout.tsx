import { Navbar } from '../../components/navbar/Navbar';
import { Sidebar } from '../../components/sidebar/Sidebar';

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex overflow-y-hidden">
      <aside>
        <Sidebar />
      </aside>
      <div className=" w-full h-full">
        <Navbar />
        <main className="flex-1 h-full">{/* <KanbanBoard /> */}</main>
      </div>
    </div>
  );
};
