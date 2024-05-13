import { Button, Group, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import classes from "./ColorSchemeToggle.module.css";
export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <Group justify="center" mt="xl" className={classes.container}>
      <IconSun onClick={() => setColorScheme("light")} className={classes.icon}></IconSun>
      <IconMoon onClick={() => setColorScheme("dark")} className={classes.icon}></IconMoon>
    </Group>
  );
}
