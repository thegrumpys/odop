import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./components/App";
import store from "./store/store";
import { Provider } from "react-redux";
import './odop.css';
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
