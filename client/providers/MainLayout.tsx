"use client"
import DeleteConfirmationModal from '@/app/Components/DeleteConfirmationModal/DeleteConfirmationModal';
import Modal from '@/app/Components/Modal/Modal';
import ProfileModal from '@/app/Components/Profile/ProfileModal';
import { useTasks } from '@/context/taskContext';
import React from 'react'

interface MainLayoutProps{
  children: React.ReactNode;
}

function MainLayout({children}: MainLayoutProps) {
  const {isEditing, profileModal, showDeleteModal } = useTasks();
  return (
    <div className='MainLayout main-layout flex-1 bg-[#ededed] border-2 border-white dark:border-[#f9f9f9]/10 rounded-[1.5rem] overflow-auto'>
      {isEditing && <Modal />}
      {profileModal && <ProfileModal /> }
      {showDeleteModal && <DeleteConfirmationModal />}
      {children}
    </div>
  )
}

export default MainLayout