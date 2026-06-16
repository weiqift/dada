import React, { useState, useEffect, useRef } from "react";
import {
  Waves, Heart, X, MessageCircle, Mic, MicOff, Users, User, Plus,
  MapPin, Settings, ChevronLeft, PartyPopper, Check, PhoneOff,
  Bell, Send, Image as ImageIcon, Shield, ArrowRight, Crown, MoreHorizontal,
} from "lucide-react";

/* ============ 配色 / 字体 token ============ */
const C = {
  bg: "#0E0A1A",
  night1: "#1B1330",
  night2: "#241A3D",
  night3: "#2E2050",
  peelA: "#FF9D4D",
  peelB: "#FF6E2C",
  gold: "#F4C95D",
  cream: "#F8EFE3",
  jade: "#2F9E6E",
  red: "#E25C5C",
  mute: "#9C8FC4",
  mute2: "#B9AEDC",
};
const F_DISPLAY = "'Fraunces', serif";
const F_BODY = "'Plus Jakarta Sans', sans-serif";
const F_MONO = "'JetBrains Mono', monospace";

/* ============ 通用头像 ============ */
const GRADS = [
  ["#FFB37A", "#FF6E2C"], ["#FFD9A0", "#F4944D"], ["#FFC1A6", "#E8654B"],
  ["#FFE3A3", "#F2A35E"], ["#FFB99A", "#D85C3D"], ["#FFCC8A", "#E07B3C"],
];
function Avatar({ name, size = 40, i = 0, ring }) {
  const [a, b] = GRADS[i % GRADS.length];
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `linear-gradient(135deg, ${a}, ${b})`,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontFamily: F_DISPLAY, fontWeight: 600, fontSize: size * 0.42,
      flexShrink: 0, boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
      outline: ring ? `2px solid ${ring}` : "none", outlineOffset: 2,
    }}>{name[0]}</div>
  );
}

/* ============ mock 数据 ============ */
const ORANGES = [
  { id: 1, name: "晓琪", age: 24, area: "吉隆坡", tag: "周末喜欢爬山🌄", contact: "IG @xq_hike", top: "9%", left: "6%", dur: 11 },
  { id: 2, name: "家豪", age: 27, area: "怡保", tag: "咖啡店常客☕", contact: "WA 012-345 6677", top: "28%", left: "62%", dur: 9 },
  { id: 3, name: "美玲", age: 22, area: "槟城", tag: "在学画画🎨", contact: "IG @mlart", top: "52%", left: "16%", dur: 13 },
  { id: 4, name: "志强", age: 29, area: "新山", tag: "健身两年了💪", contact: "WA 011-222 8899", top: "15%", left: "78%", dur: 10 },
  { id: 5, name: "佩珊", age: 25, area: "雪兰莪", tag: "猫派，我选猫🐈", contact: "IG @psan.cat", top: "64%", left: "68%", dur: 12 },
  { id: 6, name: "俊杰", age: 26, area: "马六甲", tag: "越夜越精神🌙", contact: "WA 019-888 1234", top: "42%", left: "40%", dur: 8 },
];
const MATCHES = [
  { id: 1, name: "思颖", age: 23, area: "吉隆坡", bio: "甜品控，正在学日语", tags: ["甜品", "日语", "猫"] },
  { id: 2, name: "伟伦", age: 28, area: "槟城", bio: "周末爱骑车，平日是工程师", tags: ["骑行", "技术", "夜跑"] },
  { id: 3, name: "嘉欣", age: 25, area: "柔佛", bio: "刚开始学冲浪，欢迎一起", tags: ["冲浪", "旅行", "电影"] },
];
const PARTIES = [
  { id: 1, title: "深夜电台 · 失眠的人请进", host: "阿泽", count: 18, tag: "夜聊", live: true },
  { id: 2, title: "K歌房 · 中文老歌专场", host: "小敏", count: 7, tag: "唱歌", live: true },
  { id: 3, title: "语言交换 · 华语 ⇄ 国语", host: "Aiman", count: 5, tag: "语言交换", live: false },
];
const INIT_POSTS = [
  { id: 1, name: "晓琪", time: "1小时前", text: "今天去爬了升旗山，山顶的风超舒服，谁也想去？", likes: 12, comments: 3, img: true, liked: false },
  { id: 2, name: "俊杰", time: "3小时前", text: "凌晨三点的咖啡店原来这么安静，适合发呆", likes: 8, comments: 1, img: false, liked: false },
  { id: 3, name: "佩珊", time: "昨天", text: "我家猫今天又把键盘当床睡了😂", likes: 21, comments: 6, img: true, liked: false },
];

/* ============ 顶层 App ============ */
export default function App() {
  const [stage, setStage] = useState("onboard"); // onboard | main
  return (
    <div style={{ fontFamily: F_BODY, background: C.bg }} className="w-full min-h-screen flex items-center justify-center py-6">
      <GlobalStyle />
      <div className="relative overflow-hidden" style={{ width: 393, height: 812, borderRadius: 36, boxShadow: "0 30px 80px rgba(0,0,0,0.55)", background: C.night2 }}>
        {stage === "onboard" ? <Onboarding onDone={() => setStage("main")} /> : <MainApp />}
      </div>
    </div>
  );
}

function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..800;1,9..144,400..600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
      @keyframes driftX { 0% { transform: translateX(-14px) translateY(0); } 50% { transform: translateX(14px) translateY(-10px); } 100% { transform: translateX(-14px) translateY(0); } }
      @keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
      @keyframes fadeUp { from { opacity:0; transform: translateY(12px);} to {opacity:1; transform:none;} }
      @keyframes pulseRing { 0% { box-shadow: 0 0 0 0 rgba(244,201,93,0.5);} 100% { box-shadow: 0 0 0 14px rgba(244,201,93,0);} }
      .scrollbar-none::-webkit-scrollbar { display:none; }
      .scrollbar-none { -ms-overflow-style:none; scrollbar-width:none; }
      .orange-card { animation: driftX linear infinite; }
      .fade-up { animation: fadeUp .35s ease both; }
    `}</style>
  );
}

/* ============ 注册引导（邮箱验证 → 资料） ============ */
function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="h-full flex flex-col px-7 pt-16 pb-10" style={{ background: `linear-gradient(180deg, ${C.night2} 0%, ${C.night3} 100%)` }}>
      {/* 河流插画头 */}
      <div className="relative mb-8" style={{ height: 120 }}>
        <div style={{ position: "absolute", top: 0, right: 20, width: 32, height: 32, borderRadius: "50%", background: C.gold, boxShadow: `0 0 24px 6px ${C.gold}55` }} />
        {[0, 1, 2].map((n) => (
          <div key={n} className="orange-card absolute" style={{ left: `${15 + n * 30}%`, top: `${40 + (n % 2) * 20}px`, animationDuration: `${9 + n}s`, width: 50, height: 50, borderRadius: "50%", background: `linear-gradient(135deg, ${C.peelA}, ${C.peelB})`, boxShadow: "0 6px 14px rgba(0,0,0,.35)" }}>
            <div style={{ position: "absolute", top: -3, left: 20, width: 8, height: 10, background: C.jade, borderRadius: "0 60% 0 60%", transform: "rotate(-15deg)" }} />
          </div>
        ))}
      </div>

      <div key={step} className="fade-up flex-1">
        {step === 0 && (
          <>
            <h1 style={{ fontFamily: F_DISPLAY, color: C.cream, fontSize: 30, fontWeight: 600, lineHeight: 1.2 }}>把你的柑<br />丢进河里 🍊</h1>
            <p style={{ color: C.mute2, fontSize: 14, marginTop: 14, lineHeight: 1.6 }}>每天抛一个柑、捞五个柑，认识刚好对眼的人。慢一点，但更真。</p>
            <div className="mt-8 space-y-3">
              <Field label="电邮地址" value={email} onChange={setEmail} placeholder="you@email.com" prefix="✉️" />
            </div>
          </>
        )}
        {step === 1 && (
          <>
            <h1 style={{ fontFamily: F_DISPLAY, color: C.cream, fontSize: 26, fontWeight: 600 }}>输入验证码</h1>
            <p style={{ color: C.mute2, fontSize: 13.5, marginTop: 10 }}>验证码已发送到 {email || "you@email.com"}，记得查收（含垃圾箱）</p>
            <div className="flex gap-2 mt-7 justify-center">
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <div key={n} className="rounded-xl flex items-center justify-center" style={{ width: 46, height: 58, background: "rgba(255,255,255,.06)", border: `1px solid ${code.length === n ? C.gold : "transparent"}`, color: C.cream, fontFamily: F_MONO, fontSize: 22 }}>
                  {code[n] || ""}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 mt-8">
              {["1","2","3","4","5","6","7","8","9","","0","⌫"].map((k, idx) => (
                <button key={idx} disabled={k===""} onClick={() => { if (k === "⌫") setCode((c) => c.slice(0, -1)); else if (k && code.length < 6) setCode((c) => c + k); }} className="py-3 rounded-xl text-lg" style={{ background: k === "" ? "transparent" : "rgba(255,255,255,.05)", color: C.cream, fontFamily: F_MONO }}>{k}</button>
              ))}
            </div>
            <div className="flex items-center gap-1.5 mt-5 justify-center" style={{ color: C.mute, fontSize: 11.5 }}>
              <Shield size={12} /> 电邮验证用于确认账号真实有效
            </div>
            <div className="text-center mt-3">
              <span style={{ color: C.gold, fontSize: 12 }}>没收到？重新发送</span>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h1 style={{ fontFamily: F_DISPLAY, color: C.cream, fontSize: 26, fontWeight: 600 }}>建立你的空间</h1>
            <p style={{ color: C.mute2, fontSize: 13.5, marginTop: 10 }}>这些会显示在你的柑和主页上</p>
            <div className="flex justify-center my-6">
              <div className="relative">
                <Avatar name={name || "你"} size={84} />
                <div className="absolute -bottom-1 -right-1 rounded-full flex items-center justify-center" style={{ width: 28, height: 28, background: C.peelB }}>
                  <Plus size={15} color="#fff" />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <Field label="昵称" value={name} onChange={setName} placeholder="例如：晓琪" />
              <Field label="一句话介绍" value={""} onChange={() => {}} placeholder="周末喜欢爬山🌄" />
            </div>
          </>
        )}
      </div>

      <button
        onClick={() => (step < 2 ? setStep(step + 1) : onDone())}
        className="w-full py-3.5 rounded-full flex items-center justify-center gap-2"
        style={{ background: `linear-gradient(135deg, ${C.peelA}, ${C.peelB})`, color: "#fff", fontWeight: 700, fontSize: 15, boxShadow: "0 8px 18px rgba(255,110,44,.4)" }}
      >
        {step < 2 ? "继续" : "进入河边"} <ArrowRight size={17} />
      </button>
      <div className="flex justify-center gap-1.5 mt-4">
        {[0, 1, 2].map((n) => (
          <div key={n} style={{ width: n === step ? 18 : 6, height: 6, borderRadius: 3, background: n === step ? C.gold : "rgba(255,255,255,.2)", transition: ".3s" }} />
        ))}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, prefix }) {
  return (
    <div>
      <label className="block text-xs mb-1.5" style={{ color: C.mute2 }}>{label}</label>
      <div className="flex items-center rounded-xl px-3 py-3" style={{ background: "rgba(255,255,255,.06)" }}>
        {prefix && <span style={{ color: C.mute2, fontSize: 14, marginRight: 8 }}>{prefix}</span>}
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="bg-transparent outline-none flex-1 text-sm" style={{ color: C.cream }} />
      </div>
    </div>
  );
}

/* ============ 主应用 ============ */
function MainApp() {
  const [tab, setTab] = useState("river");
  const [overlay, setOverlay] = useState(null); // {type, data}
  const [toast, setToast] = useState("");

  // 捞柑状态: pending(已请求,等对方同意) | matched(已通过)
  const [caught, setCaught] = useState({}); // id -> "pending" | "matched"
  const [posts, setPosts] = useState(INIT_POSTS);
  const [notifs, setNotifs] = useState([
    { id: 1, type: "request", name: "美玲", text: "捞起了你的柑，想认识你", unread: true },
    { id: 2, type: "match", name: "思颖", text: "和你配对成功了，打个招呼吧", unread: true },
    { id: 3, type: "like", name: "志强", text: "赞了你在广场的动态", unread: false },
  ]);
  const caughtCount = Object.keys(caught).length;
  const unread = notifs.filter((n) => n.unread).length;

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const showToast = (m) => setToast(m);

  return (
    <div className="h-full flex flex-col">
      <TopHeader tab={tab} caughtCount={caughtCount} unread={unread} onBell={() => setOverlay({ type: "notif" })} />

      <div className="flex-1 overflow-y-auto scrollbar-none" style={{ background: tab === "river" ? undefined : "#1A1430" }}>
        {tab === "river" && <RiverTab caught={caught} caughtCount={caughtCount} onOpen={(o) => setOverlay({ type: "orange", data: o })} onThrow={() => setOverlay({ type: "throw" })} />}
        {tab === "match" && <MatchTab showToast={showToast} />}
        {tab === "party" && <PartyTab showToast={showToast} onEnter={(p) => setOverlay({ type: "room", data: p })} />}
        {tab === "plaza" && <PlazaTab posts={posts} setPosts={setPosts} onCompose={() => setOverlay({ type: "compose" })} />}
        {tab === "me" && <MeTab caughtCount={caughtCount} onEdit={() => setOverlay({ type: "edit" })} />}
      </div>

      <BottomNav tab={tab} setTab={setTab} />

      {/* ----- overlays ----- */}
      {overlay?.type === "orange" && (
        <OrangeModal orange={overlay.data} state={caught[overlay.data.id]} canCatch={caughtCount < 5}
          onClose={() => setOverlay(null)}
          onCatch={() => { setCaught((p) => ({ ...p, [overlay.data.id]: "pending" })); setOverlay(null); showToast(`已向 ${overlay.data.name} 发出请求，等TA同意`); }}
          onChat={() => setOverlay({ type: "chat", data: overlay.data })}
        />
      )}
      {overlay?.type === "throw" && <ThrowModal onClose={() => setOverlay(null)} onSubmit={() => { setOverlay(null); showToast("你的柑已经丢进河里啦🍊（每天可丢1个）"); }} />}
      {overlay?.type === "notif" && <NotifPanel notifs={notifs}
        onClose={() => { setNotifs((p) => p.map((n) => ({ ...n, unread: false }))); setOverlay(null); }}
        onApprove={(n) => { setCaught((p) => ({ ...p, ["ext_" + n.id]: "matched" })); setOverlay({ type: "chat", data: { name: n.name, age: 22, area: "槟城", contact: "IG @mlart" } }); }}
        onChat={(n) => setOverlay({ type: "chat", data: { name: n.name, age: 23, area: "吉隆坡", contact: "IG @sy_" } })}
      />}
      {overlay?.type === "chat" && <ChatScreen peer={overlay.data} onBack={() => setOverlay(null)} />}
      {overlay?.type === "room" && <VoiceRoom party={overlay.data} onLeave={() => setOverlay(null)} />}
      {overlay?.type === "compose" && <ComposeModal onClose={() => setOverlay(null)} onPost={(text) => { setPosts((p) => [{ id: Date.now(), name: "伟杰", time: "刚刚", text, likes: 0, comments: 0, img: false, liked: false }, ...p]); setOverlay(null); showToast("已发布到广场"); }} />}
      {overlay?.type === "edit" && <EditProfile onClose={() => setOverlay(null)} onSave={() => { setOverlay(null); showToast("资料已更新"); }} />}

      {toast && (
        <div className="absolute left-1/2 bottom-24 -translate-x-1/2 px-4 py-2 rounded-full text-sm text-center fade-up z-50" style={{ background: "rgba(20,14,38,.94)", color: C.cream, border: `1px solid ${C.gold}55`, maxWidth: 320 }}>{toast}</div>
      )}
    </div>
  );
}

/* ============ 顶部 ============ */
function TopHeader({ tab, caughtCount, unread, onBell }) {
  const titles = {
    river: ["晚上好，找柑去 🌙", null],
    match: ["配对", "看看谁可能合得来"],
    party: ["派对", "语音房 · 实时连线"],
    plaza: ["广场", "看看大家在做什么"],
    me: ["我的空间", null],
  };
  const [title, sub] = titles[tab];
  return (
    <div className="px-5 pt-6 pb-3 flex items-center justify-between" style={{ background: C.night2, borderBottom: `1px solid ${C.night1}` }}>
      <div>
        <div style={{ fontFamily: F_DISPLAY, color: C.cream, fontSize: 21, fontWeight: 600 }}>{title}</div>
        {sub && <div style={{ color: C.mute2, fontSize: 12.5, marginTop: 2 }}>{sub}</div>}
      </div>
      <div className="flex items-center gap-2.5">
        {tab === "river" && (
          <div className="px-3 py-1.5 rounded-full" style={{ background: "rgba(244,201,93,.12)", border: `1px solid ${C.gold}55` }}>
            <span style={{ fontFamily: F_MONO, color: C.gold, fontSize: 12.5 }}>已捞 {caughtCount}/5</span>
          </div>
        )}
        <button onClick={onBell} className="relative rounded-full flex items-center justify-center" style={{ width: 38, height: 38, background: "rgba(255,255,255,.06)" }}>
          <Bell size={17} color={C.cream} />
          {unread > 0 && <span className="absolute -top-0.5 -right-0.5 rounded-full text-[10px] flex items-center justify-center" style={{ width: 17, height: 17, background: C.red, color: "#fff", fontWeight: 700 }}>{unread}</span>}
        </button>
      </div>
    </div>
  );
}

/* ============ 河流（捞柑） ============ */
function RiverTab({ caught, caughtCount, onOpen, onThrow }) {
  const remaining = ORANGES.length - Object.keys(caught).filter((k) => !k.startsWith("ext_")).length;
  return (
    <div className="relative" style={{ minHeight: 600, overflow: "hidden", background: `linear-gradient(180deg, ${C.night2} 0%, ${C.night3} 45%, #3A2A66 100%)` }}>
      <div style={{ position: "absolute", top: 18, right: 24, width: 38, height: 38, borderRadius: "50%", background: C.gold, boxShadow: `0 0 30px 8px ${C.gold}55`, opacity: .85 }} />
      {[{ t: "8%", l: "20%" }, { t: "20%", l: "85%" }, { t: "46%", l: "8%" }, { t: "60%", l: "92%" }].map((p, i) => (
        <div key={i} style={{ position: "absolute", top: p.t, left: p.l, width: 14, height: 14, borderRadius: "50%", background: C.peelA, filter: "blur(3px)", opacity: .5, animation: "bob 5s ease-in-out infinite", animationDelay: `${i * .7}s` }} />
      ))}
      <svg className="absolute bottom-0 left-0 w-full" height="120" viewBox="0 0 400 120" preserveAspectRatio="none">
        <path d="M0 30 Q 100 10 200 30 T 400 30" stroke="#fff" strokeOpacity=".06" fill="none" strokeWidth="2" />
        <path d="M0 60 Q 100 40 200 60 T 400 60" stroke="#fff" strokeOpacity=".05" fill="none" strokeWidth="2" />
        <path d="M0 90 Q 100 70 200 90 T 400 90" stroke="#fff" strokeOpacity=".04" fill="none" strokeWidth="2" />
      </svg>

      <div className="absolute top-3 left-5 text-xs" style={{ color: C.mute2 }}>河里漂着 {remaining} 个柑</div>

      {ORANGES.map((o, i) => {
        const st = caught[o.id];
        return (
          <button key={o.id} onClick={() => onOpen(o)} className="orange-card absolute flex flex-col items-center text-center"
            style={{ top: o.top, left: o.left, width: 86, height: 100, animationDuration: `${o.dur}s`, opacity: st ? .5 : 1 }}>
            <div className="relative" style={{ width: 64, height: 64, borderRadius: "50%", background: `linear-gradient(135deg, ${C.peelA}, ${C.peelB})`, boxShadow: "0 6px 14px rgba(0,0,0,.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "absolute", top: -4, width: 10, height: 12, background: C.jade, borderRadius: "0 60% 0 60%", transform: "rotate(-15deg)" }} />
              <Avatar name={o.name} size={46} i={i} />
              {st && (
                <div className="absolute -bottom-1 -right-1 rounded-full flex items-center justify-center" style={{ width: 20, height: 20, background: st === "matched" ? C.jade : C.gold, border: `2px solid ${C.night2}` }}>
                  <Check size={11} color="#fff" />
                </div>
              )}
            </div>
            <div className="mt-1" style={{ color: C.cream, fontSize: 11.5, fontWeight: 600 }}>{o.name}</div>
            {st === "pending" && <div style={{ color: C.gold, fontSize: 9.5 }}>等待同意</div>}
          </button>
        );
      })}

      <button onClick={onThrow} className="absolute flex items-center gap-1.5 px-4 py-2.5 rounded-full" style={{ bottom: 16, right: 16, background: `linear-gradient(135deg, ${C.peelA}, ${C.peelB})`, boxShadow: "0 8px 18px rgba(255,110,44,.4)" }}>
        <Plus size={16} color="#fff" /><span style={{ color: "#fff", fontSize: 13.5, fontWeight: 700 }}>抛柑</span>
      </button>
    </div>
  );
}

function OrangeModal({ orange, state, canCatch, onClose, onCatch, onChat }) {
  return (
    <Sheet onClose={onClose}>
      <div className="flex items-center gap-3 mb-4">
        <Avatar name={orange.name} size={56} />
        <div>
          <div style={{ fontFamily: F_DISPLAY, color: C.cream, fontSize: 18, fontWeight: 600 }}>{orange.name}，{orange.age}</div>
          <div className="flex items-center gap-1 mt-1" style={{ color: C.mute2, fontSize: 12.5 }}><MapPin size={12} /> {orange.area}</div>
        </div>
      </div>
      <div className="rounded-xl p-3 mb-5" style={{ background: "rgba(255,157,77,.08)" }}>
        <div style={{ color: C.cream, fontSize: 14 }}>{orange.tag}</div>
      </div>

      {state === "matched" ? (
        <>
          <div className="rounded-xl p-3 mb-3 flex items-center justify-between" style={{ background: "rgba(47,158,110,.12)", border: `1px solid ${C.jade}55` }}>
            <span style={{ color: C.cream, fontSize: 13 }}>联系方式</span>
            <span style={{ fontFamily: F_MONO, color: C.gold, fontSize: 13 }}>{orange.contact}</span>
          </div>
          <button onClick={onChat} className="w-full py-3 rounded-full text-sm font-bold" style={{ background: C.jade, color: "#fff" }}>开始聊天</button>
        </>
      ) : state === "pending" ? (
        <div className="text-center py-3 rounded-full text-sm" style={{ background: "rgba(244,201,93,.12)", color: C.gold }}>已发出请求，等 {orange.name} 同意后即可解锁联系方式</div>
      ) : canCatch ? (
        <button onClick={onCatch} className="w-full py-3 rounded-full text-sm font-bold" style={{ background: `linear-gradient(135deg, ${C.peelA}, ${C.peelB})`, color: "#fff" }}>捞起这个柑，发出认识请求</button>
      ) : (
        <div className="text-center py-3 rounded-full text-sm" style={{ background: "rgba(255,255,255,.06)", color: C.mute2 }}>今天已经捞满5个啦，明天再来 🌙</div>
      )}
    </Sheet>
  );
}

function ThrowModal({ onClose, onSubmit }) {
  return (
    <Sheet onClose={onClose}>
      <div className="flex items-center justify-between mb-4">
        <div style={{ fontFamily: F_DISPLAY, color: C.cream, fontSize: 18, fontWeight: 600 }}>丢一个柑进河里</div>
        <button onClick={onClose}><X size={18} color={C.mute2} /></button>
      </div>
      <SheetInput label="一句话介绍自己" placeholder="例如：周末喜欢爬山🌄" />
      <SheetInput label="联系方式（对方捞到并通过后才看到）" placeholder="IG @your_handle 或 WhatsApp" />
      <div className="flex items-center gap-1.5 mb-4" style={{ color: C.mute, fontSize: 11 }}><Shield size={12} /> 每天限丢 1 个柑，避免刷屏</div>
      <button onClick={onSubmit} className="w-full py-3 rounded-full text-sm font-bold" style={{ background: `linear-gradient(135deg, ${C.peelA}, ${C.peelB})`, color: "#fff" }}>丢进河里 🍊</button>
    </Sheet>
  );
}

/* ============ 通知 ============ */
function NotifPanel({ notifs, onClose, onApprove, onChat }) {
  const icon = { request: "🍊", match: "💛", like: "❤️" };
  return (
    <FullScreen title="通知" onBack={onClose}>
      <div className="px-5 py-4 space-y-3">
        {notifs.map((n, i) => (
          <div key={n.id} className="rounded-2xl p-4 flex items-center gap-3" style={{ background: n.unread ? "rgba(255,157,77,.07)" : C.night2 }}>
            <Avatar name={n.name} size={42} i={i} />
            <div className="flex-1">
              <div style={{ color: C.cream, fontSize: 13.5 }}><b>{n.name}</b> {n.text}</div>
            </div>
            {n.type === "request" && <button onClick={() => onApprove(n)} className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: C.jade, color: "#fff" }}>同意</button>}
            {n.type === "match" && <button onClick={() => onChat(n)} className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: C.peelB, color: "#fff" }}>打招呼</button>}
            {n.type === "like" && <span style={{ fontSize: 18 }}>{icon[n.type]}</span>}
          </div>
        ))}
      </div>
    </FullScreen>
  );
}

/* ============ 聊天 ============ */
function ChatScreen({ peer, onBack }) {
  const [msgs, setMsgs] = useState([
    { me: false, text: `你好呀～我是${peer.name} 👋` },
    { me: false, text: "看到我们都喜欢爬山，下次约？" },
  ]);
  const [val, setVal] = useState("");
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = () => {
    if (!val.trim()) return;
    setMsgs((m) => [...m, { me: true, text: val }]);
    setVal("");
    setTimeout(() => setMsgs((m) => [...m, { me: false, text: "好呀！周末有空 😄" }]), 900);
  };

  return (
    <div className="absolute inset-0 z-40 flex flex-col" style={{ background: "#1A1430" }}>
      <div className="flex items-center gap-3 px-4 pt-6 pb-3" style={{ background: C.night2, borderBottom: `1px solid ${C.night1}` }}>
        <button onClick={onBack}><ChevronLeft size={22} color={C.cream} /></button>
        <Avatar name={peer.name} size={36} />
        <div>
          <div style={{ color: C.cream, fontSize: 14.5, fontWeight: 600 }}>{peer.name}</div>
          <div style={{ color: C.jade, fontSize: 11 }}>● 在线</div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-none px-4 py-4 space-y-2.5">
        <div className="text-center text-[11px] mb-2" style={{ color: C.mute }}>你们已通过捞柑互相认识 🍊</div>
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.me ? "justify-end" : "justify-start"}`}>
            <div className="max-w-[75%] px-3.5 py-2.5 text-sm fade-up" style={{ background: m.me ? `linear-gradient(135deg, ${C.peelA}, ${C.peelB})` : C.night2, color: m.me ? "#fff" : C.cream, borderRadius: m.me ? "16px 16px 4px 16px" : "16px 16px 16px 4px", lineHeight: 1.45 }}>{m.text}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="flex items-center gap-2 px-4 py-3" style={{ background: C.night2, paddingBottom: 22 }}>
        <input value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="说点什么…" className="flex-1 px-4 py-2.5 rounded-full text-sm outline-none" style={{ background: "rgba(255,255,255,.06)", color: C.cream }} />
        <button onClick={send} className="rounded-full flex items-center justify-center" style={{ width: 42, height: 42, background: `linear-gradient(135deg, ${C.peelA}, ${C.peelB})` }}><Send size={17} color="#fff" /></button>
      </div>
    </div>
  );
}

/* ============ 配对 ============ */
function MatchTab({ showToast }) {
  const [idx, setIdx] = useState(0);
  const cur = MATCHES[idx];
  const next = (m) => { showToast(m); setIdx((p) => p + 1); };
  if (!cur) return (
    <div className="h-full flex flex-col items-center justify-center px-8 text-center" style={{ color: C.mute2 }}>
      <Heart size={28} className="mb-3" style={{ opacity: .5 }} />
      <div style={{ fontSize: 13.5 }}>今天的推荐都看完了，明天会有新面孔</div>
    </div>
  );
  return (
    <div className="px-5 pt-5 pb-6">
      <div key={idx} className="rounded-3xl overflow-hidden fade-up" style={{ background: C.night2 }}>
        <div className="flex items-center justify-center" style={{ height: 230, background: `linear-gradient(135deg, ${GRADS[idx % GRADS.length][0]}, ${GRADS[idx % GRADS.length][1]})` }}>
          <Avatar name={cur.name} size={88} i={idx} />
        </div>
        <div className="p-5">
          <div className="flex items-baseline gap-2 mb-1">
            <span style={{ fontFamily: F_DISPLAY, color: C.cream, fontSize: 20, fontWeight: 600 }}>{cur.name}</span>
            <span style={{ color: C.mute2, fontSize: 14 }}>{cur.age}</span>
          </div>
          <div className="flex items-center gap-1 mb-3" style={{ color: C.mute2, fontSize: 12.5 }}><MapPin size={12} /> {cur.area}</div>
          <div style={{ color: C.cream, fontSize: 13.5, marginBottom: 12 }}>{cur.bio}</div>
          <div className="flex gap-2 flex-wrap">
            {cur.tags.map((t) => <span key={t} className="px-2.5 py-1 rounded-full text-xs" style={{ background: "rgba(255,157,77,.12)", color: C.peelA }}>{t}</span>)}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-8 mt-6">
        <button onClick={() => next("已划走")} className="rounded-full flex items-center justify-center" style={{ width: 56, height: 56, background: "rgba(255,255,255,.08)" }}><X size={24} color={C.mute2} /></button>
        <button onClick={() => next("已喜欢，等待对方也喜欢你")} className="rounded-full flex items-center justify-center" style={{ width: 64, height: 64, background: `linear-gradient(135deg, ${C.peelA}, ${C.peelB})`, boxShadow: "0 8px 18px rgba(255,110,44,.4)" }}><Heart size={28} color="#fff" /></button>
      </div>
      <div className="text-center mt-4 text-[11px]" style={{ color: C.mute }}>双方都喜欢才会配对成功并开聊</div>
    </div>
  );
}

/* ============ 派对 + 语音配对 ============ */
function PartyTab({ showToast, onEnter }) {
  const [vs, setVs] = useState("idle");
  const timer = useRef(null);
  useEffect(() => {
    if (vs === "matching") timer.current = setTimeout(() => setVs("connected"), 1800);
    return () => clearTimeout(timer.current);
  }, [vs]);
  return (
    <div className="px-5 pt-5 pb-6">
      <div className="rounded-2xl p-5 mb-5" style={{ background: `linear-gradient(135deg, ${C.night3}, #4A3580)` }}>
        {vs === "idle" && (
          <>
            <div className="flex items-center gap-2 mb-1.5"><Mic size={16} color={C.gold} /><span style={{ color: C.cream, fontSize: 14, fontWeight: 700 }}>语音配对</span></div>
            <div style={{ color: "#D8CEF0", fontSize: 12.5, marginBottom: 14 }}>不看脸，先听声音 · 随时一键结束</div>
            <button onClick={() => setVs("matching")} className="px-5 py-2.5 rounded-full text-sm font-bold" style={{ background: C.gold, color: "#2A1F45" }}>立即配对</button>
          </>
        )}
        {vs === "matching" && <div className="flex items-center gap-3 py-2"><div className="rounded-full" style={{ width: 10, height: 10, background: C.gold, animation: "bob .8s ease-in-out infinite" }} /><span style={{ color: C.cream, fontSize: 13.5 }}>正在为你寻找语音对象…</span></div>}
        {vs === "connected" && (
          <div>
            <div className="flex items-center gap-3 mb-4"><Avatar name="思颖" size={48} i={2} /><div><div style={{ color: C.cream, fontSize: 14.5, fontWeight: 700 }}>思颖，23</div><div style={{ color: "#D8CEF0", fontSize: 12 }}>通话中 · 00:24</div></div></div>
            <button onClick={() => { setVs("idle"); showToast("通话已结束"); }} className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold" style={{ background: C.red, color: "#fff" }}><PhoneOff size={15} /> 结束通话</button>
          </div>
        )}
      </div>
      <div className="flex items-center gap-1.5 mb-3" style={{ color: C.mute2, fontSize: 12.5 }}><PartyPopper size={14} /> 正在进行的派对</div>
      <div className="space-y-3">
        {PARTIES.map((p, i) => (
          <div key={p.id} className="rounded-2xl p-4 flex items-center justify-between" style={{ background: C.night2 }}>
            <div className="flex items-center gap-3">
              <Avatar name={p.host} size={42} i={i} />
              <div>
                <div style={{ color: C.cream, fontSize: 13.5, fontWeight: 600 }}>{p.title}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded-full text-[11px]" style={{ background: "rgba(255,157,77,.12)", color: C.peelA }}>{p.tag}</span>
                  <span style={{ color: C.mute2, fontSize: 11.5 }}>{p.count}人</span>
                  {p.live && <span style={{ color: C.red, fontSize: 11.5, fontWeight: 700 }}>● LIVE</span>}
                </div>
              </div>
            </div>
            <button onClick={() => onEnter(p)} className="px-3.5 py-1.5 rounded-full text-xs font-bold" style={{ background: "rgba(255,255,255,.08)", color: C.cream }}>进入</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function VoiceRoom({ party, onLeave }) {
  const [muted, setMuted] = useState(true);
  const seats = [
    { name: party.host, host: true, speaking: true },
    { name: "小美", speaking: false }, { name: "阿俊", speaking: true },
    { name: "丽华", speaking: false }, { name: "你", self: true, speaking: !muted },
    { name: "", empty: true }, { name: "", empty: true }, { name: "", empty: true },
  ];
  return (
    <div className="absolute inset-0 z-40 flex flex-col" style={{ background: `linear-gradient(180deg, ${C.night3}, #1A1430)` }}>
      <div className="flex items-center gap-3 px-4 pt-6 pb-3">
        <button onClick={onLeave}><ChevronLeft size={22} color={C.cream} /></button>
        <div className="flex-1">
          <div style={{ color: C.cream, fontSize: 15, fontWeight: 700 }}>{party.title}</div>
          <div style={{ color: C.mute2, fontSize: 11.5 }}>{party.count}人在房 · {party.tag}</div>
        </div>
        <button><MoreHorizontal size={20} color={C.mute2} /></button>
      </div>
      <div className="grid grid-cols-4 gap-3 px-5 py-5">
        {seats.map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            {s.empty ? (
              <div className="rounded-full flex items-center justify-center" style={{ width: 56, height: 56, background: "rgba(255,255,255,.05)", border: "1px dashed rgba(255,255,255,.15)" }}><Plus size={18} color={C.mute} /></div>
            ) : (
              <div style={{ animation: s.speaking ? "pulseRing 1.4s infinite" : "none", borderRadius: "50%" }}>
                <Avatar name={s.name} size={56} i={i} ring={s.host ? C.gold : s.self ? C.peelA : undefined} />
              </div>
            )}
            <span style={{ color: s.empty ? C.mute : C.cream, fontSize: 11 }} className="flex items-center gap-0.5">
              {s.host && <Crown size={11} color={C.gold} />}{s.empty ? "空位" : s.name}
            </span>
          </div>
        ))}
      </div>
      <div className="flex-1" />
      <div className="flex items-center justify-between px-5 py-4" style={{ paddingBottom: 24, borderTop: `1px solid ${C.night1}` }}>
        <div className="flex-1 px-4 py-2.5 rounded-full mr-3 text-sm" style={{ background: "rgba(255,255,255,.06)", color: C.mute }}>聊点什么…</div>
        <button onClick={() => setMuted((m) => !m)} className="rounded-full flex items-center justify-center mr-2" style={{ width: 46, height: 46, background: muted ? "rgba(255,255,255,.08)" : C.jade }}>
          {muted ? <MicOff size={19} color={C.mute2} /> : <Mic size={19} color="#fff" />}
        </button>
        <button onClick={onLeave} className="rounded-full flex items-center justify-center" style={{ width: 46, height: 46, background: C.red }}><PhoneOff size={19} color="#fff" /></button>
      </div>
    </div>
  );
}

/* ============ 广场 ============ */
function PlazaTab({ posts, setPosts, onCompose }) {
  const toggle = (id) => setPosts((p) => p.map((x) => x.id === id ? { ...x, liked: !x.liked, likes: x.liked ? x.likes - 1 : x.likes + 1 } : x));
  return (
    <div className="px-5 pt-5 pb-24 space-y-4 relative">
      {posts.map((p, i) => (
        <div key={p.id} className="rounded-2xl p-4 fade-up" style={{ background: C.night2 }}>
          <div className="flex items-center gap-2.5 mb-3">
            <Avatar name={p.name} size={38} i={i} />
            <div><div style={{ color: C.cream, fontSize: 13.5, fontWeight: 600 }}>{p.name}</div><div style={{ color: C.mute, fontSize: 11 }}>{p.time}</div></div>
          </div>
          <div style={{ color: C.cream, fontSize: 13.5, marginBottom: p.img ? 10 : 12, lineHeight: 1.5 }}>{p.text}</div>
          {p.img && <div className="rounded-xl mb-3" style={{ height: 130, background: `linear-gradient(135deg, ${GRADS[i % GRADS.length][0]}33, ${GRADS[i % GRADS.length][1]}33)` }} />}
          <div className="flex items-center gap-5">
            <button onClick={() => toggle(p.id)} className="flex items-center gap-1.5"><Heart size={16} color={p.liked ? C.peelA : C.mute} fill={p.liked ? C.peelA : "none"} /><span style={{ color: C.mute, fontSize: 12 }}>{p.likes}</span></button>
            <div className="flex items-center gap-1.5"><MessageCircle size={16} color={C.mute} /><span style={{ color: C.mute, fontSize: 12 }}>{p.comments}</span></div>
          </div>
        </div>
      ))}
      <button onClick={onCompose} className="fixed rounded-full flex items-center justify-center" style={{ bottom: 96, right: "calc(50% - 196px + 20px)", width: 52, height: 52, background: `linear-gradient(135deg, ${C.peelA}, ${C.peelB})`, boxShadow: "0 8px 18px rgba(255,110,44,.4)" }}><Plus size={24} color="#fff" /></button>
    </div>
  );
}

function ComposeModal({ onClose, onPost }) {
  const [text, setText] = useState("");
  return (
    <Sheet onClose={onClose}>
      <div className="flex items-center justify-between mb-4">
        <div style={{ fontFamily: F_DISPLAY, color: C.cream, fontSize: 18, fontWeight: 600 }}>发布到广场</div>
        <button onClick={onClose}><X size={18} color={C.mute2} /></button>
      </div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="此刻在想什么？" rows={4} className="w-full px-3 py-3 rounded-xl text-sm outline-none resize-none mb-3" style={{ background: "rgba(255,255,255,.06)", color: C.cream }} />
      <div className="flex items-center gap-3 mb-4">
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs" style={{ background: "rgba(255,255,255,.06)", color: C.mute2 }}><ImageIcon size={14} /> 添加图片</button>
      </div>
      <button onClick={() => text.trim() && onPost(text)} className="w-full py-3 rounded-full text-sm font-bold" style={{ background: text.trim() ? `linear-gradient(135deg, ${C.peelA}, ${C.peelB})` : "rgba(255,255,255,.08)", color: text.trim() ? "#fff" : C.mute }}>发布</button>
    </Sheet>
  );
}

/* ============ 我的空间 ============ */
function MeTab({ caughtCount, onEdit }) {
  const stats = [{ label: "丢出的柑", value: 1 }, { label: "捞到的柑", value: caughtCount }, { label: "关注", value: 12 }, { label: "粉丝", value: 28 }];
  return (
    <div className="pb-6">
      <div className="px-5 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <Avatar name="伟" size={64} />
          <div>
            <div style={{ fontFamily: F_DISPLAY, color: C.cream, fontSize: 18, fontWeight: 600 }}>伟杰，27</div>
            <div className="flex items-center gap-1 mt-1" style={{ color: C.mute2, fontSize: 12 }}><MapPin size={11} /> 吉隆坡</div>
          </div>
        </div>
        <button onClick={onEdit}><Settings size={18} color={C.mute2} /></button>
      </div>
      <div style={{ color: "#D8CEF0", fontSize: 13, margin: "14px 20px 0" }}>平面设计师，喜欢冲浪和深夜的茶餐室 ☕</div>
      <div className="grid grid-cols-4 mt-5 px-5">
        {stats.map((s) => <div key={s.label} className="text-center"><div style={{ fontFamily: F_MONO, color: C.gold, fontSize: 16, fontWeight: 600 }}>{s.value}</div><div style={{ color: C.mute, fontSize: 11, marginTop: 2 }}>{s.label}</div></div>)}
      </div>
      <button onClick={onEdit} className="mx-5 mt-5 w-[calc(100%-40px)] py-2.5 rounded-full text-sm font-bold" style={{ background: "rgba(255,255,255,.08)", color: C.cream }}>编辑资料</button>
      <div className="px-5 mt-6 mb-2 text-xs" style={{ color: C.mute2 }}>我的相册</div>
      <div className="grid grid-cols-3 gap-1.5 px-5">
        {Array.from({ length: 6 }).map((_, i) => <div key={i} className="rounded-lg" style={{ aspectRatio: "1/1", background: `linear-gradient(135deg, ${GRADS[i % GRADS.length][0]}55, ${GRADS[i % GRADS.length][1]}55)` }} />)}
      </div>
    </div>
  );
}

function EditProfile({ onClose, onSave }) {
  return (
    <FullScreen title="编辑资料" onBack={onClose} action={<button onClick={onSave} style={{ color: C.gold, fontSize: 14, fontWeight: 700 }}>保存</button>}>
      <div className="px-5 py-5">
        <div className="flex justify-center mb-6"><div className="relative"><Avatar name="伟" size={84} /><div className="absolute -bottom-1 -right-1 rounded-full flex items-center justify-center" style={{ width: 28, height: 28, background: C.peelB }}><Plus size={15} color="#fff" /></div></div></div>
        <SheetInput label="昵称" value="伟杰" />
        <SheetInput label="一句话介绍" value="平面设计师，喜欢冲浪和深夜的茶餐室 ☕" />
        <SheetInput label="所在地区" value="吉隆坡" />
        <div className="mb-2 text-xs mt-1" style={{ color: C.mute2 }}>兴趣标签</div>
        <div className="flex gap-2 flex-wrap">
          {["设计", "冲浪", "夜聊", "咖啡", "+ 添加"].map((t) => <span key={t} className="px-3 py-1.5 rounded-full text-xs" style={{ background: t === "+ 添加" ? "rgba(255,255,255,.06)" : "rgba(255,157,77,.12)", color: t === "+ 添加" ? C.mute2 : C.peelA }}>{t}</span>)}
        </div>
      </div>
    </FullScreen>
  );
}

/* ============ 复用组件 ============ */
function Sheet({ children, onClose }) {
  return (
    <div className="absolute inset-0 flex items-end z-30" style={{ background: "rgba(8,5,18,.6)" }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full rounded-t-3xl p-6 fade-up" style={{ background: C.night2, borderTop: `1px solid ${C.gold}33` }}>{children}</div>
    </div>
  );
}
function SheetInput({ label, placeholder, value }) {
  return (
    <div className="mb-4">
      <label className="block text-xs mb-1.5" style={{ color: C.mute2 }}>{label}</label>
      <input defaultValue={value} placeholder={placeholder} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ background: "rgba(255,255,255,.06)", color: C.cream }} />
    </div>
  );
}
function FullScreen({ title, onBack, action, children }) {
  return (
    <div className="absolute inset-0 z-40 flex flex-col" style={{ background: "#1A1430" }}>
      <div className="flex items-center justify-between px-4 pt-6 pb-3" style={{ background: C.night2, borderBottom: `1px solid ${C.night1}` }}>
        <button onClick={onBack}><ChevronLeft size={22} color={C.cream} /></button>
        <div style={{ color: C.cream, fontSize: 16, fontWeight: 600 }}>{title}</div>
        <div style={{ minWidth: 22 }}>{action}</div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-none">{children}</div>
    </div>
  );
}

/* ============ 底部导航 ============ */
function BottomNav({ tab, setTab }) {
  const items = [
    { key: "river", label: "捞柑", icon: Waves },
    { key: "match", label: "配对", icon: Heart },
    { key: "party", label: "派对", icon: PartyPopper },
    { key: "plaza", label: "广场", icon: Users },
    { key: "me", label: "我的", icon: User },
  ];
  return (
    <div className="flex items-center justify-between px-3 pt-2" style={{ background: C.night2, borderTop: `1px solid ${C.night1}`, paddingBottom: 18 }}>
      {items.map(({ key, label, icon: Icon }) => {
        const active = tab === key;
        return (
          <button key={key} onClick={() => setTab(key)} className="flex-1 flex flex-col items-center gap-1 py-1.5">
            <Icon size={20} color={active ? C.peelA : "#73699A"} fill={active && key === "match" ? C.peelA : "none"} />
            <span style={{ fontSize: 10.5, color: active ? C.peelA : "#73699A", fontWeight: active ? 700 : 500 }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
