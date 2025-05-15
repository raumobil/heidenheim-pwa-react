import SmapIframe from "@/components/SmapIframe"

/**
 * this page renders a smap inside an iframe
 */
export default function Home() {
  return (
    <SmapIframe
      smapUrl={process.env.SMAP_URL}
      smapDepartureMonitorBasePath={process.env.SMAP_DEPARTURE_MONITOR_BASE_PATH}
    />
  )
}
