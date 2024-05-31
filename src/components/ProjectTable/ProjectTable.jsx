import { useState, useEffect } from "react";
import { Badge, Box, Button, Table, Text, ActionIcon, Anchor, RingProgress, SimpleGrid, Paper, Center, Group, rem, TextInput } from "@mantine/core";
import { IconPencil, IconTrash, IconUserFilled, IconSquareCheckFilled, IconPlus } from "@tabler/icons-react";
import { Notification } from "@mantine/core";
import { Loader } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const ProjectTable = ({ data }) => {
  const [totalHours, setTotalHours] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    // Calculate total hours across all resources
    const total = data.reduce((acc, resource) => {
      const resourceTotal = Object.values(resource.hoursForEachMonth).reduce((resourceAcc, curr) => resourceAcc + curr, 0);
      return acc + resourceTotal;
    }, 0);
    setTotalHours(total);
  }, [data]);

  const rows = data.map((resource) => {
    // Calculate total hours for the current resource
    const resourceTotal = Object.values(resource.hoursForEachMonth).reduce((acc, curr) => acc + curr, 0);
    // Calculate percentage of total hours for the current resource
    const percentage = (resourceTotal / totalHours) * 100 || 0;
    const handleResourceClick = (namedResource) => {
      navigate(`/resource/${namedResource}`);
    };
    return (
      <Table.Tr key={resource.namedResource}>
        <Table.Td onClick={() => handleResourceClick(resource.namedResource)} className="pointer">
          <Group gap="sm">
            <IconUserFilled size={30} color={"light-dark(var(--mantine-color-gray-7), var(--mantine-color-dark-1))"} />
            <Text fz="sm" fw={500}>
              {resource.namedResource}
            </Text>
          </Group>
        </Table.Td>

        <Table.Td>
          <Paper withBorder radius="md" p="xs" w={190}>
            <Group style={{ justifyContent: "center" }}>
              <div>
                <Text fw={700} size="xl">
                  {resourceTotal}h
                </Text>
              </div>
              <RingProgress
                size={80}
                roundCaps
                thickness={8}
                sections={[{ value: percentage, color: "blue" }]}
                label={<Center>{Math.round(percentage)}%</Center>}
              />
            </Group>
          </Paper>
        </Table.Td>

        {/* Render text inputs for each month */}
        {Object.keys(resource.hoursForEachMonth).map((month) => (
          <Table.Td key={month}>
            <TextInput value={resource.hoursForEachMonth[month]} style={{ width: "48px" }} />
          </Table.Td>
        ))}

        <Table.Td>
          <ActionIcon variant="subtle" color="grey" size={80}>
            <IconSquareCheckFilled size={42} />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <>
      <Box style={{ display: "flex", justifyContent: "end", marginRight: "20px" }}>
        <Button>
          <IconPlus size={18} style={{ marginRight: "4px" }} /> Add Resource
        </Button>
      </Box>
      <Table.ScrollContainer minWidth={800} style={{ marginLeft: "30px" }}>
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Resources</Table.Th>
              <Table.Th style={{ width: "240px" }}>Forecasted Hours</Table.Th>
              {/* Render table headers for each month */}
              {Object.keys(data[0].hoursForEachMonth).map((month) => (
                <Table.Th key={month}>{month.toUpperCase()} 24</Table.Th>
              ))}
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      <div style={{ position: "absolute", right: "10px", bottom: "20px" }}>
        <Notification color="teal" title="Project updated!" mt="md">
          Changes submitted
        </Notification>
      </div>
    </>
  );
};

export default ProjectTable;
