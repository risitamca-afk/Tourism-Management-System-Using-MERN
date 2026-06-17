import { useEffect, useState } from "react";
import axios from "axios";

const Packagetable = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editedPackage, setEditedPackage] = useState({
    title: "",
    description: "",
    destination: "",
    quality: "",
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/package/", {
        withCredentials: true,
      });
      const data = Array.isArray(res.data) ? res.data : [];
      setPackages(data);
    } catch (err) {
      console.error("Error fetching packages:", err);
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this package?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/package/deletepackage/${id}`,
        {
          withCredentials: true,
        }
      );
      setPackages((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting package:", err);
    }
  };

  const handleEditClick = (pkg) => {
    setEditId(pkg._id);
    setEditedPackage({
      title: pkg.title,
      description: pkg.description,
      destination: pkg.destination,
      quality: pkg.quality,
    });
  };

  const handleSave = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/package/updatepackage/${id}`,
        editedPackage,
        {
          withCredentials: true,
        }
      );
      setEditId(null);
      fetchPackages();
    } catch (err) {
      console.error("Error updating package:", err);
    }
  };

  const handleChange = (e) => {
    setEditedPackage((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4 text-center">Package List</h2>
      {loading ? (
        <p className="text-center">Loading packages...</p>
      ) : packages.length === 0 ? (
        <p className="text-center">No packages found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Destination</th>
                <th className="px-4 py-2 border">Quality</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg._id} className="hover:bg-gray-100">
                  {editId === pkg._id ? (
                    <>
                      <td className="px-4 py-2 border">
                        <input
                          name="title"
                          value={editedPackage.title}
                          onChange={handleChange}
                          className="border p-1 w-full"
                        />
                      </td>
                      <td className="px-4 py-2 border">
                        <input
                          name="description"
                          value={editedPackage.description}
                          onChange={handleChange}
                          className="border p-1 w-full"
                        />
                      </td>
                      <td className="px-4 py-2 border">
                        <input
                          name="destination"
                          value={editedPackage.destination}
                          onChange={handleChange}
                          className="border p-1 w-full"
                        />
                      </td>
                      
                      <td className="px-4 py-2 border">
                        <input
                          name="quality"
                          value={editedPackage.quality}
                          onChange={handleChange}
                          className="border p-1 w-full"
                        />
                      </td>
                      <td className="px-4 py-2 border space-x-2">
                        <button
                          onClick={() => handleSave(pkg._id)}
                          className="bg-green-500 text-white px-2 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditId(null)}
                          className="bg-gray-400 text-white px-2 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-2 border">{pkg.title}</td>
                      <td className="px-4 py-2 border">{pkg.description}</td>
                      <td className="px-4 py-2 border">{pkg.destination}</td>
                      <td className="px-4 py-2 border">{pkg.quality}</td>
                      <td className="px-4 py-2 border space-x-2">
                        <button
                          onClick={() => handleEditClick(pkg)}
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(pkg._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Packagetable;
