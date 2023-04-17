import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Agregar = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const admin = cookies.get("admin");

  const [product, setProduct] = useState({
    nombre: "",
    descripcion: "",
    codigo: "",
    thumbnail: "",
    precio: "",
    categoria: "",
  });

  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${cookies.get("token")}`,
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !(product.nombre === "") &&
      !(product.descripcion === "") &&
      !(product.codigo === "") &&
      !(product.thumbnail === "") &&
      !(product.precio === "") &&
      !(product.categoria === "")
    ) {
      product.categoria = product.categoria.toLowerCase();
      await axios.post("http://localhost:8080/api/productos", product, { headers }).then((response) => {
        if (response.status === 200) {
          navigate("/productos");
        }
      });
    }
  }

  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  return (
    <div className="agregarProductos">
      {admin === "true" && (
        <form className="forms formProductos" onSubmit={handleSubmit}>
          <h2>Agregar producto</h2>
          <div>
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" name="nombre" value={product.nombre} onChange={handleChange} />
          </div>
          <div>
            <label className="form-label">Descripcion</label>
            <input
              type="text"
              className="form-control"
              name="descripcion"
              value={product.descripcion}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="form-label">Codigo</label>
            <input type="text" className="form-control" name="codigo" value={product.codigo} onChange={handleChange} />
          </div>
          <div>
            <label className="form-label">URL imagen</label>
            <input
              type="text"
              className="form-control"
              name="thumbnail"
              value={product.thumbnail}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="form-label">Precio</label>
            <input
              type="number"
              className="form-control"
              name="precio"
              value={product.precio}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="form-label">Categoria</label>
            <input
              type="categoria"
              className="form-control"
              name="categoria"
              value={product.categoria}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-dark mb-3">
            Agregar producto
          </button>
        </form>
      )}
      {admin !== "true" && (
        <div>
          <h1>Solo los administradores pueden agregar productos</h1>
        </div>
      )}
    </div>
  );
};

export default Agregar;
