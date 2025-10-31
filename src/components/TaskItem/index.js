import { useState } from "react";
import { HiHashtag } from "react-icons/hi";
import { MdOutlineDateRange } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import "./index.css";

const TaskItem = (props) => {
  const { taskDetails, getAllTasks } = props;
  const { taskId, title, description, dueDate, status, priority } = taskDetails;
  const [editPriority, setEditPriority] = useState(priority);
  const [editStatus, setEditStatus] = useState(status);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitEditForm = async (event) => {
    event.preventDefault();
    const editTaskDetails = { editPriority, editStatus };

    const url = `http://localhost:3004/edit_tasks?task_id=${taskId}`;

    const options = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editTaskDetails),
    };
    const response = await fetch(url, options);
    if (response.ok === true) {
      getAllTasks();
    }
    handleClose();
  };

  const onDeleteTask = async () => {
    const url = `http://localhost:3004/tasks?task_id=${taskId}`;

    const options = {
      method: "DELETE",
    };

    const response = await fetch(url, options);
    if (response.ok === true) {
      getAllTasks();
    }
  };

  return (
    <li className="list-item-container">
      <h3>{title}</h3>
      <p className="name">{description}</p>
      <div className="icon-name-content-cotainer">
        <div className="icon-name-cotainer">
          <HiHashtag className="icon" />
          <p className="name">ID</p>
        </div>
        <div>
          <p className="name">{taskId}</p>
        </div>
      </div>
      <hr className="hr-line" />

      <div className="icon-name-content-cotainer">
        <div className="icon-name-cotainer">
          <PriorityHighIcon style={{ color: "#000000", fontSize: "15px" }} />
          <p className="name">Priority</p>
        </div>
        <div>
          <p className="name">{priority}</p>
        </div>
      </div>
      <hr className="hr-line" />
      <div className="icon-name-content-cotainer">
        <div className="icon-name-cotainer">
          <MdOutlineDateRange className="icon" />
          <p className="name">Due Date</p>
        </div>
        <div>
          <p className="name">{dueDate}</p>
        </div>
      </div>
      <hr className="hr-line" />
      <div className="icon-name-content-cotainer">
        <div className="icon-name-cotainer">
          <GiNotebook className="icon" />
          <p className="name">Status</p>
        </div>
        <div>
          <p className="name">{status}</p>
        </div>
      </div>
      <hr className="hr-line" />
      <div className="edit-delete-icon-container">
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          style={{
            border: "none",
            color: "#000000",
          }}
        >
          <BorderColorOutlinedIcon
            style={{ fontSize: "23px", color: "#000000" }}
          />
        </Button>

        <Button
          type="button"
          style={{
            border: "none",
            color: "#000000",
          }}
          onClick={onDeleteTask}
        >
          <DeleteOutlineOutlinedIcon
            style={{ fontSize: "23px", color: "#000000" }}
          />
        </Button>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <form onSubmit={onSubmitEditForm} id="edit-form">
            <FormControl
              fullWidth
              sx={{
                margin: "10px 0px 10px 0px",
                "& .MuiInputLabel-root": {
                  color: "gray",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#000000",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray",
                    border: "1.5px solid gray",
                    borderRadius: "12px",
                  },
                  "&:hover fieldset": {
                    borderColor: "black",
                    border: "1.5px solid #000000",
                    borderRadius: "12px",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#000000",
                    border: "1.5px solid gray",
                    borderRadius: "12px",
                  },
                },
              }}
            >
              <InputLabel id="editStatus" style={{ fontFamily: "serif" }}>
                Edit Status
              </InputLabel>
              <Select
                labelId="editStatus"
                id="editStatus"
                value={editStatus}
                label="Edit Status"
                onChange={(event) => setEditStatus(event.target.value)}
                style={{
                  width: "304px",
                  height: "68px",
                  marginBottom: "10px",
                }}
              >
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Done">Done</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              fullWidth
              sx={{
                "& .MuiInputLabel-root": {
                  color: "gray",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#000000",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray",
                    border: "1.5px solid gray",
                    borderRadius: "12px",
                  },
                  "&:hover fieldset": {
                    borderColor: "black",
                    border: "1.5px solid #000000",
                    borderRadius: "12px",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#000000",
                    border: "1.5px solid gray",
                    borderRadius: "12px",
                  },
                },
              }}
            >
              <InputLabel id="editPriority" style={{ fontFamily: "serif" }}>
                Edit Priority
              </InputLabel>
              <Select
                labelId="editPriority"
                id="editPriority"
                value={editPriority}
                label="Edit Priority"
                onChange={(event) => setEditPriority(event.target.value)}
                style={{
                  width: "304px",
                  height: "68px",
                  marginBottom: "10px",
                }}
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="edit-form">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </li>
  );
};

export default TaskItem;
