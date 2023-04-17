import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const BorrarCarrito = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${cookies.get("token")}`,
  };

  async function handleSubmit() {
    await axios.delete(`http://localhost:8080/api/carrito/${cookies.get("cart")}`, { headers });
  }

  return (
    <form className="borrarCarrito">
      <h6>Eliminar carrito</h6>
      <a
        className="btn btn-danger"
        onClick={() => {
          handleSubmit();
          cookies.remove("token");
          cookies.remove("cart");
          cookies.remove("admin");
        }}
        href="/"
      >
        <img
          src="https://cdn0.iconfinder.com/data/icons/iconoteka-stroke/24/iconoteka_shopping_cart__grocery_store_b_s-256.png"
          alt=""
        />
      </a>
    </form>
  );
};

export default BorrarCarrito;
