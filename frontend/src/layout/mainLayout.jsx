import { Outlet } from "react-router-dom";
import NavBar from "../components/headers/NavBar";

const mainLayout = () => {
  return (
    <main className="dark:bg-black overflow-hidden">
      <NavBar />
      <Outlet />
      <footer>footer</footer>
    </main>
  );
};

export default mainLayout;
