import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";

const ApprovedClasses = () => {
  const [approvedClasses, setApprovedClasses] = useState([]);
  const { currentUser, isLoading } = useUser();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!isLoading && currentUser?.email) {
      axiosSecure
        .get(`/classes/${currentUser.email}`)
        .then((res) => {
          const filteredClasses = res.data.filter(
            (cls) => cls.status === "approved"
          );
          setApprovedClasses(filteredClasses);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoading, currentUser, axiosSecure]);

  // Xóa lớp học
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This class will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/delete-classes/${id}`)
          .then((res) => {
            if (res.data.success) {
              setApprovedClasses((prev) =>
                prev.filter((cls) => cls._id !== id)
              );
              Swal.fire("Deleted!", "The class has been removed.", "success");
            } else {
              Swal.fire(
                "Error",
                res.data.message || "Failed to delete.",
                "error"
              );
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire("Error", "Failed to delete the class.", "error");
          });
      }
    });
  };

  return (
    <div>
      <div className="my-9">
        <h1 className="text-4xl font-bold text-center">
          Approved <span className="text-secondary">Classes</span>
        </h1>
      </div>
      <div>
        {approvedClasses.length === 0 ? (
          <div className="text-center text-2xl font-bold mt-10">
            No approved classes yet
          </div>
        ) : (
          approvedClasses.map((cls, index) => (
            <div
              key={cls._id}
              className="mb-5 hover:ring ring-secondary duration-200 focus:ring rounded-lg"
            >
              <div className="bg-white flex rounded-lg gap-8 shadow p-4">
                <div>
                  <img
                    src={cls.image}
                    alt={cls.name}
                    className="max-h-[200px] max-w-[300px]"
                  />
                </div>
                <div className="flex justify-between w-full">
                  <div className="flex-1">
                    <h2 className="text-[12px] font-bold text-secondary border-b pb-2 mb-2">
                      {cls.name}
                    </h2>
                    <p className="text-secondary my-2">
                      <span className="text-black">Total Students</span>:{" "}
                      {cls.totalEnrolled || 0}
                    </p>
                    <p className="text-secondary">
                      <span className="text-black">Total Seats</span>:{" "}
                      {cls.availableSeats}
                    </p>
                    <p className="text-secondary my-2">
                      <span className="text-black">Status</span>:{" "}
                      <span
                        className={`font-bold ${
                          cls.status === "approved"
                            ? "text-green-500"
                            : "text-orange-400"
                        }`}
                      >
                        {cls.status.charAt(0).toUpperCase() +
                          cls.status.slice(1)}
                      </span>
                    </p>
                    <p className="text-secondary my-2">
                      <span className="text-black">Price</span>: {cls.price}$
                    </p>
                    <p className="text-secondary my-2">
                      <span className="text-black">Submitted</span>:{" "}
                      {cls.submitted
                        ? moment(cls.submitted).format("MMMM Do, YYYY")
                        : "No data"}
                    </p>
                  </div>
                  <div className="w-1/4">
                    <h1 className="font-bold mb-2">Action:</h1>
                    <div className="flex flex-col gap-3">
                      <button
                        className="px-3 bg-orange-400 font-bold py-1 text-white rounded-lg"
                        onClick={() => handleFeeback(cls._id)}
                      >
                        View Feedback
                      </button>
                      <button className="px-3 bg-green-500 font-bold py-1 text-white rounded-lg">
                        View Details
                      </button>
                      <button
                        className="px-3 bg-secondary font-bold py-1 text-white rounded-lg"
                        onClick={() => navigate(`/dashboard/update/${cls._id}`)}
                      >
                        Update
                      </button>
                      <button
                        className="px-3 bg-red-500 font-bold py-1 text-white rounded-lg"
                        onClick={() => handleDelete(cls._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ApprovedClasses;
