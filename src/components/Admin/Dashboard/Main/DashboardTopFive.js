import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";

export default function DashboardTopFive({ data, title, color, icon, table }) {
  console.log(data);
  return (
    <div className="topfive flex-col">
      <div className={`headerbox flex-center ${color}`}>
        <FontAwesomeIcon icon={icon} className="icon" />
      </div>
      <div className="top-location-container">
        <div className="headerbox-header">
          <p>{title}</p>
        </div>
        <div className="topfive-content flex">
          <div className="topfive-list">
            <div className="top-location-div topfive-div flex">
              {table &&
                table?.map((item, index) => {
                  return (
                    <div key={index} className="topfive-header">
                      {item.title}
                    </div>
                  );
                })}
            </div>
            {data ? (
              data.data?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="top-location-div topfive-div flex"
                  >
                    <div
                      style={{ width: "80%", textAlign: "left" }}
                      className="top-user flex"
                    >
                      <p className="top-user-name">
                        {item[0].name_vi || item[0].name}
                      </p>
                    </div>
                    <div style={{ width: "80px", textAlign: "center" }}>
                      {item[1] || item.totalPrice}
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <CircularProgress />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
