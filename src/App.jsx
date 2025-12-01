import WalletConnect from "./components/WalletConnect";
import TaskItem from "./components/TaskItem";
import TaskInput from "./components/TaskInput";
// 1. IMPORT THE WEB3 PROVIDER
import { Web3Provider } from "./context/Web3Context"; 


const App = () => {

    return (
        // 2. WRAP THE ENTIRE APPLICATION CONTENT WITH THE PROVIDER
        <web3Provider> 
            
            {/* 🖼️ OUTER CONTAINER: Deep Blue Background and centering. */}
            <div className='bg-gradient-to-br from-blue-800 to-gray-900 min-h-screen flex justify-center items-center'>
                
                {/* 📋 MAIN CARD: The glass-effect container. */}
                <div className='w-[450px] p-8 bg-glass backdrop-blur-2xl rounded-xl shadow-[0px_4px_30px_rgba(0,0,0,0.5)]'>
                    
                    {/* 🏷️ HEADER SECTION: Title and wallet address display. */}
                    <div className='flex justify-between mb-6'>
                        <h1 className='text-2xl font-semibold text-white'>Todo DApp</h1>
                        <div className="text-xs text-grey-400">
                            <WalletConnect /> {/* This component can now access 'account' */}
                        </div>
                    </div>
                
                    <TaskItem />
                    {/* add task */}
                    <TaskInput />
                </div> 
            </div>
            
        </web3Provider>
    );
}

export default App;