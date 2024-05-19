import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export const ToasterContainer = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      limit={1}
    />
  );
};

export const SuccessToaster = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
};

export const ErrorToaster = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
};
