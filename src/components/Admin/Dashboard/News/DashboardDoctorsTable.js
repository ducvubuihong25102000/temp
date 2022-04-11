import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataGrid } from "@mui/x-data-grid";
import CustomPagination from "../Utils/CustomPagination";
import CustomNoRowsOverlay from "../Utils/CustomNoRowsOverlay";
import CustomToolbar from "../Utils/DashboardConfigToolBar";
import { useSnackbar } from "notistack";
import DashboardControl from "../Utils/DashboardControl";
import CustomLoadingOverlay from "../Utils/CustomLoadingOverlay";
import DashboardDialogConfirm from "../Utils/DashboardDialogConfirm";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { CheckUpdate } from "../../../../data/dashboard/doctors/doctorSlice";
import { useDispatch } from "react-redux";
import requestAPI from "../../../../apis";
// import requestAPI from "../../../../apis";

export default function DashboardTable(props) {
  const [doctors, setDoctors] = useState([]);
  const [constDoctors, setConstDoctors] = useState([]);
  const [selection, setSelection] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const update = useSelector((state) => state.doctors.isUpdate);
  const [open, setOpen] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    requestAPI("/staffs", "GET")
      .then((res) => {
        setDoctors(res.data.data);
        setConstDoctors(res.data.data);
        setIsLoading(false);
        console.log(res)
      })
      .catch((err) => {
        if (err) {
          if (err.response.status === 403 || err.response.status === 401) {
            history.push("/login");
          }
        }
      });
  }, [update]);

  const deleteOnClick = () => {
    // if (selection.length > 0) {
    //   RemoveOrder({ idList: selection })
    //     .then((res) => {
    //       if (res) {
    //         dispatch(CheckUpdate());
    //      
    //       }
    //     })
    //     .catch((err) => console.log(err));
    // } else {

    // }
  };
  // const RemoveOrder = async (list) => {
  //   const data = await requestAPI(`/job/delete`, "DELETE", list);
  //   return data;
  // };
  const searchOnSubmit = (event) => {
    event.preventDefault();
  };
  const searchOnChange = (event) => {
    const searchInput = event.target.value.trim();
    const search = [];
    if (searchInput.trim() !== "") {
      for (let i in constDoctors) {
        if (constDoctors[i].name_vi.includes(searchInput)) {
          search.push(constDoctors[i]);
        }
      }
      setDoctors(search);
    } else {
      setDoctors(constDoctors);
    }
  };
  const handleOpenDialogDelete = () => {
    setOpen(true);
  };
  const handleCloseDialogDelete = () => {
    setOpen(false);
  };
  return (
    <div className="topfive flex-col" style={{ width: "100%" }}>
      <div className={`headerbox flex-center ${props.color}`}>
        <FontAwesomeIcon icon={props.icon} className="icon" />
      </div>
      <div className="top-location-container">
        <div className="headerbox-header">
          <p>{props.title}</p>
        </div>
        <div className="topfive-content flex-col">
          <DashboardControl
            addController={props.setOpenCreateFunc}
            deleteController={deleteOnClick}
            searchOnChange={searchOnChange}
            searchController={searchOnSubmit}
            handleOpenDialogDelete={handleOpenDialogDelete}
            placeholderSearch={"Tìm kiếm theo tên bài viết"}
          />
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              components={{
                Toolbar: CustomToolbar,
                Pagination: CustomPagination,
                NoRowsOverlay: CustomNoRowsOverlay,
                LoadingOverlay: CustomLoadingOverlay,
              }}
              loading={isLoading}
              columns={props.table}
              rows={doctors}
              pagination
              pageSize={5}
              rowsPerPageOptions={[5]}
              onSelectionModelChange={(doctorSelectionModel) => {
                setSelection(doctorSelectionModel);
              }}
              checkboxSelection
            />
          </div>
          <DashboardDialogConfirm
            open={open}
            handleCloseDialogDelete={handleCloseDialogDelete}
            handleDelete={deleteOnClick}
          />
        </div>
      </div>
    </div>
  );
}
