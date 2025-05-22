import React from "react";
import { useDeviceInfo } from "./useDeviceInfo";

const SetComponentsPlatforms = ({ components }) => {
  const { os } = useDeviceInfo();

  // Find the correct component based on platform
  const selectedComponent = components.find(
    (component) => component.platform === os
  )?.component;

  return selectedComponent || null; // Render the selected component or return null if not found
};

export default SetComponentsPlatforms;
