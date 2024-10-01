import useAuthStore from '../../store/useUser';

export const UserCard = () => {
  const { user } = useAuthStore((state) => state.user);

  return (
    <div className="flex items-center space-x-2">
      <p className="w-8 h-8 flex justify-center items-center text-sm font-medium rounded-full bg-gray-200 text-gray-700">
        {[...user.email].splice(0, 2).join('').toUpperCase()}
      </p>
      <span className="text-sm font-medium text-gray-700">{user.email}</span>
    </div>
  );
};
