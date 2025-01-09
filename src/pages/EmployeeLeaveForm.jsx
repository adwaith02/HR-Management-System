import React, { useState, useEffect } from "react";
import { applyLeave } from "../mockApi";
import { ToastContainer, toast } from 'react-toastify'; // Importing Toastify
import 'react-toastify/dist/ReactToastify.css'; // Importing Toastify CSS

const EmployeeLeaveForm = ({ user, leaveRequests }) => {
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    reason: "",
    leaveType: "",
  });

  const [employeeLeaveRequests, setEmployeeLeaveRequests] = useState([]);

  // Fetch employee's leave requests from localStorage on component mount
  useEffect(() => {
    const storedRequests =
      JSON.parse(localStorage.getItem("leaveRequests")) || [];
    const employeeRequests = storedRequests.filter(
      (request) => request.employeeName === user.name
    );
    setEmployeeLeaveRequests(employeeRequests);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await applyLeave(formData, user);
    toast.success("Leave request submitted successfully!"); // Show toast notification on success
    setFormData({ fromDate: "", toDate: "", reason: "", leaveType: "" });

    // Refresh the leave request table after submitting a new leave
    const storedRequests =
      JSON.parse(localStorage.getItem("leaveRequests")) || [];
    const employeeRequests = storedRequests.filter(
      (request) => request.employeeName === user.name
    );
    setEmployeeLeaveRequests(employeeRequests);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h3>Apply for Leave</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Leave Form */}
                <div className="mb-3">
                  <label htmlFor="leaveType" className="form-label">
                    Leave Type:
                  </label>
                  <select
                    id="leaveType"
                    name="leaveType"
                    className="form-control"
                    value={formData.leaveType}
                    onChange={handleChange}
                    required
                  >
                    <option value="Select Leave Type">Select Leave Type</option>
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Paid Leave">Paid Leave</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="fromDate" className="form-label">
                    From Date:
                  </label>
                  <input
                    type="date"
                    id="fromDate"
                    name="fromDate"
                    className="form-control"
                    value={formData.fromDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="toDate" className="form-label">
                    To Date:
                  </label>
                  <input
                    type="date"
                    id="toDate"
                    name="toDate"
                    className="form-control"
                    value={formData.toDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="reason" className="form-label">
                    Reason:
                  </label>
                  <textarea
                    id="reason"
                    name="reason"
                    className="form-control"
                    rows="3"
                    value={formData.reason}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>

          {/* Leave Request Status Table */}
          <div className="card mt-5">
            <div className="card-header bg-light text-center">
              <h4>Your Leave Requests</h4>
            </div>
            <div className="card-body">
              {employeeLeaveRequests.length > 0 ? (
                <table className="table table-bordered table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>From</th>
                      <th>To</th>
                      <th>Leave Type</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeLeaveRequests.map((request) => (
                      <tr key={request.id}>
                        <td>{request.fromDate}</td>
                        <td>{request.toDate}</td>
                        <td>{request.leaveType}</td>
                        <td>
                          <span
                            className={`badge ${
                              request.status === "Approved"
                                ? "bg-success"
                                : request.status === "Rejected"
                                ? "bg-danger"
                                : "bg-warning text-dark"
                            }`}
                          >
                            {request.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>You have not applied for any leave yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer /> {/* Make sure to include this component */}
    </div>
  );
};

export default EmployeeLeaveForm;
