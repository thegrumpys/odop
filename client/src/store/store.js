import { configureStore } from "@reduxjs/toolkit";
import spinnerReducer from "./spinnerSlice";
import messageModalReducer from "./messageModalSlice";
import modelReducer from "./modelSlice";
import dispatcher from './middleware/logger';

export default configureStore({
  reducer: {
    spinner: spinnerReducer,
    messageModal: messageModalReducer,
    model: modelReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dispatcher)
});
