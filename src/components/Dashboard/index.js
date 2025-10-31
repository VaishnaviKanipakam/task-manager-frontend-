import { useState, useEffect } from "react";
import SideBar from "../SideBar";
import TaskItem from "../TaskItem";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { Link } from "react-router-dom";

import "./index.css";

const Dashboard = () => {
  const [searchInput, setSearchinput] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState("");

  const renderSearchInputField = () => {
    return (
      <>
        <input
          type="search"
          value={searchInput}
          onChange={(e) => setSearchinput(e.target.value)}
          placeholder="Search by status..."
          className="search-input"
        />
      </>
    );
  };

  const renderStatusFilterField = () => {
    return (
      <FormControl
        fullWidth
        style={{
          margin: "15px 0px 10px 0px",
        }}
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
        <InputLabel id="priority" style={{ fontFamily: "serif" }}>
          Priority
        </InputLabel>
        <Select
          labelId="Priority"
          id="priority"
          value={priorityFilter}
          label="Priority"
          onChange={(event) => setPriorityFilter(event.target.value)}
          style={{
            width: "150px",
            height: "50px",
            marginBottom: "10px",
            backgroundColor: "#F0F0F0",
            borderRadius: "12px",
          }}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </FormControl>
    );
  };

  const getAllTasks = async () => {
    const params = new URLSearchParams();
    if (searchInput) params.append("status", searchInput);
    if (priorityFilter) params.append("priority", priorityFilter);
    const url = `http://localhost:3004/get_tasks?${params.toString()}`;

    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, options);
    if (response.ok === true) {
      const data = await response.json();
      data.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
      const updatedData = data.map((eachTask) => ({
        taskId: eachTask.task_id,
        title: eachTask.title,
        description: eachTask.description,
        priority: eachTask.priority,
        dueDate: eachTask.due_date,
        status: eachTask.status,
        createdAt: eachTask.created_at,
      }));
      setTaskList(updatedData);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const searchResults = taskList.filter((eachTask) => {
    const statusMatch =
      !searchInput || eachTask.status.toLowerCase().includes(searchInput);
    const priorityMatch =
      !priorityFilter ||
      eachTask.priority.toLowerCase() === priorityFilter.toLowerCase();

    return statusMatch && priorityMatch;
  });

  return (
    <div className="home-container">
      <SideBar />
      <div className="tasks-container">
        <div className="add-button-search-input-container">
          <Link to="/add-task">
            <Button
              type="button"
              variant="contained"
              style={{
                backgroundColor: "#F0F0F0",
                color: "#000000",
                padding: "15px",
                borderRadius: "7px",
                fontWeight: "bold",
                marginTop: "20px",
                marginRight: "20px",
                width: "120px",
              }}
            >
              Add Task
            </Button>
          </Link>
          <div className="search-filter-container">
            {renderSearchInputField()}
            {renderStatusFilterField()}
          </div>
        </div>
        <ul className="task-item">
          {searchResults.map((eachTaskItem) => (
            <TaskItem
              taskDetails={eachTaskItem}
              key={eachTaskItem.taskId}
              getAllTasks={getAllTasks}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
