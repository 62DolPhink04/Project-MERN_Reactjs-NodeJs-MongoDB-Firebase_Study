import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateClass = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [classData, setClassData] = useState({
    name: "",
    availableSeats: 0,
    price: 0,
    image: "",
  });

  useEffect(() => {
    axiosSecure
      .get(`/classes/${id}`)
      .then((res) => setClassData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setClassData({ ...classData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosSecure
      .put(`/classes/${id}`, classData)
      .then(() => {
        alert("Class updated successfully!");
        navigate("/dashboard/my-classes");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Update Class</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={classData.name}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          Available Seats:
          <input
            type="number"
            name="availableSeats"
            value={classData.availableSeats}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          Price:
          <input
            type="number"
            name="price"
            value={classData.price}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          Image URL:
          <input
            type="text"
            name="image"
            value={classData.image}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Class
        </button>
      </form>
    </div>
  );
};

export default UpdateClass;
