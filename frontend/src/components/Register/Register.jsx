// frontend/src/components/Register/Register.jsx
import React, { useState } from 'react';
import api from '../../services/api';

const Register = () => {
  const [data, setData] = useState({
    correo: '',
    usuario: '',
    contrasena: '',
    rol: 'Paciente'
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await api.post('/register', data);
      setMessage("Usuario registrado exitosamente");
      console.log("Register:", response.data);
    } catch (error) {
      setMessage("Error en el registro");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={data.correo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="usuario"
          placeholder="Usuario"
          value={data.usuario}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          value={data.contrasena}
          onChange={handleChange}
          required
        />
        <select name="rol" value={data.rol} onChange={handleChange}>
          <option value="Paciente">Paciente</option>
          <option value="Medico">Medico</option>
          <option value="Enfermera">Enfermera</option>
          <option value="Administrador">Administrador</option>
        </select>
        <button type="submit">Registrarse</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
