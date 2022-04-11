const { createSlice } = require("@reduxjs/toolkit");

const doctors = createSlice({
  name: "doctors",
  initialState: {
    updatePatients: {},
    isUpdate: false,
    showMore: "",
  },
  reducers: {
    CheckUpdate: (state, action) => {
      state.isUpdate = !state.isUpdate;
    },
    getDoctorsUpdate: (state, action) => {
      state.updatePatients = action.payload;
    },
    CheckShowMore: (state, action) => {
      state.showMore = action.payload;
    },
  },
});

const doctorsReducer = doctors.reducer;

export const { getDoctorsUpdate, CheckUpdate, CheckShowMore } = doctors.actions;

export default doctorsReducer;
