import React, { useState } from 'react';
import api from '../../services/api';

const CitaForm = ({ onCitaCreada }) => {
  const [cita, setCita] = useState({
    paciente_id: '',
    medico_id: '',
    fecha: '',
    hora: '',
    motivo: ''
  });

  const handleChange = (e) => {
    setCita({ ...cita, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/citas', cita);
      console.log("Cita agendada:", response.data);
      if (onCitaCreada) onCitaCreada();
      setCita({
        paciente_id: '',
        medico_id: '',
        fecha: '',
        hora: '',
        motivo: ''
      });
    } catch (error) {
      console.error("Error al agendar la cita:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="paciente_id" placeholder="ID del paciente" value={cita.paciente_id} onChange={handleChange} required />
      <input type="text" name="medico_id" placeholder="ID del médico" value={cita.medico_id} onChange={handleChange} required />
      <input type="date" name="fecha" value={cita.fecha} onChange={handleChange} required />
      <input type="time" name="hora" value={cita.hora} onChange={handleChange} required />
      <input type="text" name="motivo" placeholder="Motivo de consulta" value={cita.motivo} onChange={handleChange} required />
      <button type="submit">Agendar Cita</button>
    </form>
  );
};

export default CitaForm;
