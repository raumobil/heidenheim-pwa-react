import SmapNextWrapper from "@/components/SmapNextWrapper";

/**
 * this page renders a smap inside an iframe
 */
export default function Home() {
  return (
    <SmapNextWrapper
      // @ts-expect-error there is no reasonable fallback url
      baseURL={process.env.SMAP_URL}
      // @ts-expect-error there is no reasonable fallback path
      departureMonitorBasePath={process.env.SMAP_DEPARTURE_MONITOR_BASE_PATH}
    />
  );
}
