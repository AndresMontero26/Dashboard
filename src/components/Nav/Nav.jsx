import { useState } from "react";
import { Group, Code } from "@mantine/core";
import logo from "../../../assets/logo.png";
import { IconBeach, IconUsersGroup, IconSwitchHorizontal, IconLogout, IconListDetails } from "@tabler/icons-react";
import classes from "./NavbarSimple.module.css";
import { Link } from "react-router-dom";
import { ColorSchemeToggle } from "../ColorSchemeToggle/ColorSchemeToggle";

const data = [
  { link: "/projects", label: "Projects", icon: IconListDetails },
  { link: "/teams", label: "Teams", icon: IconUsersGroup },
  { link: "/resources", label: "Resources", icon: IconUsersGroup },
  { link: "/vacations", label: "Vacations", icon: IconBeach },
];

export default function Nav() {
  const [active, setActive] = useState("Billing");

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      onClick={(event) => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <img src={logo} alt="Logo" className="logo" width={156} />
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
