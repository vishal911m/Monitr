import React, { RefObject, useEffect } from 'react'

interface DetectOutsideProps{
  ref: RefObject<HTMLDivElement>,
  callback: ()=> void
}

function useDetectOutside({ref, callback}: DetectOutsideProps) {
  useEffect(()=>{
    //handler to detect clicks outside ref
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current?.contains(event?.target)) {
        callback();
      }
    };

    //add event listener
    document.addEventListener("mousedown", handleClickOutside);

    //cleanup 
    return ()=>{
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback])
  return (
    <div>useDetectOutside</div>
  )
}

export default useDetectOutside