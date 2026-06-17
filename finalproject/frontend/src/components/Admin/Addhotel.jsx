import { useState } from "react";
import axios from "axios";
import {
  faBroom,
  faSpa,
  faPersonSwimming,
  faDumbbell,
  faUtensils,
  faTableTennis,
  faMartiniGlassCitrus,
  faCouch,
  faWifi,
  faFireBurner,
  faUmbrellaBeach,
} from "@fortawesome/free-solid-svg-icons";

const iconMap = {
  broom: faBroom,
  spa: faSpa,
  pool: faPersonSwimming,
  gym: faDumbbell,
  restaurant: faUtensils,
  games: faTableTennis,
  bar: faMartiniGlassCitrus,
  lounge: faCouch,
  wifi: faWifi,
  fireplace: faFireBurner,
  beach: faUmbrellaBeach,
};

export default function Addhotel() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    img: "",
    images: [""],
    destination: "",
    rating: "",
    ratingoutof5: "",
    ratingNumber: "",
    quality: "",
    amenities: [{ icon: "", name: "" }],
    roomTypes: [
      {
        type: "standard",
        price: "",
        tax: "",
        availableRooms: "",
        specialFeatures: "",
      },
    ],
    meals: {
      breakfast: "",
      lunch: "",
      dinner: "",
    },
  });

  const handleChange = (e, section = null, index = null, subField = null) => {
    const { name, value } = e.target;

    if (section === "amenities" || section === "roomTypes") {
      const updated = [...form[section]];
      updated[index][subField || name] = value;
      setForm({ ...form, [section]: updated });
    } else if (section === "images") {
      const updatedImages = [...form.images];
      updatedImages[index] = value;
      setForm({ ...form, images: updatedImages });
    } else if (section === "meals") {
      setForm({ ...form, meals: { ...form.meals, [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const addAmenity = () =>
    setForm({
      ...form,
      amenities: [...form.amenities, { icon: "", name: "" }],
    });

  const addRoomType = () =>
    setForm({
      ...form,
      roomTypes: [
        ...form.roomTypes,
        {
          type: "standard",
          price: "",
          tax: "",
          availableRooms: "",
          specialFeatures: "",
        },
      ],
    });

  const addImageField = () =>
    setForm({ ...form, images: [...form.images, ""] });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      images: form.images.map((url) => ({ src: url })),
      amenities: form.amenities.map((a) => ({
        img: a.icon,
        name: a.name,
      })),
      roomTypes: form.roomTypes.map((room) => ({
        ...room,
        price: Number(room.price),
        tax: Number(room.tax),
        availableRooms: Number(room.availableRooms),
        specialFeatures: room.specialFeatures
          ? room.specialFeatures.split(",").map((f) => f.trim())
          : [],
      })),
      mealsOptions: Object.entries(form.meals).map(([key, value]) => ({
        id: key,
        label: key,
        price: Number(value),
        description: "",
      })),
    };

    try {
      await axios.post("http://localhost:5000/api/hotel/hoteladd", payload);
      alert("Hotel added!");
      window.location.reload();
    } catch (err) {
      console.error("Failed to add hotel:", err.response?.data || err.message);
      alert("Failed to add hotel.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-3xl font-bold text-center mb-6">Add Hotel</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="p-2 border rounded w-full"
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="p-2 border rounded w-full"
        />
        <input
          name="img"
          value={form.img}
          onChange={handleChange}
          placeholder="Main Image URL"
          required
          className="p-2 border rounded w-full"
        />
        <input
          name="destination"
          value={form.destination}
          onChange={handleChange}
          placeholder="Destination"
          required
          className="p-2 border rounded w-full"
        />
        <input
          name="rating"
          type="number"
          step="0.1"
          value={form.rating}
          onChange={handleChange}
          placeholder="Rating"
          required
          className="p-2 border rounded w-full"
        />
        <input
          name="ratingoutof5"
          type="number"
          step="0.1"
          value={form.ratingoutof5}
          onChange={handleChange}
          placeholder="Rating out of 5"
          className="p-2 border rounded w-full"
        />
        <input
          name="ratingNumber"
          type="number"
          value={form.ratingNumber}
          onChange={handleChange}
          placeholder="Number of Reviews"
          className="p-2 border rounded w-full"
        />
        <input
          name="quality"
          value={form.quality}
          onChange={handleChange}
          placeholder="Quality"
          className="p-2 border rounded w-full"
        />
      </div>

      {/* Images */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Gallery Images</h3>
        {form.images.map((imgUrl, i) => (
          <input
            key={i}
            value={imgUrl}
            onChange={(e) => handleChange(e, "images", i)}
            placeholder={`Image URL ${i + 1}`}
            className="p-2 border rounded w-full mb-2"
          />
        ))}
        <button
          type="button"
          onClick={addImageField}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Add Image
        </button>
      </div>

      {/* Amenities */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Amenities</h3>
        {form.amenities.map((a, i) => (
          <div key={i} className="flex flex-col sm:flex-row gap-2 mb-2">
            <select
              value={a.icon}
              onChange={(e) => handleChange(e, "amenities", i, "icon")}
              className="p-2 border rounded w-full"
            >
              <option value="">Select Icon</option>
              {Object.keys(iconMap).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
            <input
              value={a.name}
              onChange={(e) => handleChange(e, "amenities", i, "name")}
              placeholder="Amenity Name"
              className="p-2 border rounded w-full"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addAmenity}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Amenity
        </button>
      </div>

      {/* Room Types */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Room Types</h3>
        {form.roomTypes.map((r, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <select
              value={r.type}
              onChange={(e) => handleChange(e, "roomTypes", i, "type")}
              className="p-2 border rounded w-full"
            >
              <option value="standard">Standard</option>
              <option value="normal">Normal</option>
              <option value="duplex">Duplex</option>
            </select>
            <input
              value={r.price}
              onChange={(e) => handleChange(e, "roomTypes", i, "price")}
              placeholder="Price"
              type="number"
              className="p-2 border rounded w-full"
            />
            <input
              value={r.tax}
              onChange={(e) => handleChange(e, "roomTypes", i, "tax")}
              placeholder="Tax"
              type="number"
              className="p-2 border rounded w-full"
            />
            <input
              value={r.availableRooms}
              onChange={(e) =>
                handleChange(e, "roomTypes", i, "availableRooms")
              }
              placeholder="Available Rooms"
              type="number"
              className="p-2 border rounded w-full"
            />
            <input
              value={r.specialFeatures}
              onChange={(e) =>
                handleChange(e, "roomTypes", i, "specialFeatures")
              }
              placeholder="Special Features (comma-separated)"
              className="p-2 border rounded w-full col-span-2"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addRoomType}
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Room Type
        </button>
      </div>

      {/* Meals */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Meal Selection</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["breakfast", "lunch", "dinner"].map((meal) => (
            <div key={meal}>
              <label className="block mb-1 font-medium capitalize">
                {meal} Price
              </label>
              <input
                name={meal}
                type="number"
                value={form.meals[meal]}
                onChange={(e) => handleChange(e, "meals")}
                className="p-2 border rounded w-full"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded text-lg font-semibold"
      >
        Submit Hotel
      </button>
    </form>
  );
}
