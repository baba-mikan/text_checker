import { useState, useMemo } from "react";
import TEXTBOOK_FEATURES from "./textbookFeatures";

const featureNames = Object.keys(TEXTBOOK_FEATURES);
const FREQ_OPTIONS = [
  { label: "週1回", value: "weekly1" },
  { label: "週2回", value: "weekly2" },
  { label: "週3回", value: "weekly3" },
  { label: "隔週", value: "biweekly" },
  { label: "月1回", value: "monthly" },
];
const DAY_NAMES = ["日", "月", "火", "水", "木", "金", "土"];

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function formatDate(d) {
  return `${d.getMonth() + 1}/${d.getDate()}(${DAY_NAMES[d.getDay()]})`;
}

function formatDateISO(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

function generateTestDays(startDate, frequency, excludedDays, excludedDates, count) {
  const results = [];
  const excludedDateSet = new Set(excludedDates);

  // Determine candidate weekdays based on frequency
  let intervalDays;
  let candidateWeekdays = null;

  if (frequency === "weekly1") {
    intervalDays = 1;
    candidateWeekdays = [startDate.getDay()]; // same weekday as start
  } else if (frequency === "weekly2") {
    intervalDays = 1;
    const d1 = startDate.getDay();
    const d2 = (d1 + 3) % 7; // 3 days apart (e.g., Mon+Thu)
    candidateWeekdays = [d1, d2];
  } else if (frequency === "weekly3") {
    intervalDays = 1;
    const d1 = startDate.getDay();
    const d2 = (d1 + 2) % 7;
    const d3 = (d1 + 4) % 7;
    candidateWeekdays = [d1, d2, d3];
  } else if (frequency === "biweekly") {
    intervalDays = 14;
  } else if (frequency === "monthly") {
    intervalDays = 1; // handled specially
  }

  let current = new Date(startDate);
  let monthlyDay = startDate.getDate();

  if (frequency === "monthly") {
    while (results.length < count) {
      if (results.length > 1000) break; // safety
      const dow = current.getDay();
      const iso = formatDateISO(current);
      if (!excludedDays.includes(dow) && !excludedDateSet.has(iso)) {
        results.push(new Date(current));
        // Move to next month same day
        let nextMonth = new Date(current);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        nextMonth.setDate(monthlyDay);
        current = nextMonth;
      } else {
        current = addDays(current, 1);
      }
    }
  } else if (frequency === "biweekly") {
    while (results.length < count) {
      if (results.length > 1000) break;
      const dow = current.getDay();
      const iso = formatDateISO(current);
      if (!excludedDays.includes(dow) && !excludedDateSet.has(iso)) {
        results.push(new Date(current));
        current = addDays(current, 14);
      } else {
        current = addDays(current, 1);
      }
    }
  } else {
    // weekly1/2/3: iterate day by day and pick candidate weekdays
    while (results.length < count) {
      if (current - startDate > 365 * 5 * 86400000) break; // safety: 5 years max
      const dow = current.getDay();
      const iso = formatDateISO(current);
      if (candidateWeekdays.includes(dow) && !excludedDays.includes(dow) && !excludedDateSet.has(iso)) {
        results.push(new Date(current));
      }
      current = addDays(current, 1);
    }
  }

  return results;
}

function findPartForWord(sections, wordNum) {
  let cumulative = 0;
  for (const sec of sections) {
    const wc = sec.wordCount || 0;
    cumulative += wc;
    if (wordNum <= cumulative) return sec.part;
  }
  return sections[sections.length - 1]?.part || "-";
}

function getPartCompletions(sections) {
  const result = [];
  let cumulative = 0;
  for (const sec of sections) {
    const wc = sec.wordCount || 0;
    cumulative += wc;
    if (wc > 0) {
      result.push({ part: sec.part, name: sec.name, endWord: cumulative });
    }
  }
  return result;
}

export default function TestSchedulePage({ onBack }) {
  const [selected, setSelected] = useState("");
  const [wordsPerTest, setWordsPerTest] = useState(100);
  const [frequency, setFrequency] = useState("weekly1");
  const [startDate, setStartDate] = useState("2025-04-05");
  const [excludedDates, setExcludedDates] = useState([]);
  const [newExcludeDate, setNewExcludeDate] = useState("");

  const info = selected ? TEXTBOOK_FEATURES[selected] : null;
  const totalWords = info ? info.totalWords : 0;

  const schedule = useMemo(() => {
    if (!info || wordsPerTest <= 0) return null;
    const testCount = Math.ceil(totalWords / wordsPerTest);
    const start = new Date(startDate + "T00:00:00");
    if (isNaN(start.getTime())) return null;

    const testDays = generateTestDays(start, frequency, [], excludedDates, testCount);
    const partCompletions = getPartCompletions(info.sections);
    const hasParts = partCompletions.length > 1;

    const rows = testDays.map((date, i) => {
      const rangeStart = i * wordsPerTest + 1;
      const rangeEnd = Math.min((i + 1) * wordsPerTest, totalWords);
      const partLabel = hasParts ? findPartForWord(info.sections, rangeEnd) : "-";

      // Check if this test completes a part
      let isPartComplete = false;
      let completedPartName = "";
      if (hasParts) {
        for (const pc of partCompletions) {
          if (rangeEnd >= pc.endWord && (i === 0 || (i - 1) * wordsPerTest + wordsPerTest < pc.endWord)) {
            isPartComplete = true;
            completedPartName = pc.part;
          }
        }
      }

      const isFinal = i === testDays.length - 1;

      return {
        num: i + 1,
        date,
        rangeStart,
        rangeEnd,
        part: partLabel,
        isPartComplete,
        completedPartName,
        isFinal,
      };
    });

    const lastDate = testDays[testDays.length - 1];
    const weeks = lastDate ? Math.ceil((lastDate - start) / (7 * 86400000)) : 0;

    // Part completion dates
    const partDates = [];
    if (hasParts) {
      for (const pc of partCompletions) {
        const row = rows.find(r => r.rangeEnd >= pc.endWord);
        if (row) {
          partDates.push({ part: pc.part, name: pc.name, date: row.date });
        }
      }
    }

    return { testCount, rows, start, lastDate, weeks, partDates, hasParts };
  }, [info, totalWords, wordsPerTest, frequency, startDate, excludedDates]);

  const addExcludeDate = () => {
    if (newExcludeDate && !excludedDates.includes(newExcludeDate)) {
      setExcludedDates(prev => [...prev, newExcludeDate].sort());
      setNewExcludeDate("");
    }
  };

  const removeExcludeDate = (d) => {
    setExcludedDates(prev => prev.filter(x => x !== d));
  };

  return (
    <div>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "#f97316", fontWeight: 700, fontSize: 15, cursor: "pointer", padding: "8px 0", marginBottom: 16 }}>
        ← トップに戻る
      </button>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: "#334155", margin: "0 0 8px" }}>テストスケジュール</h2>
      <p style={{ color: "#64748b", fontSize: 14, fontWeight: 600, margin: "0 0 24px" }}>教材を選んでテスト計画を自動生成</p>

      <div style={{ background: "#ffffff", padding: "20px 16px", borderRadius: 16, boxShadow: "0 4px 12px rgba(0,0,0,0.03)", marginBottom: 24 }}>
        {/* Textbook selection */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: "#f97316", marginBottom: 8, display: "block" }}>教材</label>
          <select value={selected} onChange={e => setSelected(e.target.value)} style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "2px solid #fdba74", fontSize: 15, background: "#fff7ed", color: "#c2410c", fontWeight: 600, outline: "none", cursor: "pointer" }}>
            <option value="">選択してください</option>
            {featureNames.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
          {info && <div style={{ fontSize: 13, color: "#64748b", fontWeight: 600, marginTop: 6 }}>総単語数: {totalWords.toLocaleString()}語</div>}
        </div>

        {/* Words per test */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: "#334155", marginBottom: 8, display: "block" }}>1回のテスト範囲（語数）</label>
          <input type="number" value={wordsPerTest} onChange={e => setWordsPerTest(Math.max(1, parseInt(e.target.value) || 1))} min={1} style={{ width: 120, padding: "10px 14px", borderRadius: 12, border: "2px solid #e2e8f0", fontSize: 15, fontWeight: 600, outline: "none" }} />
        </div>

        {/* Frequency */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: "#334155", marginBottom: 8, display: "block" }}>テスト頻度</label>
          <select value={frequency} onChange={e => setFrequency(e.target.value)} style={{ width: "100%", maxWidth: 200, padding: "10px 14px", borderRadius: 12, border: "2px solid #e2e8f0", fontSize: 15, fontWeight: 600, outline: "none", cursor: "pointer" }}>
            {FREQ_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Start date */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: "#334155", marginBottom: 8, display: "block" }}>開始日</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={{ padding: "10px 14px", borderRadius: 12, border: "2px solid #e2e8f0", fontSize: 15, fontWeight: 600, outline: "none" }} />
        </div>

        {/* Excluded dates */}
        <div>
          <label style={{ fontSize: 13, fontWeight: 700, color: "#334155", marginBottom: 8, display: "block" }}>対象外の日付</label>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
            <input type="date" value={newExcludeDate} onChange={e => setNewExcludeDate(e.target.value)} style={{ padding: "8px 12px", borderRadius: 10, border: "2px solid #e2e8f0", fontSize: 14, fontWeight: 600, outline: "none" }} />
            <button onClick={addExcludeDate} style={{ padding: "8px 16px", background: "#f97316", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>追加</button>
          </div>
          {excludedDates.length > 0 && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {excludedDates.map(d => (
                <span key={d} style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", background: "#fef2f2", borderRadius: 8, fontSize: 13, fontWeight: 600, color: "#dc2626" }}>
                  {d}
                  <button onClick={() => removeExcludeDate(d)} style={{ background: "none", border: "none", color: "#dc2626", fontWeight: 800, cursor: "pointer", fontSize: 14, padding: "0 2px" }}>&times;</button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Schedule output */}
      {schedule && info && (
        <div style={{ background: "#ffffff", padding: "24px 16px", borderRadius: 20, boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
          {/* Summary card */}
          <div style={{ background: "#ecfdf5", borderRadius: 16, padding: "20px 16px", marginBottom: 24, border: "2px solid #6ee7b740" }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: "#047857", margin: "0 0 12px" }}>スケジュール概要</h3>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <div style={{ padding: "8px 16px", background: "#ffffff", borderRadius: 12, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>総単語数</div>
                <div style={{ fontSize: 16, color: "#334155", fontWeight: 800 }}>{totalWords.toLocaleString()}語</div>
              </div>
              <div style={{ padding: "8px 16px", background: "#ffffff", borderRadius: 12, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>テスト回数</div>
                <div style={{ fontSize: 16, color: "#334155", fontWeight: 800 }}>{schedule.testCount}回</div>
              </div>
              <div style={{ padding: "8px 16px", background: "#ffffff", borderRadius: 12, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>期間</div>
                <div style={{ fontSize: 14, color: "#334155", fontWeight: 700 }}>
                  {schedule.lastDate ? `${formatDate(schedule.start)} 〜 ${formatDate(schedule.lastDate)}（${schedule.weeks}週間）` : "-"}
                </div>
              </div>
            </div>
            {schedule.hasParts && schedule.partDates.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#047857", marginBottom: 6 }}>Part完了予定日</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {schedule.partDates.map(pd => (
                    <span key={pd.part} style={{ padding: "4px 12px", background: "#ffffff", borderRadius: 8, fontSize: 13, fontWeight: 600, color: "#334155", border: "1px solid #e2e8f0" }}>
                      {pd.part}: {formatDate(pd.date)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Schedule table */}
          <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 500 }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["回", "テスト日", "テスト範囲", "Part"].map(h => (
                    <th key={h} style={{ padding: "10px 8px", textAlign: "left", fontWeight: 700, color: "#64748b", borderBottom: "2px solid #e2e8f0", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {schedule.rows.map(row => {
                  const highlight = row.isPartComplete || row.isFinal;
                  return (
                    <tr key={row.num} style={{ borderBottom: "1px solid #f1f5f9", background: highlight ? "#fffbeb" : "transparent" }}>
                      <td style={{ padding: "10px 8px", fontWeight: 700, color: "#334155" }}>{row.num}</td>
                      <td style={{ padding: "10px 8px", fontWeight: 600, color: "#334155", whiteSpace: "nowrap" }}>{formatDate(row.date)}</td>
                      <td style={{ padding: "10px 8px", color: "#64748b", fontWeight: 600 }}>No.{row.rangeStart}〜{row.rangeEnd}</td>
                      <td style={{ padding: "10px 8px", fontWeight: 700, color: highlight ? "#d97706" : "#64748b" }}>
                        {row.isFinal ? "完了!" : row.isPartComplete ? `★${row.completedPartName}完了` : row.part}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
