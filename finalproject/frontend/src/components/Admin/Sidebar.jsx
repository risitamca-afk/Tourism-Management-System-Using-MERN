// import { FaChartBar, FaBox, FaUser, FaEnvelope, FaClipboardList } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-blue-700 text-white flex flex-col p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <nav className="space-y-3">
          <NavLink to="/hoteltable" className="block hover:underline">Hotel Model</NavLink>
          <NavLink to="/admin/orders" className="block hover:underline">Orders</NavLink>
          <NavLink to="/admin/products" className="block hover:underline">Products</NavLink>
        </nav>
    </aside>
  );
};

export default Sidebar;
