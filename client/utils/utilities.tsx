import { create } from "domain";
import moment from "moment";
import { Task } from "./types";

export const formatTime = (createdAt: string) =>{
  const now = moment();
  const created = moment(createdAt);

  //if the task is created today
  if (created.isSame(now, "day")) {
    return "Today";
  }

  //if the task was created yesterday
  if (created.isSame(now.subtract(1, "days"), "day")) {
    return "Yesterday";
  }

  //check if created within last 7 days
  if (created.isAfter(moment().subtract(6, "days"))) {
    // return created.fromNow();
    return created.fromNow();
  }

  //if the item was created within the last four weeks (upto 1 month)
  if (created.isAfter(moment().subtract(3, "weeks"), "week")) {
    return created.fromNow();
  }

  return created.format("DD/MM/YYYY");
};

export const filteredTasks = (tasks: Task[], priority: string) => {
  const filteredTasks = ()=>{
    switch (priority){
      case "low": 
        return tasks.filter((task)=> task.priority === "low");
      case "medium":
        return tasks.filter((task)=> task.priority === "medium");
      case "high":
        return tasks.filter((task)=> task.priority === "high");
      default:
        return tasks;
    }
    // const filtered = tasks.filter(task => task.priority === "high");
    // return filtered;
  };

  return filteredTasks();
};

export const overdueTasks = (tasks: Task[])=>{
  const todayDate = moment();

  //filter tasks that are not completed and the due date is before today

  return tasks.filter((task)=>{
    return !task.completed && moment(task.dueDate).isBefore(todayDate);
  })
}