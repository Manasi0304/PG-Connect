import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Title from "./components/Title/Title";
import About from "./components/About/About";
import Locations from "./components/Locations/Locations";
import Testimonials from "./components/Testimonials/Testimonials";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Category from "./components/Category/Category";
import Home from "./pages/Home";
import AddNewProperty from "./pages/AddNewProperty";
import PropertyList from "./pages/PropertyList";
import NewPropertyDetails from "./pages/NewPropertyDetails";
import PropertyFilters from "./pages/PropertyFilters";
import Chatbot from "./components/Chatbot/Chatbot";
import Login from "./Components/Authentication/Login";
import Register from "./Components/Authentication/Register";
import ForgotPassword from "./Components/Authentication/ForgotPassword";
import ResetPassword from "./Components/Authentication/ResetPassword";
import RegisterRoommate from "./Components/Roommate_Finder/RegisterRoommate";
import FindRoommates from "./Components/Roommate_Finder/FindRoommates";
import MatchedRoommates from "./Components/Roommate_Finder/MatchedRoommates";
import RoommateFinderHome from "./Components/Roommate_Finder/RoommateFinderHome";
import RoommateProfile from  "./Components/Roommate_Finder/RoommateProfile";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Separate component for Home Page Sections
const HomePageSections = () => (
  <div className="container">
    <div id="locations">
      <Title subTitle="Search by Location" title="Locations" />
      <Locations />
    </div>

    <Category />

    <div id="about-us">
      <About />
    </div>

    <div id="testimonials">
      <Title subTitle="Testimonials" title="What Residents Say!!" />
      <Testimonials />
    </div>

    <div id="contact-us">
      <Title subTitle="Get in Touch" title="Schedule a Visit Today!" />
      <Contact />
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* ✅ Added ToastContainer here so alerts will be visible */}
        <ToastContainer position="top-center" autoClose={3000} />
        
        <Navbar />

        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<><Hero /><HomePageSections /></>} />
            <Route path="/properties" element={<PropertyList />} />
            <Route
              path="/property/:id"
              element={
                <ProtectedRoute>
                  <NewPropertyDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-property"
              element={
                <ProtectedRoute>
                  <AddNewProperty />
                </ProtectedRoute>
              }
            />
            <Route path="/property-filters" element={<PropertyFilters />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} /> {/* ✅ Added this route */}

            {/* Roommate Finder Routes */}
            <Route path="/roommate_finder" element={<RoommateFinderHome />} />
            <Route path="/register-roommate" element={<RegisterRoommate />} />
            <Route path="/find-roommates" element={<FindRoommates />} />
            <Route path="/matched-roommates" element={<MatchedRoommates />} />
            <Route path="/roommate/:id" element={<RoommateProfile />} />
          </Routes>
        </div>

        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
};

export default App;