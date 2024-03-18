import bootstrap from 'bootstrap';
import Spinner from "./components/Spinner";
import Message from "./components/Message";
import App from "./components/App";
import store from "./store/store";
import { Provider } from "react-redux";
import './odop.css';
import * as ReactDOMClient from "react-dom/client";

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(
  <div id="root2">
    <Provider store={store}>
      <Spinner />
      <Message />
      <App />
    </Provider>
  </div>
);
