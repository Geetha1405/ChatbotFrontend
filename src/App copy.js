import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm your AI assistant. How can I help you?" },
  ]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setInput("");

    try {
      const history = newMessages
        .filter((m) => m.sender !== "system")
        .map((m) => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text,
        }));

      const res = await axios.post("http://localhost:5000/chat", {
        message: input,
        history,
      });

      setMessages([...newMessages, { sender: "bot", text: res.data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "❌ Something went wrong!" },
      ]);
    }
  };
  return (
    <div>
      <div style={styles.container}>
        <h2 style={styles.title}>🤖 AI Chatbot</h2>
        <div style={styles.chatBox}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                ...styles.message,
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                background: msg.sender === "user" ? "#007bff" : "#e9ecef",
                color: msg.sender === "user" ? "#fff" : "#000",
              }}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div style={styles.inputBox}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={styles.input}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage} style={styles.button}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
const styles = {
  container: {
    width: 400,
    margin: "50px auto",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  title: { textAlign: "center" },
  chatBox: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    height: 400,
    overflowY: "auto",
    border: "1px solid #ccc",
    padding: 10,
    borderRadius: 10,
  },
  message: { padding: 10, borderRadius: 10, maxWidth: "80%" },
  inputBox: { display: "flex", gap: 10 },
  input: { flex: 1, padding: 10, borderRadius: 5, border: "1px solid #ccc" },
  button: {
    padding: "10px 15px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: 5,
  },
};

export default App;
