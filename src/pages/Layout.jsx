import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  const { pathname } = useLocation();

  return (
    <div className="h-screen">
      {pathname == "/my-resume" ? null : <Header />}
      <div className="h-[calc(100vh-4rem)]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
