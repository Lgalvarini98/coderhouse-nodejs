import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ModalCart from "./ModalCart";

const Carrito = ({ data }) => {
  const [modalShow, setModalShow] = useState(false);
  const handleShow = () => setModalShow(true);
  const handleClose = () => setModalShow(false);

  return (
    <div className="carrito">
      <Button variant="light" type="submit" onClick={handleShow}>
        {data && data.products.length}
        <img
          src="https://cdn0.iconfinder.com/data/icons/iconoteka-stroke/24/iconoteka_shopping_cart__grocery_store_b_s-256.png"
          alt=""
        />
      </Button>

      <ModalCart show={modalShow} data={data} onHide={handleClose} />
    </div>
  );
};

export default Carrito;
