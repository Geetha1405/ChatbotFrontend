import { use, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage({ onLogin }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // const endpoint = isSignup
      //   ? "http://localhost:5000/signup"
      //   : "http://localhost:5000/login";
      const endpoint = isSignup
        ? "https://chatbotbackend-3x52.onrender.com/signup"
        : "https://chatbotbackend-3x52.onrender.com/login";
      const res = await axios.post(endpoint, { username, password });

      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/chat");
      } else if (res.data.error) {
        setError(res.data.error);
      } else {
        setSuccess("Signup successful!");
        setIsSignup(false);
      }
    } catch (err) {
      setError("Invalid credentials or user does not exists.");
    }
  };
  const handleChange = () => {
    setIsSignup(!isSignup);
    setError("");
    setUserName("");
    setPassword("");
  };
  return (
    <div style={styles.container}>
      <h2>{isSignup ? "Sign Up" : "Log In"}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button} type="submit">
          {isSignup ? "Sign Up" : "Log In"}
        </button>
      </form>
      <p onClick={() => handleChange()} style={styles.link}>
        {isSignup ? "Already have an account? Log in" : "Create a new account"}
      </p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}

const styles = {
  container: { width: 300, margin: "100px auto", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: 10 },
  input: { padding: 8, borderRadius: 5, border: "1px solid #ccc" },
  button: {
    padding: 10,
    background: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  link: { color: "#007bff", cursor: "pointer" },
};

export default LoginPage;
