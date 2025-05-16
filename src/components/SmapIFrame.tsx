"use client";

import { useLocale } from "next-intl";

const SmapIFrame = ({
  title,
  baseURL,
  departureMonitorBasePath,
  stationId,
}: {
  title: string;
  baseURL: string;
  departureMonitorBasePath: string;
  stationId?: string;
}) => {
  const locale = useLocale();
  const src =
    baseURL +
    (stationId
      ? `/${locale}` + departureMonitorBasePath + `/${stationId}`
      : "");
  return (
    <iframe
      title={title}
      src={src}
      style={{ width: "100%", height: "100%", border: 0 }}
      allow="geolocation"
    />
  );
};

export default SmapIFrame;
