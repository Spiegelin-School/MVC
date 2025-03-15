import React, { useState } from "react";
import { loginWithEmail } from "../../config/firebase"; 
import api from "../../services/api";

const Login = () => {
  const [credentials, setCredentials] = useState({
    correo: "",
    contrasena: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const idToken = await loginWithEmail(credentials.correo, credentials.contrasena);

      const response = await api.post("/login", { id_token: idToken });

      setMessage(response.data.message);
      console.log("Login exitoso:", response.data);
    } catch (error) {
      setMessage("Error en login");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={credentials.correo}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          value={credentials.contrasena}
          onChange={handleChange}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
