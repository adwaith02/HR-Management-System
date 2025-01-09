// Initialize leaveRequests in localStorage if not already set
if (!localStorage.getItem("leaveRequests")) {
  localStorage.setItem("leaveRequests", JSON.stringify([]));
}

// Fetch all leave requests
export const getLeaveRequests = () => {
  const leaveRequests = JSON.parse(localStorage.getItem("leaveRequests"));
  return Promise.resolve([...leaveRequests]);
};

// Add a new leave request
export const applyLeave = (leaveRequest, user) => {
  const leaveRequests = JSON.parse(localStorage.getItem("leaveRequests"));
  const newRequest = {
    ...leaveRequest,
    id: Date.now(),
    status: "Pending",
    employeeName: user.name,
    employeeRole: user.role,
    employeeDepartment: user.department,
  };
  leaveRequests.push(newRequest);
  localStorage.setItem("leaveRequests", JSON.stringify(leaveRequests));
  return Promise.resolve(newRequest);
};

// Update leave request status
export const updateLeaveStatus = (id, status) => {
  const leaveRequests = JSON.parse(localStorage.getItem("leaveRequests"));
  const updatedRequests = leaveRequests.map((request) =>
    request.id === id ? { ...request, status } : request
  );
  localStorage.setItem("leaveRequests", JSON.stringify(updatedRequests));
  return Promise.resolve();
};