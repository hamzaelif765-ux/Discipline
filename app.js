"use strict";
/* ===== DEFAULTS. Also editable in the Edit tab. [id,start,end,name,purpose,weight,category] ===== */
const SCHEDULE=[ // Monday-Thursday
["s1","05:15","05:45","Wake up, Wudu & Fajr","Start the day bowing to Allah. No phone checking.",2,"Deen"],
["s2","05:45","06:15","Quran & Coffee / Pre-workout","Spiritual detox. 10-15 min Quran minimum.",2,"Deen"],
["s3","06:15","08:15","RBI Grade B Deep Study","Sharpest time. Phone in another room. Core concepts.",3,"Career"],
["s4","08:15","09:30","Newspaper, Breakfast & Grooming","The Hindu/Mint. High-protein breakfast. Dress like a gentleman.",1,"Body"],
["s5","09:30","13:30","WFH Deep Work (first half)","Only office work. No social media.",2,"Career"],
["s6","13:30","14:30","Lunch & Dhuhr","Halal, clean diet. Pray Dhuhr.",1,"Deen"],
["s7","14:30","17:30","WFH (second half) & Asr","Finish remaining work. Pray Asr.",2,"Career"],
["s8","17:30","18:30","RBI Current Affairs","PIB summaries or mock quizzes.",2,"Career"],
["s9","18:30","19:00","Maghrib & Pre-workout","Pray, then fruit or pre-workout meal.",1,"Deen"],
["s10","19:00","20:30","Gym / Intense Workout","Exhaustion kills cravings.",3,"Body"],
["s11","20:30","21:15","Dinner, Shower & Isha","Family and deen.",1,"Deen"],
["s12","21:15","22:00","GF Time & Quality Talk","Calm, mature talk. No toxic arguments.",1,"Relationship"],
["s13","22:00","22:30","Reading, Journaling & Tracker","Finance/self-help book. Plan tomorrow.",2,"Mind"],
["s14","22:30","05:15","Sleep (7 hours)","Phone screen strictly off.",2,"Body"]];
const SCHEDULE_FR=[ // Friday: Jumu'ah
["s1","05:15","05:45","Wake up, Wudu & Fajr","Start the day bowing to Allah.",2,"Deen"],
["s2","05:45","06:15","Quran & Coffee","Quran recitation.",2,"Deen"],
["s3","06:15","08:15","RBI Grade B Deep Study","Sharpest time. Phone away.",3,"Career"],
["s4","08:15","09:30","Breakfast & Grooming","High-protein breakfast, get ready.",1,"Body"],
["s5","09:30","12:00","WFH Deep Work","Office work, finish early.",2,"Career"],
["f1","12:00","12:30","Ghusl, Attar & Clean Clothes","Jumu'ah ki tayyari: ghusl, saaf kapde, khushbu.",1,"Deen"],
["f2","12:30","14:00","Jumu'ah (Khutbah + Namaz)","Jaldi masjid, khutbah khamoshi se suno.",3,"Deen"],
["f3","14:00","14:30","Lunch","Halal, clean food.",1,"Body"],
["s7","14:30","17:30","WFH (second half) & Asr","Finish remaining work. Pray Asr.",2,"Career"],
["f4","17:30","18:30","Surah Kahf, Durood & Dua","Jumu'ah ka khaas waqt. Durood aur dua zyada.",2,"Deen"],
["s9","18:30","19:00","Maghrib & Pre-workout","Pray, then fruit or meal.",1,"Deen"],
["s10","19:00","20:30","Gym / Workout","Heavy lifting or cardio.",3,"Body"],
["s11","20:30","21:15","Dinner, Shower & Isha","Family and deen.",1,"Deen"],
["s12","21:15","22:00","GF Time & Quality Talk","Calm, mature talk.",1,"Relationship"],
["s13","22:00","22:30","Reading, Journaling & Tracker","Plan tomorrow.",2,"Mind"],
["s14","22:30","05:15","Sleep (7 hours)","Phone screen strictly off.",2,"Body"]];
const SCHEDULE_WE=[ // Saturday-Sunday: more free time
["s1","05:15","05:45","Wake up, Wudu & Fajr","Start the day bowing to Allah.",2,"Deen"],
["s2","05:45","06:30","Quran & Coffee","Quran recitation, calm start.",2,"Deen"],
["s3","06:30","09:30","Deep Study","Your main study subject, phone away.",3,"Career"],
["s4","09:30","10:30","Breakfast & Grooming","High-protein breakfast, get ready.",1,"Body"],
["w1","10:30","12:30","Mock Test & Revision","Test yourself, review weak areas.",2,"Career"],
["w2","12:30","13:30","Free Time","Rest, hobby, or friends. No guilt.",1,"Mind"],
["s6","13:30","14:30","Lunch & Dhuhr","Halal, clean food. Pray Dhuhr.",1,"Deen"],
["w3","14:30","16:30","Family Time & Rest","Parents/family, errands, short nap.",2,"Relationship"],
["w4","16:30","18:30","Free Time & Asr","Walk, outdoors, hobby. Pray Asr.",1,"Mind"],
["s9","18:30","19:00","Maghrib & Pre-workout","Pray, then a fruit or meal.",1,"Deen"],
["s10","19:00","20:30","Gym / Workout","Heavy lifting or cardio.",3,"Body"],
["s11","20:30","21:15","Dinner, Shower & Isha","Family and deen.",1,"Deen"],
["s12","21:15","22:00","GF Time & Quality Talk","Calm, mature talk.",1,"Relationship"],
["s13","22:00","22:30","Reading, Journaling & Tracker","Read, plan tomorrow.",2,"Mind"],
["s14","22:30","05:15","Sleep (7 hours)","Phone screen strictly off.",2,"Body"]];
const HABITS=[ // [id,label,weight,category,core(1/0)]. "Core" mode shows only core ones.
["nopmo","No porn / no PMO today",10,"Character",1],["gaze","No lustful gazing / inappropriate scrolling",5,"Character",1],
["notox","No toxicity (abuse, arguments, gheebat)",6,"Character",1],["noneg","No negativity / self-pity / negative self-talk",3,"Character",1],
["lowgaze","Lowered gaze (ghadd al-basar) practiced",3,"Character",0],["nosmoke","No smoking / nasha / junk or sugar binge",3,"Character",0],
["nodoom","No doomscrolling (within limit)",3,"Character",1],["truth","Spoke truthfully, kept every promise",3,"Character",1],
["phone","Phone-free first hour after waking",2,"Character",0],
["fajr","Fajr on time",4,"Deen",1],["dhuhr","Dhuhr on time (Friday: Jumu'ah)",4,"Deen",1],["asr","Asr on time",4,"Deen",1],["maghrib","Maghrib on time",4,"Deen",1],["isha","Isha on time",4,"Deen",1],
["sunnah","Sunnah prayers / Witr",2,"Deen",0],["adhkar","Morning & evening adhkar",2,"Deen",1],["istighfar","Istighfar & salawat",1,"Deen",0],
["sadaqah","Gave sadaqah / one good deed",1,"Deen",0],["tahajjud","Dua / Tahajjud",1,"Deen",0],
["water","Drank 3+ litres water",2,"Body",1],["protein","Protein target hit",2,"Body",0],["steps","8,000+ steps",1,"Body",0],["sleep","Slept by 10:30 PM",2,"Body",1],
["stretch","Stretching / mobility 10 min",1,"Body",0],["skin","Skincare, grooming, clean clothes",1,"Body",0],
["study","Study hours done",3,"Career",1],["mock","Mock test / quiz completed",2,"Career",0],
["fin","Learned one finance/economics concept",2,"Mind",0],["read","Read 10+ pages",1,"Mind",0],["grat","Gratitude: 3 things",1,"Mind",0],["plan","Planned tomorrow's top 3 tasks",1,"Mind",0],
["family","Real time with parents/family",2,"Relationship",0],["gf","Calm & respectful with girlfriend",2,"Relationship",0],["help","Called or helped one person",1,"Relationship",1],
["finlearn","Finance learning (30 min)",2,"Mind",0]]; // v7: new habit, non-core by default
const TOPICS=[["t1","GA: Banking awareness"],["t2","GA: Current affairs"],["t3","English: Reading comprehension"],["t4","English: Grammar & vocab"],["t5","Quant: Arithmetic"],["t6","Quant: Data interpretation"],["t7","Reasoning: Puzzles & seating"],["t8","ESI: Growth & development"],["t9","ESI: Financial system"],["t10","FM: Financial markets"],["t11","FM: Risk management"],["t12","Phase 2: Descriptive writing"]];
const PT={Fajr:"05:15",Dhuhr:"13:30",Asr:"17:15",Maghrib:"18:30",Isha:"20:45"}; // edit in Edit tab
const CATS=["Deen","Career","Body","Mind","Character","Relationship"];
const KEYS=[["nopmo","No-PMO"],["fajr","Fajr on time"],["s10","Gym"],["s3","Deep study"]];
const KIND={wd:"Weekday (Mon-Thu)",fr:"Friday (Jumu'ah)",we:"Weekend"};
const TRIG=["Boredom","Stress","Late night","Social media","Loneliness","Other"];
const QUOTES=["Verily, with hardship comes ease. (Quran 94:6)","Allah does not burden a soul beyond its capacity. (Quran 2:286)","Remember Me; I will remember you. (Quran 2:152)",
"Indeed, Allah is with the patient. (Quran 2:153)","Do not weaken and do not grieve. (Quran 3:139)","In the remembrance of Allah do hearts find rest. (Quran 13:28)",
"Whoever fears Allah, He makes a way out for him. (Quran 65:2)","Do not despair of the mercy of Allah. (Quran 39:53)","Allah does not change a people until they change themselves. (Quran 13:11)",
"Seek help through patience and prayer. (Quran 2:45)","Those who strive for Us, We will guide them to Our ways. (Quran 29:69)","When you are free, strive. (Quran 94:7)",
"Allah is the best of planners; rely on Him. (Quran 3:159)","Actions are judged by intentions. (Hadith, Bukhari & Muslim)","The strong one is he who controls himself in anger. (Hadith, Bukhari & Muslim)",
"The best deeds are the consistent ones, even if small. (Hadith, Bukhari & Muslim)","Speak good or keep silent. (Hadith, Bukhari & Muslim)","The strong believer is better and more beloved to Allah than the weak. (Hadith, Muslim)",
"Modesty is part of faith. (Hadith, Bukhari & Muslim)","The best of you are the best in character. (Hadith, Bukhari)","Make things easy, do not make them difficult. (Hadith, Bukhari & Muslim)",
"True wealth is the richness of the soul. (Hadith, Bukhari & Muslim)","Every son of Adam errs, and the best of them are those who repent. (Hadith, Tirmidhi)",
"Part of a person's good Islam is leaving what does not concern him. (Hadith, Tirmidhi)","Take advantage of five before five: youth before old age, health before sickness, free time before busyness. (Hadith, Hakim)",
"We are what we repeatedly do. Excellence is a habit. (Will Durant)","Discipline is choosing between what you want now and what you want most. (Common saying)","Small steps, taken daily, move mountains. (Common saying)",
"You fall to the level of your systems, not your goals. (James Clear)","Motivation gets you started, habit keeps you going. (Jim Ryun)","Well done is better than well said. (Benjamin Franklin)","The pain of discipline is lighter than the pain of regret. (Common saying)"];
/* ===== HELPERS ===== */
const pad=n=>String(n).padStart(2,"0");
const dk=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`; // local (IST on the device) day key
const fromK=k=>new Date(k+"T00:00:00");
const todayK=()=>dk(new Date()); // recomputed each call: midnight rollover safe
const $=s=>document.querySelector(s),app=$("#app");
const jp=(s,d)=>{try{return JSON.parse(s)??d}catch(_){return d}};
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const nowHM=()=>{const n=new Date();return pad(n.getHours())+":"+pad(n.getMinutes())};
const mins=t=>{const p=t.split(":");return +p[0]*60+ +p[1]};
const reduced=()=>matchMedia("(prefers-reduced-motion: reduce)").matches;
/* ===== SAFE STORAGE (quota errors never crash the app) ===== */
let quotaT=0;
function sset(k,v){try{localStorage.setItem(k,typeof v==="string"?v:JSON.stringify(v));return true}catch(_){if(Date.now()-quotaT>5000){quotaT=Date.now();toast("Storage full! Pehle Export Backup karo (Journal tab), phir kuch purana data saaf karo.","warn")}return false}}
function vib(p){try{if(navigator.vibrate)navigator.vibrate(p)}catch(_){}}
function toast(msg,type){let c=$("#toast");if(!c)return;const t=document.createElement("div");t.className="toast "+(type||"");t.textContent=msg;c.appendChild(t);while(c.children.length>3)c.firstChild.remove();setTimeout(()=>t.remove(),type==="warn"?4200:2600)}
function copyText(t){return(navigator.clipboard&&window.isSecureContext?navigator.clipboard.writeText(t).then(()=>true):Promise.reject()).catch(()=>{try{const a=document.createElement("textarea");a.value=t;a.style.cssText="position:fixed;opacity:0;left:-99px";document.body.appendChild(a);a.select();const ok=document.execCommand("copy");a.remove();return ok}catch(_){return false}})}
function sheet(o){const m=$("#modal");m.hidden=false;document.body.classList.add("modal-open");
 m.innerHTML=`<div class="sheet" role="dialog" aria-modal="true" aria-label="${esc(o.title)}"><h2 style="margin-top:0">${esc(o.title)}</h2>${o.html}<div class="seg"><button class="btn g" data-sok>${esc(o.ok||"Save")}</button><button class="btn" data-sx>Cancel</button></div></div>`;
 const close=()=>{m.hidden=true;m.innerHTML="";document.body.classList.remove("modal-open")};
 m.onclick=e=>{if(e.target===m||e.target.closest("[data-sx]"))close();else if(e.target.closest("[data-sok]")&&o.onOk(m.querySelector(".sheet"))!==false)close()};
 const f=m.querySelector("input");if(f)f.focus()}
const modalOpen=()=>!$("#modal").hidden||!$("#urge").hidden||!$("#lock").hidden;
/* ===== STORAGE ===== */
const KEY="dos_v1";let db=jp(localStorage.getItem(KEY),{});
const BASE_F=["ticks","numbers","urgeLog","relapse","mood","energy","gym","note"];
function hasDataE(e){return !!e&&typeof e==="object"&&(Object.values(e.ticks||{}).some(Boolean)||Object.values(e.numbers||{}).some(v=>v!=null)||!!e.note||!!e.mood||!!e.energy||!!e.gym||(e.urgeLog||[]).length>0||(e.relapse||[]).length>0||Object.keys(e).some(k=>!BASE_F.includes(k)&&!!e[k]))}
const hasData=k=>hasDataE(db[k]);
Object.keys(db).forEach(k=>{if(!hasData(k))delete db[k]}); // drop blank days: they must not count as 0% days. Gym/diet/finance live in their own keys so they are never touched.
const save=()=>sset(KEY,db);
const ent=k=>db[k]||(db[k]={ticks:{},numbers:{},urgeLog:[]}); // only called on WRITE
/* ===== EDITABLE CONFIG ===== */
const defCfg=()=>({v:2,m7:1,wd:SCHEDULE.map(x=>[...x]),fr:SCHEDULE_FR.map(x=>[...x]),we:SCHEDULE_WE.map(x=>[...x]),habits:HABITS.map(x=>[...x]),topics:TOPICS.map(x=>[...x]),pt:{...PT}});
function loadCfg(){const c=jp(localStorage.dos_cfg,null),d=defCfg();if(!c||typeof c!=="object")return d;
 c.wd=c.wd||d.wd;c.we=c.we||d.we;c.habits=c.habits||d.habits;c.fr=c.fr||d.fr;c.topics=c.topics||d.topics;c.pt=c.pt||d.pt;
 if(!c.v){[...c.wd,...c.we].forEach(s=>{if(["s6","s9","s11"].includes(s[0]))s[5]=1;if(s[0]==="s1")s[5]=2}); // prayers no longer double counted
  c.habits.forEach(h=>{const m=d.habits.find(x=>x[0]===h[0]);h[4]=m?m[4]:1});c.v=2}
 if(!c.m7){ // v7 migration: add the Finance learning habit once (additive, idempotent, respects later deletion)
  if(!c.habits.some(h=>h[0]==="finlearn"))c.habits.push(["finlearn","Finance learning (30 min)",2,"Mind",0]);c.m7=1;try{localStorage.setItem("dos_cfg",JSON.stringify(c))}catch(_){}}
 return c}
let cfg=loadCfg(),core=localStorage.dos_core!=="0";
const srt=a=>a.sort((x,y)=>x[1]<y[1]?-1:x[1]>y[1]?1:0);
const saveCfg=()=>{srt(cfg.wd);srt(cfg.fr);srt(cfg.we);sset("dos_cfg",cfg)};
const kind=k=>{const g=fromK(k).getDay();return g===5?"fr":g===0||g===6?"we":"wd"};
const sch=k=>cfg[kind(k)];
/* zoom = root font-size scale (NOT css zoom): charts and layout measure correctly */
const zoom=()=>{const z=+(localStorage.dos_zoom||90);return z>=80&&z<=120?z:90};
const applyZoom=z=>document.documentElement.style.setProperty("--ui-scale",z/100);
const setZoom=z=>{z=Math.min(120,Math.max(80,Math.round(z)));sset("dos_zoom",String(z));applyZoom(z)};
const theme=()=>document.documentElement.dataset.theme==="light"?"light":"dark";
const setTheme=t=>{document.documentElement.dataset.theme=t;sset("dos_theme",t);const m=$("#tc");if(m)m.content=t==="light"?"#f6f4ef":"#0f1419"};
/* ===== PURE ANALYTICS ===== */
const habs=()=>cfg.habits.filter(h=>!core||h[4]);
const allFor=k=>[...sch(k).map(s=>({id:s[0],w:+s[5],c:s[6]})),...habs().map(h=>({id:h[0],w:+h[2],c:h[3]}))];
const rawScore=(k,cat)=>{const t=db[k]?.ticks||{};let a=0,b=0;allFor(k).forEach(i=>{if(cat&&i.c!==cat)return;b+=i.w;if(t[i.id])a+=i.w});return b?Math.round(100*a/b):0};
const gated=k=>habs().some(h=>h[0]==="nopmo")&&!db[k]?.ticks?.nopmo; // No-PMO is a gate
const score=(k,cat)=>{const r=rawScore(k,cat);return !cat&&gated(k)?Math.min(r,60):r};
const lastN=(n,end=new Date())=>Array.from({length:n},(_,i)=>{const d=new Date(end);d.setDate(d.getDate()-(n-1-i));return dk(d)});
const avg=a=>a.length?Math.round(a.reduce((x,y)=>x+y,0)/a.length):0;
const avgScore=ks=>avg(ks.filter(hasData).map(k=>score(k)));
const streak=id=>{let d=new Date();if(!db[dk(d)]?.ticks?.[id])d.setDate(d.getDate()-1);let n=0;while(db[dk(d)]?.ticks?.[id]){n++;d.setDate(d.getDate()-1)}return n};
const best=id=>{let b=0,n=0;lastN(730).forEach(k=>{if(db[k]?.ticks?.[id]){n++;b=Math.max(b,n)}else n=0});return b};
const consist=(id,n)=>{const ks=lastN(n).filter(k=>allFor(k).some(i=>i.id===id));return ks.length?Math.round(100*ks.filter(k=>db[k]?.ticks?.[id]).length/ks.length):0};
const label=id=>([...cfg.wd,...cfg.fr,...cfg.we].find(s=>s[0]===id)||[])[3]||(cfg.habits.find(h=>h[0]===id)||[])[1]||id;
const delta=(a,b)=>{const p=b?Math.round(100*(a-b)/b):0;return `${p>=0?"▲":"▼"} ${Math.abs(p)}% (${a}% vs ${b}%)`};
const heat=k=>`<div class="cell" title="${k}" style="${hasData(k)?`background:rgba(111,183,168,${.15+score(k)/120})`:""}"></div>`;
const urgeTs=u=>typeof u==="number"?u:u.t;
/* ===== GAMIFICATION (derived only from existing scores; never changes them) ===== */
const MILE=[3,7,14,30,60,100];
const xpTotal=()=>Object.keys(db).filter(hasData).reduce((a,k)=>a+score(k),0);
const lvlOf=x=>Math.floor(Math.sqrt(x/60))+1,xpAt=l=>60*(l-1)*(l-1);
function dayStreak(){const ok=k=>hasData(k)&&score(k)>=70;let d=new Date(),n=0;if(!ok(dk(d)))d.setDate(d.getDate()-1);while(ok(dk(d))){n++;d.setDate(d.getDate()-1)}return n}
function bestDayStreak(){let b=0,n=0;lastN(730).forEach(k=>{if(hasData(k)&&score(k)>=70){n++;b=Math.max(b,n)}else n=0});return b}
const FLAME='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-9z"/></svg>';
function gamHTML(){const x=xpTotal(),l=lvlOf(x),a=xpAt(l),b=xpAt(l+1),st=dayStreak(),nm=MILE.find(m=>m>st),T=new Date(),w=lastN(7),sc=w.map(k=>hasData(k)?score(k):0),pw=lastN(7,new Date(T.getTime()-7*864e5));
 return `<div class="hd"><div><div class="mut">Level</div><b style="font-size:1.5rem">Lv ${l}</b></div><div class="flame" title="Din jab score 70%+ raha"><span>${FLAME}</span><span>${st} din</span></div><div style="text-align:right"><div class="mut">Weekly score</div><b style="font-size:1.5rem">${avgScore(w)}%</b></div></div>
 <div class="xpbar" role="progressbar" aria-valuenow="${x-a}" aria-valuemin="0" aria-valuemax="${b-a}"><i style="width:${Math.round(100*(x-a)/(b-a))}%"></i></div><div class="mut">${x} XP · Lv ${l+1} me ${b-x} XP baaki${nm?` · agla flame badge: ${nm} din`:" · saare flame badges mil gaye"}</div>
 <div class="wk" aria-label="Last 7 days score" role="img">${sc.map(v=>`<i style="height:${Math.max(6,v)}%"></i>`).join("")}</div><div class="mut">Pichle hafte se: ${delta(avgScore(w),avgScore(pw))}</div>`}
const gamUpd=()=>{const g=$("#gam");if(g&&view==="today")g.innerHTML=gamHTML()};
const ACH=[
["first","🌱","First step","Pehli entry ya tick",()=>Object.keys(db).some(hasData)],
...MILE.map(n=>["fl"+n,"🔥",n+"-day streak",n+" din lagataar 70%+ score",()=>bestDayStreak()>=n]),
["pray7","🕌","7 prayers on time","Paanchon namaz time par, 7 din lagataar",()=>Math.min(...["fajr","dhuhr","asr","maghrib","isha"].map(streak))>=7],
["pmo7","🛡️","No-PMO 7 days","7 din lagataar",()=>best("nopmo")>=7],["pmo30","🛡️","No-PMO 30 days","30 din lagataar",()=>best("nopmo")>=30],
["d90","⭐","90% day","Ek din 90%+ score",()=>Object.keys(db).some(k=>hasData(k)&&score(k)>=90)],
["water7","💧","Hydration week","7 din 3L+ paani",()=>best("water")>=7],
["gym1","💪","First workout","Gym tab se pehla workout finish",()=>GYM.stat().done>=1],
["pr1","🏆","First PR","Pehla personal record",()=>GYM.stat().pr],
["fin0","📘","Finance Level 0 complete","L0 ke saare topics Done",()=>FIN.levelDone("L0")],
["fin1","📗","Finance Level 1 complete","L1 ke saare topics Done",()=>FIN.levelDone("L1")]];
let achT=0;
function checkAch(){clearTimeout(achT);achT=setTimeout(()=>{try{const first=localStorage.getItem("dos_ach")===null,got=jp(localStorage.getItem("dos_ach"),{});let ch=false;
 ACH.forEach(a=>{if(got[a[0]])return;let ok=false;try{ok=!!a[4]()}catch(_){}if(ok){got[a[0]]=todayK();ch=true;if(!first){toast(a[1]+" Badge unlock: "+a[2],"ok");vib([30,30,60])}}});
 if(ch||first)sset("dos_ach",got)}catch(_){}},700)}
function celebrate(){vib([40,30,40,30,80]);const w=$("#ringw");if(w){w.classList.add("glow");setTimeout(()=>w.classList.remove("glow"),1800)}if(reduced())return;
 const cols=["#d4af5a","#6fb7a8","#e8e5de","#d98a8a"];for(let i=0;i<30;i++){const s=document.createElement("i");s.className="cf";s.style.cssText=`left:${Math.random()*100}vw;background:${cols[i%4]};--dx:${Math.round((Math.random()-.5)*140)}px;animation-delay:${(Math.random()*.4).toFixed(2)}s`;document.body.appendChild(s);setTimeout(()=>s.remove(),2400)}}
/* ===== ICONS + TABS ===== */
const I=p=>`<svg viewBox="0 0 24 24" aria-hidden="true">${p}</svg>`;
const ICON={today:I('<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4M16 3v4M4 10h16M9 15l2 2 4-4"/>'),progress:I('<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>'),journal:I('<path d="M6 3h11a2 2 0 0 1 2 2v14H8a2 2 0 0 1-2-2z"/><path d="M6 17a2 2 0 0 1 2-2h11M10 8h6"/>'),namaz:I('<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>'),gym:I('<path d="M6 7v10M3 9v6M18 7v10M21 9v6M6 12h12"/>'),diet:I('<path d="M12 8c-3-2-7 0-7 5 0 4 3 7 5 7 1 0 1.5-.5 2-.5s1 .5 2 .5c2 0 5-3 5-7 0-5-4-7-7-5z"/><path d="M12 8c0-2 1-4 3-5"/>'),fin:I('<path d="M7 5h10M7 9h10M10 5c4 0 6 2 6 4s-2 4-6 4H7l8 7"/>'),edit:I('<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>'),
 urge:I('<path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z"/>'),water:I('<path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z"/>'),scale:I('<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8 10a4 4 0 0 1 8 0M12 10l2-2"/>')};
const TABS=[["today","Today"],["progress","Progress"],["journal","Journal"],["namaz","Namaz"],["gym","Gym"],["diet","Diet"],["fin","Finance"],["edit","Edit"]],ORDER=TABS.map(t=>t[0]);
const MODS={namaz:NAMAZ,gym:GYM,diet:DIET,fin:FIN};
$("#nav").innerHTML=TABS.map(t=>`<button data-v="${t[0]}" aria-label="${t[1]}">${ICON[t[0]]}<span>${t[1]}</span></button>`).join("");
/* ===== UI: TODAY ===== */
let cur=todayK(),view=ORDER.includes(location.hash.slice(1))?location.hash.slice(1):"today",rng="Weekly",lastDay=cur,scrolled=false,charts=[],trig="Other",prevS=0,lastView="",focusUid=null;const scrollMem={};
const CK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>';
const row=(id,name,sub,time,extra,now)=>`<div class="row ${now?"now":""}" ${now?'id="now"':""}><div>${time?`<div class="t">${time}</div>`:""}<div>${esc(name)}</div>${sub?`<div class="p">${esc(sub)}</div>`:""}${extra||""}</div><button class="ck ${db[cur]?.ticks?.[id]?"on":""}" role="checkbox" aria-checked="${!!db[cur]?.ticks?.[id]}" aria-label="${esc(name)}" data-id="${id}">${CK}</button></div>`;
const chips=id=>{const L=id==="dhuhr"&&kind(cur)==="fr"?RAKAT_FRI:RAKAT[id];return L?`<div class="chips">${L.map((p,i)=>`<button class="chip ${db[cur]?.ticks?.[id+"_"+i]?"on":""}" data-id="${id}_${i}" aria-label="${p[1]} ${p[0]}">${p[1]} ${p[0]}</button>`).join("")}</div>`:""};
const RC=2*Math.PI*38;
const ringHTML=()=>{const s=score(cur);return `<div class="ring" id="ringw" role="img" aria-label="Day score ${s} percent"><svg viewBox="0 0 92 92" aria-hidden="true"><circle class="bg" cx="46" cy="46" r="38"/><circle class="fg" cx="46" cy="46" r="38" style="stroke-dasharray:${RC};stroke-dashoffset:${RC*(1-s/100)}"/></svg><b>${s}%</b></div>`};
const capNote=()=>gated(cur)&&rawScore(cur)>60?"No-PMO tick ke bina score 60% par ruka hai.":"";
const nowIdx=l=>{const h=nowHM();return l.findIndex(s=>s[1]<s[2]?h>=s[1]&&h<s[2]:h>=s[1]||h<s[2])}; // handles the midnight-crossing Sleep slot
function leftMin(s){const n=mins(nowHM()),a=mins(s[1]);let b=mins(s[2]);if(b<=a)b+=1440;let x=n;if(x<a)x+=1440;return b-x}
const fmtLeft=m=>m>=60?Math.floor(m/60)+" h "+(m%60)+" min":m+" min";
function hijri(d){try{const t=new Intl.DateTimeFormat("en-u-ca-islamic-umalqura",{day:"numeric",month:"long",year:"numeric",era:"short"}).format(d);return /AH/.test(t)?t:""}catch(_){return""}}
const displayCtl=()=>`<button class="btn" id="th" aria-label="Switch theme">${theme()==="light"?"🌙 Dark":"☀️ Light"}</button><button class="btn" id="zm" aria-label="Smaller text">A−</button><button class="btn" id="zp" aria-label="Bigger text">A+</button><span class="mut"> ${zoom()}%</span>`;
function nowCard(list,ni){if(ni<0)return"";const s=list[ni],nx=list[(ni+1)%list.length],t=db[cur]?.ticks?.[s[0]];
 return `<div class="card hero nowcard" id="nowc"><div class="hd"><div><div class="mut">Abhi · ${s[1]}–${s[2]}</div><div class="big">${esc(s[3])}</div><div class="p">${esc(s[4])}</div><div class="left">${fmtLeft(leftMin(s))} baaki · agla: ${esc(nx[3])} (${nx[1]})</div></div><button class="ck ${t?"on":""}" role="checkbox" aria-checked="${!!t}" aria-label="Mark ${esc(s[3])} done" data-id="${s[0]}">${CK}</button></div></div>`}
const quick=isT=>`<div class="qa" role="group" aria-label="Quick actions"><button data-qa="urge">${ICON.urge}<span>Urge</span></button>${isT?`<button data-qa="water">${ICON.water}<span>Water +250</span></button><button data-qa="gym">${ICON.gym}<span>Start workout</span></button><button data-qa="weight">${ICON.scale}<span>Log weight</span></button>`:""}</div>`;
const badgesCard=()=>{const got=jp(localStorage.getItem("dos_ach"),{});return `<details class="card"><summary><h3>Badges (${ACH.filter(a=>got[a[0]]).length}/${ACH.length})</h3></summary><div class="bgrid">${ACH.map(a=>`<div class="bg1 ${got[a[0]]?"":"off"}" title="${esc(a[3])}"><span aria-hidden="true">${a[1]}</span>${esc(a[2])}<div class="mut">${got[a[0]]?got[a[0]]:"locked"}</div></div>`).join("")}</div></details>`};
function renderToday(){const d=fromK(cur),isT=cur===todayK(),doy=Math.floor((d-new Date(d.getFullYear(),0,0))/864e5),list=sch(cur),ni=isT?nowIdx(list):-1;
 const exam=localStorage.dos_exam,left=exam?Math.ceil((fromK(exam)-fromK(todayK()))/864e5):null;
 const stale=Object.keys(db).length&&Date.now()-(+localStorage.dos_lastbackup||0)>7*864e5;prevS=score(cur);
 app.innerHTML=`<div class="card hd hero"><div><h1>${d.toLocaleDateString(undefined,{weekday:"long",day:"numeric",month:"short",year:"numeric"})}</h1><div class="mut">${hijri(d)}</div><div class="mut">Assalamu alaikum. Be honest, be gentle.</div><div class="mut" id="cap">${capNote()}</div>
 ${displayCtl()}<button class="btn" id="cm">${core?"Core habits":"All habits"}</button></div><div id="rg">${ringHTML()}</div></div>
 <div class="card" id="gam">${gamHTML()}</div>${isT?nowCard(list,ni):""}${quick(isT)}
 ${stale?`<div class="card">Backup ko 7+ din ho gaye. <button class="btn g" id="exp2">Export Backup</button></div>`:""}
 ${left!==null&&left>=0?`<div class="card">Exam me <b>${left}</b> din baaki.</div>`:""}
 <div class="q">${QUOTES[doy%QUOTES.length]}</div><div class="mut">${Object.entries(cfg.pt).map(([n,t])=>n+" "+t).join(" · ")}</div>
 <div id="cel" class="card" ${score(cur)>=90?"":"hidden"}>MashaAllah, strong day.</div>
 <div class="hd"><button class="btn" id="pv" aria-label="Previous day">‹ Prev</button><span class="mut">${isT?"Today":"Past day"}</span><button class="btn" id="nx" ${isT?"disabled":""} aria-label="Next day">Next ›</button></div>
 <div class="two"><section><h2>Schedule · ${KIND[kind(cur)]}</h2><div class="card">${list.map((x,i)=>row(x[0],x[3],x[4],x[1]+"–"+x[2],"",i===ni)).join("")}</div></section>
 <aside><h2>Character & Habits</h2>${CATS.map(c=>{const hs=habs().filter(h=>h[3]===c);return hs.length?`<details class="card" open><summary><h3>${c}</h3></summary>${hs.map(h=>row(h[0],h[1],"",h[0]==="finlearn"?"Finance tab me topic Done karo, ye khud tick hoga":"",chips(h[0]))).join("")}</details>`:""}).join("")}</aside></div>${badgesCard()}`;
 $("#pv").onclick=()=>{const x=fromK(cur);x.setDate(x.getDate()-1);cur=dk(x);renderToday()};
 $("#nx").onclick=()=>{const x=fromK(cur);x.setDate(x.getDate()+1);if(dk(x)<=todayK()){cur=dk(x);renderToday()}}}
function upd(){const s=score(cur);if(view!=="today"){return}const fg=$("#rg .fg");
 if(fg){fg.style.strokeDashoffset=RC*(1-s/100);$("#rg b").textContent=s+"%";$("#ringw").setAttribute("aria-label","Day score "+s+" percent")}else if($("#rg"))$("#rg").innerHTML=ringHTML();
 const c=$("#cel");if(c)c.hidden=s<90;const cp=$("#cap");if(cp)cp.textContent=capNote();gamUpd();
 if(cur===todayK()){if(s>=90&&prevS<90&&!sessionStorage.getItem("dos_cel_"+cur)){sessionStorage.setItem("dos_cel_"+cur,"1");celebrate()}prevS=s}checkAch()}
/* ===== CHARTS (fixed-size wrapper + no aspect-ratio feedback loop) ===== */
const destroyCharts=()=>{charts.forEach(c=>{try{c.destroy()}catch(_){}});charts=[]};
function mkChart(host,type,labels,sets,max){
 if(typeof Chart==="undefined"){host.className="";host.style.height="auto";host.innerHTML='<p class="mut">Charts ke liye Chart.js chahiye (ek baar online kholo).</p>';return null}
 host.textContent="";const c=document.createElement("canvas");host.appendChild(c);
 const css=getComputedStyle(document.documentElement),V=n=>css.getPropertyValue(n).trim(),gc=V("--line"),cols=[V("--teal"),V("--gold"),V("--bad")];Chart.defaults.color=V("--mut");
 const ch=new Chart(c,{type,data:{labels,datasets:sets.map((s,i)=>({label:s.label||"",data:s.data,backgroundColor:cols[i]+"88",borderColor:cols[i],tension:.3,spanGaps:true}))},
  options:{responsive:true,maintainAspectRatio:false,animation:false,resizeDelay:100,scales:type==="radar"?{r:{min:0,max:max||100,grid:{color:gc},angleLines:{color:gc},ticks:{display:false}}}:{y:{min:0,max,grid:{color:gc}},x:{grid:{display:false}}},plugins:{legend:{display:sets.length>1}}}});
 charts.push(ch);return ch}
function trend(title,type,labels,sets,note){const has=sets.some(s=>s.data.some(v=>v!=null));const d=document.createElement("div");d.className="card";d.innerHTML=`<h3>${title}</h3>${has?'<div class="cb"></div>':`<p class="mut">${note}</p>`}`;$("#tr").appendChild(d);if(has)mkChart(d.querySelector(".cb"),type,labels,sets)}
/* ===== PROGRESS ===== */
function renderProgress(){const T=new Date(),w=lastN(7),sc=w.map(k=>score(k)),pw=lastN(7,new Date(T.getTime()-7*864e5)),m=lastN(30),pm=lastN(30,new Date(T.getTime()-30*864e5)),any=Object.keys(db).some(hasData);
 const tabs=`<h1>Progress</h1><div class="seg">${["Daily","Weekly","Monthly","Yearly"].map(r=>`<button class="btn ${r===rng?"on":""}" data-r="${r}" aria-pressed="${r===rng}">${r}</button>`).join("")}</div>`;
 const bind=()=>document.querySelectorAll("[data-r]").forEach(b=>b.onclick=()=>{rng=b.dataset.r;render()});
 if(!any){app.innerHTML=tabs+`<div class="card empty"><p>Abhi koi data nahi hai.</p><p class="mut">Today tab me kuch tick karo (ya Journal me kuch likho), phir yahan charts, streaks aur insights dikhenge.</p></div>${FIN.progCard()}`;bind();return}
 let extra="";if(rng==="Weekly")extra=`<p>Avg <b>${avg(sc)}%</b> · Best ${Math.max(...sc)}% · Worst ${Math.min(...sc)}%</p>`;
 if(rng==="Monthly")extra=`<div class="grid">${m.map(heat).join("")}</div>`;if(rng==="Yearly")extra=`<div class="grid yr">${lastN(365).map(heat).join("")}</div>`;
 const ids=[...new Set([...cfg.wd,...cfg.fr,...cfg.we].map(s=>s[0]).concat(cfg.habits.map(h=>h[0])))];
 const rows=ids.map(id=>({id,a:consist(id,7),b:consist(id,30),c:consist(id,90)})).sort((x,y)=>x.b-y.b),weak=rows.slice(0,3).map(r=>label(r.id)),strong=rows[rows.length-1];
 const review=`Weekly review: strongest habit "${label(strong.id)}", weakest "${label(rows[0].id)}". Suggestion: attach "${label(rows[0].id)}" to a fixed time tomorrow.`;
 app.innerHTML=tabs+`<div class="card"><div class="cb ${rng==="Daily"?"radar":""}" id="ch"></div></div>${extra?`<div class="card ${rng==="Yearly"?"scrollx":""}">${extra}</div>`:""}
 <div class="card"><h3>Am I growing?</h3><p>Week: ${delta(avgScore(w),avgScore(pw))}</p><p>Month: ${delta(avgScore(m),avgScore(pm))}</p><p class="${T.getDay()===0?"":"mut"}">${review}</p></div>
 <div class="card"><h3>Streaks (current / best)</h3>${KEYS.map(k=>`<div class="row"><span>${k[1]}</span><b>${streak(k[0])} / ${best(k[0])} days</b></div>`).join("")}</div>
 ${FIN.progCard()}
 <div class="card"><h3>Focus on these 3 weak habits</h3><p>${weak.join(" · ")}</p><div class="scrollx"><table><tr><th>Habit</th><th>7d</th><th>30d</th><th>90d</th></tr>${rows.map(r=>`<tr><td>${esc(label(r.id))}</td><td>${r.a}%</td><td>${r.b}%</td><td>${r.c}%</td></tr>`).join("")}</table></div></div><h2>Trends</h2><div id="tr"></div>`;bind();
 const H=$("#ch");
 if(rng==="Daily")mkChart(H,"radar",CATS,[{data:CATS.map(c=>score(cur,c))}]);
 if(rng==="Weekly")mkChart(H,"bar",w.map(k=>k.slice(5)),[{data:sc}],100);
 if(rng==="Monthly")mkChart(H,"line",m.map(k=>k.slice(8)),[{data:m.map(k=>score(k))}],100);
 if(rng==="Yearly"){const by={};lastN(365).forEach(k=>{(by[k.slice(0,7)]=by[k.slice(0,7)]||[]).push(k)});mkChart(H,"bar",Object.keys(by),[{data:Object.values(by).map(avgScore)}],100)}
 FIN.progDraw();
 const y90=lastN(90),L90=y90.map(k=>k.slice(5)),nm=(ks,f)=>ks.map(k=>db[k]?.numbers?.[f]??null);
 trend("Body weight (kg)","line",L90,[{data:nm(y90,"weight")}],"Journal ya Gym tab me weight likho.");
 trend("Measurements (chest / waist / arms)","line",L90,[{label:"Chest",data:nm(y90,"chest")},{label:"Waist",data:nm(y90,"waist")},{label:"Arms",data:nm(y90,"arms")}],"Mahine me ek baar Journal me naap likho.");
 trend("Study hours (30 days)","bar",m.map(k=>k.slice(5)),[{data:nm(m,"studyHours")}],"Journal me study hours likho.");
 trend("Mock scores","line",L90,[{data:nm(y90,"mockScore")}],"Journal me mock score likho.");
 trend("Mood vs discipline score (30 days)","line",m.map(k=>k.slice(5)),[{label:"Score",data:m.map(k=>hasData(k)?score(k):null)},{label:"Mood x20",data:m.map(k=>db[k]?.mood?db[k].mood*20:null)}],"Mood aur score dono chahiye.");
 const hrs=Array(24).fill(0),tc={};Object.values(db).forEach(e=>(e.urgeLog||[]).forEach(u=>{hrs[new Date(urgeTs(u)).getHours()]++;if(u.trig)tc[u.trig]=(tc[u.trig]||0)+1}));
 const top=Object.entries(tc).sort((a,b)=>b[1]-a[1])[0];
 trend("Urges by hour"+(top?` (top trigger: ${top[0]})`:""),"bar",hrs.map((_,i)=>i+":00"),[{data:hrs.some(Boolean)?hrs:[]}],"Urge button use karoge to yahan dikhega kis time sabse zyada urge aata hai.")}
/* ===== JOURNAL ===== */
function renderJournal(){const e=db[cur]||{},n=e.numbers||{},syl=jp(localStorage.dos_syl,{}),dn=cfg.topics.filter(t=>syl[t[0]]).length;
 const sel=f=>[1,2,3,4,5].map(v=>`<button class="btn ${e[f]===v?"on":""}" data-f="${f}" data-v="${v}" aria-pressed="${e[f]===v}">${f==="mood"?["😞","😕","😐","🙂","😊"][v-1]:v}</button>`).join("");
 const nf=(f,l,s="1")=>`<label>${l}<input type="number" step="${s}" min="0" data-n="${f}" value="${n[f]??""}"></label>`;
 app.innerHTML=`<h1>Journal · ${cur}</h1>
 <div class="card"><p>Mood</p><div class="seg">${sel("mood")}</div><p>Energy</p><div class="seg">${sel("energy")}</div></div>
 <div class="card">${nf("studyHours","Study hours","0.5")}${nf("mockScore","Mock score")}${nf("weight","Body weight (kg)","0.1")}<p class="mut">Monthly measurements, mahine me ek baar. Waist inch me likho (jaise 32); chest/arms jis unit me shuru kiya usi me rakho. Progress photo bhi lo.</p>${nf("chest","Chest","0.5")}${nf("waist","Waist (inch)","0.5")}${nf("arms","Arms","0.5")}
 <label>Workout log (exercise, sets x reps)<textarea rows="3" id="gym">${esc(e.gym||"")}</textarea></label><label>What went well / fix tomorrow<textarea rows="4" id="note">${esc(e.note||"")}</textarea></label></div>
 <div class="card"><button class="btn g" id="urgeb">I'm having an urge</button><button class="btn" id="relb">Mujhse galti ho gayi</button><p>No-PMO streak: <b>${streak("nopmo")}</b> days · Longest: <b>${best("nopmo")}</b> · Urges resisted today: ${(e.urgeLog||[]).length}</p></div>
 <div class="card"><h3>Exam / Syllabus</h3><label>Exam date<input type="date" id="exam" value="${localStorage.dos_exam||""}"></label><p>Syllabus: ${dn}/${cfg.topics.length} (${cfg.topics.length?Math.round(100*dn/cfg.topics.length):0}%)</p><div class="chips">${cfg.topics.map(t=>`<button class="chip ${syl[t[0]]?"on":""}" data-syl="${t[0]}" aria-pressed="${!!syl[t[0]]}">${esc(t[1])}</button>`).join("")}</div><p class="mut">Topics Edit tab me badal sakti ho.</p></div>
 <div class="card"><h3>Privacy</h3><button class="btn" id="pin">${localStorage.dos_pin?"Change PIN":"Set PIN lock"}</button>${localStorage.dos_pin?'<button class="btn" id="nopin">Remove PIN</button>':""}<p class="mut">PIN bhool gayi to data nikalna mushkil hoga, pehle Export Backup karo. App ka naam badalna ho to manifest.json me "name" aur "short_name" badlo, ya home screen icon ka naam long-press karke rename karo.</p></div>
 <div class="card"><h3>Reminders & Backup</h3><button class="btn" id="notif">Enable notifications</button><button class="btn" id="ics">Download Calendar Alarms (.ics)</button><button class="btn" id="exp">Export Backup</button><label class="btn" style="display:inline-grid;place-items:center">Import Backup<input type="file" id="imp" accept=".json,application/json" hidden></label>
 <p class="mut">Last backup: ${localStorage.dos_lastbackup?new Date(+localStorage.dos_lastbackup).toLocaleDateString():"kabhi nahi"}. Backup me sab kuch hai: habits, journal, gym, diet, finance, duas. Notifications sirf app khula ho tab chalte hain; asli alarms ke liye .ics Google Calendar me import karo.</p></div>`;
 document.querySelectorAll("[data-f]").forEach(b=>b.onclick=()=>{ent(cur)[b.dataset.f]=+b.dataset.v;save();render()});
 document.querySelectorAll("[data-n]").forEach(i=>i.onchange=()=>{ent(cur).numbers[i.dataset.n]=i.value===""?null:+i.value;save()});
 $("#note").oninput=ev=>{ent(cur).note=ev.target.value;save()};$("#gym").oninput=ev=>{ent(cur).gym=ev.target.value;save()};
 $("#exam").onchange=ev=>{sset("dos_exam",ev.target.value)};
 $("#urgeb").onclick=urge;$("#relb").onclick=relapse;$("#notif").onclick=()=>window.Notification?Notification.requestPermission().then(p=>toast("Notifications: "+p,p==="granted"?"ok":"warn")):toast("Is browser me notifications support nahi hain.","warn");
 $("#ics").onclick=ics;$("#exp").onclick=exportBackup;$("#imp").onchange=importBackup;
 $("#pin").onclick=async()=>{const p=prompt("4-6 digit PIN daalo");if(p&&/^\d{4,6}$/.test(p)){sset("dos_pin",await sha(p));toast("PIN set ho gaya","ok");render()}else if(p)toast("Sirf 4-6 digits.","warn")};
 if($("#nopin"))$("#nopin").onclick=()=>{if(confirm("PIN hata dein?")){delete localStorage.dos_pin;render()}}}
function dl(name,txt,type){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([txt],{type}));a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000)}
/* ===== BACKUP v3 (v1 plain days + v2 + v3 accepted; validated and applied atomically) ===== */
const BK_KEYS={gymPlan:"dos_gym_plan",gymLog:"dos_gym_log",diet:"dos_diet",fin:"dos_fin",duas:"dos_duas",ach:"dos_ach"};
function exportBackup(){sset("dos_lastbackup",String(Date.now()));
 const o={v:3,db,cfg,core,zoom:zoom(),theme:theme(),exam:localStorage.dos_exam||"",syl:jp(localStorage.dos_syl,{}),mem:jp(localStorage.dos_mem,{}),ui:{zoom:zoom(),theme:theme(),core}};
 Object.entries(BK_KEYS).forEach(([f,k])=>{o[f]=jp(localStorage.getItem(k),null)});
 dl("discipline-backup-"+todayK()+".json",JSON.stringify(o),"application/json");toast("Backup download ho raha hai","ok");render()}
const isObj=x=>x&&typeof x==="object"&&!Array.isArray(x),isDayK=k=>/^\d{4}-\d{2}-\d{2}$/.test(k);
function planBackup(o){ // validate everything first; returns [[key,string]] or throws. Nothing is written here.
 if(!isObj(o))throw new Error("not an object");const W=[];let ndb;
 if(isObj(o.db)||"cfg"in o&&"db"in o){ndb=o.db;if(!isObj(ndb))throw new Error("db")}
 else{const ks=Object.keys(o);if(!ks.length||!ks.every(isDayK))throw new Error("unknown format");ndb=o} // legacy v1: plain days
 const clean={};Object.keys(ndb).forEach(k=>{if(!isDayK(k)||!isObj(ndb[k]))throw new Error("bad day "+k);if(hasDataE(ndb[k]))clean[k]=ndb[k]});W.push([KEY,JSON.stringify(clean)]);
 if("cfg"in o&&o.cfg!=null){const c=o.cfg;if(!isObj(c)||![c.wd,c.we,c.habits].every(a=>Array.isArray(a)&&a.every(Array.isArray)))throw new Error("cfg");W.push(["dos_cfg",JSON.stringify(c)])}
 if("core"in o)W.push(["dos_core",o.core===false?"0":"1"]);
 if(+o.zoom>=80&&+o.zoom<=120)W.push(["dos_zoom",String(Math.round(o.zoom))]);
 if(o.theme==="light"||o.theme==="dark")W.push(["dos_theme",o.theme]);
 if("exam"in o&&typeof(o.exam||"")==="string")W.push(["dos_exam",o.exam||""]);
 ["syl","mem"].forEach(f=>{if(f in o&&o[f]!=null){if(!isObj(o[f]))throw new Error(f);W.push(["dos_"+f,JSON.stringify(o[f])])}});
 Object.entries(BK_KEYS).forEach(([f,k])=>{if(f in o&&o[f]!=null){if(!isObj(o[f]))throw new Error(f);if(f==="gymLog"&&o[f].s!=null&&!isObj(o[f].s))throw new Error("gymLog");W.push([k,JSON.stringify(o[f])])}});
 return W}
function applyBackup(W){const keys=W.map(w=>w[0]),snap=keys.map(k=>[k,localStorage.getItem(k)]);
 try{W.forEach(([k,v])=>localStorage.setItem(k,v))}catch(err){snap.forEach(([k,v])=>{try{v===null?localStorage.removeItem(k):localStorage.setItem(k,v)}catch(_){}});throw err}}
function importBackup(ev){const inp=ev.target,f=inp.files[0];if(!f)return;
 f.text().then(t=>{let W;try{W=planBackup(JSON.parse(t))}catch(_){toast("Backup file invalid hai. Kuch change nahi hua.","warn");return}
  try{applyBackup(W)}catch(_){toast("Storage full ya error. Kuch change nahi hua.","warn");return}
  db=jp(localStorage.getItem(KEY),{});cfg=loadCfg();core=localStorage.dos_core!=="0";applyZoom(zoom());setTheme(localStorage.dos_theme==="light"?"light":"dark");GYM.reload();DIET.reload();FIN.reload();
  toast("Backup import ho gaya ✓","ok");render()}).catch(()=>toast("File padh nahi paye.","warn")).finally(()=>{inp.value=""})}
/* ===== URGE / RELAPSE ===== */
const trigHTML=()=>`<p>Trigger kya tha?</p><div class="seg" style="justify-content:center">${TRIG.map(t=>`<button class="btn ${t===trig?"on":""}" data-trig="${t}">${t}</button>`).join("")}</div>`;
function overlay(html){const u=$("#urge");u.hidden=false;u.innerHTML=html;trig="Other";u.onclick=e=>{const b=e.target.closest("[data-trig]");if(b){trig=b.dataset.trig;u.querySelectorAll("[data-trig]").forEach(x=>x.classList.toggle("on",x===b))}};return u}
function urge(){let s=60;const u=overlay(`<h1>Pause. Breathe.</h1><div class="big" id="tm">60</div><p id="br">Breathe in…</p>
<div class="card"><p>"Do not approach unlawful sexual intercourse." (Quran 17:32)</p><p>"Tell the believing men to lower their gaze and guard their chastity." (Quran 24:30)</p><p>Allah is watching over you (Quran 4:1). He loves those who turn back to Him.</p></div>
<div class="card">Make wudu · Cold shower · Walk outside · Do 20 pushups · Call a friend</div>${trigHTML()}<button class="btn g" id="dn" disabled>I resisted</button><button class="btn" id="cx">Close</button>`);
 const iv=setInterval(()=>{s--;$("#tm").textContent=s;$("#br").textContent=s%8<4?"Breathe in…":"Breathe out…";if(s<=0){clearInterval(iv);$("#dn").disabled=false}},1000);
 $("#cx").onclick=()=>{clearInterval(iv);u.hidden=true};
 $("#dn").onclick=()=>{clearInterval(iv);ent(todayK()).urgeLog.push({t:Date.now(),trig});save();u.hidden=true;vib(40);toast("Shabash. Tumne resist kiya 💪","ok");render()}}
function relapse(){const u=overlay(`<h1>Allah tawbah qubool karne wala hai</h1><div class="card"><p>"Do not despair of the mercy of Allah." (Quran 39:53)</p><p>Sharm me mat doobo. Abhi wudu karo, tawbah ki 2 rakat padho, aur seedha agle kadam par aao. Streak reset hogi, par tumhari mehnat nahi.</p></div>${trigHTML()}
<label>Kya hua, aur kal kaise bachunga?<textarea rows="4" id="rp"></textarea></label><button class="btn g" id="rs">Save</button><button class="btn" id="cx">Close</button>`);
 $("#cx").onclick=()=>u.hidden=true;
 $("#rs").onclick=()=>{const e=ent(cur);e.ticks.nopmo=false;(e.relapse=e.relapse||[]).push({t:Date.now(),trig,plan:$("#rp").value});save();u.hidden=true;render()}}
/* ===== PRAYER TIMES, ICS, REMINDERS ===== */
function autoPT(){if(typeof adhan==="undefined")return toast("Auto-calc library load nahi hui. Internet on karke dobara try karo, ya time haath se bharo.","warn");
 const p=adhan.CalculationMethod.Karachi();p.madhab=adhan.Madhab.Hanafi;const t=new adhan.PrayerTimes(new adhan.Coordinates(19.076,72.8777),new Date(),p),f=d=>pad(d.getHours())+":"+pad(d.getMinutes());
 cfg.pt={Fajr:f(t.fajr),Dhuhr:f(t.dhuhr),Asr:f(t.asr),Maghrib:f(t.maghrib),Isha:f(t.isha)};saveCfg();toast("Prayer times update ho gaye","ok");render()}
function ics(){const L=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//DisciplineOS//EN"],now=new Date().toISOString().replace(/[-:]|\.\d+/g,"");
 const add=(n,t,key,by)=>{const [h,m]=t.split(":"),ds=dk(new Date()).replace(/-/g,"");L.push("BEGIN:VEVENT",`UID:${n.replace(/\W/g,"")}${t}${by.replace(/,/g,"")}@dos`,`DTSTAMP:${now}`,`DTSTART:${ds}T${h}${m}00`,"DURATION:PT15M",`RRULE:FREQ=WEEKLY;BYDAY=${by}`,`SUMMARY:${n}`,"BEGIN:VALARM","ACTION:DISPLAY",`DESCRIPTION:${n}`,"TRIGGER:PT0S","END:VALARM");
  if(key)L.push("BEGIN:VALARM","ACTION:DISPLAY",`DESCRIPTION:${n} in 5 min`,"TRIGGER:-PT5M","END:VALARM");L.push("END:VEVENT")};
 cfg.wd.forEach(s=>add(s[3],s[1],s[5]>=3,"MO,TU,WE,TH"));cfg.fr.forEach(s=>add(s[3],s[1],s[5]>=3,"FR"));cfg.we.forEach(s=>add(s[3],s[1],s[5]>=3,"SA,SU"));
 Object.entries(cfg.pt).forEach(([n,t])=>add("Time for "+n+" (gentle reminder)",t,true,"MO,TU,WE,TH,FR,SA,SU"));add("Fill Discipline OS tracker","22:00",false,"MO,TU,WE,TH,FR,SA,SU");
 L.push("END:VCALENDAR");dl("discipline-alarms.ics",L.join("\r\n"),"text/calendar")}
let fired="";setInterval(()=>{const hm=nowHM();
 if(todayK()!==lastDay){if(cur===lastDay)cur=todayK();lastDay=todayK();render()}
 if(view==="today"&&cur===todayK()&&$("#nowc")&&!modalOpen()){const l=sch(cur),i=nowIdx(l);if(i>=0){const c=$("#nowc .left");if(c)c.textContent=fmtLeft(leftMin(l[i]))+" baaki · agla: "+l[(i+1)%l.length][3]+" ("+l[(i+1)%l.length][1]+")";if($("#nowc [data-id]")&&$("#nowc [data-id]").dataset.id!==l[i][0])render()}}
 if(fired===hm||!window.Notification||Notification.permission!=="granted")return;
 const p=Object.entries(cfg.pt).find(x=>x[1]===hm),s=sch(todayK()).find(x=>x[1]===hm);if(!p&&!s)return;fired=hm;
 navigator.serviceWorker.ready.then(r=>r.showNotification(p?"Time for "+p[0]:hm==="22:00"?"Time to fill your tracker":hm+" · "+s[3],{body:p?"Gentle reminder":s[4],icon:"./icon-192.png"}))},20000);
/* ===== EDIT TAB ===== */
const opt=v=>CATS.map(c=>`<option ${c===v?"selected":""}>${c}</option>`).join("");
function renderEdit(){const f=(k,i,j,v,t="text",ph="")=>`<input type="${t}" data-k="${k}" data-i="${i}" data-j="${j}" value="${esc(v)}" placeholder="${ph}" aria-label="${ph||t}">`;
 const sc=(t,k)=>`<h2>${t}</h2><div class="card">${cfg[k].map((x,i)=>`<div class="ed" data-uid="${x[0]}">${f(k,i,3,x[3],"text","Activity name")}<div class="seg">${f(k,i,1,x[1],"time")}${f(k,i,2,x[2],"time")}${f(k,i,5,x[5],"number","Weight")}</div>${f(k,i,4,x[4],"text","Purpose")}<select data-k="${k}" data-i="${i}" data-j="6" aria-label="Category">${opt(x[6])}</select><button class="btn" data-del="${k}:${i}">Delete</button></div>`).join("")}<button class="btn g" data-add="${k}">+ Add activity</button></div>`;
 app.innerHTML=`<h1>Edit</h1><div class="card"><h3>Display</h3>${displayCtl()}<button class="btn" id="cm">${core?"Core habits":"All habits"}</button></div><p class="mut">Weight = importance in score. Weight badalne ya item delete karne se purane scores bhi badalte hain. Core mode me sirf "Core" tick wali habits dikhti hain.</p>${sc(KIND.wd,"wd")}${sc(KIND.fr,"fr")}${sc(KIND.we,"we")}
 <h2>Habits</h2><div class="card">${cfg.habits.map((x,i)=>`<div class="ed" data-uid="${x[0]}">${f("habits",i,1,x[1],"text","Habit")}<div class="seg">${f("habits",i,2,x[2],"number","Weight")}<select data-k="habits" data-i="${i}" data-j="3" aria-label="Category">${opt(x[3])}</select></div><label class="mut"><input type="checkbox" data-k="habits" data-i="${i}" data-j="4" ${x[4]?"checked":""} style="width:auto;min-height:0"> Core</label><button class="btn" data-del="habits:${i}">Delete</button></div>`).join("")}<button class="btn g" data-add="habits">+ Add habit</button></div>
 <h2>Syllabus topics</h2><div class="card">${cfg.topics.map((x,i)=>`<div class="ed" data-uid="${x[0]}">${f("topics",i,1,x[1],"text","Topic")}<button class="btn" data-del="topics:${i}">Delete</button></div>`).join("")}<button class="btn g" data-add="topics">+ Add topic</button></div>
 <h2>Prayer times</h2><div class="card">${Object.entries(cfg.pt).map(([n,t])=>`<label>${n}<input type="time" data-pt="${n}" value="${t}"></label>`).join("")}<button class="btn" id="apt">Auto-calculate (Mumbai, Hanafi)</button><p class="mut">Auto time aapke masjid ke timetable se ek-do minute alag ho sakta hai, confirm kar lena. Mausam ke saath time badalta hai, .ics mahine me dobara download karo.</p></div>
 <button class="btn" id="rst">Reset everything to default</button><p class="mut">Reset sirf habits, schedules aur prayer times ko default karta hai. Journal, gym, diet, finance data safe rehta hai.</p>`}
function editChange(e){const t=e.target;if(t.dataset.pt){cfg.pt[t.dataset.pt]=t.value;saveCfg();return}if(t.dataset.k===undefined)return;
 cfg[t.dataset.k][+t.dataset.i][+t.dataset.j]=t.type==="number"?+t.value:t.type==="checkbox"?(t.checked?1:0):t.value;saveCfg();render()}
/* ===== LOCK ===== */
async function sha(s){const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode("dos"+s));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("")}
function lock(){if(!localStorage.dos_pin)return;const l=$("#lock");l.hidden=false;l.innerHTML='<h1>Discipline OS</h1><input id="lp" type="password" inputmode="numeric" placeholder="PIN" autocomplete="off" aria-label="PIN"><button class="btn g" id="lg">Unlock</button>';
 $("#lg").onclick=async()=>{if(await sha($("#lp").value)===localStorage.dos_pin){l.hidden=true;l.innerHTML=""}else $("#lp").value=""}}
let hiddenAt=0;document.addEventListener("visibilitychange",()=>{if(document.hidden)hiddenAt=Date.now();else if(Date.now()-hiddenAt>30000)lock()});
/* ===== ROUTER, TRANSITIONS, SWIPE ===== */
function navSet(){const nav=$("#nav");nav.querySelectorAll("button").forEach(b=>{const on=b.dataset.v===view;b.classList.toggle("on",on);if(on)b.setAttribute("aria-current","page");else b.removeAttribute("aria-current")});
 const b=nav.querySelector(".on");if(b&&nav.scrollWidth>nav.clientWidth)nav.scrollTo({left:b.offsetLeft-(nav.clientWidth-b.offsetWidth)/2,behavior:reduced()?"auto":"smooth"})}
function anim(c){app.classList.remove("in-l","in-r","bn-l","bn-r");void app.offsetWidth;app.classList.add(c);setTimeout(()=>app.classList.remove(c),300)}
function go(v,swipeDir){if(v===view||!ORDER.includes(v))return;const oi=ORDER.indexOf(view),ni=ORDER.indexOf(v);
 const m=MODS[view];if(m&&m.leave)m.leave();scrollMem[view]=scrollY;view=v;navSet();render();anim(swipeDir||(ni>oi?"in-r":"in-l"));try{history.replaceState(null,"","#"+v)}catch(_){}}
function step(d){const i=ORDER.indexOf(view)+d;if(i<0||i>=ORDER.length){if(!reduced())anim(d<0?"bn-l":"bn-r");return}go(ORDER[i])}
(function swipe(){let sx=0,sy=0,t0=0,sc=0,on=false;
 const hScroll=el=>{for(;el&&el!==app;el=el.parentElement){const o=getComputedStyle(el).overflowX;if((o==="auto"||o==="scroll")&&el.scrollWidth>el.clientWidth+1)return true}return false};
 const sel=()=>{const s=getSelection();return !!s&&!s.isCollapsed&&String(s).length>0};
 app.addEventListener("touchstart",e=>{on=false;if(e.touches.length!==1||modalOpen()||sel())return;const t=e.touches[0],el=e.target;
  if(t.clientX<24||t.clientX>innerWidth-24)return;if(el.closest("input,textarea,select,[contenteditable],canvas,.cb,.noswipe,.scrollx,table,.yr,[type=range]")||hScroll(el))return;
  sx=t.clientX;sy=t.clientY;t0=Date.now();sc=scrollY;on=true},{passive:true});
 app.addEventListener("touchend",e=>{if(!on)return;on=false;const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy,dt=Math.max(1,Date.now()-t0);
  if(Math.abs(dx)>60&&Math.abs(dx)>1.6*Math.abs(dy)&&dt<800&&Math.abs(dx)/dt>.1&&Math.abs(scrollY-sc)<12&&!sel()&&!modalOpen())step(dx<0?1:-1)},{passive:true});
 app.addEventListener("touchcancel",()=>{on=false},{passive:true});
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#modal").hidden){$("#modal").hidden=true;$("#modal").innerHTML="";document.body.classList.remove("modal-open");return}
  if((e.key!=="ArrowLeft"&&e.key!=="ArrowRight")||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||modalOpen())return;const t=e.target;if(t&&t.closest&&t.closest("input,textarea,select,[contenteditable]"))return;step(e.key==="ArrowRight"?1:-1)});
})();
/* ===== EVENTS ===== */
["click","input","change"].forEach(ev=>app.addEventListener(ev,e=>{const m=MODS[view];if(m&&m[ev])m[ev](e)}));
app.addEventListener("toggle",e=>{const m=MODS[view];if(m&&m.toggle)m.toggle(e)},true);
document.addEventListener("change",e=>{if(view==="edit")editChange(e)});
document.addEventListener("click",e=>{const T=e.target,b=T.closest(".ck,.chip");
 if(b&&view==="today"&&b.dataset.id){if(cur>todayK())return;const t=ent(cur).ticks,id=b.dataset.id;t[id]=!t[id];save();document.querySelectorAll(`[data-id="${id}"]`).forEach(x=>{x.classList.toggle("on",!!t[id]);x.setAttribute("aria-checked",!!t[id])});vib(8);upd()}
 const n=T.closest("#nav button");if(n)go(n.dataset.v);
 if(T.closest("#zm,#zp")){setZoom(zoom()+(T.closest("#zp")?5:-5));render()}
 if(T.closest("#th")){setTheme(theme()==="light"?"dark":"light");render()}
 if(T.closest("#cm")){core=!core;sset("dos_core",core?"1":"0");render()}
 if(T.closest("#exp2"))exportBackup();
 const qa=T.closest("[data-qa]");if(qa){const a=qa.dataset.qa;
  if(a==="urge")urge();
  else if(a==="water"){const w=DIET.addWater(250);toast("+250 ml · aaj "+(w/1000).toFixed(2)+" L","ok")}
  else if(a==="gym"){GYM.start();go("gym")}
  else if(a==="weight")sheet({title:"Log weight",html:'<label>Weight (kg)<input id="lw" class="gin" inputmode="decimal" placeholder="jaise 73.4"></label><label>Waist (inch, optional)<input id="lx" class="gin" inputmode="decimal" placeholder="jaise 32"></label>',ok:"Save",onOk(r){const v=parseFloat(r.querySelector("#lw").value.replace(",",".")),x=parseFloat(r.querySelector("#lx").value.replace(",","."));if(!(v>0)&&!(x>0)){toast("Weight daalo","warn");return false}const n=ent(todayK()).numbers;if(v>0)n.weight=v;if(x>0)n.waist=x;save();toast("Save ho gaya ✓","ok");if(view==="today")render();return true}})}
 const sy=T.closest("[data-syl]");if(sy&&view==="journal"){const s=jp(localStorage.dos_syl,{});s[sy.dataset.syl]=!s[sy.dataset.syl];sset("dos_syl",s);render()}
 if(view==="edit"){const d=T.closest("[data-del]"),ad=T.closest("[data-add]");
  if(d){const [k,i]=d.dataset.del.split(":");if(confirm("Delete this item?")){cfg[k].splice(+i,1);saveCfg();render()}}
  if(ad){const k=ad.dataset.add,id="u"+Date.now();cfg[k].push(k==="habits"?[id,"New habit",1,"Mind",1]:k==="topics"?[id,"New topic"]:[id,"12:00","13:00","New activity","",1,"Mind"]);saveCfg();focusUid=id;render()}
  if(T.id==="rst"&&confirm("Reset all habits, schedules and prayer times to default?")){localStorage.removeItem("dos_cfg");cfg=defCfg();saveCfg();render()}
  if(T.id==="apt")autoPT()}
 if(window.Notification&&Notification.permission==="default"&&!localStorage.dos_asked){sset("dos_asked","1");Notification.requestPermission()}});
const VIEWS={today:renderToday,progress:renderProgress,journal:renderJournal,namaz:()=>NAMAZ.render(),gym:()=>GYM.render(),diet:()=>DIET.render(),fin:()=>FIN.render(),edit:renderEdit};
function render(){const y=scrollY;destroyCharts();(VIEWS[view]||renderToday)();
 scrollTo(0,view===lastView?y:(scrollMem[view]||0));lastView=view; // same screen: keep scroll; other screen: restore its own remembered position
 if(view==="today"&&!scrolled&&cur===todayK()){scrolled=true;const n=$("#now");if(n)n.scrollIntoView({block:"center"})}
 if(view==="edit"&&focusUid){const n=document.querySelector(`[data-uid="${focusUid}"]`);focusUid=null;if(n){n.scrollIntoView({block:"center"});const i=n.querySelector("input");if(i)i.focus()}}}
/* ===== START ===== */
if(navigator.storage&&navigator.storage.persist)navigator.storage.persist(); // ask browser not to evict data
if("serviceWorker"in navigator){addEventListener("load",()=>navigator.serviceWorker.register("service-worker.js"));let had=!!navigator.serviceWorker.controller;
 navigator.serviceWorker.addEventListener("controllerchange",()=>{if(had)$("#upd").hidden=false;had=true})}
applyZoom(zoom());navSet();lock();render();checkAch();
