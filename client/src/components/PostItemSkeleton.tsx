import React from "react";
import ContentLoader from "react-content-loader";

const PostItemSkeleton = () => {
  return (
    <div className="goal">
      <ContentLoader
        height={80}
        speed={1}
        backgroundColor={"#cccccc"}
        foregroundColor={"#7d7d7d"}
      >
        <rect x="0" y="0" rx="70" ry="70" width="70" height="70" />
        <rect x="80" y="10" rx="4" ry="4" width="300" height="20" />
        <rect x="80" y="40" rx="3" ry="3" width="200" height="20" />
      </ContentLoader>
      <ContentLoader
        height={50}
        speed={1}
        backgroundColor={"#cccccc"}
        foregroundColor={"#7d7d7d"}
      >
        <rect x="0" y="0" rx="4" ry="4" width="400" height="20" />
        <rect x="0" y="30" rx="4" ry="4" width="250" height="20" />
      </ContentLoader>
      <ContentLoader
        height={80}
        speed={1}
        backgroundColor={"#cccccc"}
        foregroundColor={"#7d7d7d"}
      >
        <rect x="0" y="0" rx="4" ry="4" width="400" height="100" />
      </ContentLoader>
      <ContentLoader
        height={20}
        speed={1}
        backgroundColor={"#cccccc"}
        foregroundColor={"#7d7d7d"}
      >
        <rect x="0" y="0" rx="4" ry="4" width="250" height="20" />
      </ContentLoader>
      <div className="line-through"></div>
      <ContentLoader
        height={20}
        speed={1}
        backgroundColor={"#cccccc"}
        foregroundColor={"#7d7d7d"}
      >
        <rect x="" y="0" rx="3" ry="3" width="400" height="20" />
      </ContentLoader>
    </div>
  );
};

export default PostItemSkeleton;
