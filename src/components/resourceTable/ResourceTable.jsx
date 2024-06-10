import { useState, useEffect } from "react";
import {
  Table,
  Text,
  Paper,
  Group,
  TextInput,
  Loader,
  Center,
  RingProgress,
} from "@mantine/core";

const getOrderedMonths = () => {
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
  return Object.keys(monthOrder).sort((a, b) => monthOrder[a] - monthOrder[b]);
};

const getColorForPercentage = (percentage) => {
  if (percentage < 15) {
    return "green";
  } else if (percentage < 40) {
    return "teal";
  } else if (percentage < 60) {
    return "blue";
  } else if (percentage < 80) {
    return "orange";
  } else {
    return "red";
  }
};

const ResourceTable = ({ projects, resourceName }) => {
  if (!projects) {
    return <Loader>Loading...</Loader>; // Show loader while data is being fetched
  }

  const orderedMonths = getOrderedMonths();

  const calculateMonthlyTotals = () => {
    const monthlyTotals = {};
    orderedMonths.forEach((month) => {
      monthlyTotals[month] = 0;
    });

    projects.forEach((project) => {
      project.namedResources.forEach((namedResource) => {
        if (namedResource.namedResource === resourceName) {
          orderedMonths.forEach((month) => {
            monthlyTotals[month] += namedResource.hoursForEachMonth[month] || 0;
          });
        }
      });
    });

    return monthlyTotals;
  };

  const monthlyTotals = calculateMonthlyTotals();

  const renderTableHeader = () => {
    if (projects.length === 0) return null;
    return orderedMonths.map((month) => (
      <Table.Th key={month} style={{ textAlign: "center" }}>
        {month.toUpperCase()}
      </Table.Th>
    ));
  };

  const renderRows = () => {
    return projects.map((project, index) => {
      return project.namedResources.map((namedResource, resourceIndex) => {
        if (namedResource.namedResource !== resourceName) return null;

        const totalHours = Object.values(
          namedResource.hoursForEachMonth
        ).reduce((acc, curr) => acc + curr, 0);

        return (
          <Table.Tr key={`${index}-${resourceIndex}`}>
            <Table.Td>{project.projectName}</Table.Td>
            <Table.Td>
              <Paper withBorder radius="md" p="xs" w={150}>
                <Group style={{ justifyContent: "center" }}>
                  <Text fw={500} size="xl">
                    {totalHours}h
                  </Text>
                </Group>
              </Paper>
            </Table.Td>
            {orderedMonths.map((month) => (
              <Table.Td key={month} style>
                <TextInput
                  value={namedResource.hoursForEachMonth[month] || 0}
                  style={{ width: "48px", margin: "auto" }}
                />
              </Table.Td>
            ))}
          </Table.Tr>
        );
      });
    });
  };

  const renderTotalRow = () => {
    return (
      <Table.Tr>
        <Table.Td colSpan={2}>
          <Text fw={700} size="xl">
            Capacity
          </Text>
        </Table.Td>
        {orderedMonths.map((month) => (
          <Table.Td key={month}>
            <Group style={{ justifyContent: "center" }}>
              <RingProgress
                size={80}
                roundCaps
                thickness={8}
                sections={[
                  {
                    value: (monthlyTotals[month] / 120) * 100,
                    color: getColorForPercentage(
                      (monthlyTotals[month] / 120) * 100
                    ),
                  },
                ]}
                label={
                  <Center>
                    {Math.round((monthlyTotals[month] / 120) * 100)}%
                  </Center>
                }
              />
              <div>
                <Text fw={700} size="xl">
                  {monthlyTotals[month]}h
                </Text>
              </div>
            </Group>
          </Table.Td>
        ))}
      </Table.Tr>
    );
  };

  return (
    <Table verticalSpacing="sm" stickyHeader>
      <Table.Thead>
        <Table.Tr>
          <Table.Th style={{ textAlign: "center" }}>Project</Table.Th>
          <Table.Th style={{ width: "240px", textAlign: "center" }}>
            Forecasted Hours
          </Table.Th>
          {renderTableHeader()}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {renderRows()}
        {renderTotalRow()}
      </Table.Tbody>
    </Table>
  );
};

export default ResourceTable;
