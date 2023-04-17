import { useState } from "react";
import "./auth.css";
import axios from "axios";

const Register = () => {
  const [dataRegister, setDataRegister] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const isFormValid = () => {
    const requiredFields = ["nombre", "apellido", "telefono", "email", "password", "confirmPassword"];
    for (const field of requiredFields) {
      if (!dataRegister[field]) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    if (dataRegister.password !== dataRegister.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const { confirmPassword, ...data } = dataRegister;

    try {
      const response = await axios.post(`http://localhost:8080/api/register`, data);
      if (response.status === 200) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setDataRegister((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  return (
    <div className="authDiv">
      <form className="authForm" onSubmit={handleSubmit}>
        <h1>Registro</h1>
        <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} value={dataRegister.nombre} />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          onChange={handleChange}
          value={dataRegister.apellido}
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          onChange={handleChange}
          value={dataRegister.telefono}
        />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} value={dataRegister.email} />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          value={dataRegister.password}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          onChange={handleChange}
          value={dataRegister.confirmPassword}
        />
        <button type="submit">Registrarse</button>
        <p>
          ¿Ya tienes cuenta? <a href="/">Iniciar sesión</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
