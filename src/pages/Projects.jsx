import { Container } from "@mantine/core";
import React from "react";
import Header from "../components/Header/Header";
import { ProjectsTable } from "../components/ProjectsTable/ProjectsTable";
import { ScrollArea, Paper } from "@mantine/core";
const Projects = () => {
  return (
    <>
      <Header title="Projects" />
      <ScrollArea>
        <Paper shadow="xs" p="xl">
          <ProjectsTable />
        </Paper>
      </ScrollArea>
    </>
  );
};

export default Projects;
