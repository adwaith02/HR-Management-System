import React, { useEffect, useState } from "react";
import { getLeaveRequests, updateLeaveStatus } from "../mockApi";
import { ToastContainer, toast } from 'react-toastify'; // Importing Toastify
import 'react-toastify/dist/ReactToastify.css'; // Importing Toastify CSS

const LeaveManagement = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    const requests = await getLeaveRequests();
    setLeaveRequests(requests);
  };

  const handleStatusUpdate = async (id, status) => {
    await updateLeaveStatus(id, status);
    fetchLeaveRequests(); // Refresh the requests after update

    // Show toast notification on status update
    if (status === "Approved") {
      toast.success(`Leave request marked as Approved`);
    } else {
      toast.error(`Leave request marked as Rejected`);
    }
  };

  return (
    <div className="container-fluid mt-5">
      <h3 className="text-center mb-4">Leave Management</h3>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Emp Name</th>
              <th>Role</th>
              <th>Dept</th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Leave Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.employeeName}</td>
                <td>{request.employeeRole}</td>
                <td>{request.employeeDepartment}</td>
                <td>{request.fromDate}</td>
                <td>{request.toDate}</td>
                <td>{request.reason}</td>
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
                <td>
                  {request.status === "Pending" && (
                    <div className="btn-group">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleStatusUpdate(request.id, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleStatusUpdate(request.id, "Rejected")}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default LeaveManagement;