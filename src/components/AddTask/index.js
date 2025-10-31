import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import { inputLabelClasses } from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

import "./index.css";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [result, setResult] = useState();

  const renderTitleField = () => {
    return (
      <TextField
        id="title"
        label="Title"
        variant="outlined"
        value={title}
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{
          width: "304px",
          height: "68px",
          marginBottom: "10px",
        }}
        InputLabelProps={{
          sx: {
            color: "gray",
            fontFamily: "serif",
            [`&.${inputLabelClasses.shrink}`]: {
              color: "#000000",
              fontFamily: "serif",
            },
          },
        }}
        sx={{
          ".MuiOutlinedInput-root": {
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            input: {
              fontFamily: "serif",
              fontWeight: 400,
              fontStyle: "Regular",
              fontSize: "16px",
              lineHeight: "34px",
              letterSpacing: "0%",
              textAlign: "center",
              color: "#000000",
            },
            fieldSet: {
              border: "1.5px solid gray",
              borderRadius: "12px",
            },
            "&.Mui-focused fieldset": {
              border: "1.5px solid #000000",
              color: "#000000",
            },
          },
        }}
      />
    );
  };

  const renderDescriptionField = () => {
    return (
      <TextField
        id="description"
        label="Description"
        variant="outlined"
        value={description}
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        required
        style={{
          width: "304px",
          height: "68px",
          marginBottom: "10px",
        }}
        InputLabelProps={{
          sx: {
            color: "gray",
            fontFamily: "serif",
            [`&.${inputLabelClasses.shrink}`]: {
              color: "#000000",
              fontFamily: "serif",
            },
          },
        }}
        sx={{
          ".MuiOutlinedInput-root": {
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            input: {
              fontFamily: "serif",
              fontWeight: 400,
              fontStyle: "Regular",
              fontSize: "16px",
              lineHeight: "34px",
              letterSpacing: "0%",
              textAlign: "center",
              color: "#000000",
            },
            fieldSet: {
              border: "1.5px solid gray",
              borderRadius: "12px",
            },
            "&.Mui-focused fieldset": {
              border: "1.5px solid #000000",
              color: "#000000",
            },
          },
        }}
      />
    );
  };

  const renderPriorityField = () => {
    return (
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
        <InputLabel id="priority" style={{ fontFamily: "serif" }}>
          Priority
        </InputLabel>
        <Select
          labelId="Priority"
          id="priority"
          value={priority}
          label="Priority"
          onChange={(event) => setPriority(event.target.value)}
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
    );
  };

  const renderDueDateField = () => {
    return (
      <>
        <InputLabel
          htmlFor="dueDate"
          style={{ color: "#000000", fontFamily: "serif" }}
        >
          Due Date
        </InputLabel>
        <TextField
          id="dueDate"
          variant="outlined"
          value={dueDate}
          type="date"
          onChange={(e) => setDueDate(e.target.value)}
          required
          style={{
            width: "304px",
            height: "68px",
            marginBottom: "10px",
          }}
          InputLabelProps={{
            sx: {
              color: "gray",
              fontFamily: "serif",
              [`&.${inputLabelClasses.shrink}`]: {
                color: "#000000",
                fontFamily: "serif",
              },
            },
          }}
          sx={{
            ".MuiOutlinedInput-root": {
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              input: {
                fontFamily: "serif",
                fontWeight: 400,
                fontStyle: "Regular",
                fontSize: "16px",
                lineHeight: "34px",
                letterSpacing: "0%",
                color: "#000000",
              },
              fieldSet: {
                border: "1.5px solid gray",
                borderRadius: "12px",
              },
              "&.Mui-focused fieldset": {
                border: "1.5px solid #000000",
                color: "#000000",
              },
            },
          }}
        />
      </>
    );
  };

  const renderStatusField = () => {
    return (
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
        <InputLabel id="status" style={{ fontFamily: "serif" }}>
          Status
        </InputLabel>
        <Select
          labelId="status"
          id="status"
          value={status}
          label="Status"
          onChange={(event) => setStatus(event.target.value)}
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
    );
  };

  const onSubmitAddTaskForm = async (event) => {
    event.preventDefault();
    const taskDetails = { title, description, priority, dueDate, status };
    const url = "http://localhost:3004/tasks";

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskDetails),
    };

    const response = await fetch(url, options);
    if (response.ok === true) {
      const successData = await response.json();
      setSuccessMessage(successData);
      setResult(true);
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus("");
      setPriority("");
    } else if (response.ok === false) {
      const failData = await response.json();
      setErrMsg(failData);
      setResult(false);
    }
  };


  return (
    <div className="add-task-container">
      <h1 className="add-task-heading">Add Task</h1>
      <form onSubmit={onSubmitAddTaskForm}>
        <div>{renderTitleField()}</div>
        <div>{renderDescriptionField()}</div>
        <div>{renderPriorityField()}</div>
        <div>{renderDueDateField()}</div>
        <div>{renderStatusField()}</div>
        {result ? (
          <p className="success-message">{successMessage}</p>
        ) : (
          <p className="error-message">{errMsg}</p>
        )}

        <div className="add-task-button-container">
          <Button
            type="submit"
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
          <Link to="/">
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
              Back
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
