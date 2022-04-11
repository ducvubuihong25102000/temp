import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import DashboardTextInput2 from "./../Utils/DashboardTextInput2";
import { CheckUpdate } from "../../../../data/dashboard/doctors/doctorSlice";
import DashboardSelectInput2 from "../Utils/DashboardSelectInput2";
import DashboardSelectInputOne from "../Utils/DashboardSelectInputOne";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import requestAPI from "../../../../apis";
import DashboardCheckboxList from "../Utils/DashboardCheckboxList";
import DashboardDateInput from "../Utils/DashboardDateInput";

export default function DashboardDoctorsEdit(props) {
  const { enqueueSnackbar } = useSnackbar();
  const createForm = useRef();
  const dispatch = useDispatch();
  const update = useSelector((state) => state.doctors.updateDoctors);
  const job_content_vi = useSelector(
    (state) => state.doctors.updateDoctors.job_content_vi
  );
  const job_content_en = useSelector(
    (state) => state.doctors.updateDoctors.job_content_en
  );
  const [jobList, setJobList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [listCategories, setListCategories] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [levelList, setLevelList] = useState([]);
  const [isRequire, setIsRequire] = useState(false);
  const typeJob = [
    {
      id: "is_best_job",
      name: "Việc làm tốt nhất",
    },
    {
      id: "is_manage_job",
      name: "Việc làm quản lý",
    },
    {
      id: "is_category_job",
      name: "Việc làm theo ngành nghề",
    },
  ];
  const [data, setData] = useState({
    name_vi: "",
    name_en: "",
    company_id: 0,
    level: 0,
    job_content_vi: "",
    job_content_en: "",
    skill_vi: "",
    skill_en: "",
    language: "",
    categories: [],
    minSalary_vi: 0,
    maxSalary_vi: 0,
    minSalary_en: 0,
    maxSalary_en: 0,
    idDelete: [],
    commission: 0,
    is_best_job: false,
    is_manage_job: false,
    is_category_job: false,
    city_id: 0,
    expiration_date: "",
  });
  const generateEditorStateFromValue = (value) => {
    const contentBlock = htmlToDraft(value || "");
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    return EditorState.createWithContent(contentState);
  };

  const [editorState_vi, setEditorState_vi] = useState(
    generateEditorStateFromValue(job_content_vi)
  );
  const [editorState_en, setEditorState_en] = useState(
    generateEditorStateFromValue(job_content_en)
  );
  useEffect(() => {
    if (update) {
      let category = [];
      for (let i = 0; i < update.job_category.length; i++) {
        category.push(update.job_category[i].category_id);
      }
      setData({
        id: update.id,
        name_vi: update.name_vi,
        name_en: update.name_en,
        company_id: update.company?.id,
        level: update.configuration_id,
        job_content_vi: update.job_content_vi,
        job_content_en: update.job_content_en,
        skill_vi: update.skill_vi,
        skill_en: update.skill_en,
        language: update.language,
        salary: update.salary,
        minSalary_vi: update.minSalary_vi,
        maxSalary_vi: update.maxSalary_vi,
        minSalary_en: update.minSalary_en,
        maxSalary_en: update.maxSalary_en,
        categories: [],
        idDelete: [0],
        commission: update.commission,
        is_best_job: update.is_best_job,
        is_manage_job: update.is_manage_job,
        is_category_job: update.is_category_job,
        city_id: update.city_id,
        expiration_date: update.expiration_date,
      });
      setCategories(category);
      setListCategories(category);
    }
  }, [update]);
  // useEffect(() => {
  //   requestAPI("/categories", "GET")
  //     .then((res) => setJobList(res.data.data))
  //     .catch((err) => console.log(err));

  //   requestAPI("/companies", "GET")
  //     .then((res) => setCompanyList(res.data.data))
  //     .catch((err) => console.log(err));

  //   requestAPI("/country/509/city", "GET")
  //     .then((res) => setCityList(res.data.data))
  //     .catch((err) => console.log(err));

  //   requestAPI("/config/type/joblevel", "GET")
  //     .then((res) => setLevelList(res.data.data))
  //     .catch((err) => console.log(err));
  // }, []);
  // const updateOrder = async (dataFormat) => {
  //   const data = await requestAPI(
  //     `/job/update?id=${dataFormat.id}`,
  //     "PUT",
  //     dataFormat
  //   );
  //   return data;
  // };
  const onSubmit = (event) => {
    event.preventDefault();
    setIsRequire(true);
    const body = {
      id: data.id,
      name_vi: data.name_vi.trim(),
      name_en: data.name_en.trim(),
      company: data.company_id,
      level: data.level,
      job_content_vi: data.job_content_vi,
      job_content_en: data.job_content_en,
      skill_vi: data.skill_vi.trim(),
      language: data.language.trim(),
      skill_en: data.skill_en.trim(),
      categories: data.categories,
      minSalary_vi: data.minSalary_vi,
      maxSalary_vi: data.maxSalary_vi,
      minSalary_en: data.minSalary_en,
      maxSalary_en: data.maxSalary_en,
      idDelete: data.idDelete,
      commission: data.commission,
      is_best_job: data.is_best_job,
      is_manage_job: data.is_manage_job,
      is_category_job: data.is_category_job,
      city_id: data.city_id,
      expiration_date: data.expiration_date,
    };
    let isCheck = true;
    const dateNow = new Date();
    const _dateNow = dateNow.getDate();
    const _monthNow = dateNow.getMonth() + 1;
    const _yearNow = dateNow.getFullYear();
    const dateEx = new Date(body.expiration_date);
    const _dateEx = dateEx.getDate();
    const _monthEx = dateEx.getMonth() + 1;
    const _yearEx = dateEx.getFullYear();
    if (_yearNow > _yearEx) {
      enqueueSnackbar("Năm hết hạn phải lớn hơn hoặc bằng năm hiện tại", {
        persist: false,
        variant: "error",
        preventDuplicate: true,
        autoHideDuration: 3000,
      });
      isCheck = false;
    } else {
      if (_monthNow > _monthEx) {
        enqueueSnackbar("Tháng hết hạn phải lớn hơn hoặc bằng tháng hiện tại", {
          persist: false,
          variant: "error",
          preventDuplicate: true,
          autoHideDuration: 3000,
        });
        isCheck = false;
      } else if (_monthNow === _monthEx) {
        if (_dateNow > _dateEx || _dateNow === _dateEx) {
          enqueueSnackbar("Ngày hết hạn phải lớn hơn ngày hiện tại", {
            persist: false,
            variant: "error",
            preventDuplicate: true,
            autoHideDuration: 3000,
          });
          isCheck = false;
        }
      }
    }
    if (
      !body.level ||
      !body.company ||
      !body.city_id ||
      !body.name_vi ||
      !body.name_en ||
      !body.skill_vi ||
      !body.skill_en ||
      !body.language
    ) {
      enqueueSnackbar("Vui lòng nhập đầy đủ các trường", {
        persist: false,
        variant: "error",
        preventDuplicate: true,
        autoHideDuration: 3000,
      });
      isCheck = false;
    }
    if (!body.job_content_vi || !body.job_content_en) {
      enqueueSnackbar("Vui lòng nhập nội dung bài viết", {
        persist: false,
        variant: "error",
        preventDuplicate: true,
        autoHideDuration: 3000,
      });
      isCheck = false;
    }
    if (
      body.maxSalary_vi < 0 ||
      body.commission < 0 ||
      body.minSalary_vi < 0 ||
      body.minSalary_en < 0 ||
      body.maxSalary_en < 0
    ) {
      enqueueSnackbar("Lương và hoa hồng không phải giá trị âm", {
        persist: false,
        variant: "error",
        preventDuplicate: true,
        autoHideDuration: 3000,
      });
      isCheck = false;
    }
    if (
      body.minSalary_vi > body.maxSalary_vi ||
      body.minSalary_en > body.maxSalary_en
    ) {
      enqueueSnackbar("Lương min không được lớn hơn Lương max", {
        persist: false,
        variant: "error",
        preventDuplicate: true,
        autoHideDuration: 3000,
      });
      isCheck = false;
    }
    if (!body.is_best_job && !body.is_category_job && !body.is_manage_job) {
      enqueueSnackbar("Loại việc làm bắt buộc phải check 1 loại", {
        persist: false,
        variant: "error",
        preventDuplicate: true,
        autoHideDuration: 3000,
      });
      isCheck = false;
    }
    if (!isCheck) {
      return;
    }
    // 
  };

  const onEditorStateChange_vi = (editorState_vi) => {
    setEditorState_vi(editorState_vi);
    setData({
      ...data,
      job_content_vi: draftToHtml(
        convertToRaw(editorState_vi.getCurrentContent())
      ),
    });
  };

  const onEditorStateChange_en = (editorState_en) => {
    setEditorState_en(editorState_en);
    setData({
      ...data,
      job_content_en: draftToHtml(
        convertToRaw(editorState_en.getCurrentContent())
      ),
    });
  };
  return (
    <div className="DashboardProductInfo">
      <div className="create-box2">
        <div className="create-box-title flex">
          <h2 className="create-box-title-text ">Thông tin đơn hàng</h2>
          <div
            className="btn btn-outline-danger"
            onClick={() => {
              props.setCloseEditFunc(false);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
        <form
          onSubmit={onSubmit}
          encType="multipart/form-data"
          ref={createForm}
          className="db-form-input"
        >
          {/* Sender Infomation */}
          <div className="db-form-input2">
            <div className="db-form-input2__form">
              <h2 className="db-form-input2__title">Tiếng Việt</h2>
              <DashboardTextInput2
                textType={"text"}
                title={"Tên bài tuyển dụng"}
                placeholder={"Tiêu đề bài tuyển dụng"}
                isRequire={isRequire}
                data={data}
                setData={setData}
                objectKey={"name_vi"}
              />
              <DashboardTextInput2
                textType={"text"}
                title={"Kỹ năng"}
                placeholder={"Kỹ năng"}
                isRequire={isRequire}
                data={data}
                setData={setData}
                objectKey={"skill_vi"}
              />
              <div className="db_salary_div">
                <h2>Lương</h2>
                <div className="db_salary">
                  <DashboardTextInput2
                    none
                    textType={"text"}
                    number
                    placeholder={"Từ"}
                    isRequire={isRequire}
                    data={data}
                    setData={setData}
                    objectKey={"minSalary_vi"}
                  />
                  <DashboardTextInput2
                    none
                    textType={"text"}
                    number
                    placeholder={"Đến"}
                    isRequire={isRequire}
                    data={data}
                    setData={setData}
                    objectKey={"maxSalary_vi"}
                  />
                </div>
              </div>
              <div className="db-form-editor_div">
                <h2>Nội dung bài viết</h2>
                <div className="db-form__editor">
                  <Editor
                    editorState={editorState_vi}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="borderNone wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange_vi}
                  />
                </div>
              </div>
            </div>
            <div className="db-form-input2__form">
              <h2 className="db-form-input2__title">English</h2>
              <DashboardTextInput2
                textType={"text"}
                title={"Job title"}
                placeholder={"Job title"}
                isRequire={isRequire}
                data={data}
                setData={setData}
                objectKey={"name_en"}
              />
              <DashboardTextInput2
                textType={"text"}
                title={"Skill"}
                placeholder={"Skill"}
                isRequire={isRequire}
                data={data}
                setData={setData}
                objectKey={"skill_en"}
              />
              <div className="db_salary_div">
                <h2>Salary</h2>
                <div className="db_salary">
                  <DashboardTextInput2
                    none
                    textType={"text"}
                    number
                    placeholder={"From"}
                    isRequire={isRequire}
                    data={data}
                    setData={setData}
                    objectKey={"minSalary_en"}
                  />
                  <DashboardTextInput2
                    none
                    textType={"text"}
                    number
                    placeholder={"To"}
                    isRequire={isRequire}
                    data={data}
                    setData={setData}
                    objectKey={"maxSalary_en"}
                  />
                </div>
              </div>
              <div className="db-form-editor_div">
                <h2>Nội dung bài viết</h2>
                <div className="db-form__editor">
                  <Editor
                    editorState={editorState_en}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="borderNone wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange_en}
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: "95%" }}>
            <DashboardDateInput
              title={"Ngày hết hạn"}
              placeholder={"Ngày hết hạn"}
              isRequire={isRequire}
              data={data}
              setData={setData}
              objectKey={"expiration_date"}
            />
          </div>
          <DashboardSelectInput2
            isRequire={isRequire}
            title="Ngành nghề"
            data={data}
            setData={setData}
            setData1={setCategories}
            list={jobList}
            objectKey={"categories"}
            objectKey1={categories}
            category={listCategories}
            objectKey2={"idDelete"}
          />
          <DashboardSelectInputOne
            isRequire={isRequire}
            title={"Công ty"}
            data={data}
            setData={setData}
            list={companyList}
            company
            objectKey={"company_id"}
          />
          <DashboardSelectInputOne
            isRequire={isRequire}
            title={"Thành phố"}
            data={data}
            setData={setData}
            list={cityList}
            company
            objectKey={"city_id"}
          />
          <DashboardSelectInputOne
            isRequire={isRequire}
            title={"Cấp bậc"}
            data={data}
            setData={setData}
            list={levelList}
            level
            objectKey={"level"}
          />
          <DashboardTextInput2
            textType={"text"}
            number
            title={"Hoa hồng"}
            placeholder={"Hoa hồng"}
            isRequire={isRequire}
            data={data}
            setData={setData}
            objectKey={"commission"}
          />
          <DashboardTextInput2
            textType={"text"}
            title={"Ngôn ngữ"}
            placeholder={"Ngôn ngữ"}
            isRequire={isRequire}
            data={data}
            setData={setData}
            objectKey={"language"}
          />
          <DashboardCheckboxList
            title={"Loại việc làm"}
            setData={setData}
            isRequire={isRequire}
            data={data}
            list={typeJob}
          />
          <div className="flex-center" style={{ marginTop: "40px" }}>
            <button className="btn btn-outline-success" onFocusin>
              Cập nhật bài tuyển dụng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
