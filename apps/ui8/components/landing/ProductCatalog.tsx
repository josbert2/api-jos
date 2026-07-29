export function ProductCatalog() {
  return (
    <section style={{ backgroundColor: "#0a0a0a", padding: "80px 20px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "30px", fontWeight: "500", color: "white", textAlign: "center", marginBottom: "20px" }}>
          Featured Assets
        </h2>
        <p style={{ fontSize: "18px", color: "#adb7be", textAlign: "center", marginBottom: "40px" }}>
          Handpicked selection of premium design assets
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} style={{ backgroundColor: "#202020", borderRadius: "12px", padding: "16px", border: "1px solid #2d2d2d" }}>
              <div style={{ width: "100%", height: "160px", backgroundColor: "#1c1c1c", borderRadius: "8px", marginBottom: "16px" }} />
              <h3 style={{ color: "white", fontWeight: "500", marginBottom: "8px" }}>
                Product {i}
              </h3>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ color: "#adb7be", fontSize: "14px" }}>${29 + i * 10}</p>
                <p style={{ color: "#5a6068", fontSize: "12px" }}>Author</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
