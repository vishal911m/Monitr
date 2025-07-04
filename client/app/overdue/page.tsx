"use client";
import { useUserContext } from "@/context/userContext";
import { useEffect, useState } from "react";
import useRedirect from "@/hooks/useUserRedirect";
import { useTasks } from "@/context/taskContext";
import { Task } from "@/utils/types";
import { filteredTasks, overdueTasks } from "@/utils/utilities";
import Filters from "../Components/Filters/Filters";
import TaskItem from "../Components/TaskItem/TaskItem";
import { motion } from "framer-motion";
import { container, item } from "@/utils/animations";

export default function Home() {
  useRedirect("/login");

  const {tasks, openModalForAddTask, priority, completedTasks, setPriority} = useTasks();
  const [isOpen, setIsOpen] = useState(false);

  // function
  const myToggle = () => {
    setIsOpen(!isOpen);
  };

  const overdue = overdueTasks(tasks);

  const filtered = filteredTasks(overdue, priority);

  useEffect(()=>{
    setPriority("all");
  },[]);

  return (
    <main className="overdue m-6 h-full">
      <div className="overdue flex justify-between">
        <h1 className="text-2xl fond-bold">Overdue Tasks</h1>
        <Filters />
      </div>

      <motion.div className="overdue pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]"
      variants={container}
      initial="hidden"
      animate="visible"
      >
        {filtered.map((task: Task, i: number)=>(
          <TaskItem key={i} task={task} />
        ))}
        <motion.button 
        className="h-[16rem] w-full py-2 rounded-md text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400
        hover:bg-gray-300 hover:border-none transition duration-200 ease-in-out"
        onClick={openModalForAddTask}
        variants={item}
        >
          Add New Task
        </motion.button>
      </motion.div>
    </main>
  );
}
