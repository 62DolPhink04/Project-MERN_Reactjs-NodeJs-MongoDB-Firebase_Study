import moment from "moment";
import { useEffect, useState } from "react";
import {
  FaEdit,
  FaEnvelope,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaPhone,
  FaTools,
  FaTrash,
  FaUser,
  FaUserTag,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate để điều hướng
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";

const ProFile = () => {
  const navigate = useNavigate(); // Khởi tạo navigate
  const [user, setUser] = useState(null);
  const { currentUser } = useUser();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!currentUser?.email) {
      console.error("User email not found");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/user/${currentUser.email}`
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

  if (!user)
    return <p className="text-center mt-10 text-lg">Loading user data...</p>;

  // Handle delete account
  const handleDelete = (id) => {
    axiosSecure.delete(`/delete-user/${id}`);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your Account has been deleted.",
          icon: "success",
        });
        navigate("/"); // Chuyển hướng về trang chính sau khi xóa tài khoản
      }
    });
  };

  // handle navigate to update user page
  // const handleUpdate = () => {
  //   navigate(`/dashboard/update-user/${user._id}`);
  //   navigate(`/dashboard/info-profile`); // Chuyển đến trang cập nhật người dùng
  // };

  return (
    <div>
      <div className="my-9">
        <h1 className="text-5xl font-bold text-center">
          My <span className="text-secondary">Profile</span>
        </h1>
        <p className="text-sm text-center my-3">
          Here you can see your profile and information details
        </p>
      </div>

      <div className="mb-5 hover:ring ring-secondary duration-200 focus:ring rounded-lg">
        <div className="bg-white flex flex-col sm:flex-row rounded-lg gap-8 shadow p-6">
          <div className="sm:w-1/3">
            <img
              src={user.photoUrl || "https://via.placeholder.com/300x200"}
              alt="User"
              className="max-h-[250px] max-w-[350px] rounded-lg object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-[30px] font-bold text-secondary border-b pb-3 mb-3">
              {user.name}
            </h2>
            <h1 className="font-bold text-xl mb-4">Personal Info:</h1>

            {/* Grid chia 2 cột */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-lg">
              <p className="text-secondary">
                <FaEnvelope className="inline mr-3" />
                <span className="text-black">Email</span>: {user.email}
              </p>
              <p className="text-secondary">
                <FaPhone className="inline mr-3" />
                <span className="text-black">Phone</span>: {user.phone || "N/A"}
              </p>
              <p className="text-secondary">
                <FaUser className="inline mr-3" />
                <span className="text-black">Gender</span>:{" "}
                {user.gender || "Not specified"}
              </p>
              <p className="text-secondary">
                <FaUserTag className="inline mr-3" />
                <span className="text-black">Role</span>: {user.role || "User"}
              </p>
              <p className="text-secondary">
                <FaTools className="inline mr-3" />
                <span className="text-black">Skills</span>:{" "}
                {user.skills || "None"}
              </p>
              <p className="text-secondary">
                <FaMapMarkerAlt className="inline mr-3" />
                <span className="text-black">Address</span>:{" "}
                {user.address || "Not provided"}
              </p>
              <p className="text-secondary col-span-2">
                <FaInfoCircle className="inline mr-3" />
                <span className="text-black">About</span>:{" "}
                {user.about || "No details provided"}
              </p>
            </div>
            <p className="mt-6 text-[16px] text-gray-500">
              Last updated: {moment().format("MMMM Do, YYYY")}
            </p>
            {/* Buttons */}
            <div className="mt-6 flex gap-6 w-full justify-start">
              <button
                onClick={() =>
                  navigate(`/dashboard/update-own-profile/${user._id}`)
                }
                className="flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-lg"
              >
                <FaEdit />
                Update Info
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="flex items-center gap-3 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 text-lg"
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProFile;
