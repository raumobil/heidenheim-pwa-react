import { useTranslations } from "next-intl";

/**
 * this page renders a smap inside an iframe
 */
export default function Home() {
  const t = useTranslations('Home')

  return (
    <iframe
      title={t('iframe.title')}
      src={process.env.SMAP_URL}
      style={{ width: "100%", height: "100%", border: 0 }}
      allow="geolocation"
    ></iframe>
  );
}
