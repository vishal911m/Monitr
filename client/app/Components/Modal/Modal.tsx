"use client"
import TaskItem from '@/app/Components/TaskItem/TaskItem'
import { useTasks } from '@/context/taskContext'
import useDetectOutside from '@/hooks/useDetectOutside';
import React, { useEffect, useRef } from 'react'

function Modal() {
  const {
    task,
    handleInput,
    createTask,
    isEditing,
    closeModal,
    modalMode,
    activeTask,
    updateTask,} = useTasks();
  useEffect(()=>{},[]);

  const ref = useRef(null);

  //use the hook to detect click outside the modal
  useDetectOutside({ref, callback: ()=>{
    if (isEditing) {
      closeModal(); //Close modal if it is in add/edit mode
    }
  }});

  useEffect(()=>{
    if (modalMode === "edit" && activeTask) {
      handleInput("setTask")(activeTask)
    }
  },[modalMode, activeTask])

  const handleSubmit = async  (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    let success = false;

    if(modalMode === "edit"){
      success = await updateTask(task);
    } else if (modalMode === "add") {
      success = await createTask(task);
    }
    if (success) {
    closeModal(); // ✅ Only close if success
  }
  }
  
  return (
    <div className='fixed left-0 top-0 z-50 h-full w-full bg-[#333]/30 overflow-hidden'>
      <form 
        action="" 
        className='py-5 px-6 max-w-[526px] w-full flex flex-col gap-3 bg-white absolute top-1/2  left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md'
        onSubmit={handleSubmit}
        ref={ref} //this is the ref that will be passed to useDetectOutside hook
      >
        <div className='flex flex-col gap-1'>
          <label htmlFor="title">Title</label>
          <input
            className='bg-[#f9f9f9] p-2 rounded-md border' 
            type="text"
            id='title'
            placeholder='Task Title'
            name='title'
            value={task.title}
            onChange={(e)=>handleInput("title")(e)}
            />
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor="title">Description</label>
          <textarea
            className='bg-[#f9f9f9] p-2 rounded-md border'
            placeholder='Task Description'
            rows={4}
            name='description'
            value={task.description}
            onChange={(e)=>handleInput("description")(e)}
            />
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor="priority">Select Priority</label>
          <select 
            className='bg-[#f9f9f9] p-2 rounded-md border cursor-pointer'
            name='priority'
            value={task.priority}
            onChange={(e)=>handleInput("priority")(e)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor="title">Due Date</label>
          <input
            className='bg-[#f9f9f9] p-2 rounded-md border' 
            type="date"
            name='dueDate'
            value={task.dueDate}
            onChange={(e)=>handleInput("dueDate")(e)}
            />
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor="completed">Task Completed</label>
          <div className='flex items-center justify-between bg-[#f9f9f9] p-2 rounded-md border'>
            <label htmlFor="completed">Completed</label>
            <div>
              <select 
                name="completed" 
                className='bg-[#f9f9f9] p-2 rounded-md border cursor-pointer'
                value={task.completed ? "true" : "false"}
                onChange={(e) => handleInput("completed")(e)}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div> 
        </div>

        <div className='mt-8'>
          <button 
            type='submit'
            className={`text-white py-2 rounded-md w-full hover:bg-blue-500 transition duration-200 ease-in-out 
              ${modalMode === "edit" ? "bg-blue-400" : "bg-green-400"}`
            }
            >{modalMode === "edit" ? "Update Task" : "Create Task"}</button>
        </div>

      </form>
    </div>
  )
}

export default Modal