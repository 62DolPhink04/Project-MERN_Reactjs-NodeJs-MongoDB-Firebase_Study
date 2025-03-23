import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../ultilities/providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

// const useUser = () => {
//   const { user } = useAuth();
//   // console.log("Auth User:", user);
//   const axiosSecure = useAxiosSecure();
//   // console.log("Token:", localStorage.getItem("token"));

//   const {
//     data: currentUser,
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ["user", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/user/${user?.email}`);
//       return res.data;
//     },
//     enabled: !!user?.email && !!localStorage.getItem("token"),
//   });
//   return { currentUser, isLoading, refetch };
// };

// export default useUser;

const useUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // console.log("Auth User:", user);
  // console.log("User object:", user);
  // console.log("User email:", user?.email);

  const {
    data: currentUser,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      console.log(
        "isLoading:",
        isLoading,
        "isError:",
        isError,
        "currentUser:",
        currentUser
      );

      console.log("useQuery is running...");
      const token = await user.getIdToken();
      console.log("Access Token:", token);
      const res = await axios.get(`http://localhost:3000/user/${user.email}`, {
        timeout: 5000,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); // Timeout 5 giây

      console.log("Response from server:", res.data);

      return res.data;
    },
    enabled: !!user?.email,
  });

  // const {
  //   data: currentUser,
  //   isLoading,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["user", user?.email],
  //   queryFn: async () => {
  //     console.log("Calling API for user:", user?.email);
  //     const res = await axiosSecure.get(`/user/${user?.email}`);
  //     console.log("API Response:", res.data);
  //     return res.data;
  //   },
  //   enabled: !!user?.email && !!localStorage.getItem("token"),
  // });

  console.log("Current User:", currentUser);

  return { currentUser, isLoading, isError };
};

export default useUser;
