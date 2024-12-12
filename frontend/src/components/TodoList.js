import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../services/api';
import { TodoContext } from '../App';

const TodoList = () => {
  const { todos, setTodos, loading, setLoading, error, setError } = useContext(TodoContext);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/todos');
      setTodos(response.data);
      setError(null);
    } catch (error) {
      setError('Error fetching todos');
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this todo?');
    if (!confirmDelete) return;

    setLoading(true);
    try {
      await axios.delete(`/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
      setError(null);
    } catch (error) {
      setError('Error deleting todo');
    } finally {
      setLoading(false);
    }
  };

  const filteredTodos = todos.filter((todo) => (filter === 'all' ? true : todo.status === filter));

  return (
    <div style={{ padding: '20px' }}>
      <h2>Todo List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Loading...</p>}
      <div style={{ marginBottom: '15px' }}>
        <label>Filter Todos: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div>
        {filteredTodos.map((todo) => (
          <div
            key={todo._id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '10px',
              backgroundColor: 'white',
            }}
          >
            <h3 style={{ margin: '0 0 5px 0' }}>{todo.title}</h3>
            <p style={{ margin: '5px 0' }}>{todo.description}</p>
            <p style={{ fontSize: '0.9em', color: '#666' }}>Status: {todo.status}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link to={`/edit/${todo._id}`} style={{ color: '#6200ea' }}>
                Edit
              </Link>
              <button
                style={{
                  backgroundColor: '#ff1744',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  cursor: 'pointer',
                }}
                onClick={() => deleteTodo(todo._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <Link to="/add">
        <button
          style={{
            backgroundColor: '#6200ea',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            cursor: 'pointer',
            borderRadius: '5px',
            marginTop: '20px',
          }}
        >
          Add New Todo
        </button>
      </Link>
    </div>
  );
};

export default TodoList;
