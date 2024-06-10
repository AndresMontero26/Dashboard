import React from "react";
import Header from "../components/Header/Header";
import { ProjectsTable } from "../components/ProjectsTable/ProjectsTable";
import { Paper } from "@mantine/core";
const Projects = () => {
  return (
    <>
      <Header title="Projects" />

      <Paper shadow="xs" p="xl">
        <ProjectsTable />
      </Paper>
    </>
  );
};

export default Projects;
