import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

const AdminDashboardPage = () => {
  const { user, adminLogout } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await adminLogout(); // Assuming adminLogout is a valid async function
      console.log("Admin logged out");
      navigate("/adminLogin"); // Use navigate here
    } catch (error) {
      console.error("Logout handler caught error:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className="w-64 text-white p-6 space-y-4"
        style={{ backgroundColor: "#2C3E50" }}
      >
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
        <nav className="space-y-7">
          <NavLink
            to="/adminDashboard/hoteltable"
            className={({ isActive }) =>
              isActive ? "bg-white text-black p-2 rounded" : "text-white p-2"
            }
          >
            Hotel Model
          </NavLink>
          <NavLink
            to="/adminDashboard/flighttable"
            className="block hover:underline"
          >
            Flight Model
          </NavLink>
          <NavLink
            to="/adminDashboard/packagetable"
            className="block hover:underline"
          >
            Package Model
          </NavLink>
          <NavLink
            to="/adminDashboard/addhotel"
            className="block hover:underline"
          >
            Hotel Add
          </NavLink>
          <NavLink
            to="/adminDashboard/addflight"
            className="block hover:underline"
          >
            Flight Add
          </NavLink>
          <NavLink
            to="/adminDashboard/addpackagepage"
            className="block hover:underline"
          >
            Package Add
          </NavLink>
          {/* <NavLink to="/admin/orders" className="block hover:underline">
            Orders
          </NavLink>
          <NavLink to="/admin/products" className="block hover:underline">
            Products
          </NavLink> */}
          <button onClick={handleLogout}>Logout</button>
          {/* <p>{user.email}</p> */}
        </nav>
        {/* <div className="text-sm text-gray-300 p-5">
      <p>{user.email}</p>
    </div> */}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
        <Outlet /> {/* Route content goes here */}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
