import React from "react";
import HeroContainer from "../Home/Hero/HeroContainer";
import PopularClasses from "../Home/PopularClasses/PopularClasses";
import PopularTeacher from "../Home/PopularTeacher/Popularteacher";
import Gallary from "./Gallary/Gallary";

const Home = () => {
  return (
    <section>
      <HeroContainer />
      <div className="max-w-screen-xl mx-auto">
        <Gallary />
        <PopularClasses />
        <PopularTeacher />
      </div>
    </section>
  );
};
export default Home;
