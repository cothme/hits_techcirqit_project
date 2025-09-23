import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <div className="w-60 bg-base-100 shadow-md min-h-screen p-4">
      <ul className="menu">
        <li>
          <Link to="/">📊 Dashboard</Link>
        </li>
        <li>
          <Link to="/settings">🛠️ Settings</Link>
        </li>
        <li>
          <Link to="/reports">📁 Reports</Link>
        </li>
        <li>
          <Link to="/alerts">🔔 Alerts</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
