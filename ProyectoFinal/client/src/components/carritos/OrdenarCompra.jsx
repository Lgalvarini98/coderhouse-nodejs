import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const OrdenarCompra = ({ carrito }) => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const headers = {
    "content-type": "application/json",
    Authorization: cookies.get("token"),
  };

  async function handleSubmit() {
    await axios
      .post(`http://localhost:8080/api/carrito/${cookies.get("cart")}`, carrito, { headers })
      .then((response) => {
        if (response.status === 200) {
          alert("Orden de compra realizada con exito");
        }
      });
  }

  return (
    <form className="borrarCarrito">
      <h6>Comprar</h6>
      <a
        className="btn btn-success"
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

export default OrdenarCompra;
