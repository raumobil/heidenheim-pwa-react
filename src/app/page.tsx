export default function Home() {
  return (
    <iframe
      src={process.env.SMAP_URL}
      style={{ width: "100%", height: "100%" }}
      allow="geolocation"
    ></iframe>
  );
}
