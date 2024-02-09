import { Task } from "./Task";
import "../styles/taskList.css";
import { useState } from "react";

export const TaskList = ({ tasks }) => {
  let [list, setList] = useState("one");

  return (
    <div>
      {/* <h2 className="tasksHeader">Tasks</h2> */}
      <div className="taskLists">
        <div className="backlog taskList">
          <h3>Backlog</h3>
          {tasks.map((task) =>
            !task.status ? (
              <Task
                key={task.description}
                task={task}
                list={list}
                setList={setList}
              />
            ) : null
          )}
        </div>

        <div className="inProgress taskList">
          <h3>In Progress</h3>

          {tasks.map((task) =>
            task.status == "in progress" ? (
              <Task
                key={task.description}
                task={task}
                list={list}
                setList={setList}
              />
            ) : null
          )}
        </div>
        <div className="completed taskList">
          <h3>Completed</h3>
          {tasks.map((task) =>
            task.status == "completed" ? (
              <Task
                key={task.description}
                task={task}
                list={list}
                setList={setList}
              />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};
