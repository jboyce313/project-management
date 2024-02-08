import React from "react";

export const TaskList = ({ tasks }) => {
  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <p>Description: {task.description}</p>
            <p>Assigned To: {task.assignedTo}</p>
            <p>Due Date: {task.dueDate}</p>
            <p>Estimated Duration: {task.estimatedDuration}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
