"use client";

import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  function toggleDrawer() {
    setMenuOpen(!menuOpen);
  }

  return (
    <nav className="border-r border-primary-900">
      <div className=" flex md:hidden items-center justify-start ">
        <MenuIcon
          className="h-9 w-9 text-primary-600 hover:text-accent-500 cursor-pointer"
          onClick={toggleDrawer}
        />
      </div>
      <Drawer
        open={menuOpen}
        onClose={toggleDrawer}
        direction="left"
        className="sm:hidden"
      >
        <div className=" flex flex-col gap-4 bg-slate-900 h-screen">
          <ul className="w-full">
            {navLinks.map((link) => (
              <li key={link.name} onClick={toggleDrawer}>
                <Link
                  className={`py-3 px-5 hover:bg-primary-900 ${
                    pathname === link.href ? "bg-primary-900" : ""
                  } hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200`}
                  href={link.href}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}

            <li className="mt-auto">
              <SignOutButton />
            </li>
          </ul>
        </div>
      </Drawer>

      <ul className="hidden md:flex flex-col gap-2 h-full text-lg">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`py-3 px-5 hover:bg-primary-900 ${
                pathname === link.href
                  ? "bg-primary-900 border-l border-l-slate-300"
                  : ""
              } hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
