import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Aos from "aos";
import "aos/dist/aos.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast"; // Thêm dòng này
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./route/router";
import AuthProvider from "./ultilities/providers/AuthProvider";

const queryClient = new QueryClient();
Aos.init();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position="top-right" reverseOrder={false} />{" "}
        {/* Thêm vào đây */}
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
