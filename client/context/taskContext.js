import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import { useUserContext } from './userContext';
import { toast } from 'react-hot-toast';
import { edit } from '@/utils/icons';


const TasksContext = createContext();

// const serverUrl = "http://localhost:8000/api/v1";
const serverUrl = "https://monitr-ayyp.onrender.com/api/v1";


export const TasksProvider = ({children})=>{
  const userId = useUserContext().user._id
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState({});
  const [priority, setPriority] = useState("all");
  const [isEditing, setIsEditing] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [modalMode, setModalMode] = useState("");
  const [profileModal, setProfileModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const openModalForAddTask = () =>{
    setModalMode("add");
    setIsEditing(true);
    setTask({});
  };

  const openModalForEditTask = (task) =>{
    setModalMode("edit")
    setIsEditing(true);
    setActiveTask(task);
  };

  const openProfileModal = ()=>{
    setProfileModal(true);
  }

  const closeModal = ()=>{
    setIsEditing(false);
    setProfileModal(false);
    setModalMode("");
    setActiveTask(null);
    setTask({});
  }

  //get tasks
  const getTasks = async()=>{
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/tasks`);
      // const data = await response.json();
      setTasks(response.data.tasks);
      console.log("Tasks response:", response.data);
      console.log("Sample Task:", response.data.tasks[0]);

    } catch (error) {
      console.log("Error getting the tasks ",error);
    }
    setLoading(false);
  };

  //get task
  const getTask = async(taskId)=>{
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/task/${taskId}`);
      setTask(response.data)
    } catch (error) {
      console.log("Error getting task", error);
    }
    setLoading(false);
  }

  //create task
  const createTask = async(task)=>{
    setLoading(true);
    try {
      const res = await axios.post(`${serverUrl}/task/create`, task);

      console.log("Task Created", res.data);

      setTasks([...tasks, res.data]);
      toast.success("Task created successfully");
      // getTask();
    } catch (error) {
      console.log("Error creating task", error);

      if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message); // 👈 Show backend error (like duplicate)
    } else {
      toast.error("Something went wrong while creating the task");
    }
    };
    setLoading(false);
  };
  
  const updateTask = async (task) => {
    setLoading(true);
    try {
      const res = await axios.patch(`${serverUrl}/task/${task._id}`, task);
      // setTasks(task.map((t)=>(t._id === task.id ? res.data : t)));
      
      //update the tasks in the task array
      const newTasks = tasks.map((tsk)=>{
        return tsk._id === res.data._id ? res.data : tsk;
      });

      toast.success("Task updated successfully");      

      setTasks(newTasks);
    } catch (error) {
      console.log("Error updating task", error);

      if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message); // 👈 Backend message (e.g. duplicate title)
    } else {
      toast.error("Something went wrong while updating the task");
    }
    };
    // setLoading(false);
  };

  const deleteTask = async (taskId)=>{
    setLoading(true);
    try {
      await axios.delete(`${serverUrl}/task/${taskId}`);

      const newTasks = tasks.filter((tsk)=> tsk._id !== taskId);

      setTasks(newTasks);

      toast.success("Task deleted successfully");
    } catch (error) {
      console.log("Error deleting stock", error);
      toast.error("Failed to delete task");
    };
    setLoading(false);
  };

  const openDeleteModal = (task) => {
  setTaskToDelete(task); // ✅ correct task object
  setShowDeleteModal(true);
};

  const closeDeleteModal = () => {
  setTaskToDelete(null);
  setShowDeleteModal(false);
};

  const handleInput = (name) => (e) => {
  if (name === "setTask") {
    setTask(e);
  } else {
    let value = e.target.value;

    // ✅ Convert string to boolean only for "completed"
    if (name === "completed") {
      value = value === "true";
    }

    setTask({ ...task, [name]: value });
  }
  };
  // const handleInput = (name) => (e)=>{
  //   if (name === "setTask") {
  //     setTask(e);
  //   } else {
  //     setTask({...task, [name]: e.target.value});
  //   }
  // };

  //get completed tasks
  const completedTasks = tasks.filter((task)=> task.completed);

  //get pending tasks
  const activeTasks = tasks.filter((task)=> !task.completed);

  useEffect(()=>{
    setTasks([]);
    getTasks();
    // getTask("");
  }, [userId])

  return (
    <TasksContext.Provider 
    value={{
      tasks,
      loading,
      task,
      getTask,
      createTask,
      updateTask,
      deleteTask,
      priority,
      setPriority,
      handleInput,
      isEditing,
      setIsEditing,
      openModalForAddTask,
      openModalForEditTask,
      activeTask,
      closeModal,
      modalMode,
      openProfileModal,
      openDeleteModal,
      closeDeleteModal,
      activeTasks,
      completedTasks,
      profileModal,
      showDeleteModal,           
      taskToDelete               
      }}>
      {children}
    </TasksContext.Provider>
  )
};

export const useTasks = ()=>{
  return React.useContext(TasksContext);
};  