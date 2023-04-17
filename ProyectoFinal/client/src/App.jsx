import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cookies from "universal-cookie";
import "./App.css";

import Productos from "./components/productos/Productos";
import NavBar from "./components/NavBar";
import Agregar from "./components/productos/Agregar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ChatGlobal from "./components/Chat/ChatGlobal";

function App() {
  const [cookiesToken, setCookiesToken] = useState(null);
  const cookies = new Cookies();

  useEffect(() => {
    setCookiesToken(cookies.get("token"));
  }, [cookiesToken]);

  const handleLogout = () => {
    cookies.remove("token");
    cookies.remove("cart");
    cookies.remove("admin");
  };

  useEffect(() => {
    if (location.pathname === "/") {
      handleLogout();
    }
  }, [location.pathname]);

  return (
    <div className="app">
      <BrowserRouter>
        {cookiesToken && <NavBar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<ChatGlobal />} />
          <Route path="/register" element={<Register />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/form" element={<Agregar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
