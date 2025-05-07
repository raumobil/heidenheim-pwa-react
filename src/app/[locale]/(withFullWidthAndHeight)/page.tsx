/**
 * this page renders a smap inside an iframe
 */
export default function Home() {
  return (
    <iframe
      src={process.env.SMAP_URL}
      style={{ width: "100%", height: "100%", border: 0 }}
      allow="geolocation"
    ></iframe>
  );
}
