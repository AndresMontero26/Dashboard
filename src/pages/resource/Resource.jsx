import React from "react";
import { useParams } from "react-router-dom";
import { RingProgress, Center, Flex } from "@mantine/core";
import { Text, Card } from "@mantine/core";
import { IconUserFilled } from "@tabler/icons-react";
import classes from "./Resource.module.css";
import ResourceTable from "../../components/resourceTable/ResourceTable";
const Resource = () => {
  const { resource } = useParams();
  return (
    <>
      <Card withBorder p="xl" radius="md" className={classes.card}>
        <div className={classes.inner}>
          <div>
            <Flex align="center">
              <IconUserFilled size={30} color={"light-dark(var(--mantine-color-gray-7), var(--mantine-color-dark-1))"} />
              <Text fz="xxl" className={classes.label}>
                {resource}
              </Text>
            </Flex>

            <div>
              <div className={classes.subheaders}>
                <div className={classes.subheader}>
                  <Text className={classes.lead} mt={30}>
                    Ariel Reyes
                  </Text>
                  <Text fz="xs" c="dimmed">
                    Team Lead
                  </Text>
                </div>
                <div className={classes.subheader}>
                  <Text className={classes.lead} mt={30}>
                    Analytics
                  </Text>
                  <Text fz="xs" c="dimmed">
                    Team
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <ResourceTable resourceName={resource} />
    </>
  );
};

export default Resource;
