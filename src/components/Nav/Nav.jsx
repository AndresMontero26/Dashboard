import { useState } from "react";
import { Group, ActionIcon, Tooltip } from "@mantine/core";

import logo from "../../../assets/logo.png";
import mmlogo from "../../../assets/mmlogo.png";
import {
  IconBeach,
  IconUsersGroup,
  IconCertificate,
  IconLogout,
  IconChevronLeft,
  IconListDetails,
} from "@tabler/icons-react";
import classes from "./NavbarSimple.module.css";
import { Link } from "react-router-dom";
import { ColorSchemeToggle } from "../ColorSchemeToggle/ColorSchemeToggle";

const data = [
  { link: "/projects", label: "Projects", icon: IconListDetails },
  { link: "/teams", label: "Teams", icon: IconUsersGroup },
  { link: "/resources", label: "Resources", icon: IconCertificate },
  { link: "/vacations", label: "Vacations", icon: IconBeach },
];

export default function Nav() {
  const [active, setActive] = useState("Projects");
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapseClick = () => {
    if (!collapsed) {
      document.querySelector(".main").classList.add("collapsed-main");
    } else {
      document.querySelector(".main").classList.remove("collapsed-main");
    }

    setCollapsed(!collapsed);
  };

  const links = data.map((item) => (
    <>
      {collapsed ? (
        <Tooltip label={item.label} position="right">
          <Link
            className={`${classes.link} ${collapsed ? classes.collapsed : ""}`}
            data-active={item.label === active || undefined}
            to={item.link}
            key={item.label}
            onClick={(event) => {
              setActive(item.label);
            }}
          >
            <item.icon className={classes.linkIcon} stroke={1.5} />
          </Link>
        </Tooltip>
      ) : (
        <Link
          className={`${classes.link} ${collapsed ? classes.collapsed : ""}`}
          data-active={item.label === active || undefined}
          to={item.link}
          key={item.label}
          onClick={(event) => {
            setActive(item.label);
          }}
        >
          <item.icon className={classes.linkIcon} stroke={1.5} />{" "}
          <span>{item.label}</span>
        </Link>
      )}
    </>
  ));

  return (
    <nav className={`${classes.navbar} ${collapsed ? classes.collapsed : ""}`}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          {collapsed ? (
            <img
              src={mmlogo}
              alt="Logo"
              className={classes.logoImg}
              width={60}
            />
          ) : (
            <img
              src={mmlogo}
              alt="Logo"
              className={classes.logoImg}
              width={60}
            />
          )}

          <ActionIcon
            className={classes.collapseButton}
            onClick={handleCollapseClick}
          >
            <IconChevronLeft />
          </ActionIcon>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          {!collapsed && <span>Logout</span>}
        </a>
      </div>
    </nav>
  );
}
