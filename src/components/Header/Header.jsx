import React from "react";
import { Title } from "@mantine/core";
import { Container, Paper } from "@mantine/core";
import classes from "./Header.module.css";

export default function Header({ title }) {
  return (
    <header className={classes.headerTitle}>
      <Paper shadow="xs" p="xl">
        <Title className={classes.title}>{title}</Title>
      </Paper>
    </header>
  );
}
