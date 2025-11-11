import { Outlet, useNavigate } from "react-router-dom";

function AppLayout() {
  const navigate = useNavigate();
  const userData = localStorage.getItem("user");
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <div>
      {!userData ? (
        <div className="" style={styles.container}>
          <ul style={styles.listing} onClick={() => navigate("/login")}>
            <li style={styles.sublist}>Login</li>
          </ul>
        </div>
      ) : (
        <div className="" style={styles.container}>
          <ul style={styles.listing} onClick={() => handleLogout()}>
            <li style={styles.sublist}>Logout</li>
          </ul>
        </div>
      )}
      <Outlet />
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

export default AppLayout;
