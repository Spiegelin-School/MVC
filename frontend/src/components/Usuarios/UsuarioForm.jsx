import React, { useState } from 'react';
import api from '../../services/api';

const UsuarioForm = ({ onUsuarioCreado }) => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    rol: 'Paciente', 
  });

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/usuarios', usuario);
      console.log("Usuario creado:", response.data);
      if (onUsuarioCreado) onUsuarioCreado();
      setUsuario({ nombre: '', rol: 'Paciente' });
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre del usuario"
        value={usuario.nombre}
        onChange={handleChange}
        required
      />
      <select name="rol" value={usuario.rol} onChange={handleChange}>
        <option value="Paciente">Paciente</option>
        <option value="Medico">Medico</option>
        <option value="Enfermera">Enfermera</option>
        <option value="Administrador">Administrador</option>
      </select>
      <button type="submit">Crear Usuario</button>
    </form>
  );
};

export default UsuarioForm;
