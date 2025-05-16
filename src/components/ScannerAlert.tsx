import { Alert, Typography } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";

type messagesType = {
  // maybe find a way to get Types from directly i18n
  message: string;
  // and from Mui
  severity: "error" | "info" | "success" | "warning";
};
const ScannerAlert = ({ message: message, severity }: messagesType) => {
  let icon;
  let additionalTextStyle;

  switch (severity) {
    case "info":
      icon = false;
      additionalTextStyle = { textAlign: "center" };
      break;
    case "error":
      icon = <ErrorIcon />;
      break;
    case "warning":
      icon = <WarningIcon />;
      break;
  }

  return (
    <Alert
      severity={severity}
      icon={icon}
      sx={{
        background: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <Typography
        variant="textLargeColored"
        sx={{ color: "text.light", ...(additionalTextStyle || {}) }}
      >
        {message}
      </Typography>
    </Alert>
  );
};

export default ScannerAlert;
