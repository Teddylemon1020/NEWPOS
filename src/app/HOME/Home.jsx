import React, { useEffect, useState } from "react";
import "./homeadmin.css";
import logo from "../../assets/logo.png";
import adosilog from "../../assets/ADOSILOG.jpeg";
import bangsilog from "../../assets/BANGSILOG.webp";
import chicksilog from "../../assets/CHICKSILOG.jpeg";
import sisigsilog from "../../assets/SISIGSILOG.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  const images = [adosilog, bangsilog, chicksilog, sisigsilog];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const changeBackground = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const interval = setInterval(changeBackground, 5000);
    return () => clearInterval(interval); // Clear interval on component unmount
  }, [images.length]);

  return (
    <div>
      {" "}
      {/* Wrap your app in Router */}
      <div
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          margin: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          transition: "background-image 1s ease-in-out",
        }}
      >
        <div className="logo-container" style={{ marginTop: "-20px" }}>
          <img
            src={logo}
            alt="Your Logo"
            className="logo"
            style={{ maxWidth: "150px", height: "auto" }}
          />
        </div>

        <div
          className="quote-text"
          style={{
            margin: "20px 0",
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          "Silog na swak sa panlasa, sa Cubyertos, sulit sa bawat mesa!"
        </div>

        <div className="button-container">
          <Link to="/sales" className="nav-button">
            Sales
          </Link>
          <Link to="/inventory" className="nav-button">
            Inventory
          </Link>
          <Link to="/ordering" className="nav-button">
            Orders
          </Link>
          <Link to="/tito" className="nav-button">
            TITO
          </Link>
          <Link to="/Login" className="nav-button">
            Login
          </Link>
          <Link to="/Payroll" className="nav-button">
            Payroll
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
