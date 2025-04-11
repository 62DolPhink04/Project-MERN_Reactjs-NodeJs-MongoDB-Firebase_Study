import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";

const KEY = import.meta.env.VITE_IMG_TOKEN;

const UpdateClass = () => {
  const API_URL = `https://api.imgbb.com/1/upload?key=${KEY}&name=`;
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useUser();
  const { id: classId } = useParams();
  const navigate = useNavigate();

  // message
  const showWarningToast = (message) => {
    toast(message, {
      icon: "⚠️",
      style: {
        borderRadius: "8px",
        background: "#fff4e5",
        color: "#ff9900",
      },
      duration: 3000,
    });
  };
  //   console.log("Current classId:", classId);
  const formRef = useRef();

  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    availableSeats: "",
    price: "",
    videolink: "",
    description: "",
    image: "", // URL ảnh hiện tại
  });

  // Fetch dữ liệu class khi component mount
  useEffect(() => {
    axiosSecure
      .get(`/classes/${currentUser?.email}`)
      .then((res) => {
        console.log("Fetched class data:", res.data);
        console.log(
          "List of class IDs:",
          res.data.map((cls) => cls._id)
        );

        // console.log("Current classId:", classId); // Kiểm tra giá trị classId

        // Tìm lớp có ID khớp với URL
        const selectedClass = res.data.find((cls) => cls._id === classId);
        console.log("Selected class:", selectedClass);
        if (selectedClass) {
          setFormData(selectedClass);
        }
      })
      .catch((err) => console.error("Error fetching class data:", err));
  }, [currentUser, classId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // console.log("axiosSecure:", axiosSecure);

    let updatedData = { ...formData };

    // Nếu có ảnh mới, upload ảnh trước
    if (image) {
      const formDataObj = new FormData();
      formDataObj.append("image", image);

      try {
        const res = await fetch(API_URL, {
          method: "POST",
          body: formDataObj,
        });
        const data = await res.json();

        if (data.success) {
          updatedData.image = data.data.display_url;
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        return;
      }
    } else {
      updatedData.image = formData.image; // Giữ ảnh cũ nếu không có ảnh mới
    }

    console.log("Updated Data to send:", updatedData); // Kiểm tra dữ liệu trước khi gửi

    // Gửi request cập nhật thông tin class
    axiosSecure
      .put(`/update-class/${classId}`, updatedData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        toast.success("Class updated successfully!");
        navigate("/dashboard/my-classes");
        // console.log("Response from API:", res.data);
      })
      .catch((error) => {
        console.error("Error updating class:", error);
        showWarningToast("Failed to update class. Please try again.");
      });
  };

  return (
    <div>
      <div>
        <h1 className="text-center text-3xl font-bold">Update Your Course</h1>
      </div>

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
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="image"
            >
              Course Thumbnail
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              name="image"
              className="block mt-[5px] w-full border-secondary shadow-sm rounded-md text-sm file:border-0 file:bg-secondary file:text-white file:py-3 file:px-4"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 w-full gap-3 items-center">
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
              className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
            />
          </div>

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
              className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="videolink"
          >
            Youtube Link
          </label>
          <input
            type="text"
            placeholder="Enter link youtube"
            name="videolink"
            value={formData.videolink}
            onChange={(e) =>
              setFormData({ ...formData, videolink: e.target.value })
            }
            className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="resize-none border w-full p-2 rounded-lg border-secondary outline-none"
            rows="4"
          ></textarea>
        </div>

        <div className="text-center w-full">
          <button
            className="bg-secondary w-full hover:bg-red-400 duration-200 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Update Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateClass;
