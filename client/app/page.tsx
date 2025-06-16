"use client";
import { useUserContext } from "@/context/userContext";

import { useEffect, useState } from "react";
import ChangePasswordForm from "./Components/auth/ChangePasswordForm/ChangePasswordForm";
import useRedirect from "@/hooks/useUserRedirect";
import { useTasks } from "@/context/taskContext";
import Filters from "./Components/Filters/Filters";
import TaskItem from "./Components/TaskItem/TaskItem";
import { Task } from "@/utils/types";
import { filteredTasks } from "@/utils/utilities";
import {motion} from "framer-motion";
import { container, item } from "@/utils/animations";
import DeleteConfirmationModal from "./Components/DeleteConfirmationModal/DeleteConfirmationModal";


export default function Home() {
  useRedirect("/login");
  
  const {tasks, openModalForAddTask, priority, setPriority, completedTasks} = useTasks();

  // const { name, photo, isVerified, bio } = user;

  // state
  const [isOpen, setIsOpen] = useState(false);

  // function
  const myToggle = () => {
    setIsOpen(!isOpen);
  };

  // const filtered = filteredTasks(tasks, priority);

  const filtered = tasks.filter((task: Task) => {
    const taskPriority = task.priority?.toLowerCase().trim();
    const selectedPriority = priority?.toLowerCase().trim();

    // Debug logs
    console.log("Selected Priority:", selectedPriority);
    console.log("Task Priority:", taskPriority);

    if (selectedPriority === "all") return true;
    return taskPriority === selectedPriority;
  });

  useEffect(()=>{
      setPriority("all");
    },[]);

  return (
    
    <main className="m-6 h-full">
      <div className="flex justify-between">
        <h1 className="text-2xl fond-bold">All Tasks</h1>
        <Filters />
      </div>

      <motion.div className="pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]"
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
    // <main className="py-[2rem] mx-[10rem]">
    //   <header className="flex justify-between">
    //     <h1 className="text-[2rem] font-bold">
    //       Welcome <span className="text-red-600">{name}</span>
    //     </h1>
    //     <div className="flex items-center gap-4">
    //       <img
    //         src={photo}
    //         alt={name}
    //         className="w-[40px] h-[40px] rounded-full"
    //       />
    //       {!isVerified && (
    //         <button
    //           className="px-4 py-2 bg-blue-500 text-white rounded-md"
    //           onClick={emailVerification}
    //         >
    //           Verify Account
    //         </button>
    //       )}

    //       <button
    //         onClick={logoutUser}
    //         className="px-4 py-2 bg-red-600 text-white rounded-md"
    //       >
    //         Logout
    //       </button>
    //     </div>
    //   </header>
    //   <section>
    //     <p className="text-[#999] text-[2rem]">{bio}</p>

    //     <h1>
    //       <button
    //         onClick={myToggle}
    //         className="px-4 py-2 bg-[#2ECC71] text-white rounded-md"
    //       >
    //         Update Bio
    //       </button>
    //     </h1>

    //     {isOpen && (
    //       <form className="mt-4 px-8 py-4 max-w-[520px] w-full rounded-md">
    //         <div className="flex flex-col">
    //           <label htmlFor="bio" className="mb-1 text-[#999]">
    //             Bio
    //           </label>
    //           <textarea
    //             name="bio"
    //             defaultValue={bio}
    //             className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
    //             onChange={(e) => handlerUserInput("bio")(e)}
    //           ></textarea>
    //         </div>
    //         <button
    //           type="submit"
    //           onClick={(e) => updateUser(e, { bio: userState.bio })}
    //           className="mt-4 px-4 py-2  bg-blue-500 text-white rounded-md"
    //         >
    //           Update Bio
    //         </button>
    //       </form>
    //     )}
    //   </section>
    //   <div className="mt-4 flex gap-8">
    //     <div className="flex-1">
    //       <ChangePasswordForm />
    //     </div>
    //     <div className="flex-1">
    //       {user.role === "admin" && (
    //         <ul>
    //           {allUsers.map(
    //             (user: any, i: number) =>
    //               user.role !== "admin" && (
    //                 <li
    //                   key={i}
    //                   className="mb-2 px-2 py-3 border grid grid-cols-4 items-center gap-8 rounded-md"
    //                 >
    //                   <img
    //                     src={user.photo}
    //                     alt={user.name}
    //                     className="w-[40px]  h-[40px] rounded-full"
    //                   />
    //                   <p>{user.name}</p>
    //                   <p>{user.bio}</p>
    //                   <button
    //                     className="bg-red-500 text-white p-2 rounded-md"
    //                     onClick={() => {
    //                       deleteUser(user._id);
    //                     }}
    //                   >
    //                     Delete User
    //                   </button>
    //                 </li>
    //               )
    //           )}
    //         </ul>
    //       )}
    //     </div>
    //   </div>
    // </main>
  );
}
