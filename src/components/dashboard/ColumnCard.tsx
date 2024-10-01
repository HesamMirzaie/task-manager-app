// ColumnCard component
import { useSortable } from '@dnd-kit/sortable';
import { ColumnDropDown } from './ColumnDropDown';
import { CSS } from '@dnd-kit/utilities';

export const ColumnCard = ({ column }: any) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: 'column',
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className=" w-[350px] h-[500px] max-h-screen rounded-md flex flex-col border-2"
      ></div>
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className=" w-[350px] h-[500px] max-h-screen rounded-md flex flex-col"
    >
      {/* Column Header */}
      <div
        {...attributes}
        {...listeners}
        className="text-lg cursor-grab p-3 font-bold flex items-center justify-between "
      >
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-600 mr-2" />
          {column.title}
          <div className="w-8 flex justify-center items-center px-2 py-1 text-sm bg-gray-100 rounded-md ml-2">
            1
          </div>
        </div>
        <ColumnDropDown columnId={column.id} />
      </div>
      {/* Column Task Container */}
      <div className="flex flex-grow">1</div>
    </div>
  );
};
