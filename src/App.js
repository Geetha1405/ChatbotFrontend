import { useState } from "react";
import Chat from "./components/chat";

export default function App() {
  const [user, setUser] = useState(null);
  const [loginPage, setLoginPage] = useState(false);

  return (
    <div>
      <Chat user={user} />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginLeft: 10,
    marginTop: 10,
    width: 100,
    background: "#8c8cff",
  },
  listing: {
    listStyleType: "none",
    cursor: "pointer",
    display: "flex",
    gap: 10,
    padding: 0,
    margin: "auto",
  },
  sublist: {
    margin: 15,
    fontSize: 16,
    fontWeight: 500,
    color: "#000000",
  },
};
