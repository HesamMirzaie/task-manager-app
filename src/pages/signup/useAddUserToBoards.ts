import { useMutation, useQueryClient } from '@tanstack/react-query';

// فرض می‌کنیم که آدرس سرور JSON (مانند json-server) در این URL قرار دارد
const API_URL = 'http://localhost:5000';

// Mutation برای اضافه کردن ایمیل کاربر به بوردها
export const useAddUserToBoards = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['addUserToBoards'],
    mutationFn: async (email: string) => {
      const response = await fetch(`${API_URL}/boards`);
      if (!response.ok) {
        throw new Error('Failed to fetch boards');
      }
      const boards = await response.json();

      // اضافه کردن ایمیل جدید به هر بورد
      const updatedBoards = boards.map((board: any) => ({
        ...board,
        board_users: [...board.board_users, email],
      }));

      const saveResponse = await fetch(`${API_URL}/boards`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBoards),
      });

      if (!saveResponse.ok) {
        throw new Error('Error updating boards');
      }

      return saveResponse.json();
    },
    onSuccess: () => {
      // پس از موفقیت، دیتا را مجدد از سرور بگیر
      queryClient.invalidateQueries(['boards']);
    },
    onError: (error) => {
      console.error('Failed to add user to boards:', error);
    },
  });
};
