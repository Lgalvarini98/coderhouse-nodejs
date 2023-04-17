import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { emitirMensaje, suscribirMensaje } from "./socket";

const ChatGlobal = () => {
  const cookies = new Cookies();

  const [mensaje, setMensaje] = useState({
    emisor: cookies.get("email"),
    contenido: "",
  });
  const [mensajes, setMensajes] = useState([]);

  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${cookies.get("token")}`,
  };

  useEffect(() => {
    // función para cargar los mensajes de la API
    const obtenerMensajes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/mensajes", { headers });
        setMensajes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerMensajes(); // llamada a la función para cargar los mensajes al cargar el componente

    // suscripción al evento 'mensaje-recibido' del socket
    suscribirMensaje((mensaje) => {
      if (mensaje.contenido) {
        setMensajes((mensajes) => [...mensajes, mensaje]);
      }
    });

    return () => {
      // limpiar la suscripción del evento 'mensaje-recibido' del socket
      socket.off("mensaje-recibido");
    };
  }, []);

  const enviarMensaje = (e) => {
    if (mensaje.contenido.length > 100) {
      alert("El mensaje no puede tener más de 50 caracteres");
      return;
    }
    e.preventDefault();
    emitirMensaje(mensaje);
    setMensaje({ ...mensaje, contenido: "" });
  };

  const handleChange = (e) => {
    setMensaje({ ...mensaje, contenido: e.target.value });
  };

  const esMiMensaje = (email) => {
    return email === cookies.get("email");
  };

  return (
    <div className="divChat">
      <h2>Chat</h2>
      <section className="sectionMensajes">
        {mensajes.map((mensaje, index) => (
          <div key={index} className={`${esMiMensaje(mensaje.emisor) ? "miMensaje" : "mensaje"}`}>
            <span>{mensaje.emisor}</span>
            <p>{mensaje.contenido}</p>
          </div>
        ))}
      </section>

      <form className="formChat" onSubmit={enviarMensaje}>
        <input type="text" value={mensaje.contenido} onChange={handleChange} maxLength="100" />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ChatGlobal;
