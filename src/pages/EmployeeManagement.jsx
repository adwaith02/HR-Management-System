import React, { useState } from 'react';
import { users } from '../mockData';
import { Modal, Button } from 'react-bootstrap'; // Importing Modal from react-bootstrap
import { ToastContainer, toast } from 'react-toastify'; // Importing ToastContainer and toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Importing CSS for toast notifications

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState(users);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "",
    department: "",
    status: "",
  });
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [filter, setFilter] = useState({
    role: "",
    department: "",
    status: "",
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const handleAddEmployee = () => {
    const employee = { ...newEmployee, id: employees.length + 1 };
    setEmployees([...employees, employee]);
    setNewEmployee({ name: "", role: "", department: "", status: "" });
    setShowAddModal(false);
    toast.success('Employee added successfully!'); // Show success toast
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setNewEmployee(employee);
    setShowEditModal(true);
  };

  const handleUpdateEmployee = () => {
    setEmployees(
      employees.map((emp) =>
        emp.id === editingEmployee.id ? { ...emp, ...newEmployee } : emp
      )
    );
    setEditingEmployee(null);
    setNewEmployee({ name: "", role: "", department: "", status: "" });
    setShowEditModal(false);
    toast.success('Employee updated successfully!'); // Show success toast
  };

  const handleDeleteEmployee = () => {
    setEmployees(employees.filter((employee) => employee.id !== employeeToDelete.id));
    setEmployeeToDelete(null);
    setShowDeleteModal(false);
    toast.error('Employee deleted successfully!'); // Show success toast
  };

  const filteredEmployees = employees.filter((employee) => {
    return (
      (filter.role ? employee.role === filter.role : true) &&
      (filter.department ? employee.department === filter.department : true) &&
      (filter.status ? employee.status === filter.status : true)
    );
  });

  const roles = [...new Set(employees.map((emp) => emp.role))];
  const departments = [...new Set(employees.map((emp) => emp.department))];
  const statuses = [...new Set(employees.map((emp) => emp.status))];

  const isFormValid = newEmployee.name && newEmployee.role && newEmployee.department && newEmployee.status;

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Employee Management</h1>

      {/* Filter Options */}
      <div className="mb-4">
        <h3 className="text-muted">Filter Employees</h3>
        <div className="row">
          <div className="col-md-4 mb-3">
            <select
              className="form-select"
              value={filter.role}
              onChange={(e) => setFilter({ ...filter, role: e.target.value })}
            >
              <option value="">Select Role</option>
              {roles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <select
              className="form-select"
              value={filter.department}
              onChange={(e) => setFilter({ ...filter, department: e.target.value })}
            >
              <option value="">Select Department</option>
              {departments.map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <select
              className="form-select"
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            >
              <option value="">Select Status</option>
              {statuses.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Add New Employee Button */}
      <Button variant="success" onClick={() => setShowAddModal(true)}>
        Add New Employee
      </Button>

      {/* Employee List */}
      <h3 className="text-muted mt-4">Employee List</h3>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Department</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.role}</td>
              <td>{employee.department}</td>
              <td
                style={{
                  backgroundColor: employee.status === "Active" ? "green" : "yellow",
                  color: employee.status === "Active" ? "white" : "black",
                }}
              >
                {employee.status}
              </td>
              <td>
                <Button
                  variant="primary"
                  className="me-2"
                  onClick={() => handleEditEmployee(employee)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    setEmployeeToDelete(employee);
                    setShowDeleteModal(true);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Employee Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12 mb-3">
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              />
            </div>
            <div className="col-md-12 mb-3">
              <select
                className="form-select"
                value={newEmployee.role}
                onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
              >
                <option value="">Select Role</option>
                {roles.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-12 mb-3">
              <select
                className="form-select"
                value={newEmployee.department}
                onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
              >
                <option value="">Select Department</option>
                {departments.map((department, index) => (
                  <option key={index} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-12 mb-3">
              <select
                className="form-select"
                value={newEmployee.status}
                onChange={(e) => setNewEmployee({ ...newEmployee, status: e.target.value })}
              >
                <option value="">Select Status</option>
                {statuses.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddEmployee} disabled={!isFormValid}>
            Add Employee
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Employee Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12 mb-3">
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              />
            </div>
            <div className="col-md-12 mb-3">
              <select
                className="form-select"
                value={newEmployee.role}
                onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
              >
                <option value="">Select Role</option>
                {roles.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-12 mb-3">
              <select
                className="form-select"
                value={newEmployee.department}
                onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
              >
                <option value="">Select Department</option>
                {departments.map((department, index) => (
                  <option key={index} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-12 mb-3">
              <select
                className="form-select"
                value={newEmployee.status}
                onChange={(e) => setNewEmployee({ ...newEmployee, status: e.target.value })}
              >
                <option value="">Select Status</option>
                {statuses.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateEmployee} disabled={!isFormValid}>
            Update Employee
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Employee Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete this employee: {employeeToDelete?.name}?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteEmployee}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default EmployeeManagement;
