import React from "react";
import ContentLoader from "react-content-loader";

const FriendRequestSkeleton = () => {
  return (
    <div className="friend-request">
      <ContentLoader
        height={80}
        speed={1}
        backgroundColor={"#cccccc"}
        foregroundColor={"#7d7d7d"}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <rect x="" y="0" rx="70" ry="70" width="70" height="70" />
        <rect x="80" y="10" rx="4" ry="4" width="300" height="20" />
        <rect x="80" y="45" rx="3" ry="3" width="200" height="20" />
      </ContentLoader>
    </div>
  );
};

export default FriendRequestSkeleton;
