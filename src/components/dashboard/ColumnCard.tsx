import { ColumnDropDown } from './ColumnDropDown';

export const ColumnCard = ({ column }: any) => {
  return (
    <div className=" bg-transparent w-[350px] h-[500px] max-h-screen rounded-md flex flex-col">
      {/* Column Header */}
      <div className=" text-lg cursor-grab p-3 font-bold flex items-center justify-between ">
        <div className="flex items-center">
          <div className=" w-2 h-2 rounded-full bg-green-600 mr-2" />
          {column.title}
          <div className=" w-8 flex justify-center items-center px-2 py-1 text-sm bg-gray-100 rounded-md ml-2">
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
