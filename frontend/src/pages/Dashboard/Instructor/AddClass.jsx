import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";

const KEY = import.meta.env.VITE_IMG_TOKEN;

const AddClass = () => {
  const API_URL = `https://api.imgbb.com/1/upload?key=${KEY}&name=`;
  const axiosSecure = useAxiosSecure();
  const { currentUser, isLoading } = useUser();
  const [image, setImage] = useState(null);
  const formRef = useRef();
  const { error, setError, loader, setLoader } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    availableSeats: "",
    price: "",
    videolink: "",
    description: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formDataObj = new FormData(formRef.current);

    // Đảm bảo có ảnh trước khi append
    if (image) {
      formDataObj.append("file", image);
    }

    const newData = Object.fromEntries(formDataObj.entries());

    fetch(API_URL, {
      method: "post",
      body: formDataObj,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data);

        if (data.success === true) {
          newData.image = data.data.display_url;
          newData.instructorName = currentUser?.name;
          newData.instructorEmail = currentUser?.email;
          newData.status = "approved";
          newData.submitted = new Date();
          newData.totalEnrolled = 0;

          axiosSecure
            .post("/new-class", newData)
            .then((res) => {
              toast.success("Successfully added classes!");
              console.log(res.data);

              // Reset form and image state
              formRef.current.reset();
              setImage(null);
              setFormData({
                name: "",
                availableSeats: "",
                price: "",
                videolink: "",
                description: "",
              });
            })
            .catch((error) =>
              console.error("Error posting to /new-class:", error)
            );
        }
      })
      .catch((error) => console.error("Error uploading file:", error));
  };

  return (
    <div>
      <div>
        <h1 className="text-center text-3xl font-bold">Add Your Course</h1>
      </div>
      {/* form to add class */}
      <form
        ref={formRef}
        onSubmit={handleFormSubmit}
        className="mx-auto p-6 bg-white rounded shadow"
      >
        <div className="grid grid-cols-2 w-full gap-3 items-center">
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Course Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              placeholder="Your Course Name"
              className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Course Thumbnail
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              required
              name="image"
              className="block mt-[5px] w-full border-secondary shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 file:border-0 file:bg-secondary file:text-white file:mr-4 file:py-3 file:px-4 "
            />
          </div>
        </div>
        <div>
          <h1 className="text-[12px] my-2 ml-2 text-secondary">
            You can not change your name or email
          </h1>

          {/* input name instructor */}
          <div className="grid gap-3 grid-cols-2">
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="instructorName"
              >
                Instructor Name
              </label>
              <input
                type="text"
                name="instructorName"
                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
                value={currentUser?.name}
                readOnly
                disabled
                placeholder="Instructor Name"
              />
            </div>
            {/* input email instructor */}
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="instructorEmail"
              >
                Instructor Email
              </label>
              <input
                type="text"
                name="instructorEmail"
                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
                value={currentUser?.email}
                readOnly
                disabled
                placeholder="Instructor Email"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full gap-3 items-center">
          {/* input availableSeats */}
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="availableSeats"
            >
              Available Seats
            </label>
            <input
              type="number"
              name="availableSeats"
              value={formData.availableSeats}
              onChange={(e) =>
                setFormData({ ...formData, availableSeats: e.target.value })
              }
              required
              placeholder="How many seats are availabe? "
              className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
            />
          </div>

          {/* input price */}
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
              placeholder="How much does it cost? "
              className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
            />
          </div>
        </div>

        {/* input link yt */}
        <div className="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="videolink"
          >
            Youtube Link
          </label>
          <p className="text-[12px] my-2 mt-2 text-secondary">
            Only Youtube videos are supported
          </p>
          <input
            type="text"
            name="videolink"
            value={formData.videolink}
            onChange={(e) =>
              setFormData({ ...formData, videolink: e.target.value })
            }
            required
            placeholder="Your course intro video link"
            className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
          />
        </div>

        {/* input description */}
        <div className="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="description"
          >
            Description About your course
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Description about your course"
            className="resize-none border w-full p-2 rounded-lg border-secondary outline-none"
            rows="4"
          ></textarea>
        </div>

        {/* button add */}
        <div className="text-center w-full">
          <button
            className="bg-secondary w-full hover:bg-red-400 duration-200 text-white font-bold py-2 px-4 rounded"
            type="submit"
            disabled={loader}
          >
            {loader ? "Add..." : "Add New Course"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClass;
