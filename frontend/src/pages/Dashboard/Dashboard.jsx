import React from "react";
import { HashLoader } from "react-spinners";
import useUser from "../../hooks/useUser";
import DashboardNavigate from "../../route/DashboardNavigate";

const Dashboard = () => {
  const { currentUser, isLoading } = useUser();
  const role = currentUser?.role;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <HashLoader color="#36d7b7" size={50} />
      </div>
    );
  }

  return <DashboardNavigate />;
};

export default Dashboard;
