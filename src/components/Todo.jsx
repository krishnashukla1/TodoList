import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Todo.css";

function Todo() {
    const [todoList, setTodoList] = useState([]);
    const [editableId, setEditableId] = useState(null);
    const [editedTask, setEditedTask] = useState("");
    const [editedStatus, setEditedStatus] = useState("");
    const [newTask, setNewTask] = useState("");
    const [newStatus, setNewStatus] = useState("");
    const [newDeadline, setNewDeadline] = useState("");
    const [editedDeadline, setEditedDeadline] = useState("");

    useEffect(() => {
        axios.get("http://127.0.0.1:3001/getTodoList")
            .then((res) => setTodoList(res.data))
            .catch((err) => console.log(err));
    }, []);

    const toggleEditable = (id) => {
        const task = todoList.find((item) => item._id === id);
        if (task) {
            setEditableId(id);
            setEditedTask(task.task);
            setEditedStatus(task.status);
            setEditedDeadline(task.deadline || "");
        }
    };

    const addTask = (e) => {
        e.preventDefault();
        if (!newTask || !newStatus || !newDeadline) {
            alert("All fields are required!");
            return;
        }
        axios.post("http://127.0.0.1:3001/addTodoList", {
            task: newTask,
            status: newStatus,
            deadline: newDeadline,
        }).then(() => window.location.reload())
          .catch((err) => console.log(err));
    };

    const saveEditedTask = (id) => {
        if (!editedTask || !editedStatus || !editedDeadline) {
            alert("All fields must be filled.");
            return;
        }

        axios.post(`http://127.0.0.1:3001/updateTodoList/${id}`, {
            task: editedTask,
            status: editedStatus,
            deadline: editedDeadline,
        }).then(() => {
            setEditableId(null);
            setEditedTask("");
            setEditedStatus("");
            setEditedDeadline("");
            window.location.reload();
        }).catch((err) => console.log(err));
    };

    const deleteTask = (id) => {
        axios.delete(`http://127.0.0.1:3001/deleteTodoList/${id}`)
            .then(() => window.location.reload())
            .catch((err) => console.log(err));
    };

    return (
        <div className="container mt-5">
            <div className="row g-4">
                <div className="col-md-7">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-primary text-white text-center">
                            <h4 className="mb-0">📋 Todo List</h4>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover align-middle text-center">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Task</th>
                                            <th>Status</th>
                                            <th>Deadline</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {todoList.map((task) => (
                                            <tr key={task._id}>
                                                <td>
                                                    {editableId === task._id ? (
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={editedTask}
                                                            onChange={(e) => setEditedTask(e.target.value)}
                                                        />
                                                    ) : (
                                                        task.task
                                                    )}
                                                </td>
                                                <td>
                                                    {editableId === task._id ? (
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={editedStatus}
                                                            onChange={(e) => setEditedStatus(e.target.value)}
                                                        />
                                                    ) : (
                                                        <span className={`badge ${task.status === 'Completed' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                                            {task.status}
                                                        </span>
                                                    )}
                                                </td>
                                                <td>
                                                    {editableId === task._id ? (
                                                        <input
                                                            type="datetime-local"
                                                            className="form-control"
                                                            value={editedDeadline}
                                                            onChange={(e) => setEditedDeadline(e.target.value)}
                                                        />
                                                    ) : (
                                                        task.deadline ? new Date(task.deadline).toLocaleString() : "-"
                                                    )}
                                                </td>
                                                <td>
                                                    {editableId === task._id ? (
                                                        <button
                                                            className="btn btn-sm btn-success me-1"
                                                            onClick={() => saveEditedTask(task._id)}
                                                        >
                                                            💾 Save
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="btn btn-sm btn-primary me-1"
                                                            onClick={() => toggleEditable(task._id)}
                                                        >
                                                            ✏️ Edit
                                                        </button>
                                                    )}
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => deleteTask(task._id)}
                                                    >
                                                        🗑 Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {todoList.length === 0 && (
                                            <tr>
                                                <td colSpan="4" className="text-muted">No tasks available</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-5">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-success text-white text-center">
                            <h4 className="mb-0">➕ Add New Task</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={addTask}>
                                <div className="mb-3">
                                    <label className="form-label">Task</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter task name"
                                        onChange={(e) => setNewTask(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Status</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter status"
                                        onChange={(e) => setNewStatus(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Deadline</label>
                                    <input
  className="form-control"
  type="datetime-local"
  value={newDeadline}
  placeholder="Enter deadline (DD-MM-YYYY HH:MM)"
  onChange={(e) => setNewDeadline(e.target.value)}
/>

                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-success">
                                        ➕ Add Task
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Todo;
