const { createSlice } = require("@reduxjs/toolkit");

const patients = createSlice({
  name: "patients",
  initialState: {
    updatePatients: {},
    isUpdate: false,
    showMore: "",
  },
  reducers: {
    CheckUpdate: (state, action) => {
      state.isUpdate = !state.isUpdate;
    },
    getPatientsUpdate: (state, action) => {
      state.updatePatients = action.payload;
    },
    CheckShowMore: (state, action) => {
      state.showMore = action.payload;
    },
  },
});

const patientsReducer = patients.reducer;

export const { getPatientsUpdate, CheckUpdate, CheckShowMore } = patients.actions;

export default patientsReducer;
