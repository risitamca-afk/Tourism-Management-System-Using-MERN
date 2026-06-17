// import cardimg6 from "../../assets/Offers-pic/h1.jpg";
import cardimg7 from "../assets/Offers-pic/h2.jpg";
import manali1 from "../assets/hotel/e2b6b84c0bc811ebba1a0242ac110002.avif";
import manali2 from "../assets/hotel/manali2.jpg";
import goa1 from "../assets/hotel/goa1.jpg";
import goa2 from "../assets/hotel/goa2.avif";
import jaipur1 from "../assets/hotel/jaipur1.jpg";
import jaipur2 from "../assets/hotel/jaipur2.jpg";
import jaipur3 from "../assets/hotel/jaipur3.jpg";
import delhi1 from "../assets/hotel/delhi1.jpg";
import bangalore1 from "../assets/hotel/bangalore1.jpg";
import bangalore2 from "../assets/hotel/bangalore2.jpg";
import kerala1 from "../assets/hotel/kerala1.jpg";
import kerala2 from "../assets/hotel/kerala2.jpg";
import shimla1 from "../assets/hotel/shimla1.jpg";
import shimla2 from "../assets/hotel/shimla2.jpg";
import hydrabad1 from "../assets/hotel/hydrabad1.jpg";
import kolkata1 from "../assets/hotel/kolkata1.avif";
import delhi2 from "../assets/hotel/delhi2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBroom,
  faSpa,
  faPersonSwimming,
  faDumbbell,
  faUtensils,
  faTableTennis,
  faMartiniGlassCitrus,
  faCouch,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
// export const hotelsData1 = [
//   {
//     title: "Royal Palace in Jaipur",
//     description: "Live like royalty in this historic palace hotel.",
//     imgSrc: jaipur1,
//     destination: "Jaipur",
//     price: 5089,
//     checkInDate: "2024-11-22",
//     checkOutDate: "2024-11-28",
//     availableRooms: 5,
//     specialFeatures: [
//       "breakfast included",
//       "cab fasility",
//       "100% refund on cancle",
//     ],
//     rating: 4.7,
//     quality: "very good",
//     tax: 712,
//   },
//   {
//     title: "Luxury Hotel in Mumbai",
//     description: "5-star luxury with great city views.",
//     imgSrc: cardimg7,
//     destination: "Mumbai",
//     price: 4500,
//     checkInDate: "2024-11-20",
//     checkOutDate: "2024-11-25",
//     availableRooms: 10,
//   },
//   {
//     title: "Beach Resort in Goa",
//     description: "Perfect getaway with beach access.",
//     price: 1500,
//     imgSrc: goa1,
//     destination: "Goa",
//     checkInprice: 2000,
//     Date: "2024-12-01",
//     checkOutDate: "2024-12-15",
//     availableRooms: 5,
//   },
//   {
//     title: "Mountain Retreat in Manali",
//     description: "Peaceful stay with stunning mountain views.",
//     imgSrc: manali1,
//     destination: "Manali",
//     price: 2000,
//     checkInDate: "2024-11-22",
//     checkOutDate: "2024-11-28",
//     availableRooms: 8,
//   },
//   {
//     title: "Heritage Hotel in Jaipur",
//     description: "Experience the royal lifestyle.",
//     imgSrc: jaipur2,
//     destination: "Jaipur",
//     price: 2800,
//     checkInDate: "2024-11-25",
//     checkOutDate: "2024-11-30",
//     availableRooms: 12,
//   },
//   {
//     title: "City Center Hotel in Delhi",
//     description: "Convenient location with modern amenities.",
//     imgSrc: delhi1,
//     destination: "Delhi",
//     price: 1800,
//     checkInDate: "2024-12-05",
//     checkOutDate: "2024-12-10",
//     availableRooms: 15,
//   },
//   {
//     title: "Budget Stay in Bangalore",
//     description: "Affordable accommodation in the tech city.",
//     imgSrc: bangalore2,
//     destination: "Bangalore",
//     price: 3500,
//     checkInDate: "2024-11-18",
//     checkOutDate: "2024-11-20",
//     availableRooms: 6,
//   },
//   {
//     title: "Luxury Villa in Kerala",
//     description: "Private villa surrounded by nature.",
//     imgSrc: kerala1,
//     destination: "Kerala",
//     price: 2500,
//     checkInDate: "2024-12-10",
//     checkOutDate: "2024-12-20",
//     availableRooms: 4,
//   },
//   {
//     title: "Business Hotel in Hyderabad",
//     description: "Ideal for business trips and conferences.",
//     imgSrc: hydrabad1,
//     destination: "Hyderabad",
//     price: 4325,
//     checkInDate: "2024-11-30",
//     checkOutDate: "2024-12-05",
//     availableRooms: 20,
//   },
//   {
//     title: "Countryside Inn in Shimla",
//     description: "Relax in the serene countryside.",
//     imgSrc: shimla1,
//     destination: "Shimla",
//     price: 2320,
//     checkInDate: "2024-12-01",
//     checkOutDate: "2024-12-10",
//     availableRooms: 3,
//   },
//   {
//     title: "Modern Hotel in Delhi",
//     description:
//       "A perfect blend of comfort and convenience in the capital city.",
//     imgSrc: delhi2,
//     destination: "Delhi",
//     price: 1590,
//     checkInDate: "2024-11-25",
//     checkOutDate: "2024-11-30",
//     availableRooms: 10,
//   },
//   {
//     title: "Hilltop Resort in Shimla",
//     description: "Enjoy breathtaking views and serene surroundings.",
//     imgSrc: shimla2,
//     destination: "Shimla",
//     price: 3258,
//     checkInDate: "2024-11-20",
//     checkOutDate: "2024-11-25",
//     availableRooms: 8,
//   },
//   {
//     title: "Eco-Lodge in Kerala",
//     description: "Reconnect with nature in this tranquil retreat.",
//     imgSrc: kerala2,
//     destination: "Kerala",
//     price: 4000,
//     checkInDate: "2024-12-05",
//     checkOutDate: "2024-12-12",
//     availableRooms: 5,
//   },
//   {
//     title: "Beachfront Hotel in Goa",
//     description: "Relax by the beach and enjoy the vibrant Goan culture.",
//     price: 2000,
//     imgSrc: goa2,
//     destination: "Goa",
//     checkInprice: 3679,
//     Date: "2024-11-29",
//     checkOutDate: "2024-12-03",
//     availableRooms: 15,
//   },
//   {
//     title: "Mountain Chalet in Manali",
//     description: "Cozy up in the mountains with stunning views.",
//     imgSrc: manali2,
//     destination: "Manali",
//     price: 2000,
//     checkInDate: "2024-11-25",
//     checkOutDate: "2024-11-30",
//     availableRooms: 6,
//   },
//   {
//     title: "City Center Hotel in Bangalore",
//     description: "A premium stay in the heart of the Silicon Valley of India.",
//     imgSrc: bangalore1,
//     destination: "Bangalore",
//     price: 3800,
//     checkInDate: "2024-12-10",
//     checkOutDate: "2024-12-15",
//     availableRooms: 9,
//   },
//   {
//     title: "Holiday Inn",
//     description: "Enjoy the vibrant culture of Kolkata.",
//     imgSrc: kolkata1,
//     destination: "Kolkata",
//     price: 3590,
//     checkInDate: "2024-11-21",
//     checkOutDate: "2024-11-27",
//     availableRooms: 9,
//   },
//   {
//     title: "Boutique Hotel in Pink City",
//     description: "A charming and modern take on heritage luxury.",
//     imgSrc: jaipur3,
//     destination: "Jaipur",
//     price: 4589,
//     checkInDate: "2024-11-25",
//     checkOutDate: "2024-11-29",
//     availableRooms: 7,
//   },
// ];

export const hotelsData1 = [
  {
    title: "Royal Palace in Jaipur",
    description: "Live like royalty in this historic palace hotel.",
    imgSrc: jaipur1,
    destination: "Jaipur",
    checkInDate: "2024-11-22",
    checkOutDate: "2024-11-28",
    rating: 4.7,
    ratingoutof5: 3.5,
    ratingNumber: 379,
    quality: "very good",
    images: [
      {
        src: "https://lp-cms-production.imgix.net/2021-11/GettyRF_157579910.jpg",
        alt: "Two each of gray, white, and black shirts laying flat.",
      },
      {
        src: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg  ",
        alt: "Model wearing plain black basic tee.",
      },
      {
        src: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?cs=srgb&dl=pexels-pixabay-271618.jpg&fm=jpg",
        alt: "Model wearing plain gray basic tee.",
      },
      {
        src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWx8ZW58MHx8MHx8fDA%3D",
        alt: "Model wearing plain white basic tee.",
      },
    ],
    amenities: [
      {
        img: faBroom,
        name: "24-hour Room Service",
      },
      {
        img: faSpa,
        name: "Spa",
      },
      {
        img: faCouch,
        name: "Lounge",
      },
      {
        img: faMartiniGlassCitrus,
        name: "Bar",
      },
      {
        img: faTableTennis,
        name: "Indoor Games",
      },
      {
        img: faUtensils,
        name: "Restaurant",
      },
      {
        img: faDumbbell,
        name: "Gym",
      },

      {
        img: faPersonSwimming,
        name: "Swimming Pool",
      },
    ],
    roomTypes: [
      {
        type: "Normal",
        price: 4089,
        tax: 589,
        availableRooms: 3,
        specialFeatures: [
          "breakfast included",
          "free wifi",
          "partial refund on cancel",
        ],
      },
      {
        type: "Standard",
        price: 5089,
        tax: 712,
        availableRooms: 5,
        specialFeatures: [
          "breakfast included",
          "cab facility",
          "100% refund on cancel",
        ],
      },
      {
        type: "Duplex",
        price: 6589,
        tax: 899,
        availableRooms: 2,
        specialFeatures: [
          "breakfast & dinner included",
          "cab facility",
          "spa access",
          "100% refund on cancel",
        ],
      },
    ],
  },
];
