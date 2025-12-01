import React, { useState } from "react";
import useTodoContract from "../hooks/useTodoContract";

const TaskInput = () => {
  const { addTask, loading } = useTodoContract();
  const [newTask, setNewTask] = useState("");

  return (
    <div>
      <div className="mt-6 flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
          disabled={loading}
          className="grow bg-white/40 rounded-lg px-3 py-2"
        />

        <button
          onClick={() => addTask(newTask)}
          disabled={loading || newTask.trim() === ""}
          className={`rounded-lg px-3 py-2 text-white transition 
            ${loading ? "bg-gray-500 cursor-not-allowed" 
                      : "bg-red-600 hover:bg-red-700 cursor-pointer"}`}
        >
          {loading ? "Processing..." : "Add Task"}
        </button>
      </div>
    </div>
  );
};

export default TaskInput;
