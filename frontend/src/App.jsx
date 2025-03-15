import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CitaForm from './components/Citas/CitaForm';
import CitaList from './components/Citas/CitaList';
import UsuarioForm from './components/Usuarios/UsuarioForm';
import UsuarioList from './components/Usuarios/UsuarioList';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

const App = () => {
  return (
    <BrowserRouter>
      <nav style={{ marginBottom: "1rem" }}>
        <Link to="/citas" style={{ marginRight: "1rem" }}>Citas</Link>
        <Link to="/usuarios" style={{ marginRight: "1rem" }}>Usuarios</Link>
        <Link to="/login" style={{ marginRight: "1rem" }}>Login</Link>
        <Link to="/register">Register</Link>
      </nav>
      <Routes>
        <Route path="/citas" element={
          <div>
            <h2>Citas</h2>
            <CitaForm />
            <CitaList />
          </div>
        } />
        <Route path="/usuarios" element={
          <div>
            <h2>Usuarios</h2>
            <UsuarioForm />
            <UsuarioList />
          </div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<div><h1>Bienvenido al Sistema de Agendamiento</h1></div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
