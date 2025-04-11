import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineLock,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlinePicture,
  AiOutlineUser,
} from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { AuthContext } from "../../../ultilities/providers/AuthProvider";

const CreateAccount = () => {
  const [selectedRole, setSelectedRole] = useState("Instructor");

  const roles = ["User", "Admin", "Instructor"];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const { signUp, updateUser, setError } = useContext(AuthContext);
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
          console.log(data);

          if (user.email && user.displayName) {
            return axios
              .post("http://localhost:3000/new-user", userImp)
              .then(() => {
                navigate("/");
                alert("Registrantion Successfully!");
              })
              .catch((err) => {
                setError(err.code);
                throw new Error(err);
              });
          }
        });
      }
    });
  };

  const password = watch("password", "");

  return (
    <div className="flex justify-center items-center pt-14 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6">
          Register Account
        </h2>
        <form>
          {/* Name and Email */}
          <div className="flex items-center gap-5">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                <AiOutlineUser className="inline-block mr-2 mb-1 text-lg" />{" "}
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border-gray-300 border rounded-md py-2 px-4"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                <AiOutlineMail className="inline-block mr-2 mb-1 text-lg" />{" "}
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border-gray-300 border rounded-md py-2 px-4"
              />
            </div>
          </div>

          {/* Password and Confirm Password */}
          <div className="flex items-center gap-5">
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                <AiOutlineLock className="inline-block mr-2 mb-1 text-lg" />{" "}
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border-gray-300 border rounded-md py-2 px-4"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmpassword"
                className="block text-gray-700 font-bold mb-2"
              >
                <AiOutlineLock className="inline-block mr-2 mb-1 text-lg" />{" "}
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full border-gray-300 border rounded-md py-2 px-4"
              />
            </div>
          </div>

          {/* Phone Number and Photo URL */}
          <div className="flex items-center gap-5">
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-700 font-bold mb-2"
              >
                <AiOutlinePhone className="inline-block mr-2 mb-1 text-lg" />{" "}
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full border-gray-300 border rounded-md py-2 px-4"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="photoUrl"
                className="block text-gray-700 font-bold mb-2"
              >
                <AiOutlinePicture className="inline-block mr-2 mb-1 text-lg" />{" "}
                Photo URL
              </label>
              <input
                type="text"
                placeholder="Enter your photo URL"
                className="w-full border-gray-300 border rounded-md py-2 px-4"
              />
            </div>
          </div>

          {/* Gender and Address */}
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-gray-700 font-bold mb-2"
            >
              <AiOutlineUser className="inline-block mr-2 mb-1 text-lg" />{" "}
              Gender
            </label>
            <select className="w-full border-gray-300 border rounded-md py-2 px-4">
              <option value="">Select Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 font-bold mb-2"
            >
              <IoLocationOutline className="inline-block mr-2 mb-1 text-lg" />{" "}
              Address
            </label>
            <textarea
              rows={3}
              placeholder="Enter your address"
              className="w-full border-gray-300 border rounded-md py-2 px-4"
            ></textarea>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <p className="mb-3 font-medium text-lg">Please select a role</p>
            <div className="flex gap-4">
              {roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleSelect(role)}
                  className={`px-4 py-2 rounded-md border ${
                    selectedRole === role
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-black border-blue-500"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-secondary hover:bg-red-500 text-white py-2 px-4 rounded-md"
            >
              Register
            </button>
            {errors.confirmpassword && (
              <div className="text-red-500 text-sm w-full mt-1">
                <p>{errors.confirmpassword.message}</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
