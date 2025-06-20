import React from 'react'
import { HiHashtag } from "react-icons/hi";
import { MdOutlineDateRange } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from 'react-router-dom';

import "./index.css"

const TaskItem = props => {
    const {taskDetails, getAllTasks} = props
    const {id, title, description, dueDate, status} = taskDetails

    const onDeleteTask = async () => {
        const url = `http://localhost:3004/tasks?id=${id}`
        
        const options = {
            method: "DELETE",
        }

        const response = await fetch(url, options)
        if(response.ok === true){
            getAllTasks()
        }
    }


  return (
    <li className='list-item-container'>
      <h3>{title}</h3>
        <div className='icon-name-content-cotainer'>
        <div className='icon-name-cotainer'>
            <HiHashtag className='icon'/>
            <p className='name'>ID</p>
        </div>
        <div>
           <p className='name'>{id}</p>
        </div>
      </div>
      <hr className='hr-line'/>
      <div className='icon-name-content-cotainer'>
        <div className='icon-name-cotainer'>
            <MdOutlineDateRange className='icon'/>
            <p className='name'>Due Date</p>
        </div>
        <div>
            <p className='name'>{dueDate}</p>
        </div>
      </div>
      <hr className='hr-line'/>
      <div className='icon-name-content-cotainer'>
        <div className='icon-name-cotainer'>
            <GiNotebook className='icon'/>
            <p className='name'>Status</p>
        </div>
        <div>
            <p className='name'>{status}</p>        
        </div>
      </div>
      <hr className='hr-line'/>
     <div className='edit-delete-icon-container'>
        <Link 
        to={`/edit-task/${id}`} state= {{editDetails: taskDetails}}
        >
            <AiOutlineEdit className='edit-delete-icon'/>
        </Link>
        <button type='button' className='delete-task-button' onClick={onDeleteTask}>
            <MdDeleteOutline className='edit-delete-icon'/>
        </button>
     </div>
    </li>
  )
}

export default TaskItem
