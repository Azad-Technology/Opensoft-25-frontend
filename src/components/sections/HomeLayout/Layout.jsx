import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Layout.css";
import "../../../styles/main.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout-main">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
