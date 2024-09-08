'use client';

import { useEffect } from 'react';
import { useBoard } from '../store/useBoard';
import { Trash, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

export function Boards() {
  const boards = useBoard((state) => state.boards);
  const fetchBorders = useBoard((state) => state.fetchBorders);
  const addBorder = useBoard((state) => state.addBorder);
  const deleteBorder = useBoard((state) => state.deleteBorder);

  useEffect(() => {
    fetchBorders();
  }, [fetchBorders]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Your Boards</h1>
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <div className="flex space-x-4 p-4">
          {boards?.map((border) => (
            <motion.div
              key={border.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="w-64 h-40 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-4 flex flex-col justify-between h-full">
                  <h2 className="text-xl font-semibold text-gray-800 truncate">
                    {border.border_name}
                  </h2>
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteBorder(border.id)}
                      className="text-gray-500 hover:text-red-500 transition-colors duration-200"
                    >
                      <Trash className="h-5 w-5" />
                      <span className="sr-only">Delete board</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card
              className="w-64 h-40 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center cursor-pointer"
              onClick={addBorder}
            >
              <CardContent className="p-4 flex flex-col items-center">
                <Plus className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-gray-600 font-semibold">Add Board</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
