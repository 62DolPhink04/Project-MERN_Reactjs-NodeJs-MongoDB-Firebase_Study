import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useAuth } from "../../../ultilities/providers/AuthProvider";

const KEY = import.meta.env.VITE_IMG_TOKEN;

const UpdateAccount = () => {
  const API_URL = `https://api.imgbb.com/1/upload?key=${KEY}&name=`;
  const [image, setImage] = useState(null);

  const { user } = useAuth();
  const userCredentials = useLoaderData();
  //   console.log(userCredentials);
  //   console.log(user);
  const axiosSecure = useAxiosSecure();
  const axiosFetch = useAxiosFetch();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updateData = Object.fromEntries(formData.entries());

    // Nếu field nào rỗng thì giữ nguyên data cũ
    Object.keys(updateData).forEach((key) => {
      if (!updateData[key]) {
        updateData[key] = userCredentials[key] || "";
      }
    });

    try {
      let imageUrl = userCredentials.photoUrl; // giữ ảnh cũ nếu không đổi

      if (image) {
        const imageFormData = new FormData();
        imageFormData.append("image", image);

        const response = await axios.post(API_URL, imageFormData);
        imageUrl = response.data.data.url;
      }

      updateData.photoUrl = imageUrl;
      updateData.role = userCredentials.role; // giữ role cũ

      const res = await axiosSecure.put(
        `/update-user/${userCredentials._id}`,
        updateData
      );

      if (res.data.modifiedCount > 0) {
        toast.success("Update Successfully!");
        navigate("/dashboard/manage-users");
      }
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };
  // handle Cancel
  const handleCancel = () => {
    console.log("Navigating to /dashboard/manage-users");
    navigate("/dashboard/manage-users");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  return (
    <div>
      <h1 className="text-center text-4xl font-bold mt-5">
        Update : <span className="text-secondary">{user?.displayName}</span>
      </h1>
      <p className="text-center">
        Change details about{" "}
        <span className="text-red-400 font-bold">{user?.displayName}</span>
      </p>

      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <section className="">
          <div className="mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-white p-8 shadow-lg lg:p-12">
              <form className="space-y-4" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="ml-2 pb-4">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm"
                      placeholder="Your name"
                      defaultValue={
                        userCredentials?.name ? userCredentials?.name : ""
                      }
                    />
                  </div>
                  <div>
                    <label className="ml-2" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      className="w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm"
                      placeholder="Phone number"
                      defaultValue={
                        userCredentials?.phone ? userCredentials?.phone : ""
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="ml-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="w-full mt-2 h-12 rounded-lg border border-secondary p-3 text-sm"
                      defaultValue={userCredentials?.email}
                    />
                  </div>
                  <div>
                    <label htmlFor="skills" className="ml-2">
                      Skills
                    </label>
                    <input
                      type="text"
                      name="skills"
                      id="skills"
                      className="w-full mt-2 h-12 rounded-lg border border-secondary p-3 text-sm"
                      placeholder="Enter skills"
                      defaultValue={userCredentials?.skills || ""}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="address" className="ml-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      className="w-full mt-2 h-12 rounded-lg border border-secondary p-3 text-sm"
                      placeholder="Enter address"
                      defaultValue={userCredentials?.address}
                    />
                  </div>
                  <div>
                    <label htmlFor="photoUrl" className="ml-2">
                      Photo URL
                    </label>
                    <input
                      type="file"
                      // {...Register("image")}
                      onChange={(e) => setImage(e.target.files[0])}
                      className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                </div>
                <h1>Please select a role</h1>
                <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                  <div>
                    <input
                      className="peer sr-only"
                      type="radio"
                      name="option"
                      id="option1"
                      value="user"
                      defaultChecked={
                        userCredentials?.role === "user" ? true : false
                      }
                      tabIndex="-1"
                    />
                    <label
                      htmlFor="option1"
                      className="block w-full rounded-lg border border-secondary p-3 peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white"
                      tabIndex="0"
                    >
                      <span className="text-sm font-medium">User</span>
                    </label>
                  </div>

                  <div>
                    <input
                      className="peer sr-only"
                      type="radio"
                      name="option"
                      id="option2"
                      value="admin"
                      defaultChecked={
                        userCredentials?.role === "admin" ? true : false
                      }
                      tabIndex="-1"
                    />
                    <label
                      htmlFor="option2"
                      className="block w-full rounded-lg border border-secondary p-3 peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white"
                      tabIndex="0"
                    >
                      <span className="text-sm font-medium">Admin</span>
                    </label>
                  </div>

                  <div>
                    <input
                      className="peer sr-only"
                      type="radio"
                      name="option"
                      id="option3"
                      value="instructor"
                      defaultChecked={
                        userCredentials?.role === "instructor" ? true : false
                      }
                      tabIndex="-1"
                    />
                    <label
                      htmlFor="option3"
                      className="block w-full rounded-lg border border-secondary p-3 peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white"
                      tabIndex="0"
                    >
                      <span className="text-sm font-medium">Instructor</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="sr-only" htmlFor="message">
                    About
                  </label>
                  <textarea
                    className="w-full resize-none rounded-lg border-lg border-secondary border outline-none p-3 text-sm"
                    placeholder="About user"
                    rows="4"
                    defaultValue={
                      userCredentials?.about ? userCredentials?.about : ""
                    }
                    name="about"
                    id="message"
                  ></textarea>
                </div>
                <div className="mt-4 flex space-x-6 justify-center">
                  <button
                    onClick={handleCancel}
                    type="cancel"
                    className="inline-block w-full rounded-lg bg-red-500 px-5 py-3 font-medium text-white sm:w-auto "
                  >
                    CanCel
                  </button>
                  <button
                    type="submit"
                    className="inline-block w-full rounded-lg bg-secondary px-5 py-3 font-medium text-white sm:w-auto "
                  >
                    Update Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UpdateAccount;
