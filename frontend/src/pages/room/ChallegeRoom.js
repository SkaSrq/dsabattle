import Container from "@mui/material/Container";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const socket = io.connect("http://localhost:9000/");
function ChallegeRoom() {
  const { roomId } = useParams();
  console.log(roomId);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    // console.log(BASE_URL);
    console.log("sendMessage clicked: " + message);
    socket.emit("chat-room", { message, user: "sharique" });
    setMessage("");
  };
  useEffect(() => {
    socket.on("chat-room", (payload) => {
      setChats([...chats, payload]);
    });
  });
  return (
    <>
      <Container className="container">
        <h1>ChallegeRoom</h1>
        <form onSubmit={sendMessage}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="message"
          ></input>
          <button type="submit">Send</button>
        </form>
        <div>
          {chats.map((payload, index) => {
            return <h1 key={index}>{payload.message}</h1>;
          })}
        </div>
        {/* class="content__u3I1 question-content__JfgR" */}
      </Container>
    </>
  );
}

export default ChallegeRoom;
