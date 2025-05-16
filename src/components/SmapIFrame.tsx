"use client";

const SmapIFrame = ({
  title,
  baseURL,
  stationId,
}: {
  title: string;
  baseURL: string;
  stationId?: string;
}) => {
  const src =
    baseURL +
    (stationId ? "/en/poi/api/dataSource_raumo_trias_grid/" + stationId : "");
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
