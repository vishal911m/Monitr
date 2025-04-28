"use client"
import { useUserContext } from '@/context/userContext'
import { github, moon, star } from '@/utils/icons';
import { profile } from 'console';
import Link from 'next/link';
import React from 'react'
import { FaGithub, FaMoon, FaUser } from 'react-icons/fa';

function Header() {
  // const userId = useUserContext().user._id;
  const {user} = useUserContext();
  const {name} = user;
  const userId = user._id;
  
  return <header className='px-6 my-4 w-full flex items-center justify-between bg-[#f9f9f9]'>
    <div>
      <h1 className='text-lg font-medium'>
        <span role='img' aria-label='wave'>👋</span>
        {userId ? `Welcome, ${name}` : 'Welcome to Monitr'}
      </h1>
      <p className='text-sm'>
        {userId ? (
          <>
          You have <span className="font-bold text-[#3aafae]">5</span>
          &nbsp;active tasks
          </>
        ) : (
          "Please login or register to view your tasks"
        )}
      </p>
    </div>
    <div className='h-[50px] flex items-center gap-[10.4rem]'>
      <button className='px-8 py-3 bg-[#3aafae] text-white rounded-[50px]
      hover:bg-[#00a1f1] hover:text-white transition-all duration-200 ease-in'>
        Create a new task 
      </button>
      <div className='flex gap-4 items-center'>
        <Link 
        href="https://github.com/vishal911m"
        passHref
        target='_blank'
        rel='noopener noreferrer'
        className='h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#e6e6e6]'
        >
          <FaGithub />
        </Link>
        <Link
             href="https://github.com/Maclinz/taskfyer"
             passHref
             target="_blank"
             rel="noopener noreferrer"
             className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
           >
         <FaMoon />
        </Link>
        <Link
             href="https://github.com/Maclinz/taskfyer"
             passHref
             target="_blank"
             rel="noopener noreferrer"
             className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
           >
         <FaUser />
        </Link>
      </div>
    </div>
  </header>
}

export default Header