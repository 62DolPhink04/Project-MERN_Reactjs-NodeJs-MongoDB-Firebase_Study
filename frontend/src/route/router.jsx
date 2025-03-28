import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import MainLayout from "../layout/mainLayout";
import Classes from "../pages/Classes/Classes";
import SignleClasses from "../pages/Classes/SignleClasses";
import Dashboard from "../pages/Dashboard/Dashboard";
import AddClass from "../pages/Dashboard/Instructor/AddClass";
import InstructorCP from "../pages/Dashboard/Instructor/InstructorCP";

import MyClasses from "../pages/Dashboard/Instructor/MyClasses";
import ApplyInstructor from "../pages/Dashboard/Student/apply/ApplyInstructor";
import EnrolledClasses from "../pages/Dashboard/Student/Enroll/EnrolledClasses";
import Payment from "../pages/Dashboard/Student/Payment/History/Payment";
import PaymentHistory from "../pages/Dashboard/Student/Payment/MyPaymentHistory";
import SelectedClass from "../pages/Dashboard/Student/SelectedClass";
import StudentCP from "../pages/Dashboard/Student/studentCP";
import Home from "../pages/Home/Home";
import Instructors from "../pages/Instructors/Instructors";
import Login from "../user/login";
import Register from "../user/register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/instructors",
        element: <Instructors />,
      },
      {
        path: "/classes",
        element: <Classes />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/classes/:id",
        element: <SignleClasses />,
        loader: async ({ params }) => {
          const response = await fetch(
            `http://localhost:3000/class/${params.id}`
          );
          if (!response.ok) {
            throw new Response("Not Found", { status: 404 });
          }
          return response.json();
        },
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      // Dashboard routes here
      {
        index: true,
        element: <Dashboard />,
      },

      //student routes here
      {
        path: "students-cp",
        element: <StudentCP />,
      },
      {
        path: "enrolled-class",
        element: <EnrolledClasses />,
      },
      {
        path: "my-selected",
        element: <SelectedClass />,
      },
      {
        path: "my-payments",
        element: <PaymentHistory />,
      },
      {
        path: "apply-instructor",
        element: <ApplyInstructor />,
      },
      {
        path: "user/payment",
        element: <Payment />,
      },

      // intructor routes here
      {
        path: "instructor-cp",
        element: <InstructorCP />,
      },
      {
        path: "add-class",
        element: <AddClass />,
      },
      {
        path: "my-classes",
        element: <MyClasses />,
      },
    ],
  },
]);
