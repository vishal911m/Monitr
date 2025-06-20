"use client";
import { useTasks } from '@/context/taskContext';
import { useUserContext } from '@/context/userContext';
import { FaGithub, FaMoon, FaUser } from 'react-icons/fa';
import Link from 'next/link';
import React from 'react';
import { useRouter } from "next/navigation";

// ⬇️ Import your logo (place the PNG in your public folder or import as asset if using Webpack/Vite)
import Image from 'next/image';
import monitrLogo from '/public/monitr-logo.png'; // Adjust path if stored differently

function Header() {
  const { user } = useUserContext();
  const { openModalForAddTask, activeTasks } = useTasks();
  const { name } = user;
  const userId = user._id;

  const router = useRouter();
  
  return (
    <header className="Header px-6 my-4 w-full bg-[#f9f9f9] flex items-center justify-between">
  {/* 🔵 Left: Logo + Welcome Text */}
  <div className="flex items-center gap-4">
    <Image
      src={monitrLogo}
      alt="MonitR Logo"
      height={40}
      width={120}
      className="object-contain"
    />
    <div>
      <h1 className="text-lg font-medium">
        <span role="img" aria-label="wave">👋</span>
        {userId ? `Welcome, ${name}` : 'Welcome to MonitR'}
      </h1>
      <p className="text-sm">
        {userId ? (
          <>
            You have <span className="font-bold text-[#3aafae]">{activeTasks.length}</span> active tasks
          </>
        ) : (
          "Please login or register to view your tasks"
        )}
      </p>
    </div>
  </div>

  {/* 🟣 Right: Button + Icons */}
  <div className="flex items-center gap-[10.4rem]">
    <button
      className="px-8 py-3 bg-[#3aafae] text-white rounded-[50px]
      hover:bg-[#00a1f1] transition-all duration-200"
      onClick={() => {
        if (userId) openModalForAddTask();
        else router.push("/login");
      }}
    >
      {userId ? "Create a new task" : "Login / Register"}
    </button>
    <div className="flex gap-4 items-center">
      <Link
        href="https://github.com/vishal911m?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
        className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#e6e6e6]"
      >
        <FaGithub />
      </Link>
      <Link
        href="https://github.com/vishal911m/Monitr"
        target="_blank"
        rel="noopener noreferrer"
        className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
      >
        <FaMoon />
      </Link>
      <Link
        href="https://github.com/vishal911m/MonitR-Backend"
        target="_blank"
        rel="noopener noreferrer"
        className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
      >
        <FaUser />
      </Link>
    </div>
  </div>
</header>

  );
}

export default Header;
