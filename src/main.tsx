import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";

import dayjs from "dayjs";
import "dayjs/locale/es";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { AntdProvider } from "./providers/antd.provider";
import { routes } from "./Routes";

dayjs.locale("es");
dayjs.extend(utc);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <AntdProvider>
    <RouterProvider router={routes} />
    <ToastContainer />
  </AntdProvider>
);
