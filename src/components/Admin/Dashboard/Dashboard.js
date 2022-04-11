import React, { useEffect, useState, useCallback } from "react";
import DashboardBody from "./DashboardBody";
import DashboardMenu from "./DashboardMenu";
import {
  faHome,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
// import requestAPI from "../../../apis";
import { useHistory } from "react-router";
// import { ACCESS_TOKEN } from "./../../../utils/constant";
import { useSnackbar } from "notistack";
function Dashboard() {
  const menuItems = [
    {
      id: "1",
      name: "Tổng Quan",
      icon: faHome,
    },
    {
      id: "2",
      name: "Bệnh nhân",
      icon: faUsers,
    },
    {
      id: "3",
      name: "Bác sĩ",
      icon: faUsers,
    }

  ];
  const [tabId, setTabId] = useState("1");
  const [openMenu, setOpenMenu] = useState(true);
  const [openMenuMobile, setOpenMenuMobile] = useState(true);
  const [DriverId] = useState("");
  const [orderNotice] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const history = useHistory();
  // const { enqueueSnackbar } = useSnackbar();
  //call api get info user
  const setTabIdOnClick = (id) => {
    setTabId(id);
  };

  const setOpenMenuOnClick = () => {
    if (window.innerWidth <= 1110) {
      setOpenMenu(true);
      if (openMenuMobile) setOpenMenuMobile(false);
      else setOpenMenuMobile(true);
    } else {
      if (openMenu) setOpenMenu(false);
      else setOpenMenu(true);
    }
  };

  const [openCreate, setOpenCreate] = useState(false);

  const setOpenCreateFunc = () => {
    document.body.style.overflow = "hidden";
    setOpenCreate(true);
  };

  const setCloseCreateFunc = (bool) => {
    document.body.style.overflow = "unset";
    setOpenCreate(bool);
  };

  const [openEdit, setOpenEdit] = useState(false);

  const setOpenEditFunc = (event) => {
    document.body.style.overflow = "hidden";
    setOpenEdit(true);
  };

  const setCloseEditFunc = (bool) => {
    document.body.style.overflow = "unset";
    setOpenEdit(bool);
  };

  return (
    <div className="Dashboard flex">
      <DashboardMenu
        setTabIdOnClick={setTabIdOnClick}
        setOpenMenuOnClick={setOpenMenuOnClick}
        tabId={tabId}
        menuItems={menuItems}
        openMenu={openMenu}
        openMenuMobile={openMenuMobile}
        setCloseCreateFunc={setCloseCreateFunc}
        setCloseEditFunc={setCloseEditFunc}
        userInfo={userInfo}
      />
      <DashboardBody
        tabId={tabId}
        menuItems={menuItems}
        openMenu={openMenu}
        openMenuMobile={openMenuMobile}
        openCreate={openCreate}
        openEdit={openEdit}
        setOpenMenuOnClick={setOpenMenuOnClick}
        setOpenCreateFunc={setOpenCreateFunc}
        setCloseCreateFunc={setCloseCreateFunc}
        setOpenEditFunc={setOpenEditFunc}
        setCloseEditFunc={setCloseEditFunc}
        DriverId={DriverId}
        orderNotice={orderNotice}
      />
    </div>
  );
}
export default withRouter(Dashboard);
