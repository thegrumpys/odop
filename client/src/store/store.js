import { configureStore } from "@reduxjs/toolkit";
import spinnerReducer from "./spinnerSlice";
import messageReducer from "./messageSlice";
import modelReducer from "./modelSlice";
import alertsReducer from "./alertsSlice";
import dispatcher from './middleware/dispatcher';

export default configureStore({
  reducer: {
    spinnerSlice: spinnerReducer,
    messageSlice: messageReducer,
    modelSlice: modelReducer,
    alertsSlice: alertsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dispatcher)
});
