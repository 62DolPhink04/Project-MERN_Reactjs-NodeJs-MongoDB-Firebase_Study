import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useAuth } from "../../../ultilities/providers/AuthProvider";

const UpdateProfile = () => {
  const { user } = useAuth();
  const userCredentials = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const updateData = Object.fromEntries(formdata.entries());

    // Đảm bảo giữ giá trị role hiện tại
    updateData.role = userCredentials?.role || updateData.role;

    // Gửi yêu cầu cập nhật thông tin người dùng lên server
    axiosSecure
      .put(`/update-user/${userCredentials?._id}`, updateData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          alert("Update Successfully!");
          navigate("/dashboard/info-profile");
        }
      })
      .catch((err) => console.log("Error updating user:", err));
  };
  // handle Cancel
  const handleCancel = () => {
    navigate("/dashboard/info-profile");
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
                      defaultValue={userCredentials?.name || ""}
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
                      defaultValue={userCredentials?.phone || ""}
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
                      defaultValue={userCredentials?.email || ""}
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
                      defaultValue={userCredentials?.address || ""}
                    />
                  </div>
                  <div>
                    <label htmlFor="photoUrl" className="ml-2">
                      Photo URL
                    </label>
                    <input
                      type="text"
                      name="photoUrl"
                      id="photoUrl"
                      className="w-full mt-2 h-12 rounded-lg border border-secondary p-3 text-sm"
                      placeholder="Photo URL"
                      defaultValue={userCredentials?.photoUrl || ""}
                    />
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
                    defaultValue={userCredentials?.about || ""}
                    name="about"
                    id="message"
                  ></textarea>
                </div>

                <div className="mt-4 flex space-x-6 justify-center">
                  <button
                    onClick={handleCancel}
                    type="button"
                    className="inline-block w-full rounded-lg bg-red-500 px-5 py-3 font-medium text-white sm:w-auto "
                  >
                    Cancel
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

export default UpdateProfile;
