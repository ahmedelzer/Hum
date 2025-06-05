// utils/SkeletonWrapper.js
import React from "react";
import SkeletonLoading from "expo-skeleton-loading";

const SkeletonWrapper = ({
  isLoading,
  children,
  skeletonProps = {},
  SkeletonComponent, // optional custom layout
  background = "#333",
  highlight = "#efefef",
}) => {
  if (isLoading) {
    return (
      <SkeletonLoading background={background} highlight={highlight}>
        {SkeletonComponent ? <SkeletonComponent {...skeletonProps} /> : <></>}
      </SkeletonLoading>
    );
  }

  return <>{children}</>;
};

export default SkeletonWrapper;
