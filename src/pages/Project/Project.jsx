import { useEffect, useState } from "react";
import { Text, Card } from "@mantine/core";
import ProjectTable from "../../components/ProjectTable/ProjectTable";
import classes from "./Project.module.css";
import { db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Loader } from "@mantine/core";
import { Flex } from "@mantine/core";

const Project = () => {
  const { id } = useParams();
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const sortedData = sortMonths(docSnap.data());
          setProjectData(sortedData);
          console.log(sortedData);
        } else {
          console.log("Project not found");
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjectData();
  }, [id]);

  const sortMonths = (data) => {
    // Sort months in chronological order
    const monthsOrder = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

    // Sort named resources and their respective month-hour pairs
    const sortedNamedResources = data.namedResources.map((resource) => {
      // Sort month-hour pairs based on the chronological order of months
      const sortedHours = Object.fromEntries(
        Object.entries(resource.hoursForEachMonth).sort(([monthA], [monthB]) => monthsOrder.indexOf(monthA) - monthsOrder.indexOf(monthB))
      );
      return { ...resource, hoursForEachMonth: sortedHours };
    });

    // Sort named resources alphabetically by name
    const sortedData = {
      ...data,
      namedResources: sortedNamedResources.sort((a, b) => a.namedResource.localeCompare(b.namedResource)),
    };

    return sortedData;
  };
  if (!projectData) {
    return (
      <Flex justify="center" align="center" style={{ height: "100vh" }}>
        <Loader color="blue" size={50} />
      </Flex>
    );
  }

  return (
    <>
      <Card withBorder p="xl" radius="md" className={classes.card}>
        <div className={classes.inner}>
          <div>
            <Text fz="xxl" className={classes.label}>
              {projectData.projectName}
            </Text>
            <div>
              <div className={classes.subheaders}>
                <div className={classes.subheader}>
                  <Text className={classes.lead} mt={30}>
                    {projectData.projectLead}
                  </Text>
                  <Text fz="xs" c="dimmed">
                    Project Lead
                  </Text>
                </div>
                <div className={classes.subheader}>
                  <Text className={classes.lead} mt={30}>
                    {projectData.totalHoursForecasted}
                  </Text>
                  <Text fz="xs" c="dimmed">
                    Total Hours Forecasted
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <ProjectTable data={projectData.namedResources} />
    </>
  );
};

export default Project;
