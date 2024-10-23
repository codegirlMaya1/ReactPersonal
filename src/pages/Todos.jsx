import React, { useState, useEffect } from 'react';
import api from '../api';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [todoId, setTodoId] = useState('');

  useEffect(() => {
    api.get('/todos?userId=1').then(response => {
      setTodos(response.data);
    });
  }, []);

  const handleCreateTodo = () => {
    const newTodoId = parseInt(todoId);
    const todoExists = todos.some(todo => todo.id === newTodoId);
    
    if (!isNaN(newTodoId) && !todoExists) {
      const newTodo = {
        id: newTodoId,
        title,
        completed: false,
        userId: 1,
      };
      const updatedTodos = [newTodo, ...todos];
      setTodos(updatedTodos);
      setTitle('');
      setUserId('');
      setTodoId('');
      api.post('/todos', newTodo);
    } else {
      alert('ID must be a unique number.');
    }
  };

  const handleUpdateTodo = () => {
    const newTodoId = parseInt(todoId);
    if (!isNaN(newTodoId)) {
      const updatedTodos = todos.map(todo => 
        todo.id === newTodoId ? { ...todo, title } : todo
      );
      setTodos(updatedTodos);
      setTitle('');
      setUserId('');
      setTodoId('');
      api.put(`/todos/${newTodoId}`, { title, completed: false, userId: 1 });
    } else {
      alert('ID must be a number.');
    }
  };

  const handleDeleteTodo = (id) => {
    const remainingTodos = todos.filter(todo => todo.id !== id);
    setTodos(remainingTodos);
    api.delete(`/todos/${id}`);
  };

  const handleCompleteTodo = (id) => {
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: true } : todo
    );
    setTodos(updatedTodos);
    api.put(`/todos/${id}`, { ...todos.find(todo => todo.id === id), completed: true });
  };

  return (
    <div>
      <h2>Todos</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={todoId}
          onChange={(e) => setTodoId(e.target.value)}
          placeholder="Todo ID (for update/delete/complete)"
          className="form-control"
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="form-control"
        />
        <button onClick={handleCreateTodo} className="btn btn-primary mt-2">Create Todo</button>
        <button onClick={handleUpdateTodo} className="btn btn-warning mt-2">Update Todo</button>
        <button onClick={() => handleCompleteTodo(parseInt(todoId))} className="btn btn-success mt-2">Mark as Complete</button>
      </form>
      <ul className="list-group mt-3">
        {todos.map(todo => (
          <li key={todo.id} className="list-group-item">
            <div>
              <h5>{todo.title}</h5>
              <p>{todo.completed ? 'Completed' : 'Incomplete'}</p>
              <small>ID: {todo.id}</small>
              <button onClick={() => handleDeleteTodo(todo.id)} className="btn btn-danger btn-sm mt-2">Delete</button>
              {!todo.completed && (
                <button onClick={() => handleCompleteTodo(todo.id)} className="btn btn-success btn-sm mt-2">Mark as Complete</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
