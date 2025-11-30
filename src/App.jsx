import { useState,useEffect } from "react";
import { GiCheckMark } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import WalletConnect from "./components/WalletConnect";
import { contractAddress, abi } from "./constant";
import { ethers } from "ethers";


const App = () => {
    // 🗃️ STATE MANAGEMENT: Initialize the list of tasks.
  
        // { id: 1, description: 'task-1', isCompleted: true },
        // { id: 2, description: 'task-2', isCompleted: false },
        // { id: 3, description: 'task-3', isCompleted: false }

    
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [loading, setLoading] = useState(false);


    const loadTask = async ()=> {
        try{
      const contract = new ethers.Contract(contractAddress,abi,signer);
      const tasks = await contract.getTask();
      const taskArray = tasks.map((task)=>(
        {id:Number(task.id),
            description: task.description,
            isCompleted: task.isCompleted,
        }
      ));
      setTasks(taskArray);
        }
        catch(error){
            console.error(error);
        }
    }

    // 🔄 HANDLER: Function to toggle the 'isCompleted' status of a task.
    const toggleTask = async (id) => {
      try{
        if(signer){
      const contract = new ethers.Contract(contractAddress,abi,signer);
      const tx = await contract.toggleTask(id);
      await tx.wait();
      loadTask();
        }
        else{
            return;
        }

      }
      catch(error){
        console.error(error);
      }
    }

const addTask = async() =>{
    if(!newTask.trim() || loading)return;
    if (!signer) {
        console.error("MetaMask Not Connected: Signer is null.");
        alert("Please connect your wallet first!");
        return; 
    }
    setLoading(true);  // 👈 Set loading flag
    try{
      const contract = new ethers.Contract(contractAddress,abi,signer);
      const tx = await contract.addTodo(newTask);
      await tx.wait();
      loadTask();
      
    }catch(error){
        console.error(error);
    }
    setNewTask('');
    setLoading(false); // 👈 Clear loading flag
}


    // 🗑️ HANDLER: Function to delete a task (Placeholder).
const deleteTask = async(id)=>{
    try{
     const contract = new ethers.Contract(contractAddress,abi,signer);
     const tx = await contract.deleteTask(id);
     await tx.wait();
     loadTask();
    }
    catch(error){
        console.error(error);
    }
}
  useEffect(() => {
   if (signer) loadTask();
  }, [signer]);


    return (
        // 🖼️ OUTER CONTAINER: Deep Blue Background and centering.
        <div className='bg-gradient-to-br from-blue-800 to-gray-900 min-h-screen flex justify-center items-center'>
            
            {/* 📋 MAIN CARD: The glass-effect container. */}
            <div className='w-[450px] p-8 bg-glass backdrop-blur-2xl rounded-xl shadow-[0px_4px_30px_rgba(0,0,0,0.5)]'>
                
                {/* 🏷️ HEADER SECTION: Title and wallet address display. */}
                <div className='flex justify-between mb-6'>
                    <h1 className='text-2xl font-semibold text-white'>Todo DApp</h1>
                    <div className="text-xs text-grey-400">
              <WalletConnect setProvider={setProvider} setSigner={setSigner} />
            </div>
                </div>

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

                {/* add task */}
                <div className="mt-6 flex gap-2">
                    <input type="text" value={newTask} onChange={(e)=>setNewTask(e.target.value)}
                        placeholder = 'Add new task'
                        className="grow bg-white/40 rounded-lg px-3 py-2 " disabled={loading}  // 👈 Disable input while loading

                    />
                    <button className={`bg-red-600 cursor-pointer rounded-lg px-3 py-2 hover:bg-red-700 transition-colors duration-300 ease-in-out text-white text-s ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-red-600 hover:bg-redd-700 cursor-pointer"}`} onClick={addTask} disabled={loading}>
                        {loading ? 'Processing':'Add task'}
                        </button>
                </div>
            </div> 
        </div>
    );
}

export default App;