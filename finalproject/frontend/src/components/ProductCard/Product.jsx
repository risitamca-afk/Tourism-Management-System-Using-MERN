// import { useState } from "react";
// import axios from "axios";

// import {
//   Dialog,
//   DialogBackdrop,
//   DialogPanel,
//   Disclosure,
//   DisclosureButton,
//   DisclosurePanel,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuItems,
// } from "@headlessui/react";
// import { XMarkIcon } from "@heroicons/react/24/outline";
// import {
//   ChevronDownIcon,
//   FunnelIcon,
//   MinusIcon,
//   PlusIcon,
//   Squares2X2Icon,
// } from "@heroicons/react/20/solid";

// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
// import { hotelsData1 } from "../../dataset/hoteldata";
// import ProductCard from "./ProductCard";
// import {
//   filters,
//   SingleOptionClickFilters,
// } from "../../dataset/HotelFilterData";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFilter } from "@fortawesome/free-solid-svg-icons";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";
// import { useEffect } from "react";

// const sortOptions = [
//   { name: "Price: Low to High", href: "#", current: false },
//   { name: "Price: High to Low", href: "#", current: false },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function Product() {
//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   //for search purposeradio filter and normal filter

//   const [hotels, setHotels] = useState([]);

//   useEffect(() => {
//     const fetchHotels = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/hotel/");
//         // Assuming the API response returns an array of hotels
//         const data = Array.isArray(res.data) ? res.data : [];
//         setHotels(data);
//       } catch (err) {
//         console.error("Error fetching hotels:", err);
//         setHotels([]); // fallback to empty array
//       }
//     };

//     fetchHotels();
//   }, []);

//   const handleFilter = (value, sectionId) => {
//     const searchParamms = new URLSearchParams(location.search);
//     let filterValue = searchParamms.getAll(sectionId);

//     if (filterValue.length > 0 && filterValue[0].split(",").includes(value)) {
//       filterValue = filterValue[0].split(",").filter((item) => item !== value);
//       if (filterValue.length === 0) {
//         searchParamms.delete(sectionId);
//       }
//     } else {
//       filterValue.push(value);
//     }
//     if (filterValue.length > 0) {
//       searchParamms.set(sectionId, filterValue.join(","));
//     }
//     const query = searchParamms.toString();
//     navigate({ search: `?${query}` });
//   };

//   const handelRadioFilterChange = (e, sectionId) => {
//     const searchParamms = new URLSearchParams(location.search);
//     searchParamms.set(sectionId, e.target.value);
//     const query = searchParamms.toString();
//     navigate({ search: `?${query}` });
//   };

//   return (
//     <div className="bg-white">
//       <div>
//         {/* Mobile filter dialog */}
//         <Dialog
//           open={mobileFiltersOpen}
//           onClose={setMobileFiltersOpen}
//           className="relative z-40 lg:hidden"
//         >
//           <DialogBackdrop
//             transition
//             className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
//           />

//           <div className="fixed inset-0 z-40 flex">
//             <DialogPanel
//               transition
//               className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
//             >
//               <div className="flex items-center justify-between px-4">
//                 <h2 className="text-lg font-medium text-gray-900">Filters</h2>
//                 <button
//                   type="button"
//                   onClick={() => setMobileFiltersOpen(false)}
//                   className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
//                 >
//                   <span className="sr-only">Close menu</span>
//                   <XMarkIcon aria-hidden="true" className="size-6" />
//                 </button>
//               </div>

//               {/* Filters  for phone*/}

//               <form className="mt-4 border-t border-gray-200">
//                 {filters.map((section) => (
//                   <Disclosure
//                     key={section.id}
//                     as="div"
//                     className="border-t border-gray-200 px-4 py-6"
//                   >
//                     <h3 className="-mx-2 -my-3 flow-root">
//                       <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
//                         <span className="font-medium text-gray-900">
//                           {section.name}
//                         </span>
//                         <span className="ml-6 flex items-center">
//                           <PlusIcon
//                             aria-hidden="true"
//                             className="size-5 group-data-[open]:hidden"
//                           />
//                           <MinusIcon
//                             aria-hidden="true"
//                             className="size-5 group-[&:not([data-open])]:hidden"
//                           />
//                         </span>
//                       </DisclosureButton>
//                     </h3>
//                     <DisclosurePanel className="pt-6">
//                       <div className="space-y-6">
//                         {section.options.map((option, optionIdx) => (
//                           <div key={option.value} className="flex gap-3">
//                             <div className="flex h-5 shrink-0 items-center">
//                               <div className="group grid size-4 grid-cols-1">
//                                 <input
//                                   defaultValue={option.value}
//                                   id={`filter-mobile-${section.id}-${optionIdx}`}
//                                   name={`${section.id}[]`}
//                                   type="checkbox"
//                                   className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
//                                 />
//                                 <svg
//                                   fill="none"
//                                   viewBox="0 0 14 14"
//                                   className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
//                                 >
//                                   <path
//                                     d="M3 8L6 11L11 3.5"
//                                     strokeWidth={2}
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     className="opacity-0 group-has-[:checked]:opacity-100"
//                                   />
//                                   <path
//                                     d="M3 7H11"
//                                     strokeWidth={2}
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     className="opacity-0 group-has-[:indeterminate]:opacity-100"
//                                   />
//                                 </svg>
//                               </div>
//                             </div>
//                             <label
//                               htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
//                               className="min-w-0 flex-1 text-gray-500"
//                             >
//                               {option.label}
//                             </label>
//                           </div>
//                         ))}
//                       </div>
//                     </DisclosurePanel>
//                   </Disclosure>
//                 ))}
//               </form>
//             </DialogPanel>
//           </div>
//         </Dialog>

//         <main className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
//           <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
//             <h1 className="text-4xl font-bold tracking-tight text-gray-900">
//               Find Your Favourite Spot To Stay
//             </h1>

//             <div className="flex items-center">
//               <Menu as="div" className="relative inline-block text-left">
//                 <div>
//                   <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
//                     Sort
//                     <ChevronDownIcon
//                       aria-hidden="true"
//                       className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
//                     />
//                   </MenuButton>
//                 </div>

//                 <MenuItems
//                   transition
//                   className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
//                 >
//                   <div className="py-1">
//                     {sortOptions.map((option) => (
//                       <MenuItem key={option.name}>
//                         <a
//                           href={option.href}
//                           className={classNames(
//                             option.current
//                               ? "font-medium text-gray-900"
//                               : "text-gray-500",
//                             "block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none"
//                           )}
//                         >
//                           {option.name}
//                         </a>
//                       </MenuItem>
//                     ))}
//                   </div>
//                 </MenuItems>
//               </Menu>

//               <button
//                 type="button"
//                 className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
//               >
//                 <span className="sr-only">View grid</span>
//                 <Squares2X2Icon aria-hidden="true" className="size-5" />
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setMobileFiltersOpen(true)}
//                 className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
//               >
//                 <span className="sr-only">Filters</span>
//                 <FunnelIcon aria-hidden="true" className="size-5" />
//               </button>
//             </div>
//           </div>

//           <section aria-labelledby="products-heading" className="pb-24 pt-6">
//             <h2 id="products-heading" className="sr-only">
//               Products
//             </h2>

//             <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
//               {/* Filters  for pc */}
//               <div>
//                 <div className="hidden lg:flex justify-between items-center opacity-50 py-10">
//                   <h1 className="text-lg font-bold">Filters</h1>
//                   <FontAwesomeIcon icon={faFilter} />
//                 </div>

//                 <form className="hidden lg:block">
//                   {/* Filters  for pc  single option choose*/}
//                   {SingleOptionClickFilters.map((section) => (
//                     <Disclosure
//                       key={section.id}
//                       as="div"
//                       className="border-b border-gray-200 py-6"
//                     >
//                       <h3 className="-my-3 flow-root">
//                         <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
//                           <FormLabel
//                             className=" !font-medium !text-gray-900"
//                             id="demo-radio-buttons-group-label"
//                           >
//                             {section.name}
//                           </FormLabel>
//                           <span className="ml-6 flex items-center ">
//                             <PlusIcon
//                               aria-hidden="true"
//                               className="size-5 group-data-[open]:hidden"
//                             />
//                             <MinusIcon
//                               aria-hidden="true"
//                               className="size-5 group-[&:not([data-open])]:hidden"
//                             />
//                           </span>
//                         </DisclosureButton>
//                       </h3>
//                       <DisclosurePanel className="pt-6">
//                         <div className="space-y-4">
//                           <FormControl>
//                             {/*radio btn part*/}
//                             <RadioGroup
//                               aria-labelledby="demo-radio-buttons-group-label"
//                               defaultValue="female"
//                               name="radio-buttons-group"
//                             >
//                               {section.options.map((option, optionIdx) => (
//                                 <>
//                                   <FormControlLabel
//                                     onClick={(e) =>
//                                       handelRadioFilterChange(e, section.id)
//                                     }
//                                     value={option.value}
//                                     control={<Radio />}
//                                     label={option.label}
//                                   />
//                                 </>
//                               ))}
//                             </RadioGroup>
//                           </FormControl>
//                         </div>
//                       </DisclosurePanel>
//                     </Disclosure>
//                   ))}
//                   {/* Filters  for pc multiple option choose */}
//                   {filters.map((section) => (
//                     <Disclosure
//                       key={section.id}
//                       as="div"
//                       className="border-b border-gray-200 py-6"
//                     >
//                       <h3 className="-my-3 flow-root">
//                         <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
//                           <span className="font-medium text-gray-900">
//                             {section.name}
//                           </span>
//                           <span className="ml-6 flex items-center">
//                             <PlusIcon
//                               aria-hidden="true"
//                               className="size-5 group-data-[open]:hidden"
//                             />
//                             <MinusIcon
//                               aria-hidden="true"
//                               className="size-5 group-[&:not([data-open])]:hidden"
//                             />
//                           </span>
//                         </DisclosureButton>
//                       </h3>
//                       <DisclosurePanel className="pt-6">
//                         <div className="space-y-4">
//                           {section.options.map((option, optionIdx) => (
//                             <div key={option.value} className="flex gap-3">
//                               <div className="flex h-5 shrink-0 items-center">
//                                 <div className="group grid size-4 grid-cols-1">
//                                   <input
//                                     onClick={() =>
//                                       handleFilter(option.value, section.id)
//                                     }
//                                     defaultValue={option.value}
//                                     defaultChecked={option.checked}
//                                     id={`filter-${section.id}-${optionIdx}`}
//                                     name={`${section.id}[]`}
//                                     type="checkbox"
//                                     className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
//                                   />
//                                   <svg
//                                     fill="none"
//                                     viewBox="0 0 14 14"
//                                     className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
//                                   >
//                                     <path
//                                       d="M3 8L6 11L11 3.5"
//                                       strokeWidth={2}
//                                       strokeLinecap="round"
//                                       strokeLinejoin="round"
//                                       className="opacity-0 group-has-[:checked]:opacity-100"
//                                     />
//                                     <path
//                                       d="M3 7H11"
//                                       strokeWidth={2}
//                                       strokeLinecap="round"
//                                       strokeLinejoin="round"
//                                       className="opacity-0 group-has-[:indeterminate]:opacity-100"
//                                     />
//                                   </svg>
//                                 </div>
//                               </div>
//                               <label
//                                 htmlFor={`filter-${section.id}-${optionIdx}`}
//                                 className="text-sm text-gray-600"
//                               >
//                                 {option.label}
//                               </label>
//                             </div>
//                           ))}
//                         </div>
//                       </DisclosurePanel>
//                     </Disclosure>
//                   ))}
//                 </form>
//               </div>

//               {/* Product grid */}
//               <div className="lg:col-span-4">
//                 <div className="flex flex-wrap justify-center py-5">
//                   <div>
//                     {hotels.length > 0 ? (
//                       hotels.map((hotel) => (
//                         <ProductCard key={hotel._id} product={hotel} />
//                       ))
//                     ) : (
//                       <p>No hotels available. An error may have occurred.</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

const Product = () => {
  const [hotels, setHotels] = useState([]);
  const [qualityFilter, setQualityFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/hotel/hotelfetch"
        );
        setHotels(response.data);
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
      }
    };

    fetchHotels();
  }, []);

  const getLowestRoomPrice = (hotel) => {
    if (!hotel.roomTypes || hotel.roomTypes.length === 0) return 0;

    const preferredOrder = ["Normal", "Standard", "Deluxe"];
    for (let type of preferredOrder) {
      const room = hotel.roomTypes.find(
        (r) => r.type.trim().toLowerCase() === type.toLowerCase()
      );
      if (room) return room.price;
    }

    return Math.min(...hotel.roomTypes.map((r) => r.price));
  };

  const filterPackages = () => {
    return hotels.filter((hotel) => {
      // Search Filter
      if (
        searchQuery &&
        !hotel.destination.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Quality Filter
      if (
        qualityFilter &&
        hotel.quality.toLowerCase() !== qualityFilter.toLowerCase()
      ) {
        return false;
      }

      // Price Filter
      const price = getLowestRoomPrice(hotel);
      if (
        (priceFilter === "low" && price > 5000) ||
        (priceFilter === "mid" && (price < 5001 || price > 10000)) ||
        (priceFilter === "high" && price < 10001)
      ) {
        return false;
      }

      // Rating Filter
      const rating = hotel.rating;
      if (
        (ratingFilter === "normal" && rating <= 3.5) ||
        (ratingFilter === "good" && rating <= 4.0) ||
        (ratingFilter === "best" && rating <= 4.5)
      ) {
        return false;
      }

      return true;
    });
  };

  return (
    <div className="flex p-6 gap-6">
      {/* Filter Sidebar */}
      <div className="lg:w-1/5 border-r pr-4">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by destination"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <h2 className="text-lg font-semibold mb-4">Filters</h2>

        {/* Quality Filter */}
        <div className="mb-4">
          <h3 className="font-medium">Quality</h3>
          {["Normal", "Good", "Excellent"].map((q) => (
            <label key={q} className="block capitalize">
              <input
                type="radio"
                name="quality"
                value={q}
                checked={qualityFilter === q}
                onChange={(e) => setQualityFilter(e.target.value)}
              />
              <span className="ml-2">{q}</span>
            </label>
          ))}
        </div>

        {/* Price Filter */}
        <div className="mb-4">
          <h3 className="font-medium">Price</h3>
          <label className="block">
            <input
              type="radio"
              name="price"
              value="low"
              checked={priceFilter === "low"}
              onChange={(e) => setPriceFilter(e.target.value)}
            />
            <span className="ml-2">0 - 5000</span>
          </label>
          <label className="block">
            <input
              type="radio"
              name="price"
              value="mid"
              checked={priceFilter === "mid"}
              onChange={(e) => setPriceFilter(e.target.value)}
            />
            <span className="ml-2">5001 - 10000</span>
          </label>
          <label className="block">
            <input
              type="radio"
              name="price"
              value="high"
              checked={priceFilter === "high"}
              onChange={(e) => setPriceFilter(e.target.value)}
            />
            <span className="ml-2">10001 - 20000</span>
          </label>
        </div>

        {/* Rating Filter */}
        <div className="mb-4">
          <h3 className="font-medium">Rating</h3>
          <label className="block">
            <input
              type="radio"
              name="rating"
              value="normal"
              checked={ratingFilter === "normal"}
              onChange={(e) => setRatingFilter(e.target.value)}
            />
            <span className="ml-2">Above 3.5</span>
          </label>
          <label className="block">
            <input
              type="radio"
              name="rating"
              value="good"
              checked={ratingFilter === "good"}
              onChange={(e) => setRatingFilter(e.target.value)}
            />
            <span className="ml-2">Above 4.0</span>
          </label>
          <label className="block">
            <input
              type="radio"
              name="rating"
              value="best"
              checked={ratingFilter === "best"}
              onChange={(e) => setRatingFilter(e.target.value)}
            />
            <span className="ml-2">Above 4.5</span>
          </label>
        </div>

        {/* <button
          onClick={() => {
            setSearchQuery("");
            setQualityFilter("");
            setPriceFilter("");
            setRatingFilter("");
          }}
          className="mt-2 text-blue-500 underline"
        >
          Clear Filters
        </button> */}



<button
  onClick={() => {
    setSearchQuery("");
    setQualityFilter("");
    setPriceFilter("");
    setRatingFilter("");
  }}
  className="mt-4 px-4 py-2; text-white rounded hover:bg-red-600 transition-all duration-200"
  style={{backgroundColor:"#1a7971"}}
>
  Clear Filters
</button>



      </div>

      {/* Packages Display */}
      <div className="lg:w-4/5 grid grid-cols-1 gap-4">
        {filterPackages().map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
        {filterPackages().length === 0 && <p>No hotels found.</p>}
      </div>
    </div>
  );
};

export default Product;
