import React, {useState} from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import "./index.css"

const EditTask = () => {
     const location = useLocation()
    const {id} = useParams()
    const {editDetails} = location.state || {}
    
    const [editTitle, setEditTitle] = useState(editDetails.title)
      const [editDescription, setEditDescription] = useState(editDetails.description)
      const [editPriority, setEditPriority] = useState(editDetails.priority)
      const [editDueDate, setEditDueDate] = useState(editDetails.dueDate)
      const [editStatus, setEditStatus] = useState(editDetails.status)
      const [message, setMessage] = useState("")
      const [errMsg, setErrMsg] = useState(false)
    
      const onChangeTitle = event => {
        setEditTitle(event.target.value)
      }
    
      const onChangeDescription = event => {
        setEditDescription(event.target.value)
      }
    
      const onChaneDueDate = event => {
        setEditDueDate(event.target.value)
      }
    
      const onChangeStatus = event => {
        setEditStatus(event.target.value)
      }
    
    
      const renderTitleField = () => {
          return(
           <>
                <label htmlFor="title" className="edit-task-lable">Title</label>
                <br />
                <input 
                  id='title'
                  type='text'
                  className='edit-task-input'
                  value={editTitle}
                  onChange={onChangeTitle}
                  placeholder='Title...'
                />
            </>
          )
      }
    
      const renderDescriptionField = () => {
          return(
           <>
                <label htmlFor="description" className="edit-task-lable">Description</label>
                <br />
                <input 
                  id='description'
                  type='text'
                  className='edit-task-input'
                  value={editDescription}
                  onChange={onChangeDescription}
                  placeholder='Description...'
                />
            </>
          )
      }
    
      const renderDueDateField = () => {
          return(
           <>
                <label htmlFor="date" className="edit-task-lable">Due date</label>
                <br />
                <input 
                  id='date'
                  type='date'
                  className='edit-task-input'
                  value={editDueDate}
                  onChange={onChaneDueDate}
                />
            </>
          )
      }

    
      const renderStatusField = () => {
          return(
           <>
                <label htmlFor="status" className="edit-task-lable">Status</label>
                  <br />
                <select name="status" id="status"  className='edit-task-input' value={editStatus}  onChange={onChangeStatus}>
                  <option className='option' value="todo">Todo</option>
                  <option className='option' value="in-progress">In-progress</option>
                  <option className='option' value="done">Done</option>
                </select>
            </>
          )
      }

         const onSubmitEditForm = async event => {
                event.preventDefault()
                const editTaskDetails = {editTitle, editDescription, editStatus, editDueDate} 
                const url = `http://localhost:3004/tasks?id=${id}`

                const options = {
                    method: "PUT",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        },
                    body: JSON.stringify(editTaskDetails)
                }
                
                const response = await fetch(url, options)
                if(response.ok === true){
                    const data = await response.json()
                    setMessage(data)
                    setErrMsg(false)
                    setEditTitle("")
                    setEditDescription("")
                    setEditDueDate("")
                    setEditStatus("")
                }else if (response.ok === false){
                    const data = await response.json()
                    setMessage(data)
                    setErrMsg(true)
                }
            }

        const errMsgClassname = errMsg ? "error-message" : "success-message"

      

   return (
     <div className='edit-task-container'>
      <h1 className='edit-task-heading'>Edit Task</h1>
      <form onSubmit={onSubmitEditForm}>
        <div>{renderTitleField()}</div>
        <div>{renderDescriptionField()}</div>
        <div>{renderDueDateField()}</div>
        <div>{renderStatusField()}</div>
        <div className='edit-task-button-container'>
          <button type='submit' className='edit-task-button'>
            Edit Task
          </button>
          <Link to="/">
            <button type='button' className='edit-task-button'>Back</button>
          </Link>
        </div>
         <p className={`${errMsgClassname} `}>{message}</p>
      </form>
    </div>
  )
}

export default EditTask
