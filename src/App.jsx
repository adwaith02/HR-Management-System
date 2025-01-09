import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import EmployeeManagement from "./pages/EmployeeManagement";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import EmployeeLeaveForm from "./pages/EmployeeLeaveForm";
import LeaveManagement from "./pages/LeaveManagement";
import AnnouncementPage from "./pages/AnnouncementPage";
import { users } from "./mockData";
import TaskAssignPage from "./pages/TaskAssignPage";

const App = () => {
  const [user, setUser] = useState(null); // State for logged-in user
  const [leaveRequests, setLeaveRequests] = useState([]); // Shared state for leave requests

  // Load persisted data on mount
  useEffect(() => {
    const storedRequests =
      JSON.parse(localStorage.getItem("leaveRequests")) || [];
    const storedUser =
      JSON.parse(sessionStorage.getItem("user")) ||
      JSON.parse(localStorage.getItem("user"));

    setLeaveRequests(storedRequests);
    if (storedUser) setUser(storedUser);
  }, []);

  // Save leave requests to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("leaveRequests", JSON.stringify(leaveRequests));
  }, [leaveRequests]);

  // Add a new leave request
  const handleAddLeaveRequest = (newRequest) => {
    const updatedRequests = [
      ...leaveRequests,
      {
        ...newRequest,
        id: Date.now(),
        status: "Pending",
        employeeName: user.name,
        employeeRole: user.role,
        employeeDepartment: user.department,
      },
    ];
    setLeaveRequests(updatedRequests);
  };

  // Update leave request status
  const handleUpdateLeaveRequest = (id, status) => {
    // Update the leave request status in localStorage
    const updatedRequests = leaveRequests.map((request) =>
      request.id === id ? { ...request, status } : request
    );
    setLeaveRequests(updatedRequests); // Update the state
    localStorage.setItem("leaveRequests", JSON.stringify(updatedRequests)); // Persist the data
  };

  // Logout handler
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <BrowserRouter>
      <div className="d-flex">
        {user && <Navbar user={user} onLogout={handleLogout} />}
        <div className="flex-grow-1 p-3">
          <Routes>
            <Route path="/" element={<Login setUser={setUser} />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  element={<Dashboard />}
                  allowedRoles={["HR Manager", "Team Lead", "Employee", "User"]}
                />
              }
            />
            <Route
              path="/employee-management"
              element={
                <ProtectedRoute
                  element={<EmployeeManagement />}
                  allowedRoles={["HR Manager"]}
                />
              }
            />
            <Route
              path="/apply-leave"
              element={
                <ProtectedRoute
                  element={
                    <EmployeeLeaveForm
                      onAddLeaveRequest={handleAddLeaveRequest}
                      user={user}
                      leaveRequests={leaveRequests}
                    />
                  }
                  allowedRoles={["Employee", "HR Manager", "Team Lead"]}
                />
              }
            />
            <Route
              path="/leave-management"
              element={
                <ProtectedRoute
                  element={
                    <LeaveManagement
                      leaveRequests={leaveRequests}
                      onUpdateLeaveRequest={handleUpdateLeaveRequest}
                    />
                  }
                  allowedRoles={["HR Manager"]}
                />
              }
            />
            <Route
              path="/announcements"
              element={
                <ProtectedRoute
                  element={<AnnouncementPage />}
                  allowedRoles={["HR Manager"]}
                />
              }
            />
            <Route
              path="/task-assign"
              element={
                <ProtectedRoute
                  element={
                    user?.role === "Team Lead" ? (
                      <TaskAssignPage
                        teammates={users.filter(
                          (teammate) =>
                            teammate.department === user?.department &&
                            teammate.role === "Employee"
                        )}
                        loggedInUser={user}
                      />
                    ) : user?.role === "HR Manager" ? (
                      <TaskAssignPage
                        teammates={users} // Unfiltered list for HR Manager
                        loggedInUser={user}
                      />
                    ) : (
                      <div>You are not authorized to access this page.</div>
                    )
                  }
                  allowedRoles={["Team Lead", "HR Manager"]}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
