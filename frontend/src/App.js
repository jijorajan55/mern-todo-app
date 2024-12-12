import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AddTodoPage from './pages/AddTodoPage';
import EditTodoPage from './pages/EditTodoPage';

// Create Context
export const TodoContext = createContext();

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <TodoContext.Provider value={{ todos, setTodos, loading, setLoading, error, setError }}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddTodoPage />} />
          <Route path="/edit/:id" element={<EditTodoPage />} />
        </Routes>
        <Footer />
      </Router>
    </TodoContext.Provider>
  );
}

export default App;
