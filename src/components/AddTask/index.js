import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import "./index.css"
 
const AddTask = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [status, setStatus] = useState("Todo")
  const [message, setMessage] = useState("")
  const [errMsg, setErrMsg] = useState(false)

  const onChangeTitle = event => {
    setTitle(event.target.value)
  }

  const onChangeDescription = event => {
    setDescription(event.target.value)
  }

  const onChaneDueDate = event => {
    setDueDate(event.target.value)
  }

  const onChangeStatus = event => {
    setStatus(event.target.value)
  }


  const renderTitleField = () => {
      return(
       <>
            <label htmlFor="title" className="add-task-lable">Title</label>
            <br />
            <input 
              id='title'
              type='text'
              className='add-task-input'
              value={title}
              onChange={onChangeTitle}
              placeholder='Title...'
            />
        </>
      )
  }

  const renderDescriptionField = () => {
      return(
       <>
            <label htmlFor="description" className="add-task-lable">Description</label>
            <br />
            <input 
              id='description'
              type='text'
              className='add-task-input'
              value={description}
              onChange={onChangeDescription}
              placeholder='Description...'
            />
        </>
      )
  }

  const renderDueDateField = () => {
      return(
       <>
            <label htmlFor="date" className="add-task-lable">Due date</label>
            <br />
            <input 
              id='date'
              type='date'
              className='add-task-input'
              value={dueDate}
              onChange={onChaneDueDate}
            />
        </>
      )
  }

  const renderStatusField = () => {
      return(
       <>
            <label htmlFor="status" className="add-task-lable">Status</label>
              <br />
            <select name="status" id="status"  className='add-task-input' value={status}  onChange={onChangeStatus}>
              <option className='option' value="todo">Todo</option>
              <option className='option' value="in-progress">In-progress</option>
              <option className='option' value="done">Done</option>
            </select>
        </>
      )
  }

  const onSubmitAddTaskForm = async event => {
    event.preventDefault()
     const taskDetails =  {title, description, status, dueDate}
     const url = "http://localhost:3004/tasks"

     const options = {
      method: "POST",
       headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskDetails),
     }

     const response = await fetch(url, options)
     if (response.ok === true){
      const data = await response.json()
      setTitle("")
      setDescription("")
      setDueDate("")
      setStatus("")
      setMessage(data)
      setErrMsg(false)
     }else if (response.ok === false){
        const data = await response.json()
          setMessage(data)
          setErrMsg(true)
     }
  }

  const errMsgClassname = errMsg ? "error-message" : "success-message"



  return (
    <div className='add-task-container'>
      <h1 className='add-task-heading'>Add Task</h1>
      <form onSubmit={onSubmitAddTaskForm}>
        <div>{renderTitleField()}</div>
        <div>{renderDescriptionField()}</div>
        <div>{renderDueDateField()}</div>
        <div>{renderStatusField()}</div>
        <div className='add-task-button-container'>
          <button type='submit' className='add-task-button'>
            Add Task
          </button>
          <Link to="/">
            <button type='button' className='add-task-button'>Back</button>
          </Link>
        </div>
         <p className={`${errMsgClassname} `}>{message}</p>
      </form>
    </div>
  )
}

export default AddTask
