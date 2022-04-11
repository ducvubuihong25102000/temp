import { configureStore } from "@reduxjs/toolkit";
import doctorsReducer from "./dashboard/doctors/doctorSlice";
// import newSlice from "./dashboard/news/newSlice";
import patientsReducer from "./dashboard/patients/patientSlice";
import userReducer from "./dashboard/user/userSlice";

const Store = configureStore({
    reducer: {
        patients: patientsReducer,
        doctors: doctorsReducer,
        user: userReducer,
    },
    devTools: process.env.NODE_ENV === "development",
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({ serializableCheck: false }),
    ],
});

export default Store;
