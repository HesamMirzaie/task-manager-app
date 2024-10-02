// ColumnsContainer component
import { DragOverlay } from '@dnd-kit/core';
import { ColumnCard } from './ColumnCard';
import { SortableContext } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import { IColumn } from '../../../types/types';
interface ColumnsContainerProps {
  filteredColumns: IColumn[];
  columnsId: any;
  activeColumn: IColumn;
}

export const ColumnsContainer = ({
  filteredColumns,
  columnsId,
  activeColumn,
}: ColumnsContainerProps) => {
  return (
    <div className="flex gap-4">
      <SortableContext items={columnsId}>
        {filteredColumns?.map((column: any) => (
          <ColumnCard key={column.id} column={column} />
        ))}
        {createPortal(
          <DragOverlay>
            {activeColumn && <ColumnCard column={activeColumn} />}
          </DragOverlay>,
          document.body
        )}
      </SortableContext>
    </div>
  );
};
