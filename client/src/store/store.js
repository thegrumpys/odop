import { configureStore } from "@reduxjs/toolkit";
import spinnerReducer from "./spinnerSlice";
import messageModalReducer from "./messageModalSlice";
import modelReducer from "./modelSlice";
import alertsReducer from "./alertsSlice";
import dispatcher from './middleware/logger';

export default configureStore({
  reducer: {
    spinner: spinnerReducer,
    messageModal: messageModalReducer,
    model: modelReducer,
    alertsSlice: alertsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dispatcher)
});
