import { useEffect, useState } from "react";
import Layout from "./components/pages/Layout";
import Home from "./components/pages/landingpage/Home";
import OurService from "./components/pages/landingpage/OurService";
import WhyUs from "./components/pages/landingpage/WhyUs";
import Testimony from "./components/pages/landingpage/Testimony";
import RentNow from "./components/pages/landingpage/RentNow";
import Faq from "./components/pages/landingpage/Faq";
import RentCar from "./components/pages/rentcarpage/RentCar";
import Register from "./components/pages/register/Register";
import Login from "./components/pages/login/Login";
import AdminLogin from "./components/adminpages/login/AdminLogin";
import LandingPage from "./components/adminpages/pagesadmin/LandingPage";
import Navbar from "./components/adminpages/pagesadmin/Navbar";
import Dashboard2 from "./components/adminpages/pagesadmin/Dashboard2";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function RouteApp() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/admindashboardtesting2' element={<Dashboard2/>}/>
      </Routes>
    </Router>
  );
}

export default RouteApp;
