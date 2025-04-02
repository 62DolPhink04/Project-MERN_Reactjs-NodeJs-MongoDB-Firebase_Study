import React, { useEffect, useState } from "react";
import img from "../../../assets/home/girl.jpg";
import useAxiosFetch from "../../../hooks/useAxiosFetch";

const PopularTeacher = () => {
  const [instructors, setInstructors] = useState([]);
  const axiosFetch = useAxiosFetch();

  useEffect(() => {
    axiosFetch
      .get("/instructors")
      .then((response) => {
        // Lọc instructor đúng role từ API
        const filteredInstructors = response.data.filter(
          (instructor) => instructor.role === "instructor"
        );
        setInstructors(filteredInstructors);
      })
      .catch((err) => {
        console.error("Error fetching instructors:", err);
      });
  }, []);

  return (
    <div className="md:w-[80%] mx-auto my-36">
      <h1 className="text-5xl font-bold text-center">
        Our <span className="text-secondary">Best</span> Instructors
      </h1>
      <div className="w-[40%] text-center mx-auto my-4">
        <p className="text-gray-500">
          Our best instructors are experts in their fields, dedicated to guiding
          you every step of the way.
        </p>
      </div>

      {instructors.length > 0 ? (
        <div className="grid mb-28 md:grid-cols-2 lg:grid-cols-4 w-[90%] gap-4 mx-auto">
          {instructors.map((instructor, i) => (
            <div
              key={instructor._id || i}
              className="flex dark:text-white hover:-translate-y-2 duration-200 cursor-pointer flex-col shadow-md py-8 px-10 md:px-8 rounded-md"
            >
              <div className="flex-col flex gap-6 md:gap-8">
                <img
                  className="rounded-full border-4 border-gray-300 h-24 w-24 mx-auto"
                  src={instructor.photoUrl || img}
                  alt={instructor.name || "Instructor"}
                />
                <div className="flex flex-col text-center">
                  <p className="text-center font-medium text-lg">
                    {instructor.name || "Unnamed Instructor"}
                  </p>
                  <p className="text-gray-500">Instructor</p>
                  <p className="text-gray-500 mb-4">
                    Total Students: {instructor?.totalEnrolled || 0}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No instructors found.</p>
      )}
    </div>
  );
};

export default PopularTeacher;
