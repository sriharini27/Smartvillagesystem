import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <h2>Smart Village</h2>

      <div className="nav-links">

        <Link to="/home">Home</Link>

        <Link to="/">Dashboard</Link>

        <Link to="/complaint">Complaint</Link>

        <Link to="/admin">Admin</Link>

        <Link to="/map">Map</Link>

        <Link to="/water-tank">Water Tank</Link>

        <Link to="/street-lights">Street Lights</Link>

      </div>

    </nav>
  );
}

export default Navbar;