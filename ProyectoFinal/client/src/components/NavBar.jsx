import React from "react";
import "./styles/style.css";
import Cookies from "universal-cookie";

const NavBar = () => {
  const cookies = new Cookies();

  return (
    <header className="header" id="inicio">
      <div className="contenedor">
        <h4 className="titulo">
          <a href="/">Ecommerce</a>
        </h4>
      </div>
      <nav className="menu-navegacion">
        <a href="/chat">Chat</a>
        <a href="/productos">Products</a>
        {cookies.get("admin") === "true" && <a href="/form">Add product</a>}
        <a href="/">Logout</a>
      </nav>
    </header>
  );
};

export default NavBar;
