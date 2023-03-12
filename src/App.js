import "./App.css";
import { useState, useRef } from "react";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [currentList, setCurrentList] = useState("");

  const inputTask = useRef(null);

  const AddTask = () => {
    setTodoList([...todoList, { task: currentList, completed: false }]);
    inputTask.current.value = "";
    setCurrentList("");
  };
  const deleteTask = (taskToDelete) => {
    setTodoList(
      todoList.filter((item) => {
        return item.task !== taskToDelete;
      })
    );
  };

  const completeTask = (taskToComplete) => {
    setTodoList(
      todoList.map((taskItem) => {
        return taskItem.task == taskToComplete
          ? { task: taskToComplete, completed: true }
          : {
              task: taskItem.task,
              completed: taskItem.completed ? true : false,
            };
      })
    );
  };

  return (
    <div className="App">
      <h1>ToDo List</h1>
      <div>
        <input
          ref={inputTask}
          type="text"
          onKeyDown={(event) => {
            if (event.keyCode == 13) {
              AddTask();
            }
          }}
          placeholder="Task...."
          onChange={(event) => {
            setCurrentList(event.target.value);
          }}
        />
        <button onClick={AddTask}>Add Task</button>
      </div>
      <hr />
      <ul>
        {todoList.map((val, key) => {
          return (
            <div id="task">
              <li key={key}>{val.task}</li>
              <button onClick={() => completeTask(val.task)}>Completed</button>
              <button onClick={() => deleteTask(val.task)}>X</button>
              {val.completed ? <h2>Task completed</h2> : <h2>Not completed</h2>}
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
