import { Link, useNavigate } from "react-router-dom";

function Sidebar({ setIsLoggedIn }) {

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (

    <div className="sidebar">

      <h2>Smart Village</h2>

      <Link to="/home">Home</Link>

      <Link to="/dashboard">Dashboard</Link>

      <Link to="/complaint">Complaint</Link>

      <Link to="/admin">Admin</Link>

      <Link to="/infrastructure">Infrastructure</Link>

      <Link to="/map">Map</Link>

      <button onClick={handleLogout}>Logout</button>

    </div>

  );
}

export default Sidebar;