import React, {useState, useEffect} from 'react'
import SideBar from "../SideBar"
import TaskItem from '../TaskItem';
import { FaPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';


import "./index.css"

const Home = () => {
    const [searchInput, setSearchinput] = useState("")
    const [taskList, setTaskList] = useState([])

    const onChangeSearchInput = event => {
        setSearchinput(event.target.value)
    }

    const renderSearchInputField = () => {
        return(
            <>
                <input
                    type='search'
                    value={searchInput}
                    onChange={onChangeSearchInput}
                    placeholder='Search by status...'
                    className='search-input'
                />
            </>
        )
    }

    const getAllTasks = async () => {
        const url = "http://localhost:3004/tasks"

        const options = {
            method: "GET",
             headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }
        }
        const response = await fetch(url, options)
        if (response.ok === true){
            const data = await response.json()
            const updatedData = data.map(eachTask => ({
                id: eachTask.task_id,
                title: eachTask.title,
                description: eachTask.description,
                dueDate: eachTask.due_date,
                status: eachTask.status,
                createdAt: eachTask.created_at
            }))
            setTaskList(updatedData.reverse())
        }
    }

    useEffect (() => {
        getAllTasks()
    }, [])

     const searchResults = taskList.filter(eachTask => 
            eachTask.status.toLowerCase().includes(searchInput.toLowerCase()),
        )

  return (
    <div className='home-container'>
        <div className='side-bar-conatiner'>
            <SideBar />
        </div>
        <div className='tasks-container'>
            <div className='add-button-search-input-container'>
                <Link to="/add-task">
                    <button className='add-task-home-button'>
                        Add Task <FaPlus className='add-icon'/> 
                    </button>
                </Link>
                <div>{renderSearchInputField()}</div>
            </div>
            <ul className='task-item'>
                {searchResults.map(eachTaskItem => ((
                    <TaskItem taskDetails={eachTaskItem} key={eachTaskItem.id} getAllTasks={getAllTasks}/>
                )))}
            </ul>
        </div>
    </div>
  )
}

export default Home
