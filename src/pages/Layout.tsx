import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <Navbar />
      <div className="container mt-10">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
