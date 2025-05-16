"use client";

import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslations } from "next-intl";
import SmapIFrame from "./SmapIFrame";
import ScannerDialog from "./ScannerDialog";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import QrCodeIcon from "@mui/icons-material/QrCode";

const SmapNextWrapper = ({ baseURL }: { baseURL: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("Home");
  const isScannerOpen = searchParams.get("isScannerOpen") === "true";
  const [stationId, setStaionId] = useState<string | undefined>();

  return (
    <>
      <ScannerDialog
        isOpen={isScannerOpen}
        onScan={(stationId: string) => {
          setStaionId(stationId);
        }}
        onClose={() => {
          router.replace(`${pathname}`);
        }}
      />
      <>
        <Button
          size="large"
          sx={{
            position: "absolute",
            // 72px to align with the Routen-Button in our Smap
            bottom: "72px",
            left: "50%",
            boxShadow: "0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026",
            transform: "translate(-50%, 0)",
            backgroundColor: "background.light",
            color: "smap.primary.main",
          }}
          onClick={() => {
            router.replace(`${pathname}?isScannerOpen=true`);
          }}
          startIcon={<QrCodeIcon />}
        >
          <Typography variant="labelMedium">{t("qrCodeScanner")}</Typography>
        </Button>
        <SmapIFrame
          title={t("iframe.title")}
          stationId={stationId}
          baseURL={baseURL}
        />
      </>
    </>
  );
};

export default SmapNextWrapper;
