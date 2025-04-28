import React from 'react'

interface MainLayoutProps{
  children: React.ReactNode;
}

function MainLayout({children}: MainLayoutProps) {
  return (
    <div className='main-layout flex-1 bg-[#ededed] border-2 border-white dark:border-[#f9f9f9]/10 rounded-[1.5rem] overflow-auto'>{children}</div>
  )
}

export default MainLayout