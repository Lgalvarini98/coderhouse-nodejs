// Socket.js

import io from "socket.io-client";

const socket = io("http://localhost:8080", {
  transports: ["websocket"],
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const emitirMensaje = (mensaje) => {
  socket.emit("enviar-mensaje", mensaje);
};

const suscribirMensaje = (callback) => {
  socket.on("mensaje-recibido", callback);
};

export { emitirMensaje, suscribirMensaje };
