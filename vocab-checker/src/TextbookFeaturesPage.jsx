import { useState } from "react";
import TEXTBOOK_FEATURES from "./textbookFeatures";

const featureNames = Object.keys(TEXTBOOK_FEATURES);

export default function TextbookFeaturesPage({ onBack }) {
  const [selected, setSelected] = useState("");
  const info = selected ? TEXTBOOK_FEATURES[selected] : null;

  return (
    <div>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "#f97316", fontWeight: 700, fontSize: 15, cursor: "pointer", padding: "8px 0", marginBottom: 16 }}>
        ← トップに戻る
      </button>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: "#334155", margin: "0 0 8px" }}>教材の特徴</h2>
      <p style={{ color: "#64748b", fontSize: 14, fontWeight: 600, margin: "0 0 24px" }}>教材を選んで構成・レベル・特徴を確認</p>

      <div style={{ background: "#ffffff", padding: 16, borderRadius: 16, boxShadow: "0 4px 12px rgba(0,0,0,0.03)", marginBottom: 24 }}>
        <label style={{ fontSize: 13, fontWeight: 700, color: "#f97316", marginBottom: 8, display: "block" }}>教材を選択</label>
        <select value={selected} onChange={e => setSelected(e.target.value)} style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "2px solid #fdba74", fontSize: 15, background: "#fff7ed", color: "#c2410c", fontWeight: 600, outline: "none", cursor: "pointer" }}>
          <option value="">選択してください</option>
          {featureNames.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>

      {info && (
        <div style={{ background: "#ffffff", padding: "24px 16px", borderRadius: 20, boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
          <div style={{ background: "#fff7ed", borderRadius: 16, padding: "20px 16px", marginBottom: 20, border: "2px solid #fdba7440" }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: "#c2410c", margin: "0 0 8px" }}>{selected}</h3>
            <p style={{ color: "#64748b", fontSize: 14, fontWeight: 600, margin: "0 0 12px", lineHeight: 1.6 }}>{info.overview}</p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <div style={{ padding: "8px 16px", background: "#ffffff", borderRadius: 12, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>対象レベル</div>
                <div style={{ fontSize: 14, color: "#334155", fontWeight: 700 }}>{info.level}</div>
              </div>
              <div style={{ padding: "8px 16px", background: "#ffffff", borderRadius: 12, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>総単語数</div>
                <div style={{ fontSize: 14, color: "#f97316", fontWeight: 800 }}>{info.totalWords.toLocaleString()}語</div>
              </div>
            </div>
          </div>

          <h4 style={{ fontSize: 15, fontWeight: 800, color: "#334155", margin: "0 0 12px" }}>構成</h4>
          <div style={{ display: "grid", gap: 12 }}>
            {info.sections.map((s, i) => (
              <div key={i} style={{ background: "#f8fafc", borderRadius: 14, padding: "16px", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 800, fontSize: 15, color: "#334155" }}>{s.part}</span>
                  <span style={{ fontWeight: 700, fontSize: 14, color: "#64748b" }}>{s.name}</span>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                  <span style={{ padding: "3px 10px", background: "#f0f9ff", color: "#0369a1", borderRadius: 8, fontSize: 12, fontWeight: 700 }}>{s.level}</span>
                  {s.wordCount != null && <span style={{ padding: "3px 10px", background: "#fff7ed", color: "#c2410c", borderRadius: 8, fontSize: 12, fontWeight: 700 }}>{s.wordCount}語</span>}
                  {s.range !== "-" && <span style={{ padding: "3px 10px", background: "#ffffff", color: "#64748b", borderRadius: 8, fontSize: 12, fontWeight: 600, border: "1px solid #e2e8f0" }}>{s.range}</span>}
                  {s.sections !== "-" && <span style={{ padding: "3px 10px", background: "#ffffff", color: "#64748b", borderRadius: 8, fontSize: 12, fontWeight: 600, border: "1px solid #e2e8f0" }}>{s.sections}</span>}
                </div>
                <p style={{ margin: 0, fontSize: 13, color: "#64748b", fontWeight: 600, lineHeight: 1.6 }}>{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {!selected && (
        <div style={{ textAlign: "center", padding: "64px 20px", background: "#ffffff", borderRadius: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
          <p style={{ color: "#64748b", fontWeight: 700, fontSize: 15 }}>上のドロップダウンから教材を選んでください</p>
        </div>
      )}
    </div>
  );
}
