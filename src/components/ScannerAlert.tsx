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
          icon: <InfoIcon sx={{ color: "smap.primary.main" }} />,
          additionalTextStyle: {},
          additionalAlertStyle: { background: "#E7F6E6" },
        };
      case "error":
        return {
          icon: <ErrorIcon />,
          additionalTextStyle: {},
          additionalAlertStyle: { background: "#FEE9E6" },
        };
      case "warning":
        return {
          icon: <WarningIcon />,
          additionalTextStyle: {},
          additionalAlertStyle: { background: "#FDF1E6" },
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
      severity={severity}
      icon={styleInfo.icon}
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
