import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../ultilities/providers/AuthProvider"; // Đường dẫn đúng của bạn nhé!
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: currentUser,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email && !!localStorage.getItem("token"),
  });
  return { currentUser, isLoading, refetch };
};

export default useUser;
