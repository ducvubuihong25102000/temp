const { createSlice } = require("@reduxjs/toolkit");

const news = createSlice({
  name: "news",
  initialState: {
    updateNews: {},
    isUpdate: false,
    showMore: "",
  },
  reducers: {
    CheckUpdate: (state, action) => {
      state.isUpdate = !state.isUpdate;
    },
    getNewsUpdate: (state, action) => {
      state.updateNews = action.payload;
    },
    CheckShowMore: (state, action) => {
      state.showMore = action.payload;
    },
  },
});

const newsReducer = news.reducer;

export const { getNewsUpdate, CheckUpdate, CheckShowMore } = news.actions;

export default newsReducer;
