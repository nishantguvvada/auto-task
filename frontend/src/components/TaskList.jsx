import { ActionItems } from "./ActionItems";
import { useState, useEffect } from "react";
import axios from "axios";

export const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(()=>{
        try {
            const getTasks = async () => {
                const response = await axios.get("http://localhost:4000/sample");
                setTasks(response.data.response.action_items)
            }
            getTasks();
        } catch(err) {
            console.log(err)
        }
    }, [])

    return (
        <>
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Task List</h3>
            <ul className="w-[75%] text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {tasks ? tasks.map((task, index)=>{
                    return <ActionItems key={index} items={task}/>
                }) : <div>LOADING</div>}
            </ul>
        </>
    )
}