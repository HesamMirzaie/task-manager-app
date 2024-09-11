import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
function AddNewBoard({ addBoard }: any) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-indigo-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={addBoard}
    >
      <div className="p-6 flex flex-col items-center justify-center h-full">
        <Plus className="h-12 w-12 text-indigo-500 mb-2" />
        <p className="text-indigo-700 font-semibold">Add Board</p>
      </div>
    </motion.div>
  );
}

export default AddNewBoard;
