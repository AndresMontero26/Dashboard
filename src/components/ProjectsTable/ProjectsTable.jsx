import { useState } from "react";
import { Table, ScrollArea, UnstyledButton, Group, Text, Center, TextInput, rem, keys } from "@mantine/core";
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from "@tabler/icons-react";
import classes from "./ProjectsTable.module.css";

function Th({ children, reversed, sorted, onSort }) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between" className={classes.tbHeader}>
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data, search) {
  const query = search.toLowerCase().trim();
  return data.filter((item) => keys(data[0]).some((key) => item[key].toLowerCase().includes(query)));
}

function sortData(data, payload) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

const data = [
  {
    name: "Boots UK Limited_00010739_Data - Data Services & Technology - Analytics Services - Retainer (renewal)",
    company: "Little - Rippin",
    lead: "Ariel Reyes",
    hoursForcasted: "200",
    namedResources: "Andres Montero",
    team: "Tech. Solutions Engineering",
    hasForcast: "True",
    feb: "45",
    mar: "45",
    abr: "45",
    may: "45",
    jun: "45",
    jul: "45",
    agu: "45",
    sep: "45",
    oct: "45",
    nov: "45",
    dec: "45",
  },
  {
    name: "Boots UK Limited_00010739_Data - Data Services & Technology - Analytics Services - Retainer (renewal)",
    company: "Little - Rippin",
    lead: "Ariel Reyes",
    hoursForcasted: "200",
    namedResources: "Andres Montero",
    team: "Tech. Solutions Engineering",
    hasForcast: "True",
    feb: "45",
    mar: "45",
    abr: "45",
    may: "45",
    jun: "45",
    jul: "45",
    agu: "45",
    sep: "45",
    oct: "45",
    nov: "45",
    dec: "45",
  },
  {
    name: "Boots UK Limited_00010739_Data - Data Services & Technology - Analytics Services - Retainer (renewal)",
    company: "Little - Rippin",
    lead: "Ariel Reyes",
    hoursForcasted: "200",
    namedResources: "Andres Montero",
    team: "Tech. Solutions Engineering",
    hasForcast: "True",
    feb: "45",
    mar: "45",
    abr: "45",
    may: "45",
    jun: "45",
    jul: "45",
    agu: "45",
    sep: "45",
    oct: "45",
    nov: "45",
    dec: "45",
  },
  {
    name: "Boots UK Limited_00010739_Data - Data Services & Technology - Analytics Services - Retainer (renewal)",
    company: "Little - Rippin",
    lead: "Ariel Reyes",
    hoursForcasted: "200",
    namedResources: "Andres Montero",
    team: "Tech. Solutions Engineering",
    hasForcast: "True",
    feb: "45",
    mar: "45",
    abr: "45",
    may: "45",
    jun: "45",
    jul: "45",
    agu: "45",
    sep: "45",
    oct: "45",
    nov: "45",
    dec: "45",
  },
  {
    name: "Which UK Limited_00010739_Data - Data Services & Technology - Analytics Services - Retainer (renewal)",
    company: "Little - Rippin",
    lead: "Celia Li",
    hoursForcasted: "54",
    namedResources: "Andres Montero",
    team: "Analitycs",
    hasForcast: "True",
    feb: "45",
    mar: "45",
    abr: "45",
    may: "45",
    jun: "45",
    jul: "45",
    agu: "45",
    sep: "45",
    oct: "45",
    nov: "45",
    dec: "45",
  },
  {
    name: "Which UK Limited_00010739_Data - Data Services & Technology - Analytics Services - Retainer (renewal)",
    company: "Little - Rippin",
    lead: "Celia Li",
    hoursForcasted: "54",
    namedResources: "Andres Montero",
    team: "Analitycs",
    hasForcast: "True",
    feb: "45",
    mar: "45",
    abr: "45",
    may: "45",
    jun: "45",
    jul: "45",
    agu: "45",
    sep: "45",
    oct: "45",
    nov: "45",
    dec: "45",
  },
];

export function ProjectsTable() {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const rows = sortedData.map((row, i) => (
    <Table.Tr key={row.name + i}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.lead}</Table.Td>
      <Table.Td>{row.hoursForcasted}</Table.Td>
      <Table.Td>{row.namedResources}</Table.Td>
      <Table.Td>{row.team}</Table.Td>
      <Table.Td>{row.hasForcast}</Table.Td>
      <Table.Td>{row.feb}</Table.Td>
      <Table.Td>{row.mar}</Table.Td>
      <Table.Td>{row.abr}</Table.Td>
      <Table.Td>{row.may}</Table.Td>
      <Table.Td>{row.jun}</Table.Td>
      <Table.Td>{row.jul}</Table.Td>
      <Table.Td>{row.aug}</Table.Td>
      <Table.Td>{row.sep}</Table.Td>
      <Table.Td>{row.oct}</Table.Td>
      <Table.Td>{row.nov}</Table.Td>
      <Table.Td>{row.dev}</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table striped highlightOnHover withTableBorder withColumnBorders horizontalSpacing="xl" verticalSpacing="md">
        <Table.Tbody>
          <Table.Tr>
            <Th sorted={sortBy === "name"} reversed={reverseSortDirection} onSort={() => setSorting("name")}>
              Project Name
            </Th>
            <Th sorted={sortBy === "lead"} reversed={reverseSortDirection} onSort={() => setSorting("email")}>
              Project Lead
            </Th>
            <Th sorted={sortBy === "company"} reversed={reverseSortDirection} onSort={() => setSorting("company")}>
              Total Hours Forcasted
            </Th>
            <Th sorted={sortBy === "company"} reversed={reverseSortDirection} onSort={() => setSorting("company")}>
              Named Resources
            </Th>
            <Th sorted={sortBy === "company"} reversed={reverseSortDirection} onSort={() => setSorting("company")}>
              Team Name
            </Th>
            <Th sorted={sortBy === "company"} reversed={reverseSortDirection} onSort={() => setSorting("company")}>
              Has Forcast?
            </Th>
            <Th sorted={sortBy === "company"} reversed={reverseSortDirection} onSort={() => setSorting("company")}>
              Feb 24
            </Th>
            <Th sorted={sortBy === "company"} reversed={reverseSortDirection} onSort={() => setSorting("company")}>
              Mar 24
            </Th>
            <Th sorted={sortBy === "company"} reversed={reverseSortDirection} onSort={() => setSorting("company")}>
              Apr 24
            </Th>
            <Th sorted={sortBy === "company"} reversed={reverseSortDirection} onSort={() => setSorting("company")}>
              May 24
            </Th>
            <Th sorted={sortBy === "company"} reversed={reverseSortDirection} onSort={() => setSorting("company")}>
              Jun 24
            </Th>
            <Th sorted={sortBy === "company"} reversed={reverseSortDirection} onSort={() => setSorting("company")}>
              July 24
            </Th>
            <Th sorted={sortBy === "company"} reversed={reverseSortDirection} onSort={() => setSorting("company")}>
              Aug 24
            </Th>
            <Th sorted={sortBy === "company"} reversed={reverseSortDirection} onSort={() => setSorting("company")}>
              Sep 24
            </Th>
            <Th sorted={sortBy === "company"} reversed={reverseSortDirection} onSort={() => setSorting("company")}>
              Oct 24
            </Th>
            <Th sorted={sortBy === "company"} reversed={reverseSortDirection} onSort={() => setSorting("company")}>
              Nov 24
            </Th>
            <Th sorted={sortBy === "company"} reversed={reverseSortDirection} onSort={() => setSorting("company")}>
              Dec 24
            </Th>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={Object.keys(data[0]).length}>
                <Text fw={500} ta="center">
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
