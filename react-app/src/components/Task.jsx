import { useEffect, useState } from "react";
import "../styles/task.css";

export function Task({ task, list, setList }) {
  let [deleted, setDeleted] = useState(1);
  let [status, setStatus] = useState(task.status);

  // useEffect(() => {
  //   setDeleted(deleted == "one" ? "two" : "one");
  // }, [list]);

  function changeStatus() {
    if (task.status == "in progress") {
      task.status = "completed";
      setStatus(task.status);
    } else if (task.status == "completed") {
      task.status = null;
      setStatus(task.status);
    } else {
      task.status = "in progress";
      setStatus(task.status);
    }
    setList(list === "one" ? "two" : "one");
  }

  async function handleClick() {
    task.status = "deleted";
    setList(list === "one" ? "two" : "one");

    deleteTask();
  }

  async function deleteTask() {
    const url = `/api/tasks/${task._id}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error deleting task");
      }

      const responseData = await response.json();
      console.log(responseData);

      return responseData; // Assuming your server responds with some data upon successful login
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }

  return (
    <>
      <div className="task">
        <p>{task.description}</p>

        {!task.status ? <button onClick={changeStatus}>Start</button> : null}

        {task.status == "in progress" ? (
          <button onClick={changeStatus}>Mark Complete</button>
        ) : null}

        {task.status == "completed" ? (
          <button onClick={changeStatus}>Reopen</button>
        ) : null}
        {localStorage.getItem("isManager") == "true" ? (
          <button className="delete" onClick={handleClick}>
            Delete
          </button>
        ) : null}
      </div>
      <div className="taskDetails hidden">
        <p>Assigned to: {task.assignedTo}</p>
        <p>Due date: {task.dueDate}</p>
        <p>Estimated time: {task.estimatedDuration}</p>
      </div>
    </>
  );
}
