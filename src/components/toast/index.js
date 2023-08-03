import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { hide } from "../../features/toast/toastSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Toast() {
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.toast);

  React.useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        dispatch(hide());
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [toast.visible, dispatch]);

  const handleClose = () => {
    dispatch(hide());
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={toast.visible}
        onClose={handleClose}
        key="top-right"
      >
        <Alert
          onClose={handleClose}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
