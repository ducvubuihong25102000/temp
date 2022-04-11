import React, { useEffect, useState } from "react";
import { fadoctorspaper } from "@fortawesome/free-solid-svg-icons";
import { EditToolbar } from "../Utils/DashboardEditToolBar";
import GridCellExpand from "../Utils/GridCellExpand";
import iconCancel from "../../../../Assets/cancel.png";
import DOMPurify from "dompurify";
import {
  CheckShowMore,
  getDoctorsUpdate,
} from "../../../../data/dashboard/doctors/doctorSlice";
import DashboardTable from "./DashboardDoctorsTable";
import { useDispatch, useSelector } from "react-redux";
import { formatMoney, formatMoneyK } from "../../../../helpers/money";
import { datetimeVN } from '../../../../helpers/time';

export default function DashboardDoctors(props) {
  const [table, setTable] = useState([]);
  const isShowMore = useSelector((state) => state.doctors.showMore);
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
          headerName: "Tên bài viết",
          field: "name_vi",
          renderCell: renderCellExpand,
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
          headerName: "Lương",
          field: "Lương",
          renderCell: (params) =>
            formatMoneyK(params.row?.minSalary_vi) +
            " - " +
            formatMoneyK(params.row?.maxSalary_vi),
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
          headerName: "Content",
          field: "job_content_en",
          renderCell: (params) => (
            <h2
              className="db-form__title"
              onClick={() => dispatch(CheckShowMore(params.row.job_content_en))}
            >
              Xem thêm
            </h2>
          ),
          hide: true,
          width: 150,
        },
        {
          headerName: "Kỹ năng",
          field: "skill_vi",
          renderCell: renderCellExpand,
          width: 150,
        },
        {
          headerName: "Skill",
          field: "skill_en",
          renderCell: renderCellExpand,
          hide: true,
          width: 150,
        },
        {
          headerName: "Language",
          field: "language",
          renderCell: renderCellExpand,
          width: 150,
        },
        {
          headerName: "Company",
          field: "company",
          renderCell: (params) => params.row.company?.name,
          width: 150,
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
          headerName: "Career",
          field: "categories_en",
          renderCell: (params) => {
            return params.row.job_category.map((item) => (
              <React.Fragment key={item.id}>
                {item.category?.name_en + ", "}
              </React.Fragment>
            ));
          },
          hide: true,
          width: 150,
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
                  getItem={getDoctorsUpdate}
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
          headerName: "Tên ",
          field: "name",
          renderCell: renderCellExpand,
          width: 175,
        },
        {
          headerName: "Post title",
          field: "name_en",
          renderCell: renderCellExpand,
          hide: true,
          width: 150,
        },
        // {
        //   headerName: "",
        //   field: "level_vi",
        //   renderCell: renderCellExpand,
        //   width: 150,
        // },
        // {
        //   headerName: "Level",
        //   field: "level_en",
        //   renderCell: renderCellExpand,
        //   hide: true,
        //   width: 150,
        // },
        // {
        //   headerName: "Lương",
        //   field: "Lương",
        //   renderCell: (params) =>
        //     formatMoneyK(params.row?.minSalary_vi) +
        //     " - " +
        //     formatMoneyK(params.row?.maxSalary_vi),
        //   width: 150,
        // },
        // {
        //   headerName: "Hoa hồng",
        //   field: "commission",
        //   renderCell: (params) => formatMoneyK(params.row?.commission),
        //   width: 150,
        // },
        // {
        //   headerName: "Salary",
        //   field: "salary",
        //   renderCell: (params) =>
        //     params.row?.minSalary_en + " - " + params.row?.maxSalary_en,
        //   width: 150,
        //   hide: true,
        // },
        // {
        //   headerName: "Nội dung bài viết",
        //   field: "job_content_vi",
        //   renderCell: (params) => (
        //     <h2
        //       className="db-form__title"
        //       onClick={() => dispatch(CheckShowMore(params.row.job_content_vi))}
        //     >
        //       Xem thêm
        //     </h2>
        //   ),
        //   width: 200,
        // },
        // {
        //   headerName: "Content",
        //   field: "job_content_en",
        //   renderCell: (params) => (
        //     <h2
        //       className="db-form__title"
        //       onClick={() => dispatch(CheckShowMore(params.row.job_content_en))}
        //     >
        //       Xem thêm
        //     </h2>
        //   ),
        //   hide: true,
        //   width: 150,
        // },
        // {
        //   headerName: "Kỹ năng",
        //   field: "skill_vi",
        //   renderCell: renderCellExpand,
        //   width: 150,
        // },
        // {
        //   headerName: "Skill",
        //   field: "skill_en",
        //   renderCell: renderCellExpand,
        //   hide: true,
        //   width: 150,
        // },
        // {
        //   headerName: "Language",
        //   field: "language",
        //   renderCell: renderCellExpand,
        //   width: 150,
        // },
        // {
        //   headerName: "Company",
        //   field: "company",
        //   renderCell: (params) => params.row.company?.name,
        //   width: 150,
        // },
        {
          headerName: "Số điện thoại",
          field: "phone",
          width: 175,
        },
        {
          headerName: "Căn cước công dân",
          field: "cccd",
          width: 175,
        },
        {
          headerName: "Career",
          field: "categories_en",

          hide: true,
          width: 150,
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
                  getItem={getDoctorsUpdate}
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
            <h2>Nội dung bài viết :</h2>
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
