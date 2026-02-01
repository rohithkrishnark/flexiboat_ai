import { toast } from "react-toastify";

const baseOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

/* INFO */
export const infoNotify = (message) => {
  toast.info(message, baseOptions);
};

/* SUCCESS */
export const successNotify = (message) => {
  toast.success(message, baseOptions);
};

/* WARNING */
export const warningNotify = (message) => {
  toast.warning(message, baseOptions);
};

/* ERROR */
export const errorNotify = (message) => {
  toast.error(message, baseOptions);
};
