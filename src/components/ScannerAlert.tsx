import { Alert, Typography } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
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
          icon: false,
          additionalTextStyle: { textAlign: "center" },
        };
      case "error":
        return {
          icon: <ErrorIcon />,
          additionalTextStyle: {},
        };
      case "info":
        return {
          icon: <WarningIcon />,
          additionalTextStyle: {},
        };
      default:
        return {
          icon: false,
          additionalTextStyle: {},
        };
    }
  }, [severity]);

  return (
    <Alert
      severity={severity}
      icon={styleInfo.icon}
      sx={{
        background: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <Typography
        variant="textLargeColored"
        sx={{ color: "text.light", ...styleInfo.additionalTextStyle }}
      >
        {message}
      </Typography>
    </Alert>
  );
};

export default ScannerAlert;
