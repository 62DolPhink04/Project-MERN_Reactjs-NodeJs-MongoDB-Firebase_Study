import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageApplications = () => {
  const [usersWithClasses, setUsersWithClasses] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    // Lấy dữ liệu từ API backend
    axiosSecure
      .get("/api/manage-cart")
      .then((response) => response.json())
      .then((data) => setUsersWithClasses(data)) // Lưu trữ dữ liệu vào state
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // Chạy một lần khi component được render

  return (
    <div>
      <h1 className="text-4xl text-secondary font-bold text-center my-10 ">
        Manage <span className="text-black">Application</span>
      </h1>
      <table>
        <thead>
          <tr>
            <th>Name user</th>
            <th>Email</th>
            <th>Class</th>
            <th>Date Apply</th>
          </tr>
        </thead>
        <tbody>
          {usersWithClasses.length === 0 ? (
            <tr>
              <td colSpan="4">Không có dữ liệu</td>
            </tr>
          ) : (
            usersWithClasses.map((userClass, index) => (
              <tr key={index}>
                <td>{userClass.username}</td>
                <td>{userClass.email}</td>
                <td>{userClass.className}</td>
                <td>{new Date(userClass.addedAt).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageApplications;
