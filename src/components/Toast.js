import React, { useEffect, useState } from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const Toast = ({ params, resetStatuses }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    const { msg, isError, isSuccess, isInfo, isWarning } = params;
    setAlertMsg(msg ? msg : "");

    if ((isError || isSuccess || isInfo || isWarning) && !openAlert) {
      setOpenAlert(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const setSeverity = () => {
    const { isError, isSuccess, isInfo, isWarning } = params;
    let severity = "info";

    if (isError) {
      severity = "error";
    } else if (isSuccess) {
      severity = "success";
    } else if (isWarning) {
      severity = "warning";
    } else if (isInfo) {
      severity = "info";
    }

    return severity;
  };

  const closeAlert = () => {
    setOpenAlert(false);
    setAlertMsg("");
    resetStatuses();
  };

  return (
    <>
      <Snackbar
        open={openAlert}
        autoHideDuration={2000}
        onClose={closeAlert}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        style={{ zIndex: 2000 }}
      >
        <Alert onClose={closeAlert} severity={setSeverity()}>
          {alertMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Toast;
