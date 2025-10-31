import SideBar from "../SideBar";
import { useState, useEffect } from "react";

import "./index.css";

const InsightsPanel = () => {
  const [insightsList, setInsightsList] = useState({
    openTaskCount: 0,
    dueSoonCount: 0,
    priorityDistribution: []
  });

  const getAllInsights = async () => {
    const url = "http://localhost:3004/get_insights";

    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, options);
    if (response.ok === true) {
      const data = await response.json();
      const updatedData = {
        openTaskCount: data.totalOpenCount,
        dueSoonCount: data.dueSoonCount,
        priorityDistribution: data.priorityDistribution,
      };
      setInsightsList(updatedData);
    }
  };

  useEffect(() => {
    getAllInsights();
  }, []);

  return (
    <div className="indights-pannel-container">
      <SideBar />
      <div className="indights-pannel-content-container">
        <div className="insight-card-container">
          <h1 className="insight-heading">Open Tasks</h1>
          <h3 className="insight-description">{`You have ${insightsList.openTaskCount ?? 0} open tasks`}</h3>
        </div>
        <div className="insight-card-container">
          <h1 className="insight-heading">Due in next 3 days</h1>
          <h3 className="insight-description">{`You have ${insightsList.dueSoonCount?? 0} open tasks`}</h3>
        </div>
        <div className="insight-card-container">
          <h1 className="insight-heading">Tasks Priority Count</h1>
          {insightsList.priorityDistribution.map((item, index) => (
            <h3 className="insight-description" key={index}>
              You have {item.priorityDistribution} {item.priority} tasks
            </h3>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsightsPanel;
