import { useState } from "react";
import { Reorder } from "framer-motion";

export default function ToDoList() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>(""); //currently editing tasks

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTask(e.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index: number) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index: number) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index: number) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }
  return (
    <>
      <div className="to-do-list">
        <h1>TO-DO-LIST</h1>
        <div>
          <input
            type="text"
            placeholder="Enter a task"
            value={newTask}
            onChange={handleInputChange}
          />
          <button className="add-btn" onClick={addTask}>
            Add
          </button>
        </div>

        <ol>
          <Reorder.Group values={tasks} onReorder={setTasks}>
          {tasks.map((task, index) => (
            <Reorder.Item value={task} key={task}>
            <li key={index}>
              <span className="text">{task}</span>
              <button className="delete-btn" onClick={() => deleteTask(index)}>
                Delete
              </button>
              <button className="move-btn" onClick={() => moveTaskUp(index)}>
                👆
              </button>
              <button className="move-btn" onClick={() => moveTaskDown(index)}>
                👇
              </button>
            </li>
            </Reorder.Item>
          ))}
          </Reorder.Group>
        </ol>
      </div>
    </>
  );
}
