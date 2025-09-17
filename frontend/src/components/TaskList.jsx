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
            <div className="m-8 h-full flex flex-col gap-4 justify-center items-center bg-card border backdrop-blur-sm border-dotted border-b-2 border-border rounded-xl p-6 shadow-lg shadow-primary/5">
                <h2 className="text-3xl font-semibold transition-colors duration-200">Task List</h2>
                <ul className="w-[75%] pb-4">
                    {tasks.length > 0 ? (
                        tasks.map((task, index) => (
                        <ActionItems key={task.id || index} items={task} />
                        ))
                    ) : (
                        <div className="text-center p-4 text-gray-500">Loading...</div>
                    )}
                </ul>
            </div>
        </>
    )
}