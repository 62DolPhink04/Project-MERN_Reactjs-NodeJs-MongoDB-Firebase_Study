import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import bannerImg1 from "../../assets/home/banner-1.jpg";

import useAxiosFetch from "../../hooks/useAxiosFetch";
// import axiosSecure from "../../hooks/useAxiosSecure";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUser from "../../hooks/useUser";

import { BiTime } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
// import { MbBookOnline } from "react-icons/md";
import { MdBookOnline } from "react-icons/md";
// import {Falanguage , FalevelUpAlt , FaUser , FaUsers} from "react-icons/fa" ;
import { FaLanguage, FaLevelUpAlt } from "react-icons/fa";

const SignleClasses = () => {
  const axiosSecure = useAxiosSecure();
  const course = useLoaderData();
  const { currentUser } = useUser();
  const role = currentUser?.role;
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const axiosFetch = useAxiosFetch();
  console.log("Course Data:", course);
  console.log("Video Link:", course.videolink);
  console.log("Course Image:", course.image);

  const handleSelect = async (id) => {
    if (!currentUser) {
      alert("Please Login First");
      navigate("/login"); // Chuyển hướng sang trang login
      return;
    }

    try {
      // Kiểm tra xem người dùng đã đăng ký các lớp học chưa
      const enrolledClassesRes = await axiosSecure.get(
        `/enrolled-classes/${currentUser?.email}`
      );
      setEnrolledClasses(enrolledClassesRes.data); // Đổi setErrolledClasses thành setEnrolledClasses

      // Kiểm tra xem lớp học đã có trong danh sách đăng ký chưa
      if (enrolledClassesRes.data.find((item) => item.Classes._id === id)) {
        alert("Already enrolled");
        return;
      }

      // Kiểm tra xem lớp học đã có trong giỏ hàng chưa
      const cartItemRes = await axiosSecure.get(
        `/cart-item/${id}?email=${currentUser?.email}`
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

      const addToCartRes = await axiosSecure.post("/add-to-cart", data);
      alert("Successfully added to cart!");
      console.log(addToCartRes.data);
    } catch (err) {
      console.log(err);
      alert("An error occurred while processing your request.");
    }
  };

  return (
    <>
      <div>
        <div
          className="font-gilroy font-medium text-gray dark:text-white text-lg leading-[27%] w-[90%] mx-auto"
          data-new-gr-c-s-check-loaded="14.1157.0"
          data-gr-ext-installed=""
        >
          {/* breadcrumb or header  */}
          <div className="breadcrumbs bg-primary py-20 mt-20 section-padding bg-cover bg-center bg-no-repeat">
            <div className="container text-center">
              <h2>Course Detailts</h2>
            </div>
          </div>
          <div className="nav-tab-wrapper tabs section-padding mt-8">
            <div className="container">
              <div className="grid grid-cols-12 md:gap-[30px]">
                {/* Left side  */}
                <div className="lg:col-span-8 col-span-12">
                  <div className="single-course-detailts">
                    <div className="xl:h-[470px] h-[350px] mb-10 course-main-thumb">
                      <img
                        // course.img
                        src={course.image}
                        alt=""
                        // object-fut
                        className="rounded-md object-fill w-full h-full block"
                      />
                    </div>
                    <h2 className="text-2xl mb-2">{course?.name}</h2>

                    <div className="author-meta mt-6 sm:flex lg:space-x-16 sm:space-x-5 space-y-5 sm:space-y-0 items-center">
                      <div className="flex space-x-4 items-center group">
                        <div className="flex-none">
                          <div className="h-12 w-12 rounded">
                            <img
                              src={
                                "https://t4.ftcdn.net/jpg/02/27/45/09/360_F_227450952_KQCMShHPOPebUXklULsKsROk5AvN6H1H.jpg  "
                              }
                              alt=""
                              className="object-cover w-full h-full rounded"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-secondary inline-flex items-center gap-x-2">
                            <span>Trainer:</span>
                            <a href="#" className="text-black">
                              {course?.instructorName}
                            </a>
                          </p>
                        </div>
                      </div>
                      <div>
                        <span className="text-secondary inline-flex items-center gap-x-2">
                          <span>Last Update:</span>
                          <a href="#" className="text-black">
                            {new Date(course.submitted).toLocaleDateString()}
                          </a>
                        </span>
                      </div>
                    </div>
                    <div className="nav-tab-wrapper mt-12">
                      <ul className="course-tab mb-8 flex justify-between list-none p-0">
                        <li className="active mx-2">
                          <a
                            href="#tab1"
                            className="text-blue-500 font-bold px-4 py-2 border-b-2 border-transparent hover:border-blue-500 transition"
                          >
                            Overview
                          </a>
                        </li>
                        <li className="mx-2">
                          <a
                            href="#tab2"
                            className="text-blue-500 font-bold px-4 py-2 border-b-2 border-transparent hover:border-blue-500 transition"
                          >
                            Carriculum
                          </a>
                        </li>
                        <li className="mx-2">
                          <a
                            href="#tab3"
                            className="text-blue-500 font-bold px-4 py-2 border-b-2 border-transparent hover:border-blue-500 transition"
                          >
                            Instructors
                          </a>
                        </li>
                        <li className="mx-2">
                          <a
                            href="#tab4"
                            className="text-blue-500 font-bold px-4 py-2 border-b-2 border-transparent hover:border-blue-500 transition"
                          >
                            Reviews
                          </a>
                        </li>
                      </ul>

                      <div id="tabs-content">
                        <div className="tab-content" id="tab1">
                          <div>
                            <h3 className="text-2xl mt-8">
                              Course Description
                            </h3>
                            <p
                              className="mt-4 text-lg leading-relaxed whitespace-normal"
                              dangerouslySetInnerHTML={{
                                __html:
                                  course?.description?.replace(
                                    /\.\s*/g,
                                    ".<br />"
                                  ) || "",
                              }}
                            ></p>

                            <div className="bg-[#F8F8F8] dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8">
                              <h4 className=" text-2x1">
                                What You Will Learn?
                              </h4>
                              <ul className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                                {[
                                  "Learn how perspective works",
                                  "Learn how perspective works ",
                                  "how to apply it effectively",
                                  "how to use it in art",
                                ].map((text, index) => (
                                  <li
                                    key={index}
                                    className="flex space-x-3 items-start"
                                  >
                                    <div className="flex-none self-start mt-1.5">
                                      <img
                                        src="/correct-mark.png"
                                        alt=""
                                        className="w-5 h-5"
                                      />
                                    </div>
                                    <div className="flex-1 break-words whitespace-normal">
                                      {text}
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className=" text-2x1">
                                What You will Learn?
                              </h4>
                              <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-5">
                                <div className=" bg-white rounded px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center">
                                  <span className="flex-none">
                                    <img src="/logo.png" alt="" />
                                  </span>
                                  <span className="flex-1 text-black">
                                    Computer/Mobile
                                  </span>
                                </div>
                                <div className="bg-white rounded px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center">
                                  <div className="flex-none">
                                    <img src="/logo.png" alt="" />
                                  </div>
                                  <span className="flex-1 text-black">
                                    Paper &amp; Pencil
                                  </span>
                                </div>
                                <div className="bg-white rounded px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center">
                                  <div className="flex-none">
                                    <img src="/logo.png" alt="" />
                                  </div>
                                  <span className="flex-1 text-black">
                                    Internet Connect
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="tab2" className="tab-content">
                          <div>
                            <h3 className="text-2xl mt-8">Lesson Plan</h3>
                            <p className="mt-4 text-lg leading-relaxed whitespace-normal">
                              This tutorial will help you learn quickly and
                              thoroughly. Lorem ipsum, or lipsum as it is
                              sometimes known.
                            </p>

                            <div className="bg-[#F8F8F8] dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8">
                              <h4 className="text-2xl">
                                This Course is For Beginners
                              </h4>
                            </div>
                            <div>
                              <h4 className="text-2xl font-semibold">
                                What You Will Learn?
                              </h4>
                              <p className="mt-6 text-lg">
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*right side*/}
                <div className="lg:col-span-4 col-span-12 mt-8 md:mt-0">
                  <div className="sidebarWrapper space-y-[30px]">
                    <div className="wdiget custom-text space-y-5">
                      <a
                        className="h-[220px] rounded relative block"
                        href={course.videolink || "#"}
                        target="_blank" // Mở video trong tab mới
                        rel="noopener noreferrer"
                      >
                        <img
                          src={course.image}
                          alt="Course Thumbnail"
                          className="block w-full h-full object-cover rounded"
                        />

                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                          <img src="/play.png" alt="Play Button" />
                        </div>
                      </a>

                      <h3>${course.price}</h3>
                      <button
                        onClick={() => handleSelect(course._id)}
                        title={
                          role === "admin" || role === "instructor"
                            ? "Instructor/Admin cannot select this course"
                            : course.availableSeats < 1
                            ? "No seat available"
                            : "You can select this class"
                        }
                        disabled={
                          role === "admin" ||
                          role === "instructor" ||
                          course.availableSeats < 1
                        }
                        className="btn btn-primary w-full text-center bg-secondary py-6 px-6 text-white"
                      >
                        Enroll Now
                      </button>

                      <ul className="list">
                        <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                          <div className="flex-1 space-x-3 flex items-center">
                            <FaUser className="inline-flex" />
                            <div className="text-black font-semibold">
                              Instructor
                            </div>
                          </div>
                          <div className="flex-none">
                            {course.instructorName}
                          </div>
                        </li>

                        <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                          <div className="flex-1 space-x-3 flex items-center">
                            <MdBookOnline />
                            <div className="text-black font-semibold">
                              Lectures
                            </div>
                          </div>
                          <div className="flex-none">23</div>
                        </li>

                        <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                          <div className="flex-1 space-x-3 flex items-center">
                            <BiTime />
                            <div className="text-black font-semibold">
                              Duration
                            </div>
                          </div>
                          <div className="flex-none">2Hr 36Minutes</div>
                        </li>

                        <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                          <div className="flex-1 space-x-3 flex items-center">
                            <BiTime />
                            <div className="text-black font-semibold">
                              Enrolled
                            </div>
                          </div>
                          <div className="flex-none">
                            {course?.totalEnrolled}
                          </div>
                        </li>

                        <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                          <div className="flex-1 space-x-3 flex items-center">
                            <FaLevelUpAlt />
                            <div className="text-black font-semibold">
                              Course level
                            </div>
                          </div>
                          <div className="flex-none">Intermediate</div>
                        </li>

                        <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                          <div className="flex-1 space-x-3 flex items-center">
                            <FaLanguage />
                            <div className="text-black font-semibold">
                              Language
                            </div>
                          </div>
                          <div className="flex-none">VietNamese</div>
                        </li>
                      </ul>
                      <ul className="flex space-x-4 items-center pt-3">
                        <li className="text-black font-semibold">Share On:</li>
                        <li>
                          <a href="#" className="flex h-10 w-10">
                            <img src="/logo.png" alt="" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="flex h-10 w-10">
                            <img src="/logo.png" alt="" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="flex h-10 w-10">
                            <img src="/logo.png" alt="" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="flex h-10 w-10">
                            <img src="/logo.png" alt="" />
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="widget">
                      <h4 className="widget-title mb-4">Relate Courses</h4>
                      <ul className="list">
                        <li className=" flex space-x-4 border-[#ECECEC] pb-6 mb-6 last:pb-0 last:mb-0 last:border-0 border-b">
                          <div className="flex-none">
                            <div className="h-20 w-20 rounded">
                              <img
                                src={bannerImg1}
                                alt=""
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex space-x-3 mb-2">
                              <iconify-icon
                                icon="heroicons:star-20-solid"
                                className="text-tertiary"
                              ></iconify-icon>
                              <iconify-icon
                                icon="heroicons:star-20-solid"
                                className="text-tertiary"
                              ></iconify-icon>
                              <iconify-icon
                                icon="heroicons:star-20-solid"
                                className="text-tertiary"
                              ></iconify-icon>
                              <iconify-icon
                                icon="heroicons:star-20-solid"
                                className="text-tertiary"
                              ></iconify-icon>
                            </div>
                            <div className="mb-1 font-semibold text-black">
                              Greatest Passion In...
                            </div>
                            <span className="text-secondary font-semibold block mt-6">
                              $38.00
                            </span>
                          </div>
                        </li>
                        <li className="flex space-x-4  border-[#ECECEC] pb-6 mb-6 last:pb-0 last:mb-0 last:border-0 border-b">
                          <div className="flex-none">
                            <div className="h-20 w-20 rounded">
                              <img
                                src={bannerImg1}
                                alt=""
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="mb-1 font-semibold text-black">
                              Greatest Passion In...
                            </div>
                            <span className="text-secondary font-semibold block mt-6">
                              $38.00
                            </span>
                          </div>
                        </li>
                        <li className="flex space-x-4  border-[#ECECEC] pb-6 mb-6 last:pb-0 last:mb-0 last:border-0 border-b">
                          <div className="flex-none">
                            <div className="h-20 w-20 rounded">
                              <img
                                src={bannerImg1}
                                alt=""
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="mb-1 font-semibold text-black">
                              Greatest Passion In...
                            </div>
                            <span className="text-secondary font-semibold block mt-6">
                              $38.00
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignleClasses;
