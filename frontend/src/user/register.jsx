import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineLock,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineUser,
} from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "../components/Social/googleLogin";
import useAuth from "../hooks/useAuth";
import { AuthContext } from "../ultilities/providers/AuthProvider";

const KEY = import.meta.env.VITE_IMG_TOKEN;
const Register = () => {
  const API_URL = `https://api.imgbb.com/1/upload?key=${KEY}&name=`;
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { signUp, updateUser, setError } = useContext(AuthContext);
  const { login, error, loader, setLoader } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setError("");
    signUp(data.email, data.password).then((result) => {
      const user = result.user;
      if (user) {
        return updateUser(data.name, data.photoUrl).then(() => {
          const userImp = {
            name: user?.displayName,
            email: user?.email,
            photoUrl: user?.photoURL,
            role: "user",
            gender: data.gender,
            phone: data.phone,
            address: data.address,
          };

          const formData = new FormData();
          formData.append("image", image); // "image" là key bắt buộc

          if (user.email && user.displayName) {
            return axios
              .post(API_URL, formData)
              .then((response) => {
                const imageUrl = response.data.data.url;
                const userImp = {
                  name: user?.displayName,
                  email: user?.email,
                  photoUrl: imageUrl,
                  role: "user",
                  gender: data.gender,
                  phone: data.phone,
                  address: data.address,
                };
                return axios.post("http://localhost:3000/new-user", userImp);
              })
              .then(() => navigate("/"))
              .catch((error) => console.log(error));
          }
        });
      }
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const password = watch("password", "");

  return (
    <div className="flex justify-center items-center pt-14 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6 ">
          Please Register
        </h2>
        {/* Form data Register */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Register input name and email  */}
          <div className="flex items-center gap-5">
            {/* Name  */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                {/* icon name  */}
                <AiOutlineUser className="inline-block mr-2 mb-1 text-lg" />
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: true })}
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            {/* Email  */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                {/* icon email  */}
                <AiOutlineMail className="inline-block mr-2 mb-1 text-lg" />
                Email
              </label>
              <input
                type="text"
                placeholder="Enter your email"
                {...register("email", { required: true })}
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>

          {/* Register input Password and cofirm password  */}
          <div className="flex items-center gap-5">
            {/* Name  */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                {/* icon password  */}
                <AiOutlineLock className="inline-block mr-2 mb-1 text-lg" />
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: true })}
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            {/* Coform password  */}
            <div className="mb-4">
              <label
                htmlFor="confirmpassword"
                className="block text-gray-700 font-bold mb-2"
              >
                {/* icon email  */}
                <AiOutlineLock className="inline-block mr-2 mb-1 text-lg" />
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Enter your confirm password"
                {...register("confirmpassword", {
                  required: true,
                  validate: (value) =>
                    value === password || "Password not match!",
                })}
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>

          {/* Register PhoneNumber and photoURL */}
          <div className="flex items-center gap-5">
            {/* Phone number */}
            <div className="flex-1 mb-4">
              <label
                htmlFor="phonenumber"
                className="block text-gray-700 font-bold mb-2"
              >
                <AiOutlinePhone className="inline-block mr-2 mb-1 text-lg" />
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter your phone"
                {...register("phone", { required: true })}
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            {/* Photo URL */}
            <div className="flex-1 mb-4">
              <label
                htmlFor="image"
                className="block text-gray-700 font-bold mb-2"
              >
                Photo Image
              </label>
              <input
                type="file"
                {...register("image")}
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>

          {/* Select Gender  */}
          <div>
            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block text-gray-700 font-bold mb-2"
              >
                {/* icon gender  */}
                <AiOutlineUser className="inline-block mr-2 mb-1 text-lg" />
                Gender
              </label>
              <select
                {...register("gender", { required: true })}
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Select Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* ipnput Address  */}
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-gray-700 font-bold mb-2"
              >
                {/* icon address  */}
                <IoLocationOutline className="inline-block mr-2 mb-1 text-lg" />
                Address
              </label>
              <textarea
                {...register("address", { required: true })}
                rows={3}
                placeholder="Enter Address"
                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
              ></textarea>
            </div>
          </div>

          {/*   button sign up  */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loader}
              className="bg-secondary hover:bg-red-500 text-white py-2 px-4 rounded-md"
            >
              {loader ? "Registering..." : "Register"}
            </button>
            {errors.confirmpassword && (
              <div className="text-red-500 text-sm w-full mt-1">
                <p>{errors.confirmpassword.message}</p>
              </div>
            )}
          </div>
        </form>

        {/* Already have an account Login  */}
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="underline text-secondary ml-1">
            Login
          </Link>
        </p>
        <GoogleLogin />
      </div>
    </div>
  );
};

export default Register;
