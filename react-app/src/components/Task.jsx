import { useState } from "react";
import "../styles/task.css";

export function Task({ task, list, setList }) {
  console.log(task);
  let [status, setStatus] = useState(task.status);
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

  return (
    <div className="task">
      <p>{task.description}</p>
      {!task.status ? <button onClick={changeStatus}>Grab</button> : null}
      {task.status == "in progress" ? (
        <p className="assignedTo">{task.assignedTo}</p>
      ) : null}
      {task.status == "in progress" ? (
        <button onClick={changeStatus}>Mark Complete</button>
      ) : null}

      {task.status == "completed" ? (
        <button onClick={changeStatus}>Reopen</button>
      ) : null}
    </div>
  );
}
