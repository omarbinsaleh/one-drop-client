import React, { useContext, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import AboutUs from "../components/AboutUs";
import { AuthContext } from "../providers/AuthProvider";
import Banner from "../components/Banner";
import WhyUs from "../components/WhyUs";
import ContactUs from "../components/ContactUs";

const Home = () => {
  const {loading, darkMood} = useContext(AuthContext);

  // CHANGE THE PAGE TITLE:
  document.title = "Home | One Drop";

  console.log('loading state from home --> ', loading)

  if (loading) {
    return <Spinner></Spinner>
  }


  return (
    <div className={`bg-gray-50 ${darkMood ? 'dark' : ''} dark:bg-slate-800`}>
      {/* BANNER SECTION */}
      <section>
        <Banner></Banner>
      </section>

      {/* WHY CHOOS US SECTION */}
      <section>
         <WhyUs></WhyUs>
      </section>

      {/* ABOUT US SECTIONS */}
      <section>
        <AboutUs></AboutUs>
      </section>

      {/* CONTACT US SECTION */}
      <section>
         <ContactUs></ContactUs>
      </section>
    </div>
  );
};

export default Home;

