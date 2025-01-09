import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [announcements, setAnnouncements] = useState([]);
  const [tasks, setTasks] = useState([]);

  // Fetch announcements and tasks when the component mounts
  useEffect(() => {
    const storedAnnouncements = JSON.parse(localStorage.getItem("announcements")) || [];
    setAnnouncements(storedAnnouncements);

    // Filter tasks for the specific employee
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const userTasks = storedTasks.filter(task => task.employeeId === user.id.toString());
    setTasks(userTasks);
  }, []);

  return (
    <div className='container mt-5'>
      <h1>Welcome, {user ? user.name : "Guest"}!</h1>
      <p>
        <strong>Role:</strong> {user ? user.role : "No Role Assigned"} &emsp;
        <strong>Department:</strong> {user ? user.department : "No Role Assigned"}
      </p>

      <h4 className="mt-4">Recent Announcements</h4>
      <div className="list-group">
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <div className="list-group-item" key={announcement.id}>
              <h5>{announcement.title}</h5>
              <p>{announcement.content}</p>
              <small>{announcement.date}</small>
            </div>
          ))
        ) : (
          <p>No announcements available.</p>
        )}
      </div>

      <h4 className="mt-4">Your Tasks</h4>
      <div className="list-group">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div className="list-group-item" key={task.id}>
              <h5>{task.taskTitle}</h5>
              <h6>{task.taskDescription}</h6>
              <small>Assigned by: {task.assignedBy} on {task.dateAssigned}</small>
              <p><strong>Deadline:</strong> {task.deadline}</p>
            </div>
          ))
        ) : (
          <p>No tasks assigned to you.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;