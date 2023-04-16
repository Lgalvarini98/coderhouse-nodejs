import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const Chat = () => {
  const user = {
    id: "123",
    name: "Juan",
  };

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SERVER_URL);

    newSocket.emit("join", user.id);

    newSocket.on("receiveMessage", ({ senderId, message }) => {
      setMessages([...messages, { senderId, message }]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user.id]);

  const handleSendMessage = (event) => {
    event.preventDefault();

    socket.emit("sendMessage", {
      senderId: user.id,
      receiverId: "room", // En este caso, todos los usuarios están en la misma sala
      message,
    });

    setMessage("");
  };

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          <p>{message.senderId}</p>
          <p>{message.message}</p>
        </div>
      ))}

      <form onSubmit={handleSendMessage}>
        <input type="text" value={message} onChange={(event) => setMessage(event.target.value)} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Chat;
