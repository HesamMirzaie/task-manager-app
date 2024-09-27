import { Card, CardContent, CardFooter } from '../ui/card';
import { ColumnHeader } from './ColumnHeader';
import { TaskContainer } from './task/TaskContainer';
import { AddTaskButton } from './buttons/AddTaskButton';

export const ColumnCard = ({ column, columns, setColumns }: any) => {
  return (
    <>
      <Card
        key={column.id}
        className="w-80 bg-gray-800 border-gray-700 shadow-lg"
      >
        <ColumnHeader
          column={column}
          columns={columns}
          setColumns={setColumns}
        />

        <CardContent className="pt-4">
          <TaskContainer
            column={column}
            columns={columns}
            setColumns={setColumns}
          />
          {/* Add new Task */}
          <AddTaskButton
            column={column}
            columns={columns}
            setColumns={setColumns}
          />
        </CardContent>
      </Card>
    </>
  );
};
