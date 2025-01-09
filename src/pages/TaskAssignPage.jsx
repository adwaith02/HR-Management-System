import React, { useState, useEffect } from "react";

const TaskAssignPage = ({ teammates, loggedInUser }) => {
  const [tasks, setTasks] = useState([]);
  const [taskDetails, setTaskDetails] = useState({
    employeeId: "",
    taskTitle: "",
    taskDescription: "",
    deadline: "",
  });

  useEffect(() => {
    // Fetch tasks from localStorage when the component mounts
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      ...taskDetails,
      id: Date.now(),
      assignedBy: loggedInUser.name,
      dateAssigned: new Date().toLocaleDateString(),
    };

    // Save task in localStorage
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));

    setTasks(storedTasks); // Update state
    alert("Task assigned successfully!");
    setTaskDetails({
      employeeId: "",
      taskTitle: "",
      taskDescription: "",
      deadline: "",
    }); // Clear form
  };

  // Handle delete task
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks); // Update state after deletion
  };

  // Handle edit task
  const handleEditTask = (task) => {
    setTaskDetails({
      employeeId: task.employeeId,
      taskTitle: task.taskTitle,
      taskDescription: task.taskDescription,
      deadline: task.deadline, // Pre-fill deadline
    });
  };

  // Handle clear all tasks
  const handleClearAllTasks = () => {
    localStorage.removeItem("tasks");
    setTasks([]); // Clear tasks in state
    alert("All tasks cleared!");
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center">Assign Task</h3>
      <form onSubmit={handleTaskSubmit}>
        <div className="mb-3">
          <label htmlFor="employeeId" className="form-label">
            Employee:
          </label>
          <select
            id="employeeId"
            name="employeeId"
            className="form-select"
            value={taskDetails.employeeId}
            onChange={handleTaskChange}
            required
          >
            <option value="">Select Employee</option>
            {teammates.map((teammate) => (
              <option key={teammate.id} value={teammate.id}>
                {teammate.name} - {teammate.role} ({teammate.department})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="taskTitle" className="form-label">
            Task Title:
          </label>
          <input
            type="text"
            id="taskTitle"
            name="taskTitle"
            className="form-control"
            value={taskDetails.taskTitle}
            onChange={handleTaskChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="taskDescription" className="form-label">
            Task Description:
          </label>
          <textarea
            id="taskDescription"
            name="taskDescription"
            className="form-control"
            rows="4"
            value={taskDetails.taskDescription}
            onChange={handleTaskChange}
            required
          ></textarea>
        </div>

        {/* New Deadline Field */}
        <div className="mb-3">
          <label htmlFor="deadline" className="form-label">
            Deadline:
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            className="form-control"
            value={taskDetails.deadline}
            onChange={handleTaskChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Assign Task
        </button>
      </form>

      {/* Button to clear all tasks */}
      <button className="btn btn-danger mt-3" onClick={handleClearAllTasks}>
        Clear All Tasks
      </button>

      <h4 className="mt-5">Assigned Tasks</h4>
      <div className="list-group">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div className="list-group-item" key={task.id}>
              <h5>{task.taskTitle}</h5>
              <p>{task.taskDescription}</p>
              <small>
                Assigned by: {task.assignedBy} on {task.dateAssigned}
              </small>
              <p>
                <strong>Deadline:</strong> {task.deadline}
              </p>
              <div className="mt-2">
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEditTask(task)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No tasks assigned.</p>
        )}
      </div>
    </div>
  );
};

export default TaskAssignPage;