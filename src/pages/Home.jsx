import React, { useContext, useEffect, useState } from "react";
import Slider from "../components/Slider";
import Spinner from "../components/Spinner";
import WhyUs from "../components/WhyUs";
import AboutUs from "../components/AboutUs";
import { AuthContext } from "../providers/AuthProvider";
// import Marathons from "../components/Marathons";

const Home = () => {
  const {loading, darkMood} = useContext(AuthContext);

  // CHANGE THE PAGE TITLE:
  document.title = "Home | Marathon Hub";

  if (loading) {
    return <Spinner></Spinner>
  }


  return (
    <div className={`bg-gray-50 ${darkMood ? 'dark' : ''} dark:bg-slate-800`}>
      {/* SLIDER SECTION */}
      <section>
        <Slider></Slider>
      </section>

      {/* 'WHY TO CHOOSE US' SECTIONS'*/}
      <section>
        <WhyUs />
      </section>

      {/* ABOUT US SECTIONS */}
      <section>
        <AboutUs></AboutUs>
      </section>
    </div>
  );
};

export default Home;

