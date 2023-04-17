import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const AgregarACarrito = ({ data, updateCart }) => {
  const cookies = new Cookies();

  async function handleSubmit(e) {
    e.preventDefault();
    const headers = {
      "content-type": "application/json",
      Authorization: `Bearer ${cookies.get("token")}`,
    };

    await axios
      .post(`http://localhost:8080/api/carrito/${cookies.get("cart")}/productos`, { productId: data._id }, { headers })
      .then((response) => {
        if (response.status === 200) {
          updateCart();
        }
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <button className="btn btn-warning" type="submit">
        <img
          src="https://cdn0.iconfinder.com/data/icons/iconoteka-stroke/24/iconoteka_shopping_cart_add_b_s-64.png"
          alt=""
        />
      </button>
    </form>
  );
};

export default AgregarACarrito;
