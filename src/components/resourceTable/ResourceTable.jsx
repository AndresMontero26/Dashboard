import { useState, useEffect } from "react";
import { Table, Text, Paper, Group, TextInput, Loader, RingProgress, Center } from "@mantine/core";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

const ResourceTable = ({ resourceName }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResourceProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const allProjects = querySnapshot.docs.map((doc) => doc.data());

        // Filter projects based on named resources and remove resources that do not match the resourceName
        const filteredProjects = allProjects
          .map((project) => ({
            ...project,
            namedResources: project.namedResources.filter((resource) => resource.namedResource === resourceName),
          }))
          .filter((project) => project.namedResources.length > 0); // Remove projects with no matching named resources

        // Set filtered projects in state
        setProjects(filteredProjects);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error fetching resource projects:", error);
        setLoading(false);
        setError(error);
      }
    };

    fetchResourceProjects();
  }, [resourceName]);

  if (loading) {
    return <Loader>Loading...</Loader>; // Show loader while data is being fetched
  }

  const renderTableHeader = () => {
    if (projects.length === 0) return null;
    const firstProject = projects[0];
    const months = Object.keys(firstProject.namedResources[0].hoursForEachMonth).sort((a, b) => {
      const monthOrder = {
        jan: 1,
        feb: 2,
        mar: 3,
        apr: 4,
        may: 5,
        jun: 6,
        jul: 7,
        aug: 8,
        sep: 9,
        oct: 10,
        nov: 11,
        dec: 12,
      };
      return monthOrder[a] - monthOrder[b];
    });

    return months.map((month) => <Table.Th key={month}>{month.toUpperCase()}</Table.Th>);
  };

  const renderRows = () => {
    return projects.map((project, index) => {
      const namedResource = project.namedResources[0];
      const totalHours = Object.values(namedResource.hoursForEachMonth).reduce((acc, curr) => acc + curr, 0);

      return (
        <Table.Tr key={index}>
          <Table.Td>{project.projectName}</Table.Td>
          <Table.Td>
            <Paper withBorder radius="md" p="xs" w={190}>
              <Group style={{ justifyContent: "center" }}>
                <Text fw={700} size="xl">
                  {totalHours}h
                </Text>
              </Group>
            </Paper>
          </Table.Td>
          {/* Render text inputs for each month */}
          {Object.entries(namedResource.hoursForEachMonth)
            .sort((a, b) => {
              const monthOrder = {
                jan: 1,
                feb: 2,
                mar: 3,
                apr: 4,
                may: 5,
                jun: 6,
                jul: 7,
                aug: 8,
                sep: 9,
                oct: 10,
                nov: 11,
                dec: 12,
              };
              return monthOrder[a[0]] - monthOrder[b[0]];
            })
            .map(([month, value]) => (
              <Table.Td key={month}>
                <TextInput value={value} style={{ width: "48px" }} />
              </Table.Td>
            ))}
        </Table.Tr>
      );
    });
  };

  return (
    <Table.ScrollContainer minWidth={800} style={{ marginLeft: "30px" }}>
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Project</Table.Th>
            <Table.Th style={{ width: "240px" }}>Forecasted Hours</Table.Th>
            {renderTableHeader()}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{renderRows()}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};

export default ResourceTable;
