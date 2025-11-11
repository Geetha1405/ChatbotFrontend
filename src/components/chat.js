import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const userData = JSON.parse(localStorage.getItem("user") || "{}");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessage = { sender: "user", text: input };
    const newMessages = [...messages, newMessage];
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    let url = "https://chatbotbackend-3x52.onrender.com";
    // let url='http://localhost:5000'

    try {
      if (Object.keys(userData).length > 0) {
        const res = await axios.post(`${url}/chat`, {
          message: input,
          user: userData,
        });

        const aiMessage = { sender: "bot", text: res.data.reply };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        const history = newMessages
          .filter((m) => m.sender !== "system")
          .map((m) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
          }));

        let url = "https://chatbotbackend-3x52.onrender.com";
        // let url='http://localhost:5000'

        const res = await axios.post(`${url}/chat`, {
          message: input,
          history,
          user: null,
        });

        setMessages([...newMessages, { sender: "bot", text: res.data.reply }]);
      }
    } catch (err) {
      console.log(err, "error");

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Something went wrong!" },
      ]);
    }
  };
  const getAllChatHistory = useCallback(async () => {
    try {
      let url = "https://chatbotbackend-3x52.onrender.com";
      // let url='http://localhost:5000'
      const res = await axios.post(`${url}/chat-history`, {
        user: userData,
      });
      if (res.data && Array.isArray(res.data)) {
        const sorted = res.data.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        const formatted = sorted.flatMap((msg) => {
          const arr = [];
          if (msg.message) arr.push({ sender: "user", text: msg.message });
          if (msg.reply) arr.push({ sender: "bot", text: msg.reply });
          return arr;
        });

        setMessages(formatted);
      }
    } catch (err) {
      console.log(err, "error");
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      getAllChatHistory();
    }
  }, [userData, getAllChatHistory]);

  return (
    <div style={styles.container}>
      {Object.keys(userData).length > 0 && userData ? (
        <h2>
          🤖 Welcome,{"  "} {userData.username}
        </h2>
      ) : (
        <h2>🤖 AI Chatbot</h2>
      )}
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
  );
}

const styles = {
  container: {
    width: 400,
    margin: "10px auto",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
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
