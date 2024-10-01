import { ColumnCard } from './ColumnCard';

export const ColumnsContainer = ({ filteredColumns }: any) => {
  return (
    <div className=" flex gap-4">
      {filteredColumns?.map((column: any) => (
        <ColumnCard key={column.id} column={column} />
      ))}
    </div>
  );
};
