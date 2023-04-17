import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/style.css";
import Actualizar from "./Actualizar";
import Eliminar from "./Eliminar";
import AgregarACarrito from "../carritos/AgregarACarrito";
import Cookies from "universal-cookie";
import Carrito from "../carritos/Carrito";
import FilterByCategory from "../FilterByCategory/FilterByCategory";

const Productos = () => {
  const cookies = new Cookies();

  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${cookies.get("token")}`,
  };

  const [listProduct, setListProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [admin, setAdmin] = useState(false);

  async function handleData() {
    await axios.get("http://localhost:8080/api/productos", { headers }).then((response) => {
      if (response.status === 200) {
        setListProduct(response.data);
        setAdmin(cookies.get("admin"));
      }
    });
  }

  async function handleGetCart() {
    await axios.get(`http://localhost:8080/api/carrito/${cookies.get("cart")}`, { headers }).then((response) => {
      if (response.status === 200) {
        setCart(response.data);
      }
    });
  }

  const updateCart = async () => {
    await handleGetCart();
  };

  useEffect(() => {
    handleGetCart();
    handleData();
  }, []);

  return (
    <div className="listaProductos">
      {cart.products && cart.products.length > 0 && <Carrito data={cart} />}

      <FilterByCategory setListProduct={setListProduct} />
      {listProduct.length > 0 &&
        listProduct.map((product, index) => (
          <div key={index} className="producto">
            <div className="imagen">
              <img src={product.thumbnail} />
            </div>
            <div className="informacion">
              <h4 className="nombre bordes">
                <strong>{product.nombre}</strong>
              </h4>
              <p className="descripcion bordes">{product.descripcion}</p>
              <p className="precio bordes">
                <strong>${product.precio}</strong>
              </p>
              <h5 className="stock bordes">Categoria: {product.categoria}</h5>
            </div>

            <div className="btnFormulario">
              {admin === "true" && (
                <div className="btnFormulario-admin">
                  <Actualizar producto={product} />
                  <Eliminar idProduct={product._id} />
                </div>
              )}
              <AgregarACarrito data={product} updateCart={updateCart} />
            </div>
          </div>
        ))}

      {listProduct.length < 1 && (
        <div>
          <h2>No hay productos</h2>
        </div>
      )}
    </div>
  );
};

export default Productos;
