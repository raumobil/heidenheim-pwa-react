import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import { useTranslations } from "next-intl";
import ScannerAlert from "./ScannerAlert";

type messagesType = {
  // maybe find a way to get Types from directly i18n
  i18nKey:
    | "message"
    | "error.wrongQRCode"
    | "error.noPermission"
    | "error.generic";
  // and from Mui
  severity: "error" | "info" | "success" | "warning";
};

const ScannerDialog = ({
  isOpen,
  onClose,
  onScan,
}: {
  isOpen: boolean;
  onClose: () => void;
  onScan: (stationId: string) => void;
}) => {
  const t = useTranslations("QrCodeScanner");
  const [message, setMessage] = useState<messagesType>({
    i18nKey: "message",
    severity: "info",
  });
  return (
    <Dialog open={isOpen} fullScreen={true}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Scanner
        onScan={(detectedCodes) => {
          const rawCode = detectedCodes[0].rawValue;
          // setStaionId("de:08135:124");

          // this a poc to show that we can decide if a QRCode is one of ours.
          // todo: replace with a correct condition, once we know what our QRCodes actually contain
          if (rawCode.startsWith("raumo")) {
            onScan(rawCode.replace("raumo:", ""));
            onClose();
          } else {
            setMessage({
              i18nKey: "error.wrongQRCode",
              severity: "warning",
            });
          }
        }}
        onError={() => {
          navigator.permissions.query({ name: "camera" }).then((result) => {
            // some Browsers, notably Firefox, don't do a great job implementing permission state and resulting errors
            // therefor missing camera permissions can still cause a generic error, instead of a camera permission error
            const isPermissionDenied = result.state === "denied" || result.state === "prompt";
            if (isPermissionDenied) {
              setMessage({
                i18nKey: "error.noPermission",
                severity: "warning",
              });
            } else {
              // todo once we have Tracking:
              // track what caused the generic error, so know if we can and want to add more Error messages
              setMessage({
                i18nKey: "error.generic",
                severity: "error",
              });
            }
          });
        }}
        sound={false}
      >
      </Scanner>
      <Box
        sx={{
          position: "absolute",
          top: "80%",
          left: "50%",
          transform: "translate(-50%, 0)",
        }}
      >
        <ScannerAlert
          message={t(message.i18nKey)}
          severity={message.severity}
        ></ScannerAlert>
      </Box>
    </Dialog>
  );
};

export default ScannerDialog;
