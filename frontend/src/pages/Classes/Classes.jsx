import { Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUser from "../../hooks/useUser";

const Classes = () => {
  const navigate = useNavigate();
  const [Classes, setClasses] = useState([]);
  const { currentUser } = useUser();
  const role = currentUser?.role;
  const [errolledClasses, setErrolledClasses] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();

  // const { user } = useContext(AuthProvider);
  // console.log(user);

  const handleHover = (index) => {
    setHoveredCard(index);
  };
  useEffect(() => {
    axiosFetch
      .get("/classes")
      .then((res) => setClasses(res.data))
      .catch((err) => console.log(err));
  }, []);
  // console.log(Classes);

  // handle add to cart
  const handleSelect = async (id) => {
    if (!currentUser) {
      alert("Please Login First");
      navigate("/login"); // Chuyển hướng sang trang login
      return;
    }

    try {
      // Kiểm tra xem lớp đã được đăng ký chưa
      const enrolledClassesRes = await axiosSecure.get(
        `/enrolled-classes/${currentUser?.email}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Đảm bảo gửi token trong header
          },
        }
      );

      setErrolledClasses(enrolledClassesRes.data);

      // Kiểm tra xem lớp đã được đăng ký chưa
      const isEnrolled = enrolledClassesRes.data.find(
        (item) => item.Classes._id === id
      );
      if (isEnrolled) {
        alert("Already enrolled");
        return;
      }

      // Kiểm tra xem lớp đã có trong giỏ hàng chưa
      const cartItemRes = await axiosSecure.get(
        `/cart-item/${id}?email=${currentUser?.email}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Đảm bảo gửi token trong header
          },
        }
      );

      if (cartItemRes.data.classId === id) {
        alert("Already Selected!");
        return;
      }

      // Nếu chưa có trong giỏ hàng, tiến hành thêm vào giỏ hàng
      const data = {
        classId: id,
        useMail: currentUser?.email,
        data: new Date(),
      };

      const addToCartRes = await axiosSecure.post("/add-to-cart", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Đảm bảo gửi token trong header
        },
      });

      alert("Successfully added to cart!");
      console.log(addToCartRes.data);
    } catch (err) {
      console.log(err); // In lỗi nếu có
      alert("An error occurred while processing your request.");
    }
  };
  return (
    <div>
      <div className="mt-20 pt-3">
        <h1 className="text-4xl font-bold text-center text-secondary">
          Classes
        </h1>
      </div>
      {/* set numbers items layout  */}
      <div className="my-16 w-[90%] mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-8 ">
        {Classes.map((cls, index) => (
          <div
            onMouseLeave={() => handleHover(null)}
            key={index}
            className={`relative hover:-translate-y-2 duration-150 hover:ring-[2px] hover:ring-secondary w-64 h-[360px] mx-auto ${
              cls.availableSeats < 1 ? "bg-red-300" : "bg-white"
            } dark:bg-slate-600 rounded-lg shadow-lg overflow-hidden cursor-pointer`}
            onMouseEnter={() => handleHover(index)}
          >
            <div className="relative h-48">
              <div
                className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ${
                  hoveredCard === index ? "opacity-60" : ""
                }`}
              />
              <img
                src={cls.image}
                alt=""
                className="object-cover w-full h-full"
              />
              <Transition
                show={hoveredCard === index}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => handleSelect(cls._id)}
                    title={
                      role === "admin" || role == "instructor"
                        ? "Instructor/Admin Can not be able to Select"
                          ? cls.availableSeats < 1
                          : "No Seat Availble"
                        : "You can Select Classes"
                    }
                    disabled={
                      role === "admin" ||
                      role === "instructor" ||
                      cls.availableSeats < 1
                    }
                    className="px-1 py-2 text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700"
                  >
                    Add to cart
                  </button>
                </div>
              </Transition>
              {/* details  classes */}
              <div className="px-6 py-2">
                <h3 className="font-semibold mb-1">{cls.name}</h3>
                <p className="text-gray-500 text-xs">
                  Instructors: {cls.instructorName}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-gray-600 text-xs">
                    Available Seats: {cls.availableSeats}
                  </span>
                  <span className="text-green-500 font-semibold">
                    ${cls.price}
                  </span>
                </div>
                <Link to={`/classes/${cls._id}`}>
                  <button className="px-4 py-2 my-4 w-full mx-auto text-white disabled:bg-red-300 bg-secondary duration-300 hover:bg-red-700">
                    View
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Classes;
