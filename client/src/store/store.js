import { configureStore } from "@reduxjs/toolkit";
import spinnerReducer from "./spinnerSlice";
import messageReducer from "./messageSlice";
import modelReducer from "./modelSlice";
import alertsReducer from "./alertsSlice";
import executePanelReducer from "./executePanelSlice";
import dispatcher from './middleware/dispatcher';

export default configureStore({
  reducer: {
    spinnerSlice: spinnerReducer,
    messageSlice: messageReducer,
    modelSlice: modelReducer,
    alertsSlice: alertsReducer,
    executePanelSlice: executePanelReducer,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.merit'],
      },
  }).concat(dispatcher)
});
