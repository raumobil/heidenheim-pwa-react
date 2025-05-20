import { Alert, Typography } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";

type messagesType = {
  message: string;
  // and from Mui
  severity: "error" | "info" | "success" | "warning";
};
const ScannerAlert = ({ message: message, severity }: messagesType) => {
  return (
    <Alert
      iconMapping={{
        info: <InfoIcon />,
        warning: <WarningIcon />,
        error: <ErrorIcon />,
      }}
      severity={severity}
    >
      <Typography
        variant="textLargeColored"
        sx={{ color: "text.dark" }}
      >
        {message}
      </Typography>
    </Alert>
  );
};

export default ScannerAlert;
