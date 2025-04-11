import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { MdDeleteSweep } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUser = () => {
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  //  {/* pagination  bộ đếm số */}
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const itemPerPage = 5;
  const totalpage = Math.ceil(users.length / itemPerPage);

  useEffect(() => {
    axiosFetch
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Make the delete request only after the user confirms
        axiosSecure
          .delete(`/delete-user/${id}`)
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your Account has been deleted.",
              icon: "success",
            }).then(() => {
              window.location.reload(); // Reload the page after successful deletion
            });
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              title: "Error!",
              text: "Something went wrong. Please try again later.",
              icon: "error",
            });
          });
      }
    });
  };

  useEffect(() => {
    let lastIndex = page * itemPerPage;
    const firstIndex = lastIndex - itemPerPage;

    if (lastIndex > users.length) {
      lastIndex = users.length;
    }
    const currentData = users.slice(firstIndex, lastIndex);
    setPaginatedData(currentData);
  }, [page, totalpage]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <h1 className="text-center text-4xl font-bold my-7">
        Manage <span className="text-secondary">Users</span>
      </h1>
      <div className="">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        #
                      </th>
                      <th scope="col" className="px-6 py-4">
                        PHOTO
                      </th>
                      <th scope="col" className="px-6 py-4">
                        NAME
                      </th>
                      <th scope="col" className="px-6 py-4">
                        ROLE
                      </th>
                      <th scope="col" className="px-6 py-4">
                        UPDATE
                      </th>
                      <th scope="col" className="px-6 py-4">
                        DELETE
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((user, index) => (
                      <tr
                        key={user._id}
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          <img
                            src={user.photoUrl}
                            alt=""
                            className="h-[35px] w-[35px] "
                          />
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {user.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {user.role}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          <span
                            onClick={() =>
                              navigate(`/dashboard/update-user/${user._id}`)
                            }
                            className="inline-flex items-center gap-2 cursor-pointer bg-green-500 py-1 rounded-md px-2 text-white "
                          >
                            Update <GrUpdate className="text-white" />
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          <span
                            onClick={() => handleDelete(user._id)}
                            className="inline-flex items-center gap-2 cursor-pointer bg-red-600 py-1 rounded-md px-2 text-white"
                          >
                            Delete <MdDeleteSweep />
                          </span>
                        </td>
                      </tr>
                    ))}
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

export default ManageUser;
