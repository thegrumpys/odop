import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from "./components/Spinner";
import Message from "./components/Message";
import App from "./components/App";
import store from "./store/store";
import { Provider } from "react-redux";
import './odop.css';
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(
  <Provider store={store}>
    <Spinner />
    <Message />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
