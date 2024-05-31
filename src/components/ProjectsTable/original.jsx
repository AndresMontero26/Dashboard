import { useState, useEffect } from "react";
import { Table, ScrollArea, UnstyledButton, Group, Text, Center, TextInput, rem, keys, Box, Title } from "@mantine/core";
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch, IconPlus, IconSquareCheckFilled, IconSquareXFilled } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import AddProject from "../AddProject/AddProject";
import EditProject from "../EditProject/EditProject";
import classes from "./ProjectsTable.module.css";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
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
  if (data.length === 0 || !data[0]) {
    return [];
  }
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
const searchFilter = (data, query) => {
  if (!query.trim()) {
    // If the query is empty or whitespace, return the original data
    return data;
  }

  // Convert the query to lowercase for case-insensitive search
  const lowercaseQuery = query.toLowerCase().trim();

  // Filter the data based on the search query
  const filteredData = data.filter((item) => {
    // Check each property of the item except 'monthlyHours'
    for (const key in item) {
      if (key !== "monthlyHours") {
        const value = item[key];
        // If the value is a string and contains the search query (case-insensitive), return true
        if (typeof value === "string" && value.toLowerCase().includes(lowercaseQuery)) {
          return true;
        }
      }
    }
    return []; // Return false if no field matches the query
  });
  console.log("filtered", filteredData);
  return filteredData;
};

export function ProjectsTable() {
  const [opened, { open, close }] = useDisclosure(false);
  const [modalAction, setModalAction] = useState("add");
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get a reference to the "projects" collection
        const projectsCollection = collection(db, "projects");

        // Retrieve all documents in the "projects" collection
        const querySnapshot = await getDocs(projectsCollection);

        // Process the query snapshot to get project data
        const projectsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSortedData(projectsData);
        console.log(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, []);

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    console.log(value);
    setSortedData(searchFilter(sortedData, value));
  };
  const openModal = (action) => {
    if (action === "add") {
      setModalAction("add");
    } else {
      setModalAction("edit");
    }
    open();
  };

  const rows = sortedData.map((row, i) => (
    <Table.Tr key={row.name + i} onClick={() => openModal("edit")} className="pointer">
      <Table.Td className={classes.projectName}>{row.name}</Table.Td>
      <Table.Td>{row.lead}</Table.Td>
      <Table.Td ta="center">{row.hoursForcasted}</Table.Td>
      <Table.Td>{row.namedResources}</Table.Td>
      <Table.Td>{row.team}</Table.Td>
      <Table.Td ta="center">
        {row.hasForecast ? <IconSquareCheckFilled className="greyColor" /> : <IconSquareXFilled className="greyColor" />}
      </Table.Td>
      <Table.Td ta="center">{row.feb}</Table.Td>
      <Table.Td ta="center"> {row.mar}</Table.Td>
      <Table.Td ta="center">{row.abr}</Table.Td>
      <Table.Td ta="center">{row.may}</Table.Td>
      <Table.Td ta="center">{row.jun}</Table.Td>
      <Table.Td ta="center">{row.jul}</Table.Td>
      <Table.Td ta="center">{row.aug}</Table.Td>
      <Table.Td ta="center">{row.sep}</Table.Td>
      <Table.Td ta="center">{row.oct}</Table.Td>
      <Table.Td ta="center">{row.nov}</Table.Td>
      <Table.Td ta="center">{row.dev}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <TextInput
          placeholder="Search by any field"
          mb="md"
          leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
          style={{ width: "500px" }}
        />
        <Button onClick={() => openModal("add")}>
          <IconPlus size={18} style={{ marginRight: "4px" }} /> Add Project
        </Button>
      </Box>
      {sortedData.length > 0 ? (
        <ScrollArea>
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
                  Total Hours Forecasted
                </Th>
                <Th sorted={sortBy === "company"} reversed={reverseSortDirection} onSort={() => setSorting("company")}>
                  Named Resources
                </Th>
                <Th sorted={sortBy === "company"} reversed={reverseSortDirection} onSort={() => setSorting("company")}>
                  Team Name
                </Th>
                <Th sorted={sortBy === "company"} reversed={reverseSortDirection} onSort={() => setSorting("company")}>
                  Has Forecast?
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
      ) : (
        "loading"
      )}

      <Modal.Root opened={opened} onClose={close} size="100%">
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Title order={2} className={classes.greyColor}>
              {modalAction === "add" ? "Add Project" : "Edit Project"}
            </Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>{modalAction === "add" ? <AddProject /> : <EditProject />}</Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
