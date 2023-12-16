import { FC } from 'react';

export const Background: FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="rounded-full bg-gradient-radial from-blue-500 via-purple-500 to-pink-500 p-20" />
    </div>
  );
};
