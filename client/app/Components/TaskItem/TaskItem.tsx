import { useTasks } from '@/context/taskContext';
import { star } from '@/utils/icons';
import { Task } from '@/utils/types'
import { formatTime } from '@/utils/utilities';
import React from 'react'
import { FaEdit, FaStar, FaTrash } from 'react-icons/fa';
import {motion} from "framer-motion";
import { item } from '@/utils/animations';

interface TaskItemProps {
  task: Task;
}

function TaskItem({task}: TaskItemProps) {
  // console.log("Tasks:", task);
  const getPriorityColor = (priority: string) => {
    switch(priority){
      case "low": 
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-red-500";
      default:
        return "text-red-500";
    }
  };

  const {getTask, openModalForEditTask, deleteTask, modalMode, openDeleteModal} = useTasks();

  return (
    <motion.div className='h-[16rem] px-4 py-3 flex flex-col gap-4 shadow-sm bg-[#f9f9f9] rounded-lg border-2 border-white'
    variants={item}
    >
      <div>
        <h4 className='font-bold text-2xl'>{task.title}</h4>
        <p>{task.description}</p>
      </div>
      <div className='mt-auto flex justify-between items-center'>
        <p className='text-sm text-gray-400'>{formatTime(task.createdAt)}</p>
        <p className={`text-sm font-bold ${getPriorityColor(task.priority)}`}>{task.priority}</p>
        <div>
          <div className='flex items-center gap-3 text-gray-400 text-[1.2rem]'>
          <button className={`${
            task.completed ? "text-yellow-400" : "text-gray-400"
            }`}>
              <FaStar />
          </button>
          <button className='text-[#00a1f1]'
            onClick={()=>{
              getTask(task._id);
              openModalForEditTask(task);
            }}
          ><FaEdit /> </button>
          <button 
            className='text-[#f65314]'
            onClick={()=>{
              openDeleteModal(task);
            }}  
          ><FaTrash /> </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskItem