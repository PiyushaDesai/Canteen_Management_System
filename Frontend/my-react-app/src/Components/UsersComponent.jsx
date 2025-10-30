import React, { useEffect, useState } from "react";
import { fetchAllUsers, deleteUser, updateUser } from "../Services/adminDashboard";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UsersPage = ({onUserDeleted}) => {
  const [users, setUsers] = useState([]);
  
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ fullName: "", email: "", role: "" });

  useEffect(() => {
    loadUsers();
    
  }, []);

  const loadUsers = async () => {
    try {
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (err) {
      toast.error("Failed to load users");
    }
  };
 

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        toast.success("User deleted successfully");
        loadUsers();
        onUserDeleted();
      } catch (err) {
        toast.error("Failed to delete user");
      }
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setForm({ fullName: user.fullName, email: user.email, role: user.role });
  };

  const handleUpdate = async () => {
    try {
      await updateUser(editingUser.id, form);
      toast.success("User updated successfully");
      setEditingUser(null);
      loadUsers();
    } catch (err) {
      toast.error("Failed to update user");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h5 className="fw-bold mb-3">User Details</h5>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEditClick(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editingUser && (
        <div className="border rounded p-3 mt-4 bg-light">
          <h6>Edit User: {editingUser.fullName}</h6>
          <div className="mb-2">
            <input
              type="text"
              name="fullName"
              className="form-control"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              name="role"
              className="form-control"
              placeholder="Role"
              value={form.role}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-success me-2" onClick={handleUpdate}>
            Save
          </button>
          <button className="btn btn-secondary" onClick={() => setEditingUser(null)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};


export default UsersPage;
