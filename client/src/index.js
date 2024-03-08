import bootstrap from 'bootstrap';
import Spinner from "./components/Spinner";
import MessageModal from "./components/MessageModal";
import App from "./components/App";
import store from "./store/store";
import { Provider } from "react-redux";
import * as ReactDOMClient from "react-dom/client";

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(
  <div id="root2">
    <Provider store={store}>
      <Spinner />
      <MessageModal />
      <App />
    </Provider>
  </div>
);
