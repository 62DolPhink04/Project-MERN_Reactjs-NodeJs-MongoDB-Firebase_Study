import { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaFacebookF,
  FaGoogle,
  FaInfoCircle,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaPlus,
  FaRss,
  FaTools,
  FaTwitter,
  FaUser,
  FaUserTag,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useUser";

const ProFile = () => {
  const [user, setUser] = useState(null);
  const { currentUser } = useAxiosSecure();

  useEffect(() => {
    if (!currentUser) {
      console.error("User ID not found");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/user/${currentUser?.email}`
        );
        if (!response.ok) throw new Error("User not found");

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [currentUser]);

  if (!user) return <p>Loading user data...</p>;

  return (
    <div>
      <h1 className="text-4xl text-secondary font-bold text-center my-6">
        ProFile <span className="text-black">Personal</span>
      </h1>
      <div className="flex items-center justify-center ">
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden flex relative">
          {/* Left Section - User Info */}
          <div className="w-2/3 bg-green-600 text-white p-6 flex flex-col justify-center relative">
            <h2 className="text-2xl font-bold uppercase">{user.name}</h2>

            <div className="mt-2 grid grid-cols-2 gap-4">
              <div>
                <p className="flex items-center gap-2">
                  <FaEnvelope /> {user.email}
                </p>
                <p className="flex items-center gap-2">
                  <FaUser /> <strong>Gender:</strong>{" "}
                  {user.gender || "Not specified"}
                </p>
                <p className="flex items-center gap-2">
                  <FaTools /> <strong>Skills:</strong> {user.skills || "None"}
                </p>
                <p className="flex items-center gap-2">
                  <FaUserTag /> <strong>Role:</strong> {user.role || "N/A"}
                </p>
              </div>
              <div>
                <p className="flex items-center gap-2">
                  <FaPhone /> {user.phone || "+152 25634 254 846"}
                </p>
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt />{" "}
                  {user.address || "LampStreet 34/3, London, UK"}
                </p>
                <p className="flex items-center gap-2">
                  <FaInfoCircle /> <strong>About:</strong>{" "}
                  {user.about || "No details provided"}
                </p>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="mt-2 flex gap-3">
              <FaFacebookF className="text-white text-xl cursor-pointer hover:text-gray-300" />
              <FaTwitter className="text-white text-xl cursor-pointer hover:text-gray-300" />
              <FaGoogle className="text-white text-xl cursor-pointer hover:text-gray-300" />
              <FaLinkedin className="text-white text-xl cursor-pointer hover:text-gray-300" />
              <FaRss className="text-white text-xl cursor-pointer hover:text-gray-300" />
            </div>
          </div>

          {/* Divider with Plus Button */}
          <button className="absolute top-[45%] left-2/3 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer focus:outline-none">
            <FaPlus className="text-white text-2xl" />
          </button>

          {/* Right Section - User Photo */}
          <div className="w-1/3">
            <img
              className="w-full h-full object-cover"
              src={user.photoUrl || "https://via.placeholder.com/150"}
              alt="User Profile"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProFile;
