import { useTasks } from '@/context/taskContext'
import React, { useState } from 'react'

function Filters() {
  const {priority, setPriority} = useTasks();
  const [activeIndex, setActiveIndex] = useState(0);
  const priorities = ["All", "Low", "Medium", "High"];

  return (
    <div className='relative px-2 py-2 grid grid-cols-4 items-center gap-3 bg-[#f9f9f9] border-2 border-white rounded-md'>
      <span className='absolute left-[5px] bg-[#ededed] rounded-md transition-all duration-300'
      style={{
        width: "calc(100% / 4 - 10px)",
        height: "calc(100% - 10px)",
        top: "50%",
        transform: `translate(calc(${activeIndex * 100}% + ${activeIndex * 10}px), -50%)`,
        transition: "transform 300ms cubic-bezier(.95,.03,1,1)"
      }}
      ></span>
        {priorities.map((p,index)=>(
          <button
          key={index}
          className={`relative px-1 z-10 font-medium text-sm ${
            activeIndex === index ? "text-[#3aafae]" : "text-gray-500"
          }`}
          onClick={()=>{
            setActiveIndex(index);
            setPriority(p.toLowerCase());
          }}
          >
            {p}
          </button>
        ))}
      
    </div>
  )
}

export default Filters