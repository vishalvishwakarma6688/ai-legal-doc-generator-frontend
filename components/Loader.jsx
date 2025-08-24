import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center absolute bg-black opacity-50 top-0 left-0 w-full h-full justify-center py-10">
      <div className="animate-spin rounded-full h-[80px] w-[80px] border-t-4 border-white border-opacity-70"></div>
      <span className="ml-4 text-white font-bold text-[28px]">Loading...</span>
    </div>
  );
};

export default Loader;
