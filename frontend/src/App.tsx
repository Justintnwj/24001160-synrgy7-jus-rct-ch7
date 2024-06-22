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
import DeleteCard from "./components/adminpages/pagesadmin/DeleteCard";
import Card from "./components/adminpages/pagesadmin/Card";
import AddNewCar from "./components/adminpages/pagesadmin/AddNewCar";
import EditCar from "./components/adminpages/pagesadmin/EditCar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<>
          <Layout>
            <Home />
            <OurService />
            <WhyUs />
            <Testimony />
            <RentNow />
            <Faq />
          </Layout>
        </>} />
        <Route path="/getcars" element={<>
          <Layout>
            <Home />
            <RentCar />
          </Layout>
        </>} />
        <Route path="/register" element={<>
          <Register />
        </>} />
        <Route path="/login" element={<>
          <Login />
        </>} />
        <Route path="/adminlogin" element={<>
          <AdminLogin />
        </>} />
        <Route path="/admindashboard" element={<>
          <LandingPage />
        </>} />
        <Route path="/card" element={<>
          <Card />
        </>} />
        <Route path="/deletecard" element={<>
          <DeleteCard />
        </>} />
        <Route path="/adminpage" element={<>
          <Navbar />
        </>} />
        <Route path="/admindashboard/listcars/addnewcar" element={<>
          <AddNewCar />
        </>} />
        <Route path="/admindashboard/listcars/editcar" element={<>
          <EditCar />
        </>} />
      </Routes>
    </Router>
  );
}

export default App;
