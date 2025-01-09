import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../mockData";

const Login = ({ setUser }) => {
  const [selectedUser, setSelectedUser] = useState(null); // Selected user
  const [password, setPassword] = useState(""); // Password input
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message
  const navigate = useNavigate();

  // Handle Login action
  const handleLogin = () => {
    if (selectedUser) {
      // Check if the password matches the user's mock password
      if (selectedUser.password === password) {
        setLoading(true);
        setTimeout(() => {
          sessionStorage.setItem("user", JSON.stringify(selectedUser));
          setUser(selectedUser); // Update the user state in App.js
          navigate("/dashboard");
          setLoading(false);
          setError(""); // Clear error
        }, 1000);
      } else {
        setError("Invalid password. Please try again.");
      }
    } else {
      setError("Please select a user to log in.");
    }
  };

  // Handle Enter key press for login
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  // Attach keydown listener when component mounts
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [selectedUser, password]); // Add dependencies to useEffect

  useEffect(() => {
    // Add a class to the body element
    document.body.classList.add("login-page");

    // Cleanup to remove the class when the component unmounts
    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

  return (
    <div className="container-fluid login-container d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow-lg p-4 rounded login-card">
        <div className="card-body">
          <h1
            className="card-title text-center mb-2"
            style={{ fontSize: "44px" }}
          >
            <em>
              <strong>Enginite</strong>
            </em>
          </h1>
          <h2 className="text-center mb-1">Login</h2>
          <p className="text-center mb-4">
            Please select your profile to log in.
          </p>

          {/* Dropdown for selecting a user */}
          <select
            value={selectedUser ? JSON.stringify(selectedUser) : ""}
            onChange={(e) => {
              setSelectedUser(JSON.parse(e.target.value));
              setError(""); // Clear error when user changes
            }}
            className="form-select mb-3"
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={JSON.stringify(user)}>
                {user.name} - {user.role}
              </option>
            ))}
          </select>

          {/* Password Input */}
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Display role-specific welcome message */}
          {selectedUser && (
            <div className="alert alert-primary">
              Welcome, <strong>{selectedUser.name}!</strong> <br />
              You are logging in as a{" "}
              <strong>
                {selectedUser.role} ({selectedUser.department}).
              </strong>
            </div>
          )}

          {/* Error Message */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Login button */}
          <button
            onClick={handleLogin}
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
