import { useState, useRef, useEffect } from "react";

const jobs = [
{ id: 1, title: "Үйлдвэрийн ажилчин", company: "Samsung Electronics", location: "Сувон хот", salary: "2,800,000 ₩", type: "EPS", category: "Үйлдвэр", visa: "E-9", deadline: "2024-03-15", desc: "Электрон бүтээгдэхүүн угсрах ажил. Туршлага шаардахгүй." },
{ id: 2, title: "Барилгын ажилчин", company: "Hyundai Construction", location: "Сөүл", salary: "3,200,000 ₩", type: "EPS", category: "Барилга", visa: "E-9", deadline: "2024-03-20", desc: "Барилгын туслах ажилчин. Биеийн чадал шаардлагатай." },
{ id: 3, title: "Сувилагч туслах", company: "Seoul Medical Center", location: "Сөүл", salary: "2,500,000 ₩", type: "Хувийн", category: "Эрүүл мэнд", visa: "E-6", deadline: "2024-04-01", desc: "Өндөр настны асаргаа. Солонгос хэл мэдвэл давуу." },
{ id: 4, title: "Ресторанд тогооч туслах", company: "K-Food Chain", location: "Инчон", salary: "2,200,000 ₩", type: "Хувийн", category: "Хоол", visa: "E-9", deadline: "2024-03-25", desc: "Корей хоол бэлтгэх туслах ажил. Сургалт олгоно." },
{ id: 5, title: "Хөдөө аж ахуйн ажилчин", company: "Jeju Farm Co.", location: "Жэжү арал", salary: "2,600,000 ₩", type: "EPS", category: "Хөдөө аж ахуй", visa: "E-9", deadline: "2024-04-10", desc: "Жимс хураах, тариалангийн ажил. Орон байраар хангана." },
{ id: 6, title: "Логистик ажилчин", company: "Coupang Logistics", location: "Инчон", salary: "3,000,000 ₩", type: "Хувийн", category: "Логистик", visa: "E-9", deadline: "2024-03-30", desc: "Агуулахад ачаа зөөх, эрэмбэлэх ажил. Шөнийн ээлж боломжтой." },
];

const categories = ["Бүгд", "Үйлдвэр", "Барилга", "Эрүүл мэнд", "Хоол", "Хөдөө аж ахуй", "Логистик"];

const epsQuestions = [
{ q: "안녕하세요 — Энэ юу гэсэн үг вэ?", options: ["Баяртай", "Сайн байна уу", "Талархал", "Уучлаарай"], answer: 1 },
{ q: "감사합니다 — Энэ юу гэсэн үг вэ?", options: ["Уучлаарай", "Сайн байна уу", "Баярлалаа", "Тийм"], answer: 2 },
{ q: "화장실이 어디에 있어요? — Юу асуусан бэ?", options: ["Хоол хаана байна вэ", "Жорлон хаана байна вэ", "Ажил хаана байна вэ", "Гэр хаана байна вэ"], answer: 1 },
{ q: "일 — Энэ үгийн утга юу вэ?", options: ["Гэр", "Хоол", "Ажил", "Машин"], answer: 2 },
{ q: "얼마예요? — Юу гэсэн үг вэ?", options: ["Хэдэн цаг вэ", "Хаана байна вэ", "Хэдэн төгрөг вэ", "Хэн бэ"], answer: 2 },
{ q: "병원 — Энэ үгийн утга юу вэ?", options: ["Сургууль", "Эмнэлэг", "Дэлгүүр", "Банк"], answer: 1 },
];

const reviews = [
{ name: "Батбаяр", city: "Сувон", company: "Samsung", rating: 5, text: "Цалин цагтаа орж ирдэг, ажлын нөхцөл маш сайн. Орон байр компани олгодог.", months: 14 },
{ name: "Оюунцэцэг", city: "Сөүл", company: "Seoul Medical", rating: 4, text: "Солонгос хэл мэдэхгүй байсан ч ажилд авсан. Сургалт сайн байсан.", months: 8 },
{ name: "Төмөрбаатар", city: "Инчон", company: "Coupang", rating: 3, text: "Шөнийн ээлж хэцүү байдаг. Гэхдээ цалин сайн, нэмэлт цагийн мөнгө өгдөг.", months: 6 },
{ name: "Номин", city: "Жэжү", company: "Jeju Farm", rating: 5, text: "Жэжү арал үзэсгэлэнтэй! Ажил хэцүү ч орон байр, хоол үнэгүй.", months: 10 },
];

const visaChecklist = {
"E-9 (EPS)": [
"EPS-TOPIK шалгалт өгсөн", "Паспорт хүчинтэй (6 сараас дээш)",
"Эрүүл мэндийн үзлэг хийлгэсэн", "Эрүүгийн лавлагаа авсан",
"Бүртгэлийн маягт бөглөсөн", "Гэрэл зураг бэлтгэсэн (3.5x4.5)",
"Банкны дансны хуулга", "Ажлын гэрээ хүлээн авсан",
],
"E-6 (Хувийн)": [
"Ажил олгогчтой гэрээ байгуулсан", "Паспорт хүчинтэй",
"Эрүүл мэндийн үзлэг", "Эрүүгийн лавлагаа",
"Дипломны хуулбар (шаардлагатай бол)", "Гэрэл зураг бэлтгэсэн",
"Виз өргөдлийн маягт бөглөсөн", "Элчин сайдын яаманд очсон",
],
};

const QUICK_QUESTIONS = ["EPS шалгалт хэзээ болох вэ?", "Виз авахад хэдэн төгрөг хэрэгтэй вэ?", "Хамгийн их цалинтай ажил аль вэ?", "Солонгост монголчуудад хандах хандлага ямар байдаг вэ?"];

function AiChat() {
const [messages, setMessages] = useState([
{ role: "assistant", text: "Сайн байна уу! 👋 Би таны Солонгост ажил хайх AI зөвлөгч. Виз, цалин, ажлын нөхцөл, бичиг баримтын талаар асуугаарай!" }
]);
const [input, setInput] = useState("");
const [loading, setLoading] = useState(false);
const bottomRef = useRef(null);
useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

const sendMessage = async (text) => {
const userText = text || input.trim();
if (!userText || loading) return;
setInput("");
setMessages(prev => [...prev, { role: "user", text: userText }]);
setLoading(true);
try {
const history = messages.map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text }));
const res = await fetch("https://api.anthropic.com/v1/messages", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
model: "claude-sonnet-4-20250514", max_tokens: 1000,
system: `Чи Солонгост ажил хайж буй монголчуудад зориулсан AI туслагч. Монгол хэлээр богино, тодорхой, найрсаг хариулт өг. EPS виз, цалин, ажлын нөхцөл, бичиг баримтын мэдээлэл мэднэ. Хариулт 3-5 өгүүлбэрт багтаа. Emoji хэрэглэж болно.`,
messages: [...history, { role: "user", content: userText }]
})
});
const data = await res.json();
const reply = data.content?.map(c => c.text || "").join("") || "Уучлаарай, алдаа гарлаа.";
setMessages(prev => [...prev, { role: "assistant", text: reply }]);
} catch { setMessages(prev => [...prev, { role: "assistant", text: "Сүлжээний алдаа гарлаа." }]); }
setLoading(false);
};

return (
<div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 170px)" }}>
<div style={{ background: "linear-gradient(135deg, rgba(125,211,252,0.15), rgba(99,102,241,0.15))", borderRadius: 16, padding: 14, marginBottom: 12, border: "1px solid rgba(125,211,252,0.2)", display: "flex", alignItems: "center", gap: 12 }}>
<div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg, #7dd3fc, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>🤖</div>
<div>
<div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>AI Зөвлөгч</div>
<div style={{ fontSize: 11, color: "#4ade80" }}>● Онлайн — Монгол хэлээр асуу</div>
</div>
</div>
<div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 12, paddingBottom: 4 }}>
{QUICK_QUESTIONS.map((q, i) => (
<button key={i} onClick={() => sendMessage(q)} style={{ whiteSpace: "nowrap", padding: "6px 12px", borderRadius: 20, border: "1px solid rgba(125,211,252,0.25)", background: "rgba(125,211,252,0.08)", color: "#7dd3fc", fontSize: 11, cursor: "pointer" }}>{q}</button>
))}
</div>
<div style={{ flex: 1, overflowY: "auto" }}>
{messages.map((msg, i) => (
<div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", marginBottom: 12 }}>
{msg.role === "assistant" && <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #7dd3fc, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0, marginRight: 8, marginTop: 2 }}>🤖</div>}
<div style={{ maxWidth: "75%", padding: "10px 14px", borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: msg.role === "user" ? "linear-gradient(135deg, #7dd3fc, #6366f1)" : "rgba(255,255,255,0.07)", border: msg.role === "assistant" ? "1px solid rgba(255,255,255,0.08)" : "none", fontSize: 13, lineHeight: 1.6, color: "#fff" }}>{msg.text}</div>
</div>
))}
{loading && (
<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
<div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #7dd3fc, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🤖</div>
<div style={{ padding: "10px 16px", borderRadius: "18px 18px 18px 4px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 4, alignItems: "center" }}>
{[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#7dd3fc", animation: `bounce 1.2s ease-in-out ${i*0.2}s infinite` }} />)}
</div>
</div>
)}
<div ref={bottomRef} />
</div>
<div style={{ display: "flex", gap: 8, marginTop: 12, background: "rgba(255,255,255,0.05)", borderRadius: 16, padding: "8px 8px 8px 14px", border: "1px solid rgba(255,255,255,0.1)" }}>
<input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} placeholder="Асуултаа бич..." style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#e8e4dc", fontSize: 13 }} />
<button onClick={() => sendMessage()} disabled={loading || !input.trim()} style={{ width: 36, height: 36, borderRadius: 12, background: input.trim() && !loading ? "linear-gradient(135deg, #7dd3fc, #6366f1)" : "rgba(255,255,255,0.1)", border: "none", cursor: "pointer", color: "#fff", fontSize: 16 }}>➤</button>
</div>
<style>{`@keyframes bounce { 0%,60%,100%{transform:translateY(0);opacity:0.4} 30%{transform:translateY(-6px);opacity:1} }`}</style>
</div>
);
}

function EpsQuiz() {
const [current, setCurrent] = useState(0);
const [score, setScore] = useState(0);
const [selected, setSelected] = useState(null);
const [done, setDone] = useState(false);

const handleAnswer = (idx) => {
if (selected !== null) return;
setSelected(idx);
if (idx === epsQuestions[current].answer) setScore(s => s + 1);
setTimeout(() => {
if (current + 1 >= epsQuestions.length) setDone(true);
else { setCurrent(c => c + 1); setSelected(null); }
}, 900);
};

const restart = () => { setCurrent(0); setScore(0); setSelected(null); setDone(false); };

if (done) return (
<div style={{ textAlign: "center", padding: "40px 20px" }}>
<div style={{ fontSize: 64, marginBottom: 16 }}>{score >= 5 ? "🏆" : score >= 3 ? "👍" : "📚"}</div>
<div style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 8 }}>{score}/{epsQuestions.length}</div>
<div style={{ fontSize: 15, color: score >= 5 ? "#4ade80" : score >= 3 ? "#fbbf24" : "#f87171", marginBottom: 24 }}>
{score >= 5 ? "Гайхалтай! Шалгалтад бэлэн байна!" : score >= 3 ? "Сайн байна, бага зэрэг сур!" : "Илүү их дасгал хийх хэрэгтэй!"}
</div>
<button onClick={restart} style={{ background: "linear-gradient(135deg, #7dd3fc, #6366f1)", border: "none", borderRadius: 12, padding: "12px 32px", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Дахин эхлэх</button>
</div>
);

const q = epsQuestions[current];
return (
<div>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
<div style={{ fontSize: 13, color: "#666" }}>{current + 1} / {epsQuestions.length}</div>
<div style={{ fontSize: 13, color: "#4ade80", fontWeight: 700 }}>Оноо: {score}</div>
</div>
<div style={{ background: "rgba(255,255,255,0.05)", height: 4, borderRadius: 2, marginBottom: 24 }}>
<div style={{ background: "linear-gradient(90deg, #7dd3fc, #6366f1)", height: "100%", borderRadius: 2, width: `${((current)/epsQuestions.length)*100}%`, transition: "width 0.3s" }} />
</div>
<div style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)", borderRadius: 16, padding: 20, marginBottom: 20, border: "1px solid rgba(125,211,252,0.2)", textAlign: "center" }}>
<div style={{ fontSize: 11, color: "#7dd3fc", marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>Солонгос үг</div>
<div style={{ fontSize: 26, fontWeight: 800, color: "#fff" }}>{q.q.split("—")[0].trim()}</div>
<div style={{ fontSize: 13, color: "#999", marginTop: 8 }}>{q.q.split("—")[1]?.trim()}</div>
</div>
<div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
{q.options.map((opt, i) => {
let bg = "rgba(255,255,255,0.05)";
let border = "1px solid rgba(255,255,255,0.08)";
let color = "#ddd";
if (selected !== null) {
if (i === q.answer) { bg = "rgba(74,222,128,0.2)"; border = "1px solid #4ade80"; color = "#4ade80"; }
else if (i === selected && i !== q.answer) { bg = "rgba(248,113,113,0.2)"; border = "1px solid #f87171"; color = "#f87171"; }
}
return (
<button key={i} onClick={() => handleAnswer(i)} style={{ padding: "14px 16px", borderRadius: 12, border, background: bg, color, fontSize: 14, cursor: "pointer", textAlign: "left", transition: "all 0.2s", fontWeight: selected !== null && i === q.answer ? 700 : 400 }}>
{opt}
</button>
);
})}
</div>
</div>
);
}

function Reviews() {
return (
<div>
<div style={{ fontSize: 13, color: "#999", marginBottom: 16, lineHeight: 1.6 }}>Солонгост ажиллаж буй монголчуудын үнэн туршлага 🇲🇳</div>
{reviews.map((r, i) => (
<div key={i} style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)", borderRadius: 16, padding: 18, marginBottom: 14, border: "1px solid rgba(255,255,255,0.07)" }}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
<div style={{ width: 40, height: 40, borderRadius: "50%", background: `hsl(${i*60+200},60%,40%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#fff" }}>{r.name[0]}</div>
<div>
<div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{r.name}</div>
<div style={{ fontSize: 11, color: "#7dd3fc" }}>{r.company} · {r.city}</div>
</div>
</div>
<div style={{ fontSize: 11, color: "#666" }}>{r.months} сар</div>
</div>
<div style={{ fontSize: 18, marginBottom: 8 }}>{"⭐".repeat(r.rating)}</div>
<div style={{ fontSize: 13, color: "#bbb", lineHeight: 1.6 }}>"{r.text}"</div>
</div>
))}
<div style={{ background: "rgba(125,211,252,0.08)", borderRadius: 16, padding: 16, border: "1px solid rgba(125,211,252,0.15)", textAlign: "center" }}>
<div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>📝 Та ч туршлагаа хуваалцаарай</div>
<div style={{ fontSize: 12, color: "#aaa" }}>Бусад монголчуудад тусал</div>
</div>
</div>
);
}

function Checklist() {
const [visaType, setVisaType] = useState("E-9 (EPS)");
const [checked, setChecked] = useState({});
const toggle = (key) => setChecked(p => ({ ...p, [key]: !p[key] }));
const items = visaChecklist[visaType];
const done = items.filter(item => checked[visaType+item]).length;

return (
<div>
<div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
{Object.keys(visaChecklist).map(v => (
<button key={v} onClick={() => setVisaType(v)} style={{ flex: 1, padding: "10px 8px", borderRadius: 12, border: "1px solid", borderColor: visaType === v ? "#7dd3fc" : "rgba(255,255,255,0.1)", background: visaType === v ? "rgba(125,211,252,0.15)" : "transparent", color: visaType === v ? "#7dd3fc" : "#999", fontSize: 11, cursor: "pointer", fontWeight: visaType === v ? 700 : 400 }}>{v}</button>
))}
</div>
<div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 16, marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
<div>
<div style={{ fontSize: 13, color: "#999" }}>Гүйцэтгэл</div>
<div style={{ fontSize: 22, fontWeight: 800, color: done === items.length ? "#4ade80" : "#7dd3fc" }}>{done}/{items.length}</div>
</div>
<div style={{ width: 50, height: 50, borderRadius: "50%", border: `3px solid ${done === items.length ? "#4ade80" : "#7dd3fc"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
{done === items.length ? "✅" : "📋"}
</div>
</div>
{items.map((item, i) => {
const key = visaType + item;
return (
<div key={i} onClick={() => toggle(key)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: checked[key] ? "rgba(74,222,128,0.08)" : "rgba(255,255,255,0.04)", borderRadius: 12, marginBottom: 8, border: `1px solid ${checked[key] ? "rgba(74,222,128,0.3)" : "rgba(255,255,255,0.07)"}`, cursor: "pointer", transition: "all 0.2s" }}>
<div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${checked[key] ? "#4ade80" : "rgba(255,255,255,0.2)"}`, background: checked[key] ? "#4ade80" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13, transition: "all 0.2s" }}>
{checked[key] ? "✓" : ""}
</div>
<div style={{ fontSize: 13, color: checked[key] ? "#4ade80" : "#ddd", textDecoration: checked[key] ? "line-through" : "none", transition: "all 0.2s" }}>{item}</div>
</div>
);
})}
</div>
);
}

function Calculator() {
const [won, setWon] = useState("2800000");
const rate = 2.1;
const tugrug = won ? Math.round(parseInt(won.replace(/,/g, "")) * rate).toLocaleString() : "0";
const monthly = won ? parseInt(won.replace(/,/g, "")) : 0;
const yearly = monthly * 12;
const savings = Math.round(monthly * 0.6);

return (
<div>
<div style={{ fontSize: 13, color: "#999", marginBottom: 20, lineHeight: 1.6 }}>Солонгосын вон → Монгол төгрөг хөрвүүлэгч 💱</div>
<div style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)", borderRadius: 16, padding: 20, marginBottom: 16, border: "1px solid rgba(125,211,252,0.2)" }}>
<div style={{ fontSize: 12, color: "#7dd3fc", marginBottom: 8, letterSpacing: 1 }}>САРЫН ЦАЛИН (₩)</div>
<input value={won} onChange={e => setWon(e.target.value.replace(/[^0-9]/g, ""))} style={{ width: "100%", background: "transparent", border: "none", outline: "none", fontSize: 32, fontWeight: 800, color: "#fff", boxSizing: "border-box" }} placeholder="2800000" />
<div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>Хязгаараас хасалгүй дүн</div>
</div>
<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
{[
{ label: "Сарын орлого", value: `${tugrug}₮`, color: "#4ade80" },
{ label: "Жилийн орлого", value: `${Math.round(yearly * rate).toLocaleString()}₮`, color: "#7dd3fc" },
{ label: "Хадгалалт (60%)", value: `${Math.round(savings * rate).toLocaleString()}₮`, color: "#fbbf24" },
{ label: "3 жилд хуримтлал", value: `${Math.round(savings * rate * 36).toLocaleString()}₮`, color: "#f472b6" },
].map((item, i) => (
<div key={i} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 14, border: "1px solid rgba(255,255,255,0.07)" }}>
<div style={{ fontSize: 11, color: "#666", marginBottom: 6 }}>{item.label}</div>
<div style={{ fontSize: 15, fontWeight: 800, color: item.color }}>{item.value}</div>
</div>
))}
</div>
<div style={{ background: "rgba(251,191,36,0.1)", borderRadius: 12, padding: 14, border: "1px solid rgba(251,191,36,0.2)" }}>
<div style={{ fontSize: 12, color: "#fbbf24", fontWeight: 700, marginBottom: 4 }}>💡 Ханшийн мэдээлэл</div>
<div style={{ fontSize: 12, color: "#bbb" }}>1 вон ≈ 2.1 төгрөг (ойролцоо). Жинхэнэ ханшийг банкнаас лавлаарай.</div>
</div>
</div>
);
}

export default function App() {
const [activeTab, setActiveTab] = useState("jobs");
const [subTab, setSubTab] = useState("ai");
const [selectedCat, setSelectedCat] = useState("Бүгд");
const [selectedJob, setSelectedJob] = useState(null);
const [search, setSearch] = useState("");
const [saved, setSaved] = useState([]);

const filtered = jobs.filter(j =>
(selectedCat === "Бүгд" || j.category === selectedCat) &&
(j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()))
);
const toggleSave = (id) => setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

const TABS = [
{ key: "jobs", icon: "💼", label: "Ажил" },
{ key: "tools", icon: "🛠️", label: "Хэрэгсэл" },
{ key: "saved", icon: "❤️", label: saved.length ? `(${saved.length})` : "Хадгалсан" },
];

const SUBTOOLS = [
{ key: "ai", icon: "🤖", label: "AI Зөвлөгч" },
{ key: "quiz", icon: "🎓", label: "EPS Тест" },
{ key: "reviews", icon: "⭐", label: "Туршлага" },
{ key: "checklist", icon: "📋", label: "Чеклист" },
{ key: "calc", icon: "💰", label: "Тооцоолуур" },
];

return (
<div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#e8e4dc", fontFamily: "sans-serif", maxWidth: 430, margin: "0 auto" }}>
{/* Header */}
<div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", padding: "24px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
<div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: activeTab === "jobs" ? 14 : 0 }}>
<span style={{ fontSize: 26 }}>🇰🇷</span>
<div>
<div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>Go Korea 🇰🇷</div>
<div style={{ fontSize: 10, color: "#7dd3fc", letterSpacing: 2, textTransform: "uppercase" }}>Korea Job Guide for Mongolians</div>
</div>
</div>
{activeTab === "jobs" && (
<div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", border: "1px solid rgba(255,255,255,0.1)" }}>
<span style={{ marginRight: 8, opacity: 0.5 }}>🔍</span>
<input value={search} onChange={e => setSearch(e.target.value)} placeholder="Ажил, компани хайх..." style={{ background: "transparent", border: "none", outline: "none", color: "#e8e4dc", fontSize: 14, width: "100%" }} />
</div>
)}
</div>

{/* Main Tabs */}
<div style={{ display: "flex", background: "#111118", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
{TABS.map(tab => (
<button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{ flex: 1, padding: "12px 4px", border: "none", background: "transparent", color: activeTab === tab.key ? "#7dd3fc" : "#666", fontSize: 10, fontWeight: activeTab === tab.key ? 700 : 400, cursor: "pointer", borderBottom: activeTab === tab.key ? "2px solid #7dd3fc" : "2px solid transparent" }}>
<div style={{ fontSize: 18, marginBottom: 2 }}>{tab.icon}</div>{tab.label}
</button>
))}
</div>

<div style={{ padding: 16, paddingBottom: 80 }}>

{/* JOBS */}
{activeTab === "jobs" && (
<>
<div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 14, paddingBottom: 4 }}>
{categories.map(cat => (
<button key={cat} onClick={() => setSelectedCat(cat)} style={{ whiteSpace: "nowrap", padding: "6px 14px", borderRadius: 20, border: "1px solid", borderColor: selectedCat === cat ? "#7dd3fc" : "rgba(255,255,255,0.1)", background: selectedCat === cat ? "rgba(125,211,252,0.15)" : "transparent", color: selectedCat === cat ? "#7dd3fc" : "#999", fontSize: 12, cursor: "pointer" }}>{cat}</button>
))}
</div>
<div style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>{filtered.length} ажлын байр</div>
{filtered.map(job => (
<div key={job.id} onClick={() => setSelectedJob(job)} style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)", borderRadius: 16, padding: 16, marginBottom: 12, border: "1px solid rgba(255,255,255,0.07)", cursor: "pointer" }}>
<div style={{ display: "flex", justifyContent: "space-between" }}>
<div style={{ flex: 1 }}>
<div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
<span style={{ background: job.type === "EPS" ? "rgba(34,197,94,0.2)" : "rgba(251,191,36,0.2)", color: job.type === "EPS" ? "#4ade80" : "#fbbf24", fontSize: 10, padding: "2px 8px", borderRadius: 6, fontWeight: 700 }}>{job.type}</span>
</div>
<div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{job.title}</div>
<div style={{ fontSize: 13, color: "#7dd3fc" }}>{job.company}</div>
<div style={{ fontSize: 12, color: "#666" }}>📍 {job.location}</div>
</div>
<button onClick={e => { e.stopPropagation(); toggleSave(job.id); }} style={{ background: "transparent", border: "none", fontSize: 20, cursor: "pointer", opacity: saved.includes(job.id) ? 1 : 0.3 }}>❤️</button>
</div>
<div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between" }}>
<div style={{ fontSize: 18, fontWeight: 800, color: "#4ade80" }}>{job.salary}</div>
<div style={{ fontSize: 11, color: "#666" }}>{job.deadline}</div>
</div>
</div>
))}
</>
)}

{/* TOOLS */}
{activeTab === "tools" && (
<>
<div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 20, paddingBottom: 4 }}>
{SUBTOOLS.map(t => (
<button key={t.key} onClick={() => setSubTab(t.key)} style={{ whiteSpace: "nowrap", padding: "8px 14px", borderRadius: 20, border: "1px solid", borderColor: subTab === t.key ? "#7dd3fc" : "rgba(255,255,255,0.1)", background: subTab === t.key ? "rgba(125,211,252,0.15)" : "transparent", color: subTab === t.key ? "#7dd3fc" : "#999", fontSize: 12, cursor: "pointer", fontWeight: subTab === t.key ? 700 : 400 }}>
{t.icon} {t.label}
</button>
))}
</div>
{subTab === "ai" && <AiChat />}
{subTab === "quiz" && <EpsQuiz />}
{subTab === "reviews" && <Reviews />}
{subTab === "checklist" && <Checklist />}
{subTab === "calc" && <Calculator />}
</>
)}

{/* SAVED */}
{activeTab === "saved" && (
saved.length === 0 ? (
<div style={{ textAlign: "center", padding: "60px 20px", color: "#555" }}>
<div style={{ fontSize: 48, marginBottom: 16 }}>❤️</div>
<div style={{ fontSize: 16, fontWeight: 700, color: "#777", marginBottom: 8 }}>Хадгалсан ажил байхгүй</div>
<div style={{ fontSize: 13 }}>Ажлын зарнаас ❤️ дарж хадгалаарай</div>
</div>
) : jobs.filter(j => saved.includes(j.id)).map(job => (
<div key={job.id} style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)", borderRadius: 16, padding: 16, marginBottom: 12, border: "1px solid rgba(125,211,252,0.15)" }}>
<div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{job.title}</div>
<div style={{ fontSize: 13, color: "#7dd3fc", marginBottom: 8 }}>{job.company}</div>
<div style={{ fontSize: 18, fontWeight: 800, color: "#4ade80" }}>{job.salary}</div>
</div>
))
)}
</div>

{/* Job Modal */}
{selectedJob && (
<div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "flex-end", zIndex: 100 }} onClick={() => setSelectedJob(null)}>
<div onClick={e => e.stopPropagation()} style={{ background: "linear-gradient(180deg, #1a1a2e, #0f0f1a)", borderRadius: "24px 24px 0 0", padding: 24, width: "100%", maxWidth: 430, margin: "0 auto", border: "1px solid rgba(255,255,255,0.1)" }}>
<div style={{ width: 40, height: 4, background: "#333", borderRadius: 2, margin: "0 auto 20px" }} />
<div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 6 }}>{selectedJob.title}</div>
<div style={{ fontSize: 15, color: "#7dd3fc", marginBottom: 4 }}>{selectedJob.company}</div>
<div style={{ fontSize: 13, color: "#666", marginBottom: 20 }}>📍 {selectedJob.location}</div>
<div style={{ fontSize: 28, fontWeight: 800, color: "#4ade80", marginBottom: 16 }}>{selectedJob.salary}<span style={{ fontSize: 13, color: "#666", fontWeight: 400 }}>/сар</span></div>
<div style={{ fontSize: 13, color: "#bbb", lineHeight: 1.7, marginBottom: 20 }}>{selectedJob.desc}</div>
<div style={{ display: "flex", gap: 12 }}>
<button onClick={() => toggleSave(selectedJob.id)} style={{ flex: 1, padding: 14, borderRadius: 12, border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "#fff", fontSize: 14, cursor: "pointer" }}>{saved.includes(selectedJob.id) ? "❤️ Хадгалсан" : "🤍 Хадгалах"}</button>
<button style={{ flex: 2, padding: 14, borderRadius: 12, background: "linear-gradient(135deg, #7dd3fc, #6366f1)", border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Өргөдөл гаргах →</button>
</div>
</div>
</div>
)}
</div>
);
}

