import FloatingShape from "./components/FloatingShape";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import { LoginPage } from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/auth.store";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoadingSpinner from "./components/LoadingSpinner";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AdminDashboardPage from "./pages/AdminDashboard";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminSignUpPage from "./pages/AdminSignUpPage";
import Landing from "./pages/Landing";
import HotelPage from "./pages/HotelPage";
import HotelNextPage from "./pages/HotelNextPage";
import HotelRecieptPage from "./pages/HotelRecieptPage";
import TransportPage from "./pages/TransportPage";
import FlightResultsPage from "./pages/FlightResultsPage";
import FlightSeatSelectPage from "./pages/FlightSeatSelectPage";
// import PassengersDetailsPage from "./pages/PassengerDetailsPage";
import Confirmation from "./pages/Confirmation";
import OfferNextPage from "./pages/OfferNextPage";
import PackagePage from "./pages/PackagePage";
import PackageNextPage from "./pages/PackageNextPage";
import PackageUserDetailsPage from "./pages/PackageUserDetailsPage";
import PackageConfirmationPage from "./pages/PackageConfirmationPage";
import PackagePayPage from "./pages/PackagePayPage";
import PackageTicketPage from "./pages/PackageTicketPage";
import FlightBookingPage from "./pages/FlightBookingPage";
import FlightPassengerDetailsPage from "./pages/FlightPassengerDetailsPage";
import FlightPaymentPage from "./pages/FlightPaymentPage";
import FlightPaymentSuccessPage from "./pages/FlightPaymentSuccessPage";
import PaymentSuccessHotelPage from "./pages/PaymentSuccessHotelPage";
import TrainSearchPage from "./pages/TrainSearchPage";
import TrainResultsPage from "./pages/TrainResultsPage";
import BookingTrainPage from "./pages/BookingTrainPage";
import PassengerDetailsTrainPage from "./pages/PassengerDetailsTrainPage";
import PaymentTrainPage from "./pages/PaymentTrainPage";
import PaymentSuccessTrainPage from "./pages/PaymentSuccessTrainPage";
import BusSearchPage from "./pages/BusSearchPage";
import BusResultsPage from "./pages/BusResultsPage";
import BusSeatSelectPage from "./pages/BusSeatSelectPage";
import BookingBusPage from "./pages/BookingBusPage";
import PassengerDetailsBusPage from "./pages/PassengerDetailsBusPage";
import PaymentBusPage from "./pages/PaymentBusPage";
import PaymentSuccessBusPage from "./pages/PaymentSuccessBusPage";
import CabSearchPage from "./pages/CabSearchPage";
import CabResultPage from "./pages/CabResultPage";
import CabDetailsInPage from "./pages/CabDetailsInPage";
import CabDetailsXyPage from "./pages/CabDetailsXyPage";
import CabDetailsDzPage from "./pages/CabDetailsDzPage";
import CabDetailsToPage from "./pages/CabDetailsToPage";
import CabDetailsInnPage from "./pages/CabDetailsInnPage";
import PassengerDetailsCabPage from "./pages/PassengerDetailsCabPage";
import PaymentCabPage from "./pages/PaymentCabPage";
import PaymentSuccessCabPage from "./pages/PaymentSuccessCabPage";
import RestaurantPage from "./pages/RestaurantPage";
import RestaurantDetailsPage from "./pages/RestaurantDetailsPage";
import BookingPage from "./components/Restaurant/BookingPage";
import Hoteltable from "./components/Admin/Hoteltable";
import Packagetable from "./components/Admin/Packagetable";
import FlightTable from "./components/Admin/Flighttable";
import Addhotel from "./components/Admin/Addhotel";
import Addflight from "./components/Admin/Addflight";
import AddPackage from "./components/Admin/Addpackage";
// import HotelPage from "./pages/HotelPage";
// import { Route } from 'module';

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/landing" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/landing" replace />;
  }

  return children;
};

// redirect authenticated users to the hom e page
const RedirectAuthenticatedAdmin = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/adminDashboard" replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth) return <LoadingSpinner />;
  // console.log("is authenticated", isAuthenticated);
  // console.log("user", user);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />

        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />

        {/* Admin Part */}
        <Route
          path="/adminSignup"
          element={
            <RedirectAuthenticatedAdmin>
              <AdminSignUpPage />
            </RedirectAuthenticatedAdmin>
          }
        />
        <Route
          path="/adminLogin"
          element={
            <RedirectAuthenticatedAdmin>
              <AdminLoginPage />
            </RedirectAuthenticatedAdmin>
          }
        />
        {/* admin */}
        <Route path="/adminDashboard" element={<AdminDashboardPage />}>
          <Route path="hoteltable" element={<Hoteltable />} />
          <Route path="packagetable" element={<Packagetable />} />
          <Route path="flighttable" element={<FlightTable />} />
          <Route path="addhotel" element={<Addhotel />} />
          <Route path="addflight" element={<Addflight />} />
          <Route path="addpackagepage" element={<AddPackage />} />

          {/* add more nested routes here if needed */}
        </Route>

        <Route path="/landing" element={<Landing />} />
        <Route path="/offernextpage" element={<OfferNextPage />} />
        {/* hotel  */}
        <Route path="/hotelpage" element={<HotelPage />} />
        <Route path="/Hotelnext" element={<HotelNextPage />} />
        <Route
          path="/paymentsuccesshotelpage"
          element={<PaymentSuccessHotelPage />}
        />
        <Route path="/HotelReciept" element={<HotelRecieptPage />} />
        {/* flight  */}
        <Route path="/transportpage" element={<TransportPage />} />
        <Route path="/results" element={<FlightResultsPage />} />
        <Route
          path="/flightseatselectpage"
          element={<FlightSeatSelectPage />}
        />
        <Route path="/flightbookingpage" element={<FlightBookingPage />} />
        <Route
          path="/flightpassengerdetailspage"
          element={<FlightPassengerDetailsPage />}
        />
        <Route path="/flightpaymentpage" element={<FlightPaymentPage />} />
        <Route
          path="/flightpaymentsuccesspage"
          element={<FlightPaymentSuccessPage />}
        />
        {/* train */}
        <Route path="/trainsearchpage" element={<TrainSearchPage />} />
        <Route path="/trainresultspage" element={<TrainResultsPage />} />
        <Route path="/trainbookingpage" element={<BookingTrainPage />} />
        <Route
          path="/passengerdetailstrainpage"
          element={<PassengerDetailsTrainPage />}
        />
        <Route path="/paymenttrainpage" element={<PaymentTrainPage />} />
        <Route
          path="/paymentsuccesstrainpage"
          element={<PaymentSuccessTrainPage />}
        />

        {/* bus */}
        <Route path="/bussearchpage" element={<BusSearchPage />} />
        <Route path="/busresultspage" element={<BusResultsPage />} />
        <Route path="/busseatselectPage" element={<BusSeatSelectPage />} />
        <Route path="/bookingbuspage" element={<BookingBusPage />} />
        <Route
          path="/passengerdetailsbuspage"
          element={<PassengerDetailsBusPage />}
        />
        <Route path="/paymentbuspage" element={<PaymentBusPage />} />
        <Route
          path="/paymentsuccessbuspage"
          element={<PaymentSuccessBusPage />}
        />
        {/* cab  */}
        <Route path="/cabsearchpage" element={<CabSearchPage />} />
        <Route path="/cabresultspage" element={<CabResultPage />} />
        <Route path="/cab-details-in" element={<CabDetailsInPage />} />
        <Route path="/cab-details-xy" element={<CabDetailsXyPage />} />
        <Route path="/cab-details-dz" element={<CabDetailsDzPage />} />
        <Route path="/cab-details-to" element={<CabDetailsToPage />} />
        <Route path="/cab-details-inn" element={<CabDetailsInnPage />} />
        <Route
          path="/passengerdetailscabpage"
          element={<PassengerDetailsCabPage />}
        />
        <Route path="/paymentcabpage" element={<PaymentCabPage />} />
        <Route
          path="/paymentsuccesscabpage"
          element={<PaymentSuccessCabPage />}
        />

        {/* old */}
        {/* <Route path="/passenger-details" element={<PassengersDetailsPage />} /> */}
        <Route path="/confirmation" element={<Confirmation />} />

        {/* this part is for package */}
        <Route path="/packagepage" element={<PackagePage />} />
        <Route path="/packagenextpage" element={<PackageNextPage />} />
        <Route
          path="/packageuserdetailspage"
          element={<PackageUserDetailsPage />}
        />
        <Route
          path="/packageconfirmationpage"
          element={<PackageConfirmationPage />}
        />
        <Route path="/packagepaypage" element={<PackagePayPage />} />

        <Route path="/packageticketpage" element={<PackageTicketPage />} />

        {/* restaurant  */}
        {/* <Route path="/restaurantpage" element={<RestaurantPage />} />
        <Route
          path="/restaurantdetailspage"
          element={<RestaurantDetailsPage />}
        />
        <Route
          path="/restaurantbookingconfirmationpage"
          element={<BookingPage />}
        /> */}

        {/* catch all routes */}
        {/* <Route path='*' element={<Navigate to='/' replace />} /> */}
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
