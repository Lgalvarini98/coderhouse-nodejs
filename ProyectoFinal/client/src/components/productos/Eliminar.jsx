import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import Cookies from "universal-cookie";

const Eliminar = (idProduct) => {
  const cookies = new Cookies();

  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${cookies.get("token")}`,
  };

  async function handleSubmit() {
    await axios.delete("http://localhost:8080/api/productos/" + idProduct.idProduct, { headers });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Button variant="danger" type="submit">
        Eliminar
      </Button>
    </form>
  );
};

export default Eliminar;
