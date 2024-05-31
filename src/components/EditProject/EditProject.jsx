import { TextInput, Checkbox, Button, Group, Box, ScrollArea, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { db } from "../../../firebase";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
export default function EditProject({ project }) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: project.name,
      client: project.client,
      lead: project.lead,
      hoursForcasted: project.hoursForcasted,
      namedResources: project.namedResources,
      team: project.team,
      hasForecast: project.hasForecast,
      jan: project.monthlyHours.jan,
      feb: project.monthlyHours.feb,
      mar: project.monthlyHours.mar,
      apr: project.monthlyHours.apr,
      may: project.monthlyHours.may,
      jun: project.monthlyHours.jun,
      jul: project.monthlyHours.jul,
      aug: project.monthlyHours.aug,
      sep: project.monthlyHours.sep,
      oct: project.monthlyHours.oct,
      nov: project.monthlyHours.nov,
      dec: project.monthlyHours.dec,
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
    try {
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
      await setDoc(doc(db, "projects", `${project.id}`), projectData);

      console.log("Project data stored in Firestore:", projectData);
      form.reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Error storing project data:", error);
    }
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
