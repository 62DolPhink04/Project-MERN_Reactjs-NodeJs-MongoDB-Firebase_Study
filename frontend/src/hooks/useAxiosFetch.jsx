import axios from "axios";
import { useEffect, useMemo } from "react";

const useAxiosFetch = () => {
  // Tạo axiosInstance chỉ một lần
  const axiosInstance = useMemo(() => {
    return axios.create({
      baseURL: "http://localhost:3000/",
    });
  }, []);

  useEffect(() => {
    // requestInterceptors
    const requestInterceptors = axiosInstance.interceptors.request.use(
      (config) => {
        // Làm gì đó trước khi gửi request
        console.log("Request sent:", config);
        return config;
      },
      (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
      }
    );

    // responseInterceptors
    const responseInterceptors = axiosInstance.interceptors.response.use(
      (response) => {
        // Xử lý data trả về
        console.log("Response received:", response);
        return response;
      },
      (error) => {
        console.error("Response error:", error);
        return Promise.reject(error);
      }
    );

    // Eject interceptors khi component unmount
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptors);
      axiosInstance.interceptors.response.eject(responseInterceptors);
    };
  }, [axiosInstance]);

  return axiosInstance;
};

export default useAxiosFetch;
