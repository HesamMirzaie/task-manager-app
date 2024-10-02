// ColumnsContainer component
import { DragOverlay } from '@dnd-kit/core';
import { ColumnCard } from './ColumnCard';
import { SortableContext } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';

export const ColumnsContainer = ({
  filteredColumns,
  columnsId,
  activeColumn,
}: any) => {
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
