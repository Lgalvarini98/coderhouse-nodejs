import { useState } from "react";
import "./auth.css";
import axios from "axios";
import Cookies from "universal-cookie";

const Login = () => {
  const cookies = new Cookies();

  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (dataLogin.username === "" || dataLogin.password === "") return;

    await axios.post(`http://localhost:8080/api/login`, dataLogin).then((response) => {
      if (response.status === 200) {
        cookies.set("token", response.data.token);
        cookies.set("admin", response.data.admin);
        cookies.set("email", response.data.email);
      }
    });
    const headers = {
      "content-type": "application/json",
      Authorization: `Bearer ${cookies.get("token")}`,
    };

    await axios.post("http://localhost:8080/api/carrito", {}, { headers }).then((r) => {
      if (r.status === 200) {
        cookies.set("cart", r.data);
        window.location.href = "/productos";
      }
    });
  }

  function handleChange(e) {
    setDataLogin({
      ...dataLogin,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="authDiv">
      <form className="authForm" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} value={dataLogin.email} />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={dataLogin.password}
        />
        <button type="submit">Login</button>
        <p>
          ¿No tienes cuenta? <a href="/register">Registrate</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
