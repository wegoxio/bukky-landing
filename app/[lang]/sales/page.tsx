export default function SalesPage() {
  return (
    <main className="sales-page" style={{ width: "100%", minHeight: "100vh" }}>
      <iframe
        title="Bukky para negocios"
        src="/sales/index.html"
        className="sales-frame"
        style={{ display: "block", width: "100%", height: "100vh", minHeight: "600px", border: 0 }}
      />
    </main>
  );
}
