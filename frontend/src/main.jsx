import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import AuthProvider from "./ultilities/providers/AuthProvider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Aos from "aos";
import "react-toastify/dist/ReactToastify.css";
import { router } from "./route/router";

const queryClient = new QueryClient();

Aos.init();
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </AuthProvider>
);
