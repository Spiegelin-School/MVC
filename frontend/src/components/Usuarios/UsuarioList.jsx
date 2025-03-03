import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const UsuarioList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get('/usuarios'); // Asegúrate de que la ruta es correcta
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        setError("No se pudieron cargar los usuarios.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div>
      <h2>Listado de Usuarios</h2>
      {loading ? (
        <p>Cargando usuarios...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : usuarios.length > 0 ? (
        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario.id}>
              {usuario.nombre} - {usuario.rol}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay usuarios disponibles.</p>
      )}
    </div>
  );
};

export default UsuarioList;
