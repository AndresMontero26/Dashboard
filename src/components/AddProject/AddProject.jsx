import { TextInput, Checkbox, Button, Group, Box, ScrollArea, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { db } from "../../../firebase";
import { collection, addDoc } from "firebase/firestore";
import csvData from "../../utils/data";
export default function AddProject() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "Which UK Limited_00010739_Data - Data Services & Technology - Analytics Services - Retainer (renewal)",
      client: "Little - Rippin",
      lead: "Celia Li",
      hoursForcasted: "54",
      namedResources: "Andres Montero",
      team: "Analytics",
      hasForecast: true,
      jan: "0",
      feb: "0",
      mar: "0",
      apr: "0",
      may: "0",
      jun: "0",
      jul: "0",
      aug: "0",
      sep: "0",
      oct: "0",
      nov: "0",
      dec: "0",
    },

    validate: {
      name: (value) => (/\S/.test(value) ? null : "Name cannot be empty"),
      client: (value) => (/\S/.test(value) ? null : "Client cannot be empty"),
      lead: (value) => (/\S/.test(value) ? null : "Lead cannot be empty"),
      hoursForecasted: (value) => (/\S/.test(value) ? null : "Hours Forecasted cannot be empty"),
      namedResources: (value) => (/\S/.test(value) ? null : "Named Resources cannot be empty"),
      team: (value) => (/\S/.test(value) ? null : "Team cannot be empty"),
    },
  });
  const handleSubmit = async (values) => {
    const storeProjectsInFirestore = async () => {
      try {
        // Loop through the data array
        for (const projectData of csvData) {
          // Store each project in the Firestore database
          await addDoc(collection(db, "projects"), projectData);
          console.log("Project added successfully:", projectData);
        }
        console.log("All projects added successfully!");
      } catch (error) {
        console.error("Error adding projects:", error);
      }
    };

    // Call the function to store projects in Firestore
    storeProjectsInFirestore();
    /*    try {
      const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

      const monthlyHours = {};
      months.forEach((month) => {
        const monthValue = values[month];
        if (monthValue !== undefined && monthValue !== "") {
          monthlyHours[month] = parseInt(monthValue, 10);
        }
      });

      const { jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec, ...projectData } = values;

      // Add monthlyHours object to projectData
      projectData.monthlyHours = monthlyHours;

      // Store projectData in Firestore
      await addDoc(collection(db, "projects"), projectData);

      console.log("Project data stored in Firestore:", projectData);
      form.reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Error storing project data:", error);
    } */
  };

  return (
    <Box mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
          <TextInput withAsterisk label="Name" placeholder="Project name" key={form.key("name")} {...form.getInputProps("name")} />

          <TextInput withAsterisk label="Client" placeholder="Clientname" key={form.key("client")} {...form.getInputProps("client")} />

          <TextInput withAsterisk label="Lead" placeholder="Project lead" key={form.key("lead")} {...form.getInputProps("lead")} />

          <TextInput
            withAsterisk
            label="Hours Forecasted"
            placeholder="Forecasted hours"
            key={form.key("hoursForecasted")}
            {...form.getInputProps("hoursForcasted")} // Typo corrected to "hoursForcasted"
          />

          <TextInput
            withAsterisk
            label="Named Resources"
            placeholder="Named resources"
            key={form.key("namedResources")}
            {...form.getInputProps("namedResources")}
          />

          <TextInput withAsterisk label="Team" placeholder="Project team" key={form.key("team")} {...form.getInputProps("team")} />

          <Checkbox mt="md" label="Has Forecast" key={form.key("hasForecast")} {...form.getInputProps("hasForecast", { type: "checkbox" })} />
        </Box>
        <Title ta="center" order={4} my={20} className="greyColor">
          Monthy hours
        </Title>
        <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
          {/* TextInputs for each month */}
          {Object.keys(form.values)
            .slice(7)
            .map((month) => (
              <TextInput
                key={form.key(month)}
                label={month.charAt(0).toUpperCase() + month.slice(1)} // Capitalize month
                placeholder={`0`}
                {...form.getInputProps(month)}
                w={40}
              />
            ))}
        </Box>
        <Group justify="center" mt="50px">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
