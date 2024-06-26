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
import { useNavigate } from "react-router-dom";
import SkeletonTable from "./SkeletonTable";
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
  return data.filter((item) => {
    return keys(item).some((key) => {
      const value = item[key];
      if (typeof value === "string") {
        return value.toLowerCase().includes(query);
      }
      return false; // Skip non-string values
    });
  });
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

export function ProjectsTable() {
  const [opened, { open, close }] = useDisclosure(false);
  const [modalAction, setModalAction] = useState("add");
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [activeProject, setActiveProject] = useState({});
  const navigate = useNavigate();
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
        setAllData(projectsData);
        console.log(projectsData);
        setLoading(true);
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
    setSortedData(sortData(sortedData, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    console.log(value);
    setSearch(value);

    setSortedData(sortData(allData, { sortBy, reversed: reverseSortDirection, search: value }));
    console.log(sortData(allData, { sortBy, reversed: reverseSortDirection, search: value }));
  };
  const openModal = (action) => {
    if (action === "add") {
      setModalAction("add");
    } else {
      setModalAction("edit");
    }
    open();
  };
  const handleProjectClick = (project) => {
    navigate(`/projects/${project.id}`);
  };
  const rows = sortedData.map((row, i) => (
    <Table.Tr onClick={() => handleProjectClick(row)} className="pointer" key={row.id}>
      <Table.Td className={classes.projectName}>{row.projectName}</Table.Td>
      <Table.Td>{row.projectLead}</Table.Td>
      <Table.Td ta="center">{row.totalHoursForecasted}</Table.Td>
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
      <ScrollArea>
        {loading ? (
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
              </Table.Tr>
            </Table.Tbody>
            <Table.Tbody>
              {rows.length > 0 ? (
                rows
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={18}>
                    <Text fw={500} ta="center">
                      Nothing found
                    </Text>
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        ) : (
          <SkeletonTable />
        )}
      </ScrollArea>

      <Modal.Root opened={opened} onClose={close} size="100%">
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Title order={2} className={classes.greyColor}>
              {modalAction === "add" ? "Add Project" : "Edit Project"}
            </Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>{modalAction === "add" ? <AddProject /> : <EditProject project={activeProject} />}</Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
