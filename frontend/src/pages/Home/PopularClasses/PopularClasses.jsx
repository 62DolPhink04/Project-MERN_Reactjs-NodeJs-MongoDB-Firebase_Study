import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import Card from "./Card";

const PopularClasses = () => {
  const axiosFetch = useAxiosFetch();
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    const fetchClasses = async () => {
      const reponse = await axiosFetch.get("/classes");
      console.log(reponse);
      setClasses(reponse.data);
    };

    fetchClasses();
  }, []);

  return (
    <div className="md:w-[80% mx-auto my-36]">
      <h1 className="text-5xl font-bold text-center">
        Our <span className="text-secondary">Popular</span> Classes
      </h1>
      <div className="w-[40%] text-center mx-auto my-4">
        <p className="text-gray-500">1 câu nào đó </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
    </div>
  );
};
export default PopularClasses;
