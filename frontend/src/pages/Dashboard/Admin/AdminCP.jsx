import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import useUser from "../../../hooks/useUser";
import AdminStats from "./AdminStats";

const AdminCP = () => {
  const { currentUser } = useUser();
  const axiosFetch = useAxiosFetch();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosFetch
      .get("/users")
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h1 className=" text-4xl font-bold my-7 ">
        Wellcome Back{" "}
        <span className="text-secondary">{currentUser?.name}</span>
      </h1>
      <AdminStats users={users} />
    </div>
  );
};

export default AdminCP;
