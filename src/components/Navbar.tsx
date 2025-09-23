// src/components/Navbar.tsx
import { Link } from "react-router-dom";
import TrendMicroIcon from "../assets/trend_icon.png";

const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <div className="flex gap-4">
            <div className="avatar">
              <div className="w-8 rounded">
                <img src={TrendMicroIcon} />
              </div>
            </div>
            <div>Hot Issue Dashboard</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
