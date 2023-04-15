import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Productos from "./components/productos/Productos";
import NavBar from "./components/NavBar";
import Agregar from "./components/productos/Agregar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Chat from "./components/Chat/Chat";

function App() {
  const [cookiesToken, setCookiesToken] = useState(null);

  useEffect(() => {
    const cookies = new Cookies();
    setCookiesToken(cookies.get("token"));
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {cookiesToken && <NavBar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/register" element={<Register />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/form" element={<Agregar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
