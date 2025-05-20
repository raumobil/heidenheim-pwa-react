import { Alert, Typography } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import { useMemo } from "react";

type messagesType = {
  message: string;
  // and from Mui
  severity: "error" | "info" | "success" | "warning";
};
const ScannerAlert = ({ message: message, severity }: messagesType) => {
  const styleInfo = useMemo(() => {
    switch (severity) {
      case "info":
        return {
          additionalTextStyle: {},
        };
      case "error":
        return {
          additionalTextStyle: {},
        };
      case "warning":
        return {
          additionalTextStyle: {},
        };
      default:
        return {
          icon: false,
          additionalTextStyle: {},
          additionalAlertStyle: {},
        };
    }
  }, [severity]);

  return (
    <Alert
      iconMapping={{
        info: <InfoIcon />,
        warning: <WarningIcon />,
        error: <ErrorIcon />,
      }}
      severity={severity}
      sx={styleInfo.additionalAlertStyle}
    >
      <Typography
        variant="textLargeColored"
        sx={{ color: "text.dark", ...styleInfo.additionalTextStyle }}
      >
        {message}
      </Typography>
    </Alert>
  );
};

export default ScannerAlert;
