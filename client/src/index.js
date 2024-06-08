import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from "./components/Spinner";
import Message from "./components/Message";
import App from "./components/App";
import store from "./store/store";
import { Provider } from "react-redux";
import './odop.css';
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";

const DebugRouter = ({ children }) => {
  const location = useLocation();
  if (process.env.NODE_ENV === 'development') {
    console.log(`Route: ${location.pathname}${location.search}, State: ${JSON.stringify(location.state)}`);
  }

  return children
}

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
