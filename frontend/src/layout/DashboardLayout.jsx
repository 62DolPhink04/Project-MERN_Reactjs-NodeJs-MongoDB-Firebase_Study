import React, { useState } from "react";
import { BiHomeAlt, BiLogInCircle, BiSelectMultiple } from "react-icons/bi";
import { Link, Outlet, useNavigate } from "react-router-dom";
// import { BsFillPostcardFill } from "react-icons/bs ";
import { BsFillPostcardFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { GiFigurehead } from "react-icons/gi";
import { IoMdDoneAll } from "react-icons/io";
import { IoSchoolSharp } from "react-icons/io5";
import {
  MdExplore,
  MdOfflineBolt,
  MdPayments,
  MdPendingActions,
} from "react-icons/md";
import { SiGoogleclassroom, SiInstructure } from "react-icons/si";
import { TbBrandAppleArcade } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { HashLoader } from "react-spinners";
import Swal from "sweetalert2";
import Scroll from "../hooks/useScroll";
import useUser from "../hooks/useUser";
import { useAuth } from "../ultilities/providers/AuthProvider";

// router menu main admin
const adminNavItems = [
  {
    to: "/dashboard/admin-home",
    icon: <BiHomeAlt className="text-2xl" />,
    label: "Dashboard Home",
  },
  {
    to: "/dashboard/manage-users",
    icon: <FaUsers className="text-2xl" />,
    label: "Manage Users",
  },
  {
    to: "/dashboard/manage-class",
    icon: <BsFillPostcardFill className="text-2xl" />,
    label: "Manage Class",
  },
  {
    to: "/dashboard/manage-applications",
    icon: <TbBrandAppleArcade className="text-2xl" />,
    label: "Applications",
  },
];

// instructor menu  /dashboard
const instructorNavItem = [
  {
    to: "/dashboard/instructor-cp",
    icon: <BiHomeAlt className="text-2xl" />,
    label: "Home",
  },
  {
    to: "/dashboard/add-class",
    icon: <MdExplore className="text-2xl" />,
    label: "Add Class",
  },
  {
    to: "/dashboard/my-classes",
    icon: <IoSchoolSharp className="text-2xl" />,
    label: "My Classes",
  },
  {
    to: "/dashboard/my-pedding",
    icon: <MdPendingActions className="text-2xl" />,
    label: "Pending Courses",
  },
  {
    to: "/dashboard/my-approved",
    icon: <IoMdDoneAll className="text-2xl" />,
    label: "Approved Classes",
  },
];

//instructor  student menu  /Manage-user
const students = [
  {
    to: "/dashboard/students-cp",
    icon: <BiHomeAlt className="text-2xl" />,
    label: "Dashboard",
  },
  {
    to: "/dashboard/enrolled-class",
    icon: <SiGoogleclassroom className="text-2xl" />,
    label: "My Enroll",
  },
  {
    to: "/dashboard/my-selected",
    icon: <BiSelectMultiple className="text-2xl" />,
    label: "My Selected",
  },
  {
    to: "/dashboard/my-payments",
    icon: <MdPayments className="text-2xl" />,
    label: "PayMent History",
  },
  {
    to: "/dashboard/apply-instructor",
    icon: <SiInstructure className="text-2xl" />,
    label: "Apply for Instructor",
  },
];

// router menu last admin
const lastMenuItems = [
  {
    to: "/",
    icon: <BiHomeAlt className="text-2xl" />,
    label: "Main Home",
  },
  {
    to: "/trending",
    icon: <MdOfflineBolt className="text-2xl" />,
    label: "Trending",
  },
  {
    to: "/browse",
    icon: <GiFigurehead className="text-2xl" />,
    label: "Following",
  },
];

const DashboardLayout = () => {
  const [open, setOpen] = useState();
  const { loader, logOut } = useAuth();
  const { currentUser } = useUser();
  const navigate = useNavigate();

  const role = currentUser?.role;

  // loader
  if (loader) {
    return (
      <div className="flex items-center justify-center h-screen">
        <HashLoader color="#36d7b7" size={50} />
      </div>
    );
  }

  // handleLogOut
  const handleLogOut = () => {
    // https://sweetalert2.github.io/#examples

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout me!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(
            Swal.fire({
              title: "Logout!",
              text: "You has been logout.",
              icon: "success",
            })
          )
          .catch((error) => console.log(error));
      }
      navigate("/");
    });
  };
  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72 overflow-y-auto" : "w-[90px] overflow-auto"
        }bg-purple-200 h-screen p-5 md:block hidden pt-8 relative duration-300`}
      >
        <div className="flex gap-x-4 items-center">
          <img
            onClick={() => setOpen(!open)}
            src="/yoga-logo.png"
            alt=""
            className={`cursor-pointer h-[40px] duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <Link to="/">
            <h1
              onClick={() => setOpen(!open)}
              className={`text-dark-primary cursor-pointer font-bold origin-left text-xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              Study
            </h1>
          </Link>
        </div>

        {/* NavLink  */}
        {/* Menu main admin  */}
        {role === "admin" && (
          <ul className="pt-6">
            <p className={`ml-3 text-gray-500 ${!open && "hidden"}`}>
              <small>MENU</small>
            </p>
            {role === "admin" &&
              adminNavItems.map((menuItems, index) => (
                <li className="mb-2" key={index}>
                  <NavLink
                    to={menuItems.to}
                    className={({ isActive }) =>
                      `flex ${
                        isActive ? "bg-red-500 text-white" : "text-[#413F44]"
                      }duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`
                    }
                  >
                    {menuItems.icon}
                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left duration-200`}
                    >
                      {menuItems.label}
                    </span>
                  </NavLink>
                </li>
              ))}
          </ul>
        )}
        {/* Menu main Instructors  */}
        {role === "instructor" && (
          <ul className="pt-6">
            <p className={`ml-3 text-gray-500 ${!open && "hidden"}`}>
              <small>MENU</small>
            </p>
            {role === "instructor" &&
              instructorNavItem.map((menuItems, index) => (
                <li className="mb-2" key={index}>
                  <NavLink
                    to={menuItems.to}
                    className={({ isActive }) =>
                      `flex ${
                        isActive ? "bg-red-500 text-white" : "text-[#413F44]"
                      }duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`
                    }
                  >
                    {menuItems.icon}
                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left duration-200`}
                    >
                      {menuItems.label}
                    </span>
                  </NavLink>
                </li>
              ))}
          </ul>
        )}

        {/* Stundet main menu  */}
        {role === "user" && (
          <ul className="pt-6">
            <p className={`ml-3 text-gray-500 ${!open && "hidden"}`}>
              <small>MENU</small>
            </p>
            {role === "user" &&
              students.map((menuItems, index) => (
                <li className="mb-2" key={index}>
                  <NavLink
                    to={menuItems.to}
                    className={({ isActive }) =>
                      `flex ${
                        isActive ? "bg-red-500 text-white" : "text-[#413F44]"
                      }duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`
                    }
                  >
                    {menuItems.icon}
                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left duration-200`}
                    >
                      {menuItems.label}
                    </span>
                  </NavLink>
                </li>
              ))}
          </ul>
        )}

        {/* Menu last Admin  */}
        <ul className="pt-6">
          <p className={`ml-3 text-gray-500 mb-3 ${!open && "hidden"}`}>
            <small>USEFULL LINK</small>
          </p>
          {lastMenuItems.map((menuItems, index) => (
            <li className="mb-2" key={index}>
              <NavLink
                to={menuItems.to}
                className={({ isActive }) =>
                  `flex ${
                    isActive ? "bg-red-500 text-white" : "text-[#413F44]"
                  }duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`
                }
              >
                {menuItems.icon}
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {menuItems.label}
                </span>
              </NavLink>
            </li>
          ))}

          <li>
            <button
              onClick={() => handleLogOut()}
              className=" flex duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4 "
            >
              <BiLogInCircle className="text-2xl" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                LogOut
              </span>
            </button>
          </li>
        </ul>
      </div>
      <div className="h-screen overflow-y-auto px-8 flex-1">
        <Scroll />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
