import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";

const PendingClasses = () => {
  const [pendingClasses, setPendingClasses] = useState([]);
  const { currentUser, isLoading } = useUser();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/classes/${currentUser?.email}`)
      .then((res) => {
        const filteredClasses = res.data.filter(
          (cls) => cls.status === "pending"
        );
        setPendingClasses(filteredClasses);
      })
      .catch((err) => console.log(err));
  }, [isLoading]);

  return (
    <div>
      <div className="my-9">
        <h1 className="text-4xl font-bold text-center">
          Pending <span className="text-secondary">Classes</span>
        </h1>
        <p className="text-[12px] text-center my-2">
          Here you can see all your pending classes.
        </p>
      </div>
      <div>
        {pendingClasses.length === 0 ? (
          <div className="text-center text-2xl font-bold mt-10">
            No pending classes yet
          </div>
        ) : (
          <div>
            {pendingClasses.map((cls, index) => (
              <div
                key={index}
                className="mb-5 hover:ring ring-secondary duration-200 focus:ring rounded-lg"
              >
                <div className="bg-white flex rounded-lg gap-8 shadow p-4">
                  <div>
                    <img
                      src={cls.image}
                      alt=""
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
                        <span className="text-orange-400 font-bold">
                          Pending
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

                    {/* Phần Action */}
                    <div className="w-1/4">
                      <h1 className="font-bold mb-2">Action:</h1>
                      <div className="flex flex-col gap-3">
                        <button
                          className="px-3 bg-orange-400 font-bold py-1 text-white rounded-lg"
                          onClick={() => handleFeeback(cls._id)}
                        >
                          View FeedBack
                        </button>
                        <button className="px-3 bg-green-500 font-bold py-1 text-white rounded-lg">
                          View Details
                        </button>
                        <button
                          className="px-3 bg-secondary font-bold py-1 text-white rounded-lg"
                          onClick={() =>
                            navigate(`/dashboard/update/${cls._id}`)
                          }
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingClasses;
