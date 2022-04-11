import React, { useEffect, useState } from "react";
import { faPatientspaper } from "@fortawesome/free-solid-svg-icons";
import { EditToolbar } from "../Utils/DashboardEditToolBar";
import GridCellExpand from "../Utils/GridCellExpand";
import iconCancel from "../../../../Assets/cancel.png";
import DOMPurify from "dompurify";
import {
  CheckShowMore,
  getPatientsUpdate,
} from "../../../../data/dashboard/patients/patientSlice";
import DashboardTable from "./DashboardPatientsTable";
import { useDispatch, useSelector } from "react-redux";
import { formatMoney, formatMoneyK } from "../../../../helpers/money";
import { datetimeVN } from '../../../../helpers/time';

export default function DashboardPatient(props) {
  const [table, setTable] = useState([]);
  const isShowMore = useSelector((state) => state.patients.showMore);
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.innerWidth <= 600) {
      setTable([
        {
          headerName: "stt",
          field: "id",
          renderCell: renderCellExpand,
          width: 150,
        },

        {
          headerName: "Ngày update",
          field: "update_date",
          valueFormatter: (params) => datetimeVN(params.row?.update_date),
          renderCell: renderCellExpand,
          hide: true,
          width: 175,
        },

        {
          headerName: "Post title",
          field: "name_en",
          renderCell: renderCellExpand,
          hide: true,
          width: 150,
        },
        {
          headerName: "Cấp bậc",
          field: "level_vi",
          renderCell: renderCellExpand,
          width: 150,
        },
        {
          headerName: "Level",
          field: "level_en",
          renderCell: renderCellExpand,
          hide: true,
          width: 150,
        },
        {
          headerName: "mô tả bệnh án",
          field: "description",
          // renderCell: (params) =>
          //   params.row?.description,
          width: 150,
        },
        {
          headerName: "Hoa hồng",
          field: "commission",
          renderCell: (params) => formatMoneyK(params.row?.commission),
          width: 150,
        },
        {
          headerName: "Salary",
          field: "salary",
          renderCell: (params) =>
            params.row?.minSalary_en + " - " + params.row?.maxSalary_en,
          width: 150,
          hide: true,
        },
        {
          headerName: "Nội dung bài viết",
          field: "job_content_vi",
          renderCell: (params) => (
            <h2
              className="db-form__title"
              onClick={() => dispatch(CheckShowMore(params.row.job_content_vi))}
            >
              Xem thêm
            </h2>
          ),
          width: 200,
        },

        {
          headerName: "Ngành nghề",
          field: "categories_vi",
          renderCell: (params) => {
            return params.row.job_category.map((item) => (
              <React.Fragment key={item.id}>
                {item.category?.name_vi + ", "}
              </React.Fragment>
            ));
          },
          width: 175,
        },

        {
          headerName: "Tùy chỉnh",
          field: "control",
          renderCell: (params) => {
            return (
              <div
                className="d-flex justify-content-between align-items-center"
                style={{ cursor: "pointer" }}
              >
                <EditToolbar
                  getItem={getPatientsUpdate}
                  params={params.row}
                  setOpenEditFunc={props.setOpenEditFunc}
                />
              </div>
            );
          },
          width: 150,
        },
      ]);
    } else {
      setTable([
        {
          headerName: "stt",
          field: "id",
          renderCell: renderCellExpand,
          width: 150,
        },
        {
          headerName: "Ngày tạo",
          field: "create_date",
          valueFormatter: (params) => datetimeVN(params.row?.create_date),
          renderCell: renderCellExpand,
          width: 150,
        },
        {
          headerName: "Ngày update",
          field: "update_date",
          valueFormatter: (params) => datetimeVN(params.row?.update_date),
          renderCell: renderCellExpand,
          hide: true,
          width: 175,
        },




        {
          headerName: "mô tả bệnh án",
          field: "description",

          width: 150,
        },




        {
          headerName: "Ngành nghề",
          field: "categories_vi",

          width: 175,
        },

        {
          headerName: "Tùy chỉnh",
          field: "control",
          renderCell: (params) => {
            return (
              <div
                className="d-flex justify-content-between align-items-center"
                style={{ cursor: "pointer" }}
              >
                <EditToolbar
                  getItem={getPatientsUpdate}
                  params={params.row}
                  setOpenEditFunc={props.setOpenEditFunc}
                />
              </div>
            );
          },
          width: 150,
        },
      ]);
    }
  }, [props.setOpenEditFunc, dispatch]);
  function renderCellExpand(params) {
    return (
      <GridCellExpand
        value={params.formattedValue ? params.formattedValue.toString() : ""}
        width={params.colDef.computedWidth}
      />
    );
  }
  return (
    <div className="dashboard-product">
      {isShowMore && (
        <div className="db-content__overlay">
          <div className="db-content__overlay-title">
            <h2>Nội dung  :</h2>
            <img
              onClick={() => dispatch(CheckShowMore(""))}
              src={iconCancel}
              alt=""
            />
          </div>
          <label
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(isShowMore) }}
          />
        </div>
      )}
      <DashboardTable

        title="Tin Tuyển Dụng"
        color="darkpurple"
        table={table}
        setOpenCreateFunc={props.setOpenCreateFunc}
        setCloseCreateFunc={props.setCloseCreateFunc}
        setOpenEditFunc={props.setOpenEditFunc}
        setCloseEditFunc={props.setCloseEditFunc}
        isChange={props.isChange}
      />
    </div>
  );
}
