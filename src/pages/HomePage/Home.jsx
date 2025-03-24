import React from "react";
import Layout from "../../components/sections/HomeLayout/Layout";
import AboutSection from "../../components/sections/AboutUs/AboutSection";
import BenefitsSection from "../../components/sections/Benefits/BenefitsSection";
import ContactSection from "../../components/sections/ContactUs/ContactSection";
import HeroSection from "../../components/sections/Hero/HeroSection";

const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <BenefitsSection />
      <AboutSection />
      <ContactSection />
    </Layout>
  );
};

export default Home;
