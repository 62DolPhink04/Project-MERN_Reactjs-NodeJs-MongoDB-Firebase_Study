import { Switch } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useUser from "../../hooks/useUser";
import { AuthContext } from "../../ultilities/providers/AuthProvider";

const NavLinks = [
  { name: "Home", router: "/" },
  { name: "Instructors", router: "/instructors" },
  { name: "Classes", router: "/classes" },
];

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff0000",
    },
    secondary: {
      main: "#00ff00",
    },
  },
});

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [siteSettings, setSiteSettings] = useState(null); // Để lưu trữ dữ liệu từ API
  const [loading, setLoading] = useState(true); // Để kiểm soát trạng thái loading
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [navBg, setNavBg] = useState("bg-[#15151580]");
  const { logOut, user } = useContext(AuthContext); // Không gọi trong điều kiện
  const { currentUser } = useUser(); // Không gọi trong điều kiện
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // set title

  useEffect(() => {
    // Lấy dữ liệu từ API khi component được render lần đầu tiên
    axios
      .get("http://localhost:3000/site-settings")
      .then((response) => {
        setSiteSettings(response.data); // Cập nhật dữ liệu vào state
        setLoading(false); // Thay đổi trạng thái loading sau khi có dữ liệu
      })
      .catch((error) => {
        console.error("Có lỗi khi lấy dữ liệu:", error);
        setLoading(false); // Dù có lỗi cũng phải set loading là false
      });
  }, []); // []
  console.log(siteSettings);

  // if (loading) {
  //   return <div>Đang tải dữ liệu...</div>;
  // }

  // if (!siteSettings) {
  //   return <div>Lỗi khi lấy dữ liệu.</div>;
  // }

  useEffect(() => {
    const dartClass = "dark";
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add(dartClass);
    } else {
      root.classList.remove(dartClass);
    }
  }, [isDarkMode]);

  useEffect(() => {
    setIsHome(location.pathname === "/");
    setIsLogin(location.pathname === "/login");
    setIsFixed(
      location.pathname === "/register" || location.pathname === "/login"
    );
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setScrollPosition(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // change background colors
  useEffect(() => {
    if (scrollPosition > 100) {
      if (isHome) {
        setNavBg(
          "bg-white backdrop-filter backdrop-blur-xl bg-opacity-0 dark:text-white text-black "
        );
      } else {
        setNavBg("bg-white dark:bg-black dark:text-white text-black");
      }
    } else {
      setNavBg(
        `${
          isHome || location.pathname === "/"
            ? "bg-transparent"
            : "bg-white dark:bg-black"
        } dark:text-white text-white `
      );
    }
    // console.log("Scroll:", scrollPosition, "NavBg:", navBg);
  }, [scrollPosition]);

  // logout
  const handleLogout = (e) => {
    e.preventDefault();
    console.log("Logout");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, LogOut it!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              title: "LogOut!",
              text: "Your successfuly has been LogOut.",
              icon: "success",
            });
          })
          .catch((err) => {
            Swal.fire("Error!", err.message, "error");
          });
      }
    });
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`${
        isHome ? navBg : "bg-white dark:bg-black backdrop-blur-2xl"
      } ${
        isFixed ? "static" : "fixed"
      } top-0 transition-colors duration-500 ease-in-out w-full z-10  `}
    >
      <div>
        <div className="lg:w-[95%] mx-auto sm:px-6 lg:px-6">
          <div className="px-4 py-4 flex items-center justify-between">
            {/* logo */}
            <div
              onClick={() => navigate("/")}
              className="flex-shrink-0 cursor-pointer pl-7 md:p-0 flex items-center "
            >
              <div>
                <h1 className="text-2xl inline-flex gap-4 items-center font-bold">
                  {siteSettings?.nameWebsite || "Study"}{" "}
                  <img
                    src={siteSettings?.logoImg || "/yoga-logo.png"}
                    className="w-8 h-8"
                  />
                </h1>
                <p className="font-bold text-[13px] tracking-[8px]">
                  {siteSettings?.titleWebsite || "Quick Explore"}{" "}
                </p>
              </div>
            </div>
            {/*mobile menu icon (reponsive)*/}
            <div className="md:hidden flex items-center">
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                <FaBars className="h-6 w-6 hover:text-primary" />
              </button>
            </div>
            {/* menu items */}
            <div className="hidden md:block text-black dark:text-white">
              <div className="flex">
                <ul className="ml-10 flex items-center space-x-4 pr-4">
                  {NavLinks.map((link) => (
                    <li key={link.name}>
                      <NavLink
                        to={link.router}
                        style={{ whiteSpace: "nowrap" }}
                        className={({ isActive }) =>
                          `font-bold ${
                            isActive
                              ? "text-secondary"
                              : `${
                                  navBg.includes("bg-transparent")
                                    ? "text-white"
                                    : "text-black dark:text-white"
                                } `
                          } hover:text-secondary duration-300`
                        }
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  ))}
                  {/* //   bar user */}
                  {user ? null : isLogin ? (
                    <li>
                      <NavLink
                        to="/register"
                        className={({ isActive }) =>
                          `font-bold ${
                            isActive
                              ? "text-secondary"
                              : `${
                                  navBg.includes("bg-transparent")
                                    ? "text-white"
                                    : "text-black dark:text-white"
                                } `
                          } hover:text-secondary duration-300`
                        }
                      >
                        Register
                      </NavLink>
                    </li>
                  ) : (
                    <li>
                      <NavLink
                        to="/login"
                        className={({ isActive }) =>
                          `font-bold ${
                            isActive
                              ? "text-secondary"
                              : `${
                                  navBg.includes("bg-transparent")
                                    ? "text-white"
                                    : "text-black dark:text-white"
                                } `
                          } hover:text-secondary duration-300`
                        }
                      >
                        Login
                      </NavLink>
                    </li>
                  )}
                  {user && (
                    <li>
                      <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                          `font-bold ${
                            isActive
                              ? "text-secondary"
                              : `${
                                  navBg.includes("bg-transparent")
                                    ? "text-white"
                                    : "text-black dark:text-white"
                                } `
                          } hover:text-secondary duration-300`
                        }
                      >
                        Dashboard
                      </NavLink>
                    </li>
                  )}
                  {user && (
                    <li>
                      <img
                        src={currentUser?.photoUrl}
                        className="h-[40px] rounded-full w-[40px]"
                      ></img>
                    </li>
                  )}
                  {user && (
                    <li>
                      <NavLink
                        onClick={handleLogout}
                        className="font-bold px-3 py-2 bg-secondary text-white rounded-xl"
                      >
                        Logout
                      </NavLink>
                    </li>
                  )}

                  {/* // color toggle */}
                  <li>
                    <ThemeProvider theme={theme}>
                      <div className="flex flex-col items-center justify-center">
                        <Switch
                          checked={isDarkMode}
                          onChange={() => setIsDarkMode(!isDarkMode)}
                        />
                        <h1 className="text-[8px]">Light/Dark</h1>
                      </div>
                    </ThemeProvider>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
