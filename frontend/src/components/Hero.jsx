import { Summary } from './Summary.jsx'
import { Calendar } from './Calendar.jsx'
import { useState, useEffect } from 'react';
import axios from "axios";

export const Hero = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [tasks, setTasks] = useState([]);

    const handleDateSelect = (date) => setSelectedDate(date);

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
            <div className="mt-24 h-full flex flex-row justify-evenly items-center gap-4">
                <Summary totalTasks={7} completedTasks={4} pendingTasks={3} />
                <Calendar 
                    tasksByDate={tasks}
                    selectedDate={selectedDate}
                    onDateSelect={handleDateSelect}
                />
            </div>
        </>
    )
}