import { useEffect, useState } from "react";
import axios from "axios";

const Hoteltable = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editHotelId, setEditHotelId] = useState(null);
  const [editedHotel, setEditedHotel] = useState({
    title: "",
    description: "",
    destination: "",
    rating: "",
    price: "",
  });

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/hotel/hotelfetch",
        {
          withCredentials: true,
        }
      );
      console.log("Fetched data:", res.data);
      const data = Array.isArray(res.data) ? res.data : [];
      setHotels(data);
    } catch (err) {
      console.error("Error fetching hotels:", err);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this hotel?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/hotel/hoteldelete/${id}`, {
        withCredentials: true,
      });
      setHotels((prev) => prev.filter((hotel) => hotel._id !== id));
    } catch (err) {
      console.error("Error deleting hotel:", err);
    }
  };

  const handleEditClick = (hotel) => {
    setEditHotelId(hotel._id);
    setEditedHotel({
      title: hotel.title,
      description: hotel.description,
      destination: hotel.destination,
      rating: hotel.rating,
      price: hotel.price,
    });
  };

  const handleSave = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/hotel/edithotel/${id}`,
        editedHotel,
        { withCredentials: true }
      );
      setEditHotelId(null);
      fetchHotels(); // Refresh list
    } catch (err) {
      console.error("Error updating hotel:", err);
    }
  };

  const handleChange = (e) => {
    setEditedHotel((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4 text-center">Hotel List</h2>
      {loading ? (
        <p className="text-center">Loading hotels...</p>
      ) : hotels.length === 0 ? (
        <p className="text-center">No hotels found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2 border">Hotel Name</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Place</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Rating</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hotels.map((hotel) => (
                <tr key={hotel._id} className="hover:bg-gray-100">
                  {editHotelId === hotel._id ? (
                    <>
                      <td className="px-4 py-2 border">
                        <input
                          name="title"
                          value={editedHotel.title}
                          onChange={handleChange}
                          className="border p-1 w-full"
                        />
                      </td>
                      <td className="px-4 py-2 border">
                        <input
                          name="description"
                          value={editedHotel.description}
                          onChange={handleChange}
                          className="border p-1 w-full"
                        />
                      </td>
                      <td className="px-4 py-2 border">
                        <input
                          name="destination"
                          value={editedHotel.destination}
                          onChange={handleChange}
                          className="border p-1 w-full"
                        />
                      </td>
                      <td className="px-4 py-2 border">
                        <input
                          name="price"
                          value={editedHotel.price}
                          onChange={handleChange}
                          className="border p-1 w-full"
                        />
                      </td>
                      <td className="px-4 py-2 border">
                        <input
                          name="rating"
                          value={editedHotel.rating}
                          onChange={handleChange}
                          className="border p-1 w-full"
                        />
                      </td>
                      <td className="px-4 py-2 border space-x-2">
                        <button
                          onClick={() => handleSave(hotel._id)}
                          className="bg-green-500 text-white px-2 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditHotelId(null)}
                          className="bg-gray-400 text-white px-2 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-2 border">{hotel.title}</td>
                      <td className="px-4 py-2 border">{hotel.description}</td>
                      <td className="px-4 py-2 border">{hotel.destination}</td>
                      <td className="px-4 py-2 border">{hotel.price}</td>
                      <td className="px-4 py-2 border">{hotel.rating}</td>
                      <td className="px-4 py-2 border space-x-2">
                        <button
                          onClick={() => handleEditClick(hotel)}
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(hotel._id)}
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

export default Hoteltable;
