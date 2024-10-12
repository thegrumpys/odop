import 'bootstrap/dist/css/bootstrap.min.css';
import App2 from "./components/App2";
import { Provider } from "react-redux";
import './odop.css';
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { initialSystemControls } from './initialSystemControls';
import config from './config';

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App2 />
    </BrowserRouter>
  </Provider>
);
