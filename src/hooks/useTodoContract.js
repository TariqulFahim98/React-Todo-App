import React, { useContext, useEffect, useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { contractAddress, abi } from '../constant';
import { Web3Context } from '../context/Web3Context';
  
const useTodoContract = () => {
    // FIX 1: Destructure the signer from the context object
    const { signer } = useContext(Web3Context);

    const [tasks, setTasks] = useState([]);

    // 1. Memoize getContract
    const getContract = useCallback(() => {
        // Now 'signer' is the correct Ethers Signer object
        if (!signer) return null;
        // abi is correctly imported from '../constant'
        return new ethers.Contract(contractAddress, abi, signer);
    }, [signer]); // Depends only on the Ethers signer object

    // 2. Memoize loadTask
    const loadTask = useCallback(async () => {
        const contract = getContract();
        if (!contract) {
            setTasks([]); // Clear tasks if disconnected
            return;
        }

        try {
            const tasks = await contract.getTask();
            const taskArray = tasks.map((task) => ({
                id: Number(task.id),
                description: task.description,
                isCompleted: task.isCompleted
            }));
            setTasks(taskArray);
        } catch (error) {
            console.error("Error loading tasks:", error);
        }
    }, [getContract]); // Depends only on the memoized getContract

    // 3. Memoize addTask and reload tasks afterward
    const addTask = useCallback(async (text) => {
        const contract = getContract();
        if (!contract) return;
        try {
            const tx = await contract.addTodo(text);
            await tx.wait();
            await loadTask(); // Reload tasks after successful transaction
        } catch (error) {
            console.error("Error adding task:", error);
        }
    }, [getContract, loadTask]); // Depends on memoized functions

    // 4. Memoize toggleTask and reload tasks afterward
    const toggleTask = useCallback(async (id) => {
        const contract = getContract();
        if (!contract) return;
        try {
            const tx = await contract.toggleTask(id);
            await tx.wait();
            await loadTask(); // Reload tasks after successful transaction
        } catch (error) {
            console.error("Error toggling task:", error);
        }
    }, [getContract, loadTask]);

    // 5. Memoize deleteTask and reload tasks afterward
    const deleteTask = useCallback(async (id) => {
        const contract = getContract();
        if (!contract) return;
        try {
            const tx = await contract.deleteTask(id);
            await tx.wait();
            await loadTask(); // Reload tasks after successful transaction
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }, [getContract, loadTask]);


    // FIX 2 & 3: useEffect depends only on loadTask and only runs when signer changes/is available
    useEffect(() => {
        if (signer) {
            loadTask();
        }
    }, [loadTask, signer]); // Run when loadTask changes or signer changes/connects
    
    return { tasks, addTask, toggleTask, loadTask, deleteTask };
}

export default useTodoContract;