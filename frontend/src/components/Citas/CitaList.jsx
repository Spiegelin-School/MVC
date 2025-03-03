import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const CitaList = () => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const response = await api.get('/citas');
        setCitas(response.data);
      } catch (error) {
        console.error("Error al obtener citas:", error);
        setError("No se pudieron cargar las citas.");
      } finally {
        setLoading(false);
      }
    };

    fetchCitas();
  }, []);

  return (
    <div>
      <h2>Listado de Citas</h2>
      {loading ? (
        <p>Cargando citas...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : citas.length > 0 ? (
        <ul>
          {citas.map((cita) => (
            <li key={cita.id}>
              {cita.fecha} - {cita.hora} | Médico: {cita.medico_id} | Estado: {cita.estado}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay citas disponibles.</p>
      )}
    </div>
  );
};

export default CitaList;
