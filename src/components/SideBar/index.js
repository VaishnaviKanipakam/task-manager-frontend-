import { Link } from "react-router-dom";
import "./index.css";

const SideBar = () => {
  return (
    <ul className="sidebar-container">
      <Link to="/" className="link-item">
        <li className="side-bar-item-name">Dashboard</li>
      </Link>
      <Link to="/insights" className="link-item">
        <li className="side-bar-item-name">Insights Panel</li>
      </Link>
    </ul>
  );
};

export default SideBar;
