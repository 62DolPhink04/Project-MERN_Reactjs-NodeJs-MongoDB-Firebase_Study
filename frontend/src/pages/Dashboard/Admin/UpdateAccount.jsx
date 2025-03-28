import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useAuth } from "../../../ultilities/providers/AuthProvider";

const UpdateAccount = () => {
  const { user } = useAuth();
  const userCredentials = useLoaderData();
  //   console.log(userCredentials);
  //   console.log(user);
  const axiosSecure = useAxiosSecure();
  const axiosFetch = useAxiosFetch();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const updateData = Object.fromEntries(formdata.entries());

    // console.log("Data being sent to API:", updateData);
    axiosSecure
      .put(`/update-user/${userCredentials?._id}`, updateData)
      .then((res) => {
        // console.log("Response from API:", res.data);

        if (res.data.modifiedCount > 0) {
          alert("Update Successfully!");
          navigate("/dashboard/manage-users");
        }
      })
      .catch((err) => console.log("Error updating user:", err));
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
                      required
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
                      required
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
                      required
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
                      required
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
                      required
                      defaultValue={userCredentials?.address}
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
                      required
                      defaultValue={userCredentials?.photoUrl}
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
                <div className="mt-4">
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
