"use client";
import React from 'react';
import { useTasks } from '@/context/taskContext';

function DeleteConfirmationModal() {
  const { showDeleteModal, closeDeleteModal, taskToDelete, deleteTask } = useTasks();

  if (!showDeleteModal || !taskToDelete) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <span className="font-bold">{taskToDelete.title}</span>?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={closeDeleteModal}
            className="px-4 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log("Modal rendered", { taskToDelete }); // Add this line
              deleteTask(taskToDelete._id);
              closeDeleteModal();
            }}
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
