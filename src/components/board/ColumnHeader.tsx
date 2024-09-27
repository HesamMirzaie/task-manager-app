import { CardHeader, CardTitle } from '../ui/card';
import { EditColumnButton } from './buttons/EditColumnButton';
import { DeleteColumnButton } from './buttons/DeleteColumnButton';

export const ColumnHeader = ({ column, columns, setColumns }: any) => {
  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-gray-700">
        <CardTitle className="text-lg font-semibold text-gray-100">
          {column.title}
        </CardTitle>

        <div className="flex gap-2">
          <EditColumnButton
            column={column}
            columns={columns}
            setColumns={setColumns}
          />
          <DeleteColumnButton
            column={column}
            columns={columns}
            setColumns={setColumns}
          />
        </div>
      </CardHeader>
    </>
  );
};
