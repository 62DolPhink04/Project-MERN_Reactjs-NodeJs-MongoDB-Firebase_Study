import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageClass = () => {
  const navigate = useNavigate();
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const [classes, setClasses] = useState([]);
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const itemPerPage = 5;
  const totalpage = Math.ceil(classes.length / itemPerPage);

  useEffect(() => {
    axiosFetch
      .get("/manage-classes")
      .then((res) => {
        setClasses(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let lastIndex = page * itemPerPage;
    const firstIndex = lastIndex - itemPerPage;

    if (lastIndex > classes.length) {
      lastIndex = classes.length;
    }
    const currentData = classes.slice(firstIndex, lastIndex);
    setPaginatedData(currentData);
  }, [page, totalpage]);

  //   sk thay đổi trang
  const handleChange = (event, value) => {
    setPage(value);
  };

  // handle Approved
  const handleApproved = (id) => {
    axiosSecure
      .put(`/change-status/${id}`, { status: "approved" })
      .then((res) => {
        // console.log(res.data);

        const newClass = classes.map((cls) =>
          cls._id === id ? { ...cls, status: "approved" } : cls
        );
        setClasses(newClass);

        toast.success("Course Approved successfully!", {
          duration: 3000,
        });
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  //   handle handleReject

  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, unpublish it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.put(`/change-status/${id}`, {
          status: "rejected",
          reason: "rejected",
        });

        if (res.data.modifiedCount > 0) {
          const updateClass = classes.map((cls) =>
            cls._id === id ? { ...cls, status: "rejected" } : cls
          );
          setClasses(updateClass);

          await Swal.fire({
            title: "Unpublish!",
            text: "Your course is unpublish.",
            icon: "success",
          });

          // Reload lại trang
          window.location.reload();
          toast.success("Course rejected successfully!", {
            duration: 3000,
          });
        }
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };
  const handlePending = (id) => {
    axiosSecure
      .put(`/change-status/${id}`, { status: "pending" })
      .then((res) => {
        console.log(res.data);
        toast.success("Course Pending successfully!", {
          duration: 3000,
        });
        const newClass = classes.map((cls) =>
          cls._id === id ? { ...cls, status: "pending" } : cls
        );
        setClasses(newClass);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1 className="text-4xl text-secondary font-bold text-center my-10 ">
        Manage <span className="text-black">Classes</span>
      </h1>
      <div className="">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        PHOTO
                      </th>
                      <th scope="col" className="px-6 py-4">
                        COURSE NAME
                      </th>
                      <th scope="col" className="px-6 py-4">
                        INSTRUCTOR NAME
                      </th>
                      <th scope="col" className="px-6 py-4">
                        STATUS
                      </th>
                      <th scope="col" className="px-6 py-4">
                        DETAILS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.length == 0 ? (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center text-2xl font-bold"
                        >
                          No Classes Found
                        </td>
                      </tr>
                    ) : (
                      paginatedData.map((cls, inx) => (
                        <tr
                          key={cls._id}
                          className="border-b transtiton duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                        >
                          {" "}
                          <td className="whitespace-nowrap px-6 py-4">
                            <img
                              src={cls.image}
                              alt=""
                              className="h-[35px] w-[35px]"
                            />
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {cls.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {cls.instructorName}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <span
                              className={`font-bold ${
                                cls.status === "pending"
                                  ? "bg-orange-400 "
                                  : cls.status === "checking"
                                  ? "bg-yellow-500 "
                                  : cls.status === "approved"
                                  ? "bg-green-600 "
                                  : "bg-red-600 "
                              } px-2 py-1 uppercase text-white rounded-xl`}
                            >
                              {cls.status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex gap-2">
                              {
                                <button
                                  onClick={() => handleApproved(cls._id)}
                                  className="text-[12px] cursor-pointer disabled:bg-green-700 bg-green-500 py-1 rounded-md px-2 text-white"
                                >
                                  Approved
                                </button>
                              }
                              {
                                <button
                                  // disabled={
                                  //   cls.status === "rejected" ||
                                  //   cls.status === "checking"
                                  // }
                                  onClick={() => handlePending(cls._id)}
                                  className="cursor-pointer bg-blue-600 py-1 rounded-md px-2 text-white"
                                >
                                  Pending
                                </button>
                              }
                              {
                                <button
                                  disabled={
                                    cls.status === "rejected" ||
                                    cls.status === "checking"
                                  }
                                  onClick={() => handleReject(cls._id)}
                                  className="cursor-pointer disabled:bg-red-800 bg-red-600 rounded-md px-2 text-white"
                                >
                                  Deny
                                </button>
                              }
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* pagination  bộ đếm số */}
        <div>
          <div className="w-full h-full flex justify-center items-center my-10">
            <Pagination
              onChange={handleChange}
              count={totalpage}
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageClass;
