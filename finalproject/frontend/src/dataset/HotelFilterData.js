export const filters = [
  {
    id: "price",
    name: "Price",
    options: [
      { value: "0-3000", label: "₹ 0 - ₹ 3000", checked: false },
      { value: "3000-6000", label: "₹ 3000 - ₹ 6000", checked: false },
      { value: "6000-9000", label: "₹ 6000 - ₹ 9000", checked: false },
      { value: "9000-12000", label: "₹ 9000 - ₹ 12000", checked: false },
      { value: "12000-15000", label: "₹ 12000 - ₹ 15000", checked: false },
      { value: "15000-20000", label: "₹ 15000 - ₹ 20000", checked: false },
      { value: "20000", label: "₹ 20000 +", checked: false },
    ],
  },
  {
    id: "property-type",
    name: "Property Type",
    options: [
      { value: "Villas", label: "Villas", checked: false },
      { value: "Hotels", label: "Hotels", checked: false },
      { value: "Resorts ", label: "Resorts", checked: false },
      { value: "HomeStay ", label: "HomeStay", checked: false },
    ],
  },
  {
    id: "rating",
    name: "Rating",
    options: [
      { value: "Good", label: "Good : 3+", checked: false },
      { value: "Very Good", label: "Very Good : 4+", checked: false },
      { value: "Excellent ", label: "Excellent : 4.5+", checked: false },
    ],
  },
];
export const SingleOptionClickFilters = [];
