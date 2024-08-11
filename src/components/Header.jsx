import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuItem,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { AcmeLogo } from "../assets/AcmeLogo";
import { useLocation, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { FaHome, FaNetworkWired } from "react-icons/fa";
import {
  MdOutlinePermContactCalendar,
  MdOutlineRoundaboutLeft,
  MdOutlineLogin,
} from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import DropList from "./DropDown";

const Header = () => {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userEmail, isLogged } = useContext(AuthContext);

  const Links = [
    { path: "/", name: "Home", icon: <FaHome /> },
    { path: "/resume-builder", name: "Builder", icon: <FaNetworkWired /> },
    {
      path: "/contact-us",
      name: "Contact",
      icon: <MdOutlinePermContactCalendar />,
    },
    { path: "/about-us", name: "About", icon: <MdOutlineRoundaboutLeft /> },
  ];

  const mobileLinks = [
    { path: "/", name: "Home", icon: <FaHome /> },
    { path: "/resume-builder", name: "Builder", icon: <FaNetworkWired /> },
    {
      path: "/contact-us",
      name: "Contact",
      icon: <MdOutlinePermContactCalendar />,
    },
    { path: "/about-us", name: "About", icon: <MdOutlineRoundaboutLeft /> },
    !isLogged
      ? { path: "/sign-in", name: "Sign-In", icon: <MdOutlineLogin /> }
      : { path: "/", name: userEmail, icon: <MdOutlineLogin /> },
    isLogged && {
      path: "/sign-out",
      name: "Sign-Out",
      icon: <MdOutlineLogin />,
    },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">IRS</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        {Links.map((link, index) => (
          <NavbarItem key={index} isActive={link.path === pathname}>
            <Link to={link.path} className="flex items-center gap-2">
              {link.icon}
              {link.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      {!isLogged && (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link to="/sign-in">Sign-In</Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              color="primary"
              to="/sign-up"
              variant="flat"
              className="flex items-center gap-2"
            >
              <MdOutlineLogin />
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
      {isLogged && (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
              <DropList />
          </NavbarItem>
        </NavbarContent>
      )}
      <NavbarMenu>
        {mobileLinks.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link className="w-full flex items-center gap-4" to={item.path}>
              {item.icon}
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
