import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <div className="h-screen">
      <Header />
      <div className="h-[calc(100vh-4rem)]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
