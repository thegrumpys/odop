import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from "./components/Spinner";
import Message from "./components/Message";
import App from "./components/App";
import store from "./store/store";
import { Provider } from "react-redux";
import './odop.css';
import * as ReactDOMClient from "react-dom/client";
import { Beforeunload } from 'react-beforeunload';
import { logUsage } from './logUsage';
import { AuthProvider } from './components/AuthProvider'

try {
  const container = document.getElementById('root');
  const root = ReactDOMClient.createRoot(container);
  root.render(
    <Provider store={store}>
      <Beforeunload onBeforeunload={(event) => {
        logUsage('event', 'BeforeUnload', { event_label: ''});
      }} />
      <Spinner />
      <Message />
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  );
} catch(error) {
  console.error(error);
}
