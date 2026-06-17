// import { useState } from "react";
// import axios from "axios";

// export default function AddPackage() {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     destination: "",
//     duration: "",
//     rating: "",
//     ratingoutof5: "",
//     ratingNumber: "",
//     quality: "",
//     images: [{ src: "", alt: "" }],
//     specialFeatures: [""],
//     hotelTypes: [
//       {
//         img: "",
//         type: "",
//         price: "",
//         tax: "",
//         specialFeatures: [""],
//       },
//     ],
//     activityOptions: [
//       {
//         activitytype: "",
//         img: "",
//         location: "",
//         duration: "",
//         moredetails: [""],
//       },
//     ],
//     cabDetails: [{ img: "", cabNo: "", driverNo: "" }],
//   });

//   const handleChange = (e, section, index, subField) => {
//     const { name, value } = e.target;
//     if (section) {
//       const updated = [...form[section]];
//       if (subField === "specialFeatures" || subField === "moredetails") {
//         updated[index][subField] = value.split(",");
//       } else {
//         updated[index][subField || name] = value;
//       }
//       setForm({ ...form, [section]: updated });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const addSectionItem = (section, newItem) => {
//     setForm({ ...form, [section]: [...form[section], newItem] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/package/", form);
//       alert("Package added!");
//       window.location.reload();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add package.");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="p-6 max-w-5xl mx-auto bg-white rounded-lg shadow space-y-6"
//     >
//       <h2 className="text-3xl font-bold text-center mb-4">Add Package</h2>

//       {/* Basic Info */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <input
//           name="title"
//           value={form.title}
//           onChange={handleChange}
//           placeholder="Title"
//           required
//           className="input"
//         />
//         <input
//           name="duration"
//           value={form.duration}
//           onChange={handleChange}
//           placeholder="Duration"
//           required
//           className="input"
//         />
//         <input
//           name="destination"
//           value={form.destination}
//           onChange={handleChange}
//           placeholder="Destination"
//           required
//           className="input"
//         />
//         <input
//           name="quality"
//           value={form.quality}
//           onChange={handleChange}
//           placeholder="Quality"
//           className="input"
//         />
//         <input
//           name="rating"
//           type="number"
//           value={form.rating}
//           onChange={handleChange}
//           placeholder="Rating"
//           className="input"
//         />
//         <input
//           name="ratingoutof5"
//           type="number"
//           value={form.ratingoutof5}
//           onChange={handleChange}
//           placeholder="Rating out of 5"
//           className="input"
//         />
//         <input
//           name="ratingNumber"
//           type="number"
//           value={form.ratingNumber}
//           onChange={handleChange}
//           placeholder="Number of Reviews"
//           className="input"
//         />
//       </div>

//       <textarea
//         name="description"
//         value={form.description}
//         onChange={handleChange}
//         placeholder="Description"
//         className="input w-full h-24"
//       />

//       {/* Images */}
//       <div>
//         <h3 className="text-xl font-semibold mb-2">Images</h3>
//         {form.images.map((img, i) => (
//           <div key={i} className="flex gap-2 mb-2">
//             <input
//               value={img.src}
//               onChange={(e) => handleChange(e, "images", i, "src")}
//               placeholder="Image URL"
//               className="input w-full"
//             />
//             <input
//               value={img.alt}
//               onChange={(e) => handleChange(e, "images", i, "alt")}
//               placeholder="Alt text"
//               className="input w-full"
//             />
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={() => addSectionItem("images", { src: "", alt: "" })}
//           className="btn"
//         >
//           Add Image
//         </button>
//       </div>

//       {/* Special Features */}
//       <div>
//         <h3 className="text-xl font-semibold mb-2">Special Features</h3>
//         <input
//           value={form.specialFeatures}
//           onChange={(e) =>
//             setForm({ ...form, specialFeatures: e.target.value.split(",") })
//           }
//           placeholder="Comma-separated features"
//           className="input w-full"
//         />
//       </div>

//       {/* Hotel Types */}
//       <div>
//         <h3 className="text-xl font-semibold mb-2">Hotel Types</h3>
//         {form.hotelTypes.map((h, i) => (
//           <div key={i} className="grid grid-cols-2 gap-4 mb-2">
//             <input
//               value={h.img}
//               onChange={(e) => handleChange(e, "hotelTypes", i, "img")}
//               placeholder="Image"
//               className="input"
//             />
//             <input
//               value={h.type}
//               onChange={(e) => handleChange(e, "hotelTypes", i, "type")}
//               placeholder="Type"
//               className="input"
//             />
//             <input
//               value={h.price}
//               onChange={(e) => handleChange(e, "hotelTypes", i, "price")}
//               placeholder="Price"
//               type="number"
//               className="input"
//             />
//             <input
//               value={h.tax}
//               onChange={(e) => handleChange(e, "hotelTypes", i, "tax")}
//               placeholder="Tax"
//               type="number"
//               className="input"
//             />
//             <input
//               value={h.specialFeatures}
//               onChange={(e) =>
//                 handleChange(e, "hotelTypes", i, "specialFeatures")
//               }
//               placeholder="Special Features (comma-separated)"
//               className="input col-span-2"
//             />
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={() =>
//             addSectionItem("hotelTypes", {
//               img: "",
//               type: "",
//               price: "",
//               tax: "",
//               specialFeatures: [""],
//             })
//           }
//           className="btn"
//         >
//           Add Hotel Type
//         </button>
//       </div>

//       {/* Activity Options */}
//       <div>
//         <h3 className="text-xl font-semibold mb-2">Activity Options</h3>
//         {form.activityOptions.map((a, i) => (
//           <div key={i} className="grid grid-cols-2 gap-4 mb-2">
//             <input
//               value={a.activitytype}
//               onChange={(e) =>
//                 handleChange(e, "activityOptions", i, "activitytype")
//               }
//               placeholder="Activity Type"
//               className="input"
//             />
//             <input
//               value={a.img}
//               onChange={(e) => handleChange(e, "activityOptions", i, "img")}
//               placeholder="Image"
//               className="input"
//             />
//             <input
//               value={a.location}
//               onChange={(e) =>
//                 handleChange(e, "activityOptions", i, "location")
//               }
//               placeholder="Location"
//               className="input"
//             />
//             <input
//               value={a.duration}
//               onChange={(e) =>
//                 handleChange(e, "activityOptions", i, "duration")
//               }
//               placeholder="Duration"
//               className="input"
//             />
//             <input
//               value={a.moredetails}
//               onChange={(e) =>
//                 handleChange(e, "activityOptions", i, "moredetails")
//               }
//               placeholder="More Details (comma-separated)"
//               className="input col-span-2"
//             />
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={() =>
//             addSectionItem("activityOptions", {
//               activitytype: "",
//               img: "",
//               location: "",
//               duration: "",
//               moredetails: [""],
//             })
//           }
//           className="btn"
//         >
//           Add Activity
//         </button>
//       </div>

//       {/* Cab Details */}
//       <div>
//         <h3 className="text-xl font-semibold mb-2">Cab Details</h3>
//         {form.cabDetails.map((c, i) => (
//           <div key={i} className="grid grid-cols-3 gap-4 mb-2">
//             <input
//               value={c.img}
//               onChange={(e) => handleChange(e, "cabDetails", i, "img")}
//               placeholder="Image"
//               className="input"
//             />
//             <input
//               value={c.cabNo}
//               onChange={(e) => handleChange(e, "cabDetails", i, "cabNo")}
//               placeholder="Cab No"
//               className="input"
//             />
//             <input
//               value={c.driverNo}
//               onChange={(e) => handleChange(e, "cabDetails", i, "driverNo")}
//               placeholder="Driver No"
//               className="input"
//             />
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={() =>
//             addSectionItem("cabDetails", { img: "", cabNo: "", driverNo: "" })
//           }
//           className="btn"
//         >
//           Add Cab
//         </button>
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white py-3 px-6 rounded text-lg hover:bg-blue-700"
//       >
//         Submit Package
//       </button>
//     </form>
//   );
// }

import { useState } from "react";
import axios from "axios";

export default function AddPackage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    destination: "",
    duration: "",
    rating: "",
    ratingoutof5: "",
    ratingNumber: "",
    quality: "",
    images: [{ src: "", alt: "" }],
    specialFeatures: [""],
    hotelTypes: [
      {
        img: "",
        type: "",
        price: "",
        tax: "",
        specialFeatures: [""],
      },
    ],
    activityOptions: [
      {
        activitytype: "",
        img: "",
        location: "",
        duration: "",
        moredetails: [""],
      },
    ],
    cabDetails: [{ img: "", cabNo: "", driverNo: "" }],
    flightoption: [
      {
        type: "withFlight",
        withFlightDetails: [
          {
            price: 0,
            tax: 0,
            offer: "",
            crossoutPrice: 0,
            flight: [
              {
                goingFlightid: "",
                goingFlightname: "",
                goingFlightimage: "",
                goingFlighttime: "",
                goingFlightfrom: "",
                goingFlightto: "",
                goingFlightcabin: "",
                goingFlightcheckin: "",
                goingtime: "",
                comingFlightid: "",
                comingFlightname: "",
                comingFlightimage: "",
                comingFlighttime: "",
                comingFlightfrom: "",
                comingFlightto: "",
                comingFlightcabin: "",
                comingFlightcheckin: "",
                comingtime: "",
              },
            ],
          },
        ],
        withoutFlightDetails: {
          price: 0,
          tax: 0,
          offer: "",
          crossoutPrice: 0,
        },
      },
    ],
  });

  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";

  const handleChange = (e, section, index, subField) => {
    const { name, value } = e.target;
    if (section) {
      const updated = [...form[section]];
      if (subField === "specialFeatures" || subField === "moredetails") {
        updated[index][subField] = value.split(",");
      } else {
        updated[index][subField || name] = value;
      }
      setForm({ ...form, [section]: updated });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const addSectionItem = (section, newItem) => {
    setForm({ ...form, [section]: [...form[section], newItem] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/package/", form);
      alert("Package added!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to add package.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-5xl mx-auto bg-white rounded-lg shadow space-y-6"
    >
      <h2 className="text-3xl font-bold text-center mb-4">Add Package</h2>

      {/* Basic Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className={inputClass}
        />
        <input
          name="duration"
          value={form.duration}
          onChange={handleChange}
          placeholder="Duration"
          required
          className={inputClass}
        />
        <input
          name="destination"
          value={form.destination}
          onChange={handleChange}
          placeholder="Destination"
          required
          className={inputClass}
        />
        <input
          name="quality"
          value={form.quality}
          onChange={handleChange}
          placeholder="Quality"
          className={inputClass}
        />
        <input
          name="rating"
          type="number"
          value={form.rating}
          onChange={handleChange}
          placeholder="Rating"
          className={inputClass}
        />
        <input
          name="ratingoutof5"
          type="number"
          value={form.ratingoutof5}
          onChange={handleChange}
          placeholder="Rating out of 5"
          className={inputClass}
        />
        <input
          name="ratingNumber"
          type="number"
          value={form.ratingNumber}
          onChange={handleChange}
          placeholder="Number of Reviews"
          className={inputClass}
        />
      </div>

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className={`${inputClass} h-24`}
      />

      {/* Images */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Images</h3>
        {form.images.map((img, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              value={img.src}
              onChange={(e) => handleChange(e, "images", i, "src")}
              placeholder="Image URL"
              className={inputClass}
            />
            <input
              value={img.alt}
              onChange={(e) => handleChange(e, "images", i, "alt")}
              placeholder="Alt text"
              className={inputClass}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => addSectionItem("images", { src: "", alt: "" })}
          className="btn"
        >
          Add Image
        </button>
      </div>

      {/* Special Features */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Special Features</h3>
        <input
          value={form.specialFeatures}
          onChange={(e) =>
            setForm({ ...form, specialFeatures: e.target.value.split(",") })
          }
          placeholder="Comma-separated features"
          className={inputClass}
        />
      </div>

      {/* Hotel Types */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Hotel Types</h3>
        {form.hotelTypes.map((h, i) => (
          <div key={i} className="grid grid-cols-2 gap-4 mb-2">
            <input
              value={h.img}
              onChange={(e) => handleChange(e, "hotelTypes", i, "img")}
              placeholder="Image"
              className={inputClass}
            />
            <input
              value={h.type}
              onChange={(e) => handleChange(e, "hotelTypes", i, "type")}
              placeholder="Type"
              className={inputClass}
            />
            <input
              value={h.price}
              onChange={(e) => handleChange(e, "hotelTypes", i, "price")}
              placeholder="Price"
              type="number"
              className={inputClass}
            />
            <input
              value={h.tax}
              onChange={(e) => handleChange(e, "hotelTypes", i, "tax")}
              placeholder="Tax"
              type="number"
              className={inputClass}
            />
            <input
              value={h.specialFeatures}
              onChange={(e) =>
                handleChange(e, "hotelTypes", i, "specialFeatures")
              }
              placeholder="Special Features (comma-separated)"
              className={`${inputClass} col-span-2`}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addSectionItem("hotelTypes", {
              img: "",
              type: "",
              price: "",
              tax: "",
              specialFeatures: [""],
            })
          }
          className="btn"
        >
          Add Hotel Type
        </button>
      </div>

      {/* Activity Options */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Activity Options</h3>
        {form.activityOptions.map((a, i) => (
          <div key={i} className="grid grid-cols-2 gap-4 mb-2">
            <input
              value={a.activitytype}
              onChange={(e) =>
                handleChange(e, "activityOptions", i, "activitytype")
              }
              placeholder="Activity Type"
              className={inputClass}
            />
            <input
              value={a.img}
              onChange={(e) => handleChange(e, "activityOptions", i, "img")}
              placeholder="Image"
              className={inputClass}
            />
            <input
              value={a.location}
              onChange={(e) =>
                handleChange(e, "activityOptions", i, "location")
              }
              placeholder="Location"
              className={inputClass}
            />
            <input
              value={a.duration}
              onChange={(e) =>
                handleChange(e, "activityOptions", i, "duration")
              }
              placeholder="Duration"
              className={inputClass}
            />
            <input
              value={a.moredetails}
              onChange={(e) =>
                handleChange(e, "activityOptions", i, "moredetails")
              }
              placeholder="More Details (comma-separated)"
              className={`${inputClass} col-span-2`}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addSectionItem("activityOptions", {
              activitytype: "",
              img: "",
              location: "",
              duration: "",
              moredetails: [""],
            })
          }
          className="btn"
        >
          Add Activity
        </button>
      </div>

      {/* Cab Details */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Cab Details</h3>
        {form.cabDetails.map((c, i) => (
          <div key={i} className="grid grid-cols-3 gap-4 mb-2">
            <input
              value={c.img}
              onChange={(e) => handleChange(e, "cabDetails", i, "img")}
              placeholder="Image"
              className={inputClass}
            />
            <input
              value={c.cabNo}
              onChange={(e) => handleChange(e, "cabDetails", i, "cabNo")}
              placeholder="Cab No"
              className={inputClass}
            />
            <input
              value={c.driverNo}
              onChange={(e) => handleChange(e, "cabDetails", i, "driverNo")}
              placeholder="Driver No"
              className={inputClass}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addSectionItem("cabDetails", { img: "", cabNo: "", driverNo: "" })
          }
          className="btn"
        >
          Add Cab
        </button>
      </div>
      {/* Flight Options */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Flight Options</h3>

        {form.flightoption.map((opt, i) => (
          <div
            key={i}
            className="space-y-4 border p-4 rounded-lg bg-gray-50 mb-6"
          >
            {/* Option Type */}
            <label className="block font-medium mb-1">
              Select Option Type:
            </label>
            <select
              value={opt.type}
              onChange={(e) => {
                const updated = [...form.flightoption];
                updated[i].type = e.target.value;
                setForm({ ...form, flightoption: updated });
              }}
              className={inputClass}
            >
              <option value="withFlight">With Flight</option>
              <option value="withoutFlight">Without Flight</option>
            </select>

            {/* With Flight Details */}
            {opt.type === "withFlight" &&
              opt.withFlightDetails.map((detail, j) => (
                <div key={j} className="space-y-3">
                  <h4 className="text-md font-semibold">
                    With Flight Detail #{j + 1}
                  </h4>

                  <input
                    type="text"
                    value={detail.price === 0 ? "" : detail.price}
                    onChange={(e) => {
                      const updated = [...form.flightoption];
                      updated[i].withFlightDetails[j].price =
                        Number(e.target.value) || 0;
                      setForm({ ...form, flightoption: updated });
                    }}
                    placeholder="Base Price (e.g. 5000)"
                    className={inputClass}
                  />
                  <input
                    type="text"
                    value={detail.tax === 0 ? "" : detail.tax}
                    onChange={(e) => {
                      const updated = [...form.flightoption];
                      updated[i].withFlightDetails[j].tax =
                        Number(e.target.value) || 0;
                      setForm({ ...form, flightoption: updated });
                    }}
                    placeholder="Tax Amount (e.g. 500)"
                    className={inputClass}
                  />
                  <input
                    value={detail.offer}
                    onChange={(e) => {
                      const updated = [...form.flightoption];
                      updated[i].withFlightDetails[j].offer = e.target.value;
                      setForm({ ...form, flightoption: updated });
                    }}
                    placeholder="Offer Description (e.g. 10% off)"
                    className={inputClass}
                  />
                  <input
                    type="text"
                    value={
                      detail.crossoutPrice === 0 ? "" : detail.crossoutPrice
                    }
                    onChange={(e) => {
                      const updated = [...form.flightoption];
                      updated[i].withFlightDetails[j].crossoutPrice =
                        Number(e.target.value) || 0;
                      setForm({ ...form, flightoption: updated });
                    }}
                    placeholder="Original Price (e.g. 5500)"
                    className={inputClass}
                  />

                  {/* Flight Details */}
                  {detail.flight.map((f, k) => (
                    <div
                      key={k}
                      className="grid grid-cols-1 md:grid-cols-2 gap-3 border p-3 rounded bg-white"
                    >
                      <h5 className="col-span-full font-semibold text-sm text-gray-700">
                        Flight Pair #{k + 1}
                      </h5>

                      {/* Going Flight */}
                      <input
                        placeholder="Going Flight Name (e.g. Indigo)"
                        value={f.goingFlightname}
                        onChange={(e) => {
                          const updated = [...form.flightoption];
                          updated[i].withFlightDetails[j].flight[
                            k
                          ].goingFlightname = e.target.value;
                          setForm({ ...form, flightoption: updated });
                        }}
                        className={inputClass}
                      />
                      <input
                        placeholder="Going Flight Time (e.g. 10:00 AM)"
                        value={f.goingFlighttime}
                        onChange={(e) => {
                          const updated = [...form.flightoption];
                          updated[i].withFlightDetails[j].flight[
                            k
                          ].goingFlighttime = e.target.value;
                          setForm({ ...form, flightoption: updated });
                        }}
                        className={inputClass}
                      />
                      <input
                        placeholder="Going From (e.g. Delhi)"
                        value={f.goingFlightfrom}
                        onChange={(e) => {
                          const updated = [...form.flightoption];
                          updated[i].withFlightDetails[j].flight[
                            k
                          ].goingFlightfrom = e.target.value;
                          setForm({ ...form, flightoption: updated });
                        }}
                        className={inputClass}
                      />
                      <input
                        placeholder="Going To (e.g. Goa)"
                        value={f.goingFlightto}
                        onChange={(e) => {
                          const updated = [...form.flightoption];
                          updated[i].withFlightDetails[j].flight[
                            k
                          ].goingFlightto = e.target.value;
                          setForm({ ...form, flightoption: updated });
                        }}
                        className={inputClass}
                      />
                      <input
                        placeholder="Going Cabin Type (e.g. Economy)"
                        value={f.goingFlightcabin}
                        onChange={(e) => {
                          const updated = [...form.flightoption];
                          updated[i].withFlightDetails[j].flight[
                            k
                          ].goingFlightcabin = e.target.value;
                          setForm({ ...form, flightoption: updated });
                        }}
                        className={inputClass}
                      />
                      <input
                        placeholder="Going Check-in (e.g. 15kg)"
                        value={f.goingFlightcheckin}
                        onChange={(e) => {
                          const updated = [...form.flightoption];
                          updated[i].withFlightDetails[j].flight[
                            k
                          ].goingFlightcheckin = e.target.value;
                          setForm({ ...form, flightoption: updated });
                        }}
                        className={inputClass}
                      />
                      <input
                        type="text"
                        value={f.goingtime === 0 ? "" : f.goingtime}
                        onChange={(e) => {
                          const updated = [...form.flightoption];
                          updated[i].withFlightDetails[j].flight[k].goingtime =
                            e.target.value;
                          setForm({ ...form, flightoption: updated });
                        }}
                        placeholder="Going Duration (e.g. 2h 30m)"
                        className={inputClass}
                      />

                      {/* Coming Flight */}
                      <input
                        placeholder="Return Flight Name (e.g. Indigo)"
                        value={f.comingFlightname}
                        onChange={(e) => {
                          const updated = [...form.flightoption];
                          updated[i].withFlightDetails[j].flight[
                            k
                          ].comingFlightname = e.target.value;
                          setForm({ ...form, flightoption: updated });
                        }}
                        className={inputClass}
                      />
                      <input
                        placeholder="Return Flight Time (e.g. 6:00 PM)"
                        value={f.comingFlighttime}
                        onChange={(e) => {
                          const updated = [...form.flightoption];
                          updated[i].withFlightDetails[j].flight[
                            k
                          ].comingFlighttime = e.target.value;
                          setForm({ ...form, flightoption: updated });
                        }}
                        className={inputClass}
                      />
                      <input
                        placeholder="Return From (e.g. Goa)"
                        value={f.comingFlightfrom}
                        onChange={(e) => {
                          const updated = [...form.flightoption];
                          updated[i].withFlightDetails[j].flight[
                            k
                          ].comingFlightfrom = e.target.value;
                          setForm({ ...form, flightoption: updated });
                        }}
                        className={inputClass}
                      />
                      <input
                        placeholder="Return To (e.g. Delhi)"
                        value={f.comingFlightto}
                        onChange={(e) => {
                          const updated = [...form.flightoption];
                          updated[i].withFlightDetails[j].flight[
                            k
                          ].comingFlightto = e.target.value;
                          setForm({ ...form, flightoption: updated });
                        }}
                        className={inputClass}
                      />
                      <input
                        placeholder="Return Cabin Type"
                        value={f.comingFlightcabin}
                        onChange={(e) => {
                          const updated = [...form.flightoption];
                          updated[i].withFlightDetails[j].flight[
                            k
                          ].comingFlightcabin = e.target.value;
                          setForm({ ...form, flightoption: updated });
                        }}
                        className={inputClass}
                      />
                      <input
                        placeholder="Return Check-in"
                        value={f.comingFlightcheckin}
                        onChange={(e) => {
                          const updated = [...form.flightoption];
                          updated[i].withFlightDetails[j].flight[
                            k
                          ].comingFlightcheckin = e.target.value;
                          setForm({ ...form, flightoption: updated });
                        }}
                        className={inputClass}
                      />
                      <input
                        type="text"
                        value={f.comingtime === 0 ? "" : f.comingtime}
                        onChange={(e) => {
                          const updated = [...form.flightoption];
                          updated[i].withFlightDetails[j].flight[k].comingtime =
                            e.target.value;
                          setForm({ ...form, flightoption: updated });
                        }}
                        placeholder="Return Duration (e.g. 2h)"
                        className={inputClass}
                      />
                    </div>
                  ))}
                </div>
              ))}

            {/* Without Flight Details */}
            {opt.type === "withoutFlight" && (
              <div className="space-y-2">
                <h4 className="text-md font-semibold">
                  Without Flight Details
                </h4>
                <input
                  type="text"
                  value={
                    opt.withoutFlightDetails.price === 0
                      ? ""
                      : opt.withoutFlightDetails.price
                  }
                  onChange={(e) => {
                    const updated = [...form.flightoption];
                    updated[i].withoutFlightDetails.price =
                      Number(e.target.value) || 0;
                    setForm({ ...form, flightoption: updated });
                  }}
                  placeholder="Package Price"
                  className={inputClass}
                />
                <input
                  type="text"
                  value={
                    opt.withoutFlightDetails.tax === 0
                      ? ""
                      : opt.withoutFlightDetails.tax
                  }
                  onChange={(e) => {
                    const updated = [...form.flightoption];
                    updated[i].withoutFlightDetails.tax =
                      Number(e.target.value) || 0;
                    setForm({ ...form, flightoption: updated });
                  }}
                  placeholder="Tax"
                  className={inputClass}
                />
                <input
                  value={opt.withoutFlightDetails.offer}
                  onChange={(e) => {
                    const updated = [...form.flightoption];
                    updated[i].withoutFlightDetails.offer = e.target.value;
                    setForm({ ...form, flightoption: updated });
                  }}
                  placeholder="Offer Description"
                  className={inputClass}
                />
                <input
                  type="text"
                  value={
                    opt.withoutFlightDetails.crossoutPrice === 0
                      ? ""
                      : opt.withoutFlightDetails.crossoutPrice
                  }
                  onChange={(e) => {
                    const updated = [...form.flightoption];
                    updated[i].withoutFlightDetails.crossoutPrice =
                      Number(e.target.value) || 0;
                    setForm({ ...form, flightoption: updated });
                  }}
                  placeholder="Original Price"
                  className={inputClass}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-6 rounded text-lg hover:bg-blue-700"
      >
        Submit Package
      </button>
    </form>
  );
}
