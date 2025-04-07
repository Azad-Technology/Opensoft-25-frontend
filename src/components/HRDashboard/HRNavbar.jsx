import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const HRNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='absolute top-0 w-full h-16 bg-black
     flex items-center px-6 text-bold shadow-lg'>
      <div className='mr-auto pb-3'>
        <span className='text-2xl text-white font-extrabold hover:cursor-pointer'>MINDFLIX</span>
      </div>

      <nav className='hidden md:flex space-x-8 text-white font-semibold'>
        <div className='cursor-pointer hover:text-green-300 transition duration-200'>My Page</div>
        <div className='cursor-pointer hover:text-green-300 transition duration-200'>Employee</div>
      </nav>

      <div className='hidden md:flex w-10 h-10 items-center justify-center border 
      rounded-full bg-green-700 text-white font-bold ml-6 shadow-md cursor-pointer'>
        A
      </div>

      <button className='md:hidden text-white hover:cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={28} />}
      </button>

      {isOpen && (
        <div className='absolute top-16 right-0 bg-neutral-600
        shadow-lg flex flex-col items-center
        py-4 px-6 space-y-4 text-white z-50'>
          <div className='cursor-pointer hover:text-green-300 transition duration-200'>My Page</div>
          <div className='cursor-pointer hover:text-green-300 transition duration-200'>Employee</div>
          <div className='cursor-pointer hover:text-green-300 transition duration-200'>Profile</div>
        </div>
      )}
    </div>
  );
};

export default HRNavbar;
