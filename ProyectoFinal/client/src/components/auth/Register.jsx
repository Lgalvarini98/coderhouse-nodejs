import { useState } from "react";
import "./auth.css";
import axios from "axios";
import Cookies from "universal-cookie";

const Register = () => {
  const cookies = new Cookies();

  const [dataRegister, setDataRegister] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      dataRegister.nombre === "" ||
      dataRegister.apellido === "" ||
      dataRegister.telefono === "" ||
      dataRegister.email === "" ||
      dataRegister.password === "" ||
      dataRegister.confirmPassword === ""
    )
      return;

    if (dataRegister.password !== dataRegister.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const response = await axios.post(`http://localhost:8080/api/register`, dataRegister);
    if (response.status === 200) {
      cookies.set("token", response.data.token);
      window.location.href = "/productos";
    }
  }

  function handleChange(e) {
    setDataRegister({
      ...dataRegister,
      [e.target.name]: e.target.value,
    });
  }

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
