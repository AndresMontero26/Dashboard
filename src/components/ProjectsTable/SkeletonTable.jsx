import React from "react";
import { Skeleton, Box } from "@mantine/core";
const SkeletonTable = () => {
  return (
    <Box>
      <Box style={{ display: "flex" }}>
        <Skeleton height={41} radius="xs" width={505} m={2} />
        <Skeleton height={41} radius="xs" width={148} m={2} />
        <Skeleton height={41} radius="xs" width={216} m={2} />
        <Skeleton height={41} radius="xs" width={182} m={2} />
        <Skeleton height={41} radius="xs" width={146} m={2} />
        <Skeleton height={41} radius="xs" width={157} m={2} />
        <Skeleton height={41} radius="xs" width={113} m={2} />
        <Skeleton height={41} radius="xs" width={113} m={2} />
        <Skeleton height={41} radius="xs" width={113} m={2} />
      </Box>

      <Skeleton height={75} radius="xs" width="100%" m={3} />
      <Skeleton height={75} radius="xs" width="100%" m={3} />
      <Skeleton height={75} radius="xs" width="100%" m={3} />
      <Skeleton height={75} radius="xs" width="100%" m={3} />
      <Skeleton height={75} radius="xs" width="100%" m={3} />
      <Skeleton height={75} radius="xs" width="100%" m={3} />
      <Skeleton height={75} radius="xs" width="100%" m={3} />
      <Skeleton height={75} radius="xs" width="100%" m={3} />
    </Box>
  );
};

export default SkeletonTable;
