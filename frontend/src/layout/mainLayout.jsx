import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Outlet } from "react-router-dom";
import NavBar from "../components/headers/NavBar";

const mainLayout = () => {
  return (
    <main className="dark:bg-black overflow-hidden">
      <NavBar />
      <Outlet />
      <footer className="bg-white text-black p-6">
        <hr className="border-gray-700 mb-6" />
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-lg font-bold">Plans</h3>
            <ul className="mt-2 space-y-1">
              <li>Study help</li>
              <li>Test prep</li>
              <li>College credit</li>
              <li>Teacher resources</li>
              <li>Working Scholars®</li>
              <li>School group plans</li>
              <li>Online tutoring</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold">About us</h3>
            <ul className="mt-2 space-y-1">
              <li>Blog</li>
              <li>Careers</li>
              <li>Teach for us</li>
              <li>Press Center</li>
              <li>Ambassador</li>
              <li>Scholarships</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold">Support</h3>
            <ul className="mt-2 space-y-1">
              <li>Contact support</li>
              <li>FAQ</li>
              <li>Site feedback</li>
              <li>Expert Help</li>
              <li>Resources and Guides</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold">Start now</h3>
            <a href="http://localhost:5173/register">
              <button className="bg-yellow-500 text-black font-bold py-2 px-4 rounded mt-2">
                Create an account
              </button>
            </a>

            <p className="mt-2">
              Already a member?{" "}
              <a href="http://localhost:5173/login" className="text-blue-400">
                Log in
              </a>
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-6 border-t border-gray-700 pt-4">
          <p className="text-sm">
            &copy; Copyright 2025 Study.com. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <FaFacebook />
            <FaYoutube />
            <FaInstagram />
            <FaTwitter />
            <FaLinkedin />
          </div>
        </div>
      </footer>
    </main>
  );
};

export default mainLayout;
