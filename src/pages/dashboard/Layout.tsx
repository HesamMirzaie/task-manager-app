import { useParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import KanbanDashboard from './Dashboard';

export const DashboardLayout = () => {
  const { boardId } = useParams<{ boardId?: string }>();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Welcome User</h2>
        </aside>
        {/* Main */}
        <main className="flex-1 p-6 bg-white shadow-md rounded-lg">
          {!boardId ? (
            <KanbanDashboard />
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-4">Board ID: {boardId}</h2>
              <p className="text-gray-600">
                This is where your board content will go.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
