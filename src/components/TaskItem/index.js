import { useState } from "react";
import { HiHashtag } from "react-icons/hi";
import { MdOutlineDateRange } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

import "./index.css"

const TaskItem = props => {
    const {taskDetails, getAllTasks} = props
    const {taskId, title, description, dueDate, status, priority} = taskDetails

     const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email;
    console.log(email);
    handleClose();
  };


    const onDeleteTask = async () => {
        const url = `http://localhost:3004/tasks?id=${taskId}`
        
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
      <p className='name'>{description}</p>
        <div className='icon-name-content-cotainer'>
        <div className='icon-name-cotainer'>
            <HiHashtag className='icon'/>
            <p className='name'>ID</p>
        </div>
        <div>
           <p className='name'>{taskId}</p>
        </div>
      </div>
      <hr className='hr-line'/>

      <div className='icon-name-content-cotainer'>
        <div className='icon-name-cotainer'>
            <PriorityHighIcon style={{color: "#000000", fontSize: "15px"}}/>
            <p className='name'>Priority</p>
        </div>
        <div>
            <p className='name'>{priority}</p>
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
        {/* <Link 
        to={`/edit-task/${taskId}`} state= {{editDetails: taskDetails}}
        > */}
        <Button variant="outlined" onClick={handleClickOpen} style={{
            border: "none", color: "#000000"
        }}>
        <BorderColorOutlinedIcon className='edit-delete-icon'/>
      </Button>
            
        {/* </Link> */}

        <button type='button' className='delete-task-button' onClick={onDeleteTask}>
            <MdDeleteOutline className='edit-delete-icon'/>
        </button>
     </div>

     
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="status"
              name="status"
              label="Status"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="priority"
              name="priority"
              label="Priority"
              type="text"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Edit 
          </Button>
        </DialogActions>
      </Dialog>

    </li>
  )
}

export default TaskItem
