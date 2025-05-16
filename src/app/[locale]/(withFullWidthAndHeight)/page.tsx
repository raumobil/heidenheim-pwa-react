import SmapNextWrapper from "@/components/SmapNextWrapper";

/**
 * this page renders a smap inside an iframe
 */
export default function Home() {
  // having no SMAP_URL means missing Configuration. There is nothing we can do about it except maybe logging an error
  // @ts-expect-error look above :p
  return <SmapNextWrapper baseURL={process.env.SMAP_URL} />;
}
