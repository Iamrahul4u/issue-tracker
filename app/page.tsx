import React from "react";
import LatestIssues from "./LatestIssues";
import IssuesStats from "./IssuesStats";

const Home = () => {
  return (
    <>
      <IssuesStats open={10} inProgress={2} closed={4} />
      <LatestIssues />
    </>
  );
};

export default Home;
