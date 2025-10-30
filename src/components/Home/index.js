import React, { useState, useEffect } from "react";
import SideBar from "../SideBar";
import TaskItem from "../TaskItem";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";

import "./index.css";

const Home = () => {
  const [searchInput, setSearchinput] = useState("");
  const [taskList, setTaskList] = useState([]);
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

  const getAllTasks = async () => {
    const url = "http://localhost:3004/get_tasks";

    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, options);
    console.log("43Home", response);
    if (response.ok === true) {
      const data = await response.json();
      data.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
      console.log("43HomeData", data);
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

  const searchResults = taskList.filter((eachTask) =>
    eachTask.status.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="home-container">
      <div className="side-bar-conatiner">
        <SideBar />
      </div>
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
          <div>{renderSearchInputField()}</div>
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

export default Home;
