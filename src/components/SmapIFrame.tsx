"use client";

import { parseDepartureMonitorId } from "@/util/smap"
import { useLocale, useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

const SmapIFrame = ({
  smapUrl,
  smapDepartureMonitorBasePath,
}: {
  smapUrl?: string;
  smapDepartureMonitorBasePath?: string;
}) => {
  const t = useTranslations("Home");

  const searchParams = useSearchParams();
  const locale = useLocale();

  // modify iframe url dynamically
  // TODO this should be replaced with `postMessage` to the iframe window
  // and a corresponding event listener in smap-next
  // so that nextjs router in smap-next can handle the transition
  const dynamicSmapUrl = useMemo(() => {
    if (smapUrl) {
      const url = new URL(smapUrl)
      const departureMonitorId = parseDepartureMonitorId(searchParams.get('departureMonitorId'))
      if (departureMonitorId) {
        url.pathname = `${locale}${smapDepartureMonitorBasePath}/${departureMonitorId}`
      }
      return url;
    }
  }, [locale, searchParams, smapDepartureMonitorBasePath, smapUrl]);

  return (
    <iframe
      title={t("iframe.title")}
      // @ts-expect-error there is no reasonable fallback url
      src={dynamicSmapUrl}
      style={{ width: "100%", height: "100%", border: 0 }}
      allow="geolocation"
    ></iframe>
  );
};

export default SmapIFrame;
