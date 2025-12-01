
import { GiCheckMark } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import useTodoContract from "../hooks/useTodoContract";

const TaskItem = () => {
  const {tasks,toggleTask,deleteTask} =useTodoContract();
  return (
    <div>
                      {/* 📜 TASK LIST SECTION: Holds the list of tasks. */}
                <div className='space-y-3'>
                    <h2 className='text-gray-400 mb-2 text-sm'>tasks</h2>
                    
                    {/* Map over the tasks array to render each item. */}
                    {
                        tasks.map((task) => (
                            <div key={task.id}>
                                
                                {/* 🎯 TASK ITEM ROW: Added HOVER EFFECT & TRANSITION */}
                                <div className={`
                                    flex items-center justify-between px-4 py-3 rounded-lg m-3 shadow-lg 
                                    transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-xl
                                    ${task.isCompleted 
                                        ? 'bg-gradient-to-br from-blue-900/40 to-blue-600/60' 
                                        : 'bg-gray-700/50 hover:bg-gray-700/70' // Slightly brighter hover for incomplete tasks
                                    }
                                `}>
                                    
                                    <div className="flex items-center space-x-4">
                                        
                                        {/* CHECKBOX/TOGGLE BUTTON */}
                                        <div 
                                            // Added TRANSITION and HOVER EFFECT for scale
                                            className={`
                                                w-6 h-6 flex justify-center items-center rounded-lg shadow-[0px_4px_30px_rgba(0,0,0,0.1)] 
                                                cursor-pointer transition duration-200 hover:scale-110
                                                ${task.isCompleted 
                                                    ? 'bg-blue-500 border-blue-700' 
                                                    : 'border border-blue-400 bg-gray-500/10'
                                                } 
                                            `}
                                            onClick={() => toggleTask(task.id)}
                                        >
                                            {/* Render checkmark only if the task is completed. */}
                                            {task.isCompleted 
                                                ? <GiCheckMark className="text-white" /> 
                                                : ''
                                            }
                                        </div>
                                        
                                        {/* TASK DESCRIPTION */}
                                        <div className={`text-lg ${task.isCompleted ? 'text-gray-400 line-through' : 'text-gray-200'}`}>
                                            {task.description}
                                        </div>
                                    </div>
                                    
                                    {/* 🗑️ DELETE BUTTON: Icon Size Increased and Hover Added */}
                                    <div onClick={() => deleteTask(task.id)}>
                                        <MdDelete 
                                            // Increased size to text-2xl and added hover effects
                                            className="text-2xl text-red-500 hover:text-red-400 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110" 
                                        />
                                    </div>
                                    
                                </div>
                            </div>
                        ))
                    }
                </div>
    </div>
  )
}

export default TaskItem
