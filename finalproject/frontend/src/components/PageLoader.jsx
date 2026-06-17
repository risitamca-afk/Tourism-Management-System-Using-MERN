// // src/components/PageLoader.js
// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import LoadingSpinner from "./LoadingSpinner"; // Make sure the path is correct

// const PageLoader = () => {
//   const location = useLocation();
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     setIsLoading(true);

//     // Simulate loading time (e.g. data fetch, layout, etc.)
//     const timeout = setTimeout(() => {
//       setIsLoading(false);
//     }, 800); // adjust this time as needed

//     return () => clearTimeout(timeout);
//   }, [location]);

//   return isLoading ? <LoadingSpinner /> : null;
// };

// export default PageLoader;
