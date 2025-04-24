"use client";

import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Home, Info, Person } from "@mui/icons-material";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";
import { FaHamburger } from "react-icons/fa";
import Logo from "./Logo";
import { useRouter } from "next/navigation";

export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const menuTexts = ["Home", "Cabins", "About", "Guest Area"];

  const getIcon = (text) => {
    switch (text) {
      case "Home":
        return <Home className="text-primary-300" />;
      case "Cabins":
        return <BedroomParentIcon className="text-primary-300" />;
      case "About":
        return <Info className="text-primary-300" />;
      case "Guest Area":
        return <Person className="text-primary-300" />;
      default:
        return null;
    }
  };

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      className="bg-primary-900 h-screen text-primary-300"
    >
      <div className="flex items-center justify-center py-4 w-full gap-3">
        <Logo />
        <span className=" text-2xl font-semibold cursor-pointer">
          The Wild Oasis
        </span>
      </div>
      <Divider />
      <List>
        {menuTexts.map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            className="hover:bg-primary-800 transition-colors"
          >
            <ListItemButton
              onClick={() => {
                text === "Guest Area"
                  ? router.push(`/account`)
                  : router.push(
                      `/${text === "Home" ? "" : text.toLowerCase()}`
                    );
              }}
            >
              <ListItemIcon>{getIcon(text)}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="md:hidden">
      <Button onClick={toggleDrawer(true)}>
        <FaHamburger className="text-accent-400 text-3xl hover:text-primary-200 " />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)} className="md:hidden">
        {DrawerList}
      </Drawer>
    </div>
  );
}
