import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
axios.defaults.withCredentials = true;
function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });
  const [page, setPage] = useState(1);
  const [view, setView] = useState('all');
  const tasksPerPage = 5;
  const navigate = useNavigate();



  const fetchTasks = async () => {
    try {
      const endpoint =
        view === 'overdue'
          ? 'http://localhost:5000/api/tasks/overdue'
          : 'http://localhost:5000/api/tasks';
      const res = await axios.get(endpoint, { withCredentials: true });

      setTasks(res.data);
    } catch (err) {
      console.error('Fetch tasks error:', err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/tasks', newTask, { withCredentials: true });
      setNewTask({ title: '', description: '', dueDate: '' });
      fetchTasks();
    } catch (err) {
      console.error('Add task error:', err);
    }
  };

  const markCompleted = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/tasks/${id}`, { status: 'completed' }, { withCredentials: true });
      fetchTasks();
    } catch (err) {
      console.error('Mark complete error:', err);
    }
  };

  const handleLogout = async () => {
  try {
    await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
    navigate('/');
  } catch (err) {
    console.error('Logout error:', err);
  }
};



  useEffect(() => {
    fetchTasks();
  }, [view]);

  const paginatedTasks = tasks.slice((page - 1) * tasksPerPage, page * tasksPerPage);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? 'Invalid date' : date.toDateString();
  };


  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>📋 Task Dashboard</h2>
        <button onClick={handleLogout} className="logout-btn"> Logout</button>
      </div>

      <form onSubmit={handleAdd} className="task-form">
        <input
          name="title"
          placeholder="Title"
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          value={newTask.title}
          required
        />
        <input
          name="description"
          placeholder="Description"
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          value={newTask.description}
          required
        />
        <input
          name="dueDate"
          type="date"
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          value={newTask.dueDate}
          required
        />
        <button type="submit" className="add-task-btn">➕ Add Task</button>
      </form>

      <div className="view-toggle">
        <button onClick={() => setView('all')}>📋 All Tasks</button>
        <button onClick={() => setView('overdue')}>⚠️ Overdue Only</button>
      </div>

      <ul className="task-list">
        {paginatedTasks.map((task) => {
          const due = new Date(task.dueDate);
          const today = new Date();

          if (isNaN(due.getTime())) {
            return <li key={task._id}>⚠️ Invalid due date</li>;
          }

          const diffDays = Math.floor((due - today) / (1000 * 60 * 60 * 24));
          const overdue = diffDays < 0;
          const highlight = overdue && task.status !== 'completed' && Math.abs(diffDays) > 5;

          return (
            <li
              key={task._id}
              className={`task-card ${highlight ? 'highlight' : ''}`}
            >
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p>📅 Due: {formatDate(task.dueDate)}</p>
              <p>
                {highlight
                  ? `⏰ Overdue by ${Math.abs(diffDays)} day(s)`
                  : `✅ Due in ${diffDays} day(s)`}
              </p>
              <p>Status: <strong>{task.status}</strong></p>
              {task.status !== 'completed' && new Date(task.dueDate) <= new Date() && (
                <button className="mark-btn" onClick={() => markCompleted(task._id)}>
                  ✔️ Mark Completed
                </button>
              )}
            </li>
          );
        })}
      </ul>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            disabled={page === i + 1}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
