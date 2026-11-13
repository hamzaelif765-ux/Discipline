/* gym.js: workout plan + set-by-set logger. Data: dos_gym_plan (edits, goals, prefs) and dos_gym_log (sessions).
   Typing in a set never calls render(): only the affected nodes update and saving is debounced. */
const GYM_MUSCLES=["Chest","Shoulders","Triceps","Back","Biceps","Quads","Hamstrings","Glutes","Calves","Core","Cardio"];
const GYM_LOWER=["Quads","Hamstrings","Glutes","Calves"];
const gx=(n,m,s,r,o={})=>({n,m,s,r,u:o.u||(GYM_LOWER.includes(m)?"lower":"upper"),k:o.k||"wt",alt:o.alt||[]});
const GYM_ALT_BY_M={Chest:["Dumbbell bench press","Machine chest press","Push-ups (weighted)","Cable fly"],Shoulders:["Dumbbell shoulder press","Machine shoulder press","Cable lateral raise","Rear delt fly"],Triceps:["Triceps pushdown","Overhead triceps extension","Bench dips","Skull crushers"],Back:["Lat pulldown","Seated cable row","One-arm dumbbell row","Chest-supported row"],Biceps:["Dumbbell curl","Hammer curl","Cable curl","Preacher curl"],Quads:["Leg press","Goblet squat","Hack squat","Leg extension"],Hamstrings:["Romanian deadlift","Leg curl","Good morning (light)","Glute-ham raise"],Glutes:["Hip thrust","Glute bridge","Cable kickback","Step-ups"],Calves:["Standing calf raise","Seated calf raise","Leg-press calf raise"],Core:["Plank","Cable crunch","Hanging knee raise","Bicycle crunch"],Cardio:["Incline walk","Cycling","Cross trainer","Brisk walk"]};
const GYM_PLANS={
pushA:{nm:"Push A",fx:"Chest · Shoulders · Triceps",ex:[gx("Bench press","Chest",4,"8-10",{alt:["Dumbbell bench press","Machine chest press","Smith machine bench press"]}),gx("Incline dumbbell press","Chest",3,"10-12",{alt:["Incline barbell press","Incline machine press","Low-incline push-ups"]}),gx("Shoulder press","Shoulders",3,"8-10",{alt:["Dumbbell shoulder press","Machine shoulder press","Arnold press"]}),gx("Lateral raises","Shoulders",4,"12-15",{alt:["Cable lateral raise","Machine lateral raise"]}),gx("Triceps pushdown","Triceps",3,"10-12",{alt:["Rope pushdown","Bench dips","Close-grip push-ups"]}),gx("Overhead triceps extension","Triceps",3,"12",{alt:["Cable overhead extension","Skull crushers","Dumbbell kickback"]}),gx("Incline walk (10 min)","Cardio",1,"10",{k:"cardio"})]},
pullA:{nm:"Pull A",fx:"Back · Biceps",ex:[gx("Pull-ups or lat pulldown","Back",4,"8-10",{alt:["Lat pulldown","Assisted pull-ups","Neutral-grip pulldown"]}),gx("Barbell / seated cable row","Back",4,"8-10",{alt:["Seated cable row","T-bar row","Machine row"]}),gx("One-arm dumbbell row","Back",3,"10-12",{alt:["Chest-supported row","Cable row (single arm)"]}),gx("Face pulls","Shoulders",3,"15",{alt:["Rear delt fly","Reverse pec deck"]}),gx("Barbell / dumbbell curl","Biceps",3,"10-12",{alt:["EZ-bar curl","Cable curl","Preacher curl"]}),gx("Hammer curl","Biceps",3,"12",{alt:["Rope hammer curl","Cross-body hammer curl"]}),gx("Cardio (10 min)","Cardio",1,"10",{k:"cardio"})]},
legsA:{nm:"Legs A",fx:"Quads · Hamstrings · Calves",ex:[gx("Squat","Quads",4,"8-10",{alt:["Goblet squat","Hack squat","Smith machine squat"]}),gx("Romanian deadlift","Hamstrings",3,"8-10",{alt:["Dumbbell Romanian deadlift","Good morning (light)"]}),gx("Leg press","Quads",3,"10-12",{alt:["Hack squat","Goblet squat"]}),gx("Walking lunges (per leg)","Quads",3,"12",{alt:["Reverse lunges","Step-ups","Split squat"]}),gx("Leg curl","Hamstrings",3,"12",{alt:["Seated leg curl","Nordic curl (assisted)"]}),gx("Standing calf raise","Calves",4,"15",{alt:["Seated calf raise","Leg-press calf raise"]}),gx("Plank (seconds)","Core",3,"45",{k:"sec",alt:["Side plank","Dead bug"]})]},
pushB:{nm:"Push B",fx:"Chest · Shoulders · Triceps",ex:[gx("Incline bench / dumbbell press","Chest",4,"8-10",{alt:["Incline dumbbell press","Incline machine press"]}),gx("Flat dumbbell / machine chest press","Chest",3,"10-12",{alt:["Dumbbell bench press","Machine chest press"]}),gx("Arnold / dumbbell shoulder press","Shoulders",3,"10",{alt:["Machine shoulder press","Barbell shoulder press"]}),gx("Cable fly","Chest",3,"12-15",{alt:["Pec deck","Dumbbell fly"]}),gx("Lateral raises","Shoulders",4,"15",{alt:["Cable lateral raise","Machine lateral raise"]}),gx("Dips or triceps pushdown","Triceps",3,"10-12",{alt:["Triceps pushdown","Bench dips","Close-grip bench press"]}),gx("Cardio (10 min)","Cardio",1,"10",{k:"cardio"})]},
pullB:{nm:"Pull B",fx:"Back · Biceps · Core",ex:[gx("Deadlift (or rack pull, start light)","Back",3,"5-6",{u:"lower",alt:["Rack pull","Trap-bar deadlift"]}),gx("Close-grip lat pulldown","Back",3,"10-12",{alt:["Neutral-grip pulldown","Assisted pull-ups"]}),gx("Chest-supported row","Back",3,"10-12",{alt:["Seated cable row","Machine row"]}),gx("Rear delt fly","Shoulders",3,"15",{alt:["Reverse pec deck","Face pulls"]}),gx("Incline dumbbell curl","Biceps",3,"10-12",{alt:["Dumbbell curl","Preacher curl"]}),gx("Cable curl","Biceps",3,"12",{alt:["EZ-bar curl","Hammer curl"]}),gx("Hanging knee raise","Core",3,"12",{k:"bw",alt:["Captain's chair leg raise","Cable crunch"]})]},
legsB:{nm:"Legs B + Core",fx:"Quads · Glutes · Calves · Core",ex:[gx("Front / hack / goblet squat","Quads",3,"10-12",{alt:["Goblet squat","Hack squat","Front squat"]}),gx("Hip thrust / glute bridge","Glutes",3,"10-12",{alt:["Hip thrust","Glute bridge","Cable kickback"]}),gx("Bulgarian split squat (per leg)","Quads",3,"10",{alt:["Split squat","Reverse lunges"]}),gx("Leg extension","Quads",3,"12-15",{alt:["Sissy squat (assisted)","Leg press (high reps)"]}),gx("Seated calf raise","Calves",3,"15-20",{alt:["Standing calf raise","Leg-press calf raise"]}),gx("Bicycle crunch","Core",3,"15",{k:"bw",alt:["Cable crunch","Dead bug"]}),gx("Leg raises","Core",3,"15",{k:"bw",alt:["Hanging knee raise","Reverse crunch"]}),gx("Incline walk / cycling (20-25 min)","Cardio",1,"22",{k:"cardio",alt:["Cycling","Incline walk"]})]},
fbA:{nm:"Full Body A",fx:"Beginner: legs · chest · back · shoulders",ex:[gx("Goblet squat","Quads",3,"8-10",{alt:["Squat","Leg press"]}),gx("Machine chest press","Chest",3,"8-10",{alt:["Bench press","Dumbbell bench press"]}),gx("Lat pulldown","Back",3,"10-12",{alt:["Assisted pull-ups","Seated cable row"]}),gx("Dumbbell shoulder press","Shoulders",3,"10",{alt:["Machine shoulder press"]}),gx("Plank (seconds)","Core",3,"30",{k:"sec"})]},
fbB:{nm:"Full Body B",fx:"Beginner: legs · chest · back · arms",ex:[gx("Leg press","Quads",3,"10-12",{alt:["Goblet squat","Hack squat"]}),gx("Incline dumbbell press","Chest",3,"10-12",{alt:["Machine chest press"]}),gx("Seated cable row","Back",3,"10-12",{alt:["Chest-supported row","Machine row"]}),gx("Lateral raises","Shoulders",3,"12-15",{alt:["Cable lateral raise"]}),gx("Dumbbell curl","Biceps",2,"12",{alt:["Hammer curl","Cable curl"]}),gx("Triceps pushdown","Triceps",2,"12",{alt:["Bench dips"]})]},
fbC:{nm:"Full Body C",fx:"Beginner: hinge · push · pull · core",ex:[gx("Romanian deadlift (light)","Hamstrings",3,"10",{alt:["Dumbbell Romanian deadlift","Leg curl"]}),gx("Push-ups / machine chest press","Chest",3,"10-12",{k:"bw",alt:["Machine chest press","Incline push-ups"]}),gx("Assisted pull-up / lat pulldown","Back",3,"8-10",{alt:["Lat pulldown"]}),gx("Face pulls","Shoulders",3,"15",{alt:["Rear delt fly"]}),gx("Standing calf raise","Calves",3,"15",{alt:["Seated calf raise"]}),gx("Leg raises","Core",3,"12",{k:"bw",alt:["Hanging knee raise"]})]}
};
const GYM_WEEK={ppl:["rest","pushA","pullA","legsA","pushB","pullB","legsB"],beginner:["rest","fbA","rest","fbB","rest","fbC","rest"]}; // index = Date.getDay()
const GYM_ORDER=[1,2,3,4,5,6,0],GYM_DN=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const GYM_REST_ITEMS=[["walk","30-45 min easy walk"],["stretch","Stretching / mobility (10-15 min)"],["weigh","Weekly weigh-in + waist (morning, after washroom)"],["photo","Progress photo (front / side / back, same light)"],["prep","Meal prep for the week"],["sleep","Sleep goal: 7-8 hours tonight"]];
const GYM_MOBILITY=["Hip flexor stretch: 30 s each side","Hamstring stretch: 30 s each side","Doorway chest stretch: 30 s","Thoracic rotation (open book): 8 each side","Cat-cow: 10 slow reps","Child's pose: 45 s","Shoulder circles + wall slides: 10 each"];
const GYM_FORM=["Warm-up 5-8 min (light cardio + arm/hip circles), then 2 ramp-up sets before your first heavy lift.","Heavy bench, squat or rack work: use safety pins/spotter. Never bench alone without safeties.","Do not ego-lift. Controlled reps, full range, 1-2 reps left in the tank. Form beats weight.","Soreness (dull, both sides, fades in 1-3 days) is normal. Sharp, joint, one-sided or pinching pain is not: stop that exercise and get it checked.","Sleep 7-8 h and keep protein steady; recovery is where muscle is built.","This is general fitness info, not medical advice. If you have an injury or health condition, ask a doctor/trainer first."];
const GYM=(()=>{
 const PK="dos_gym_plan",LK="dos_gym_log";
 let P=null,LOG=null,gsub="workout",gday=-1,gdate="",gauto=true,hslug="",curSess=null,saveT=0,dirty=0,drafts={};
 const RT={end:0,total:0};let AC=null;
 const num=v=>{const n=parseFloat(String(v??"").replace(",","."));return isFinite(n)?n:0};
 const fmt=n=>Number.isInteger(n)?String(n):String(+n.toFixed(1));
 const slug=s=>String(s).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"x";
 const rr=r=>{const m=String(r).match(/(\d+)(?:\s*-\s*(\d+))?/);return m?[+m[1],+(m[2]||m[1])]:[0,0]};
 const e1=(kg,reps)=>kg>0&&reps>0&&reps<=20?kg*(1+reps/30):0;
 function load(){if(P&&LOG)return;const o=jp(localStorage.getItem(PK),{});
  P={v:1,mode:o.mode==="beginner"?"beginner":"ppl",ed:o.ed&&typeof o.ed==="object"?o.ed:{},goals:Object.assign({w0:74,h:172,wa0:32,tw1:66,tw2:68,ta1:29,ta2:30},o.goals||{}),rt:Object.assign({preset:90,auto:1,snd:0},o.rt||{})};
  const l=jp(localStorage.getItem(LK),{});LOG={v:1,s:l.s&&typeof l.s==="object"?l.s:{},rest:l.rest&&typeof l.rest==="object"?l.rest:{}}}
 const saveP=()=>sset(PK,P),saveL=()=>{clearTimeout(saveT);dirty=0;return sset(LK,LOG)};
 const saveSoon=()=>{dirty=1;clearTimeout(saveT);saveT=setTimeout(saveL,500)};
 const flush=()=>{if(dirty)saveL()};
 const planKey=()=>GYM_WEEK[P.mode][gday];
 const planEx=k=>(P.ed[k]||GYM_PLANS[k].ex);
 const editable=k=>{if(!P.ed[k])P.ed[k]=JSON.parse(JSON.stringify(GYM_PLANS[k].ex));return P.ed[k]};
 const sessKey=(d,k)=>d+"|"+k;
 const sessFor=(d,k)=>LOG.s[sessKey(d,k)]||(drafts[sessKey(d,k)]=drafts[sessKey(d,k)]||{d,k,nm:GYM_PLANS[k].nm,t0:0,fin:0,note:"",ex:{},pr:{}});
 const touch=s=>{const key=sessKey(s.d,s.k);if(!LOG.s[key])LOG.s[key]=s;if(!s.t0)s.t0=Date.now()};
 const entry=(s,x)=>{const id=slug(x.n);let e=s.ex[id];if(!e)e=s.ex[id]={n:x.n,m:x.m,u:x.u,k:x.k,sets:[]};e.n=x.n;e.m=x.m;e.u=x.u;e.k=x.k;const want=x.k==="cardio"?1:x.s;while(e.sets.length<want)e.sets.push({kg:"",reps:"",ok:0});return e};
 const logged=(st,k)=>!!st.ok||(num(st.reps)>0&&(num(st.kg)>0||k!=="wt"));
 const vol=(st,k)=>(k==="wt"||k==="bw")&&logged(st,k)?num(st.kg)*num(st.reps):0;
 const stats=e=>{let w=0,b=0,v=0,n=0;e.sets.forEach(st=>{if(!logged(st,e.k))return;n++;const kg=num(st.kg),rp=num(st.reps);w=Math.max(w,kg);b=Math.max(b,e1(kg,rp));v+=vol(st,e.k)});return{w,e:b,v,n}};
 const hist=(id,exKey)=>Object.entries(LOG.s).filter(([k,s])=>k!==exKey&&s.ex&&s.ex[id]&&stats(s.ex[id]).n>0).map(([k,s])=>({k,d:s.d,e:s.ex[id]})).sort((a,b)=>a.d<b.d?-1:a.d>b.d?1:0);
 const prevOf=(id,s)=>{const key=sessKey(s.d,s.k),h=hist(id,key).filter(x=>x.d<=s.d);return h.length?h[h.length-1].e:null};
 const best=(id,s)=>{const key=sessKey(s.d,s.k);return hist(id,key).filter(x=>x.d<=s.d).reduce((a,x)=>{const t=stats(x.e);return{w:Math.max(a.w,t.w),e:Math.max(a.e,t.e),v:Math.max(a.v,t.v),any:1}},{w:0,e:0,v:0,any:0})};
 const prsOf=(id,s,e)=>{const b=best(id,s);if(!b.any)return[];const c=stats(e),r=[];if(b.w>0&&c.w>b.w)r.push("w");if(b.e>0&&c.e>b.e+.01)r.push("e");if(b.v>0&&c.v>b.v)r.push("v");return r};
 const PRN={w:"Weight PR",e:"1RM PR",v:"Volume PR"};
 const setTxt=(sets,k)=>{const a=sets.filter(st=>logged(st,k));if(!a.length)return"";if(k==="wt"||k==="bw"){return a.map((st,i)=>num(st.kg)>0?(i===0?fmt(num(st.kg))+" kg × "+fmt(num(st.reps)):fmt(num(st.kg))+" × "+fmt(num(st.reps))):fmt(num(st.reps))+" reps").join(", ")}return a.map(st=>fmt(num(st.reps))).join(", ")+(k==="sec"?" s":" min")};
 function hintFor(x,prev){if(!prev||x.k!=="wt")return"";const L=prev.sets.filter(st=>logged(st,"wt")&&num(st.kg)>0);if(!L.length)return"";const[lo,hi]=rr(x.r),mx=Math.max(...L.map(st=>num(st.kg)));
  if(L.length>=x.s&&L.every(st=>num(st.reps)>=hi)){const inc=x.u==="lower"?5:2.5;return `⬆ Pichli baar sab sets ${hi} reps par the. Aaj ${fmt(mx+inc)} kg try karo (+${inc} kg).`}
  if(L.some(st=>num(st.reps)<lo))return `Weight wahi (${fmt(mx)} kg) rakho, pehle ${lo}+ reps tak pahucho.`;return""}
 const phSet=(prev,i,f)=>{if(!prev||!prev.sets.length)return"";const L=prev.sets.filter(st=>logged(st,prev.k)),st=L[i]||L[L.length-1];return st&&st[f]!==""?String(st[f]):(f==="reps"&&st&&st.ok?"":"")};
 /* ---------- rest timer (global, survives tab switches) ---------- */
 function pill(){let p=document.getElementById("restpill");if(!p){p=document.createElement("div");p.id="restpill";p.hidden=true;p.setAttribute("role","timer");p.innerHTML='<span id="rtT">0:00</span><button data-rt="+15" aria-label="Add 15 seconds">+15s</button><button data-rt="stop" aria-label="Stop rest timer">Stop</button>';p.addEventListener("click",e=>{const b=e.target.closest("[data-rt]");if(b)rtAct(b.dataset.rt)});document.body.appendChild(p)}return p}
 function rtAct(a){if(a==="stop"){RT.end=0}else if(a==="+15"){if(RT.end)RT.end+=15000}else{const s=+a;if(s>0){load();P.rt.preset=s;saveP();RT.total=s;RT.end=Date.now()+s*1000;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();AC.resume&&AC.resume()}catch(_){}}}rtTick()}
 const mmss=s=>Math.floor(s/60)+":"+pad(s%60);
 function rtTick(){const p=pill(),big=document.getElementById("rtbig");if(!RT.end){p.hidden=true;if(big)big.textContent="Rest: ready";return}
  const left=Math.ceil((RT.end-Date.now())/1000);
  if(left<=0){RT.end=0;p.hidden=true;if(big)big.textContent="Rest: ready";load();vib([200,100,200,100,300]);if(P.rt.snd)beep();toast("Rest khatam. Agla set!","ok");
   if(document.hidden&&window.Notification&&Notification.permission==="granted"&&navigator.serviceWorker)navigator.serviceWorker.ready.then(r=>r.showNotification("Rest khatam",{body:"Agla set shuru karo",icon:"./icon-192.png",tag:"rest"})).catch(()=>{});return}
  p.hidden=false;document.getElementById("rtT").textContent="Rest "+mmss(left);if(big)big.textContent="Rest: "+mmss(left)}
 function beep(){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();[0,.25,.5].forEach(t=>{const o=AC.createOscillator(),g=AC.createGain();o.connect(g);g.connect(AC.destination);o.frequency.value=880;g.gain.value=.15;o.start(AC.currentTime+t);o.stop(AC.currentTime+t+.15)})}catch(_){}}
 function durTick(){const el=document.getElementById("gdur");if(!el||!curSess)return;el.textContent=curSess.fin?mmss(Math.round((curSess.fin-(curSess.t0||curSess.fin))/1000)):curSess.t0?mmss(Math.max(0,Math.round((Date.now()-curSess.t0)/1000))):"0:00"}
 setInterval(()=>{if(RT.end)rtTick();durTick()},500);
 addEventListener("pagehide",flush);document.addEventListener("visibilitychange",()=>{if(document.hidden)flush();else rtTick()});
 /* ---------- view model helpers ---------- */
 const wkStart=d=>{const x=fromK(d),g=(x.getDay()+6)%7;x.setDate(x.getDate()-g);return dk(x)};
 function totals(s,k){let sets=0,done=0,v=0;planEx(k).forEach(x=>{const e=entry(s,x);e.sets.forEach(st=>{sets++;if(logged(st,e.k))done++;v+=vol(st,e.k)})});return{sets,done,v}}
 function updHeader(){if(!curSess)return;const t=totals(curSess,curSess.k),a=document.getElementById("gvol"),b=document.getElementById("gsets"),c=document.getElementById("gbar");if(a)a.textContent=Math.round(t.v).toLocaleString();if(b)b.textContent=t.done+"/"+t.sets;if(c)c.style.width=(t.sets?100*t.done/t.sets:0)+"%"}
 function updEx(id,x){const card=document.querySelector(`[data-ex="${id}"]`);if(!card||!curSess)return;const e=entry(curSess,x),pr=prsOf(id,curSess,e),st=stats(e);
  const bd=card.querySelector(".badges");if(bd)bd.innerHTML=pr.map(t=>`<span class="bdg">🏆 ${PRN[t]}</span>`).join("")+(st.v>0?`<span class="bdg v">Vol ${Math.round(st.v)} kg</span>`:"");
  const prevNew=curSess.pr[id]||[],now=pr.filter(t=>!prevNew.includes(t));if(now.length){curSess.pr[id]=[...new Set([...prevNew,...pr])];vib([30,40,30]);toast("🏆 "+PRN[now[0]]+": "+x.n,"ok");saveSoon();if(typeof checkAch==="function")checkAch()}}
 /* ---------- HTML ---------- */
 const dayChips=()=>`<div class="chips noswipe" role="group" aria-label="Workout day">${GYM_ORDER.map(g=>{const k=GYM_WEEK[P.mode][g],nm=k==="rest"?"Rest":GYM_PLANS[k].nm;return `<button class="chip ${g===gday?"on":""}" data-gday="${g}" aria-pressed="${g===gday}">${GYM_DN[g]}<br><small>${esc(nm)}</small></button>`}).join("")}</div>`;
 function exCard(x,s,i){const id=slug(x.n),e=entry(s,x),prev=prevOf(id,s),pr=prsOf(id,s,e),st=stats(e),lt=prev?setTxt(prev.sets,prev.k):"",hint=hintFor(x,prev),k=x.k;
  const rows=e.sets.map((v,j)=>{const phK=phSet(prev,j,"kg"),phR=phSet(prev,j,"reps")||String(rr(x.r)[1]||"");
   return k==="cardio"?`<div class="set cardio" data-i="${j}"><span class="sn">min</span><input class="gin" inputmode="decimal" data-g="reps" value="${esc(v.reps)}" placeholder="${esc(phSet(prev,j,"reps")||x.r)}" aria-label="Minutes"><button class="ck ${v.ok?"on":""}" data-gok role="checkbox" aria-checked="${!!v.ok}" aria-label="Done">${CK}</button></div>`
   :`<div class="set" data-i="${j}"><span class="sn">${j+1}</span>${k==="sec"?'<span class="mut sn2">–</span>':`<input class="gin" inputmode="decimal" data-g="kg" value="${esc(v.kg)}" placeholder="${esc(phK||(k==="bw"?"+kg":"kg"))}" aria-label="Set ${j+1} kg">`}<input class="gin" inputmode="${k==="sec"?"numeric":"numeric"}" data-g="reps" value="${esc(v.reps)}" placeholder="${esc(phR)}" aria-label="Set ${j+1} ${k==="sec"?"seconds":"reps"}"><button class="ck ${v.ok?"on":""}" data-gok role="checkbox" aria-checked="${!!v.ok}" aria-label="Set ${j+1} done">${CK}</button></div>`}).join("");
  return `<div class="card ex" data-ex="${id}" data-xi="${i}"><div class="hd"><div><h3>${esc(x.n)}</h3><div class="mut">${k==="cardio"?esc(x.r)+" min":x.s+" × "+esc(x.r)+(k==="sec"?" s":"")} · <span class="tag">${esc(x.m)}</span></div></div><button class="btn" data-hist="${id}" aria-label="History of ${esc(x.n)}">📈</button></div>
  ${lt?`<div class="last mut">Last time: ${esc(lt)}</div>`:'<div class="last mut">Pehli baar: kuch bhi log karo, agli baar yahan dikhega.</div>'}${hint?`<div class="hint">${esc(hint)}</div>`:""}
  <div class="badges" aria-live="polite">${pr.map(t=>`<span class="bdg">🏆 ${PRN[t]}</span>`).join("")}${st.v>0?`<span class="bdg v">Vol ${Math.round(st.v)} kg</span>`:""}</div>
  ${k==="cardio"?"":`<div class="set sethd"><span></span>${k==="sec"?"<span></span>":"<span>kg</span>"}<span>${k==="sec"?"seconds":"reps"}</span><span></span></div>`}${rows}
  <div class="exbar"><button class="btn" data-gadd>+ Set</button><button class="btn" data-gdel>− Set</button>${prev&&k!=="cardio"?'<button class="btn" data-gcopy>Copy last</button>':""}</div></div>`}
 function restCard(d){const r=LOG.rest[d]||{chk:{},sore:0},done=GYM_REST_ITEMS.filter(i=>r.chk[i[0]]).length;
  return `<div class="card"><div class="hd"><div><h2 style="margin:0">Rest day</h2><div class="mut">Recovery = growth. Aaj halka rakho.</div></div><b>${done}/${GYM_REST_ITEMS.length}</b></div>
  ${GYM_REST_ITEMS.map(i=>`<div class="row"><div>${esc(i[1])}</div><button class="ck ${r.chk[i[0]]?"on":""}" data-rchk="${i[0]}" role="checkbox" aria-checked="${!!r.chk[i[0]]}" aria-label="${esc(i[1])}">${CK}</button></div>`).join("")}
  <p>Soreness / aaj kaisa lag raha hai? <span class="mut">(1 = fresh, 5 = bahut dukh raha)</span></p><div class="seg">${[1,2,3,4,5].map(v=>`<button class="btn ${r.sore===v?"on":""}" data-rsore="${v}" aria-pressed="${r.sore===v}">${v}</button>`).join("")}</div>
  <details><summary><h3>Mobility routine</h3></summary><ul>${GYM_MOBILITY.map(m=>`<li>${esc(m)}</li>`).join("")}</ul></details></div>`}
 function bodyCard(d){const n=db[d]?.numbers||{},g=P.goals,ws=Object.keys(db).filter(k=>db[k]?.numbers?.weight!=null).sort(),last=ws.length?db[ws[ws.length-1]].numbers.weight:null,first=ws.length?db[ws[0]].numbers.weight:null;
  return `<details class="card" ${GYM_WEEK[P.mode][gday]==="rest"?"open":""}><summary><h3>Body stats</h3></summary><div class="bodygrid"><label>Weight (kg)<input class="gin" inputmode="decimal" data-body="weight" value="${n.weight??""}" placeholder="${last??g.w0}"></label><label>Waist (inch)<input class="gin" inputmode="decimal" data-body="waist" value="${n.waist??""}" placeholder="${g.wa0}"></label></div>
  <p class="mut">Start ${fmt(g.w0)} kg · Ab ${last!=null?fmt(last)+" kg":"–"}${first!=null&&last!=null?" ("+(last-first>0?"+":"")+fmt(+(last-first).toFixed(1))+" since first log)":""} · Target ${fmt(g.tw1)}-${fmt(g.tw2)} kg · Waist target ${fmt(g.ta1)}-${fmt(g.ta2)} inch. Ye same numbers Journal aur Progress me dikhte hain.</p></details>`}
 function restTimerCard(){return `<div class="card"><div class="hd"><h3>Rest timer</h3><b id="rtbig" class="rtbig">Rest: ready</b></div><div class="seg">${[60,90,120,180].map(s=>`<button class="btn ${P.rt.preset===s?"on":""}" data-rt="${s}">${s} s</button>`).join("")}</div><div class="seg"><button class="btn ${P.rt.auto?"on":""}" data-rtopt="auto" aria-pressed="${!!P.rt.auto}">Auto-start on ✓</button><button class="btn ${P.rt.snd?"on":""}" data-rtopt="snd" aria-pressed="${!!P.rt.snd}">Sound</button></div></div>`}
 function workoutHTML(){const k=planKey(),d=gdate;
  const head=`<h1>Gym</h1><div class="seg" role="tablist">${[["workout","Workout"],["history","History"],["plan","Plan"]].map(t=>`<button class="btn ${gsub===t[0]?"on":""}" role="tab" aria-selected="${gsub===t[0]}" data-gsub="${t[0]}">${t[1]}</button>`).join("")}</div>`;
  if(gsub==="history")return head+historyHTML();if(gsub==="plan")return head+planHTML();
  let body=dayChips()+`<label class="mut gd">Date <input type="date" id="gdate" value="${d}" max="${todayK()}"></label>`;
  if(k==="rest"){curSess=null;return head+body+restCard(d)+bodyCard(d)+formHTML()}
  const s=sessFor(d,k),t=totals(s,k),pl=GYM_PLANS[k];curSess=s;
  body+=`<div class="card hero"><div class="hd"><div><h2 style="margin:0">${esc(pl.nm)}</h2><div class="mut">${esc(pl.fx)}</div></div>${s.fin?'<span class="bdg">Finished ✓</span>':""}</div>
  <div class="gstats"><div><b id="gvol">${Math.round(t.v).toLocaleString()}</b><span>kg volume</span></div><div><b id="gsets">${t.done}/${t.sets}</b><span>sets</span></div><div><b id="gdur">0:00</b><span>time</span></div></div><div class="pbar"><i id="gbar" style="width:${t.sets?100*t.done/t.sets:0}%"></i></div>
  ${s.fin?`<button class="btn" data-greopen>Re-open</button>`:`<button class="btn g" data-gfin>Finish workout</button>${s.t0?"":'<button class="btn" data-gstart>Start timer</button>'}`}</div>`
  +restTimerCard()+bodyCard(d)+planEx(k).map((x,i)=>exCard(x,s,i)).join("")
  +`<div class="card"><label>Session note<textarea rows="2" id="gnote" placeholder="Kaisa raha? Energy, pain, form…">${esc(s.note)}</textarea></label></div>`+formHTML();
  return head+body}
 const formHTML=()=>`<details class="card"><summary><h3>Form &amp; safety</h3></summary><ul>${GYM_FORM.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></details>`;
 /* ---------- history ---------- */
 function allSlugs(){const m={};Object.values(LOG.s).forEach(s=>Object.entries(s.ex||{}).forEach(([id,e])=>{if(stats(e).n>0)m[id]=e.n}));return m}
 function weekVol(ws){const out={};Object.values(LOG.s).forEach(s=>{if(wkStart(s.d)!==ws)return;Object.values(s.ex||{}).forEach(e=>{const v=stats(e).v;if(v>0)out[e.m]=(out[e.m]||0)+v})});return out}
 function historyHTML(){const m=allSlugs(),ids=Object.keys(m);
  if(!ids.length)return `<div class="card empty"><h3>Abhi history nahi</h3><p class="mut">Pehla workout log karo (kg × reps), phir yahan weight/1RM chart, PRs aur weekly volume dikhega.</p></div>`;
  const pk=planKey(),fx=pk!=="rest"?planEx(pk)[0]:null;if(!m[hslug])hslug=fx&&ids.includes(slug(fx.n))?slug(fx.n):ids[0];
  const h=hist(hslug,""),run={w:0,e:0},rows=h.map(x=>{const t=stats(x.e),pr=(run.w&&t.w>run.w)||(run.e&&t.e>run.e+.01);run.w=Math.max(run.w,t.w);run.e=Math.max(run.e,t.e);return{...x,t,pr}}).reverse().slice(0,10);
  return `<div class="card"><label>Exercise<select id="hsel" class="full">${ids.sort((a,b)=>m[a].localeCompare(m[b])).map(i=>`<option value="${i}" ${i===hslug?"selected":""}>${esc(m[i])}</option>`).join("")}</select></label><h3>Best weight &amp; est. 1RM</h3><div class="cb" id="hch"></div><p class="mut">Est. 1RM = kg × (1 + reps/30) (Epley).</p></div>
  <div class="card"><h3>Past sessions</h3>${rows.map(r=>`<div class="row"><div><div class="t">${r.d}</div><div>${esc(setTxt(r.e.sets,r.e.k))}</div></div>${r.pr?'<span class="bdg">🏆 PR</span>':`<span class="mut">${Math.round(r.t.v)} kg</span>`}</div>`).join("")}</div>
  <div class="card"><h3>Weekly volume by muscle (kg)</h3><div class="cb" id="hvol"></div></div>`}
 function historyCharts(){const m=allSlugs();if(!m[hslug])return;const h=hist(hslug,"");
  const c1=document.getElementById("hch");if(c1)mkChart(c1,"line",h.map(x=>x.d.slice(5)),[{label:"Best set (kg)",data:h.map(x=>stats(x.e).w||null)},{label:"Est. 1RM",data:h.map(x=>{const v=stats(x.e).e;return v?+v.toFixed(1):null})}]);
  const ws=wkStart(todayK()),pw=fromK(ws);pw.setDate(pw.getDate()-7);const a=weekVol(ws),b=weekVol(dk(pw)),ms=GYM_MUSCLES.filter(x=>a[x]||b[x]);
  const c2=document.getElementById("hvol");if(c2){if(ms.length)mkChart(c2,"bar",ms,[{label:"This week",data:ms.map(x=>Math.round(a[x]||0))},{label:"Last week",data:ms.map(x=>Math.round(b[x]||0))}]);else c2.outerHTML='<p class="mut">Is hafte abhi volume nahi.</p>'}}
 /* ---------- plan editor ---------- */
 let pedit="pushA";
 function planHTML(){const g=P.goals,keys=P.mode==="ppl"?["pushA","pullA","legsA","pushB","pullB","legsB"]:["fbA","fbB","fbC"];if(!keys.includes(pedit))pedit=keys[0];const ex=planEx(pedit);
  return `<div class="card"><h3>Mode</h3><div class="seg"><button class="btn ${P.mode==="ppl"?"on":""}" data-pmode="ppl" aria-pressed="${P.mode==="ppl"}">Push / Pull / Legs (6 days)</button><button class="btn ${P.mode==="beginner"?"on":""}" data-pmode="beginner" aria-pressed="${P.mode==="beginner"}">Beginner: 3 full-body days</button></div><p class="mut">Beginner mode (pehle 3-4 hafte): Mon/Wed/Fri full body, baaki din rest. Form aur habit banane ke liye.</p></div>
  <div class="card"><h3>Goals</h3><div class="bodygrid">${[["w0","Start weight (kg)"],["h","Height (cm)"],["wa0","Start waist (inch)"],["tw1","Target weight min (kg)"],["tw2","Target weight max (kg)"],["ta1","Target waist min (inch)"],["ta2","Target waist max (inch)"]].map(f=>`<label>${f[1]}<input class="gin" inputmode="decimal" data-goal="${f[0]}" value="${g[f[0]]}"></label>`).join("")}</div></div>
  <div class="card"><label>Edit day<select id="psel" class="full">${keys.map(k=>`<option value="${k}" ${k===pedit?"selected":""}>${esc(GYM_PLANS[k].nm)}</option>`).join("")}</select></label>
  ${ex.map((x,i)=>{const alts=[...new Set([...(x.alt||[]),...(GYM_ALT_BY_M[x.m]||[])])].filter(a=>a!==x.n);return `<div class="ed" data-pi="${i}"><input data-pf="n" value="${esc(x.n)}" aria-label="Exercise name"><div class="seg"><input data-pf="s" inputmode="numeric" value="${x.s}" aria-label="Sets" style="max-width:5rem"><input data-pf="r" value="${esc(x.r)}" aria-label="Reps or minutes" style="max-width:7rem"><select data-pf="m" aria-label="Muscle">${GYM_MUSCLES.map(m=>`<option ${m===x.m?"selected":""}>${m}</option>`).join("")}</select></div>
   <div class="seg"><button class="btn" data-pup aria-label="Move up">↑</button><button class="btn" data-pdn aria-label="Move down">↓</button><select data-swap aria-label="Swap exercise"><option value="">Swap with…</option>${alts.map(a=>`<option>${esc(a)}</option>`).join("")}</select><button class="btn" data-pdel>Remove</button></div></div>`}).join("")}
  <h3>Add exercise</h3><div class="ed"><input id="pnn" placeholder="Exercise name"><div class="seg"><input id="pns" inputmode="numeric" placeholder="Sets" style="max-width:5rem"><input id="pnr" placeholder="Reps e.g. 8-10" style="max-width:8rem"><select id="pnm">${GYM_MUSCLES.map(m=>`<option>${m}</option>`).join("")}</select></div><button class="btn g" data-padd>+ Add</button></div>
  <button class="btn" data-preset="1">Reset this day to default</button><button class="btn" data-presetall="1">Reset all plans</button><p class="mut">Plan edits sirf aage ke workouts par asar karte hain; purani history safe rehti hai.</p></div>`}
 /* ---------- finishing ---------- */
 function stamp(s){const e=ent(s.d),t=totals(s,s.k),min=Math.max(1,Math.round(((s.fin||Date.now())-(s.t0||Date.now()))/60000)),line=`[Gym app] ${s.nm} · ${t.done} sets · ${Math.round(t.v)} kg volume · ${min} min`;
  e.gym=((e.gym||"").split("\n").filter(l=>l&&!l.startsWith("[Gym app]")).concat(line)).join("\n")}
 function unstamp(s){const e=db[s.d];if(e&&e.gym){e.gym=e.gym.split("\n").filter(l=>!l.startsWith("[Gym app]")).join("\n")}}
 function finish(){const s=curSess;if(!s)return;const t=totals(s,s.k);if(!t.done)return toast("Pehle kam se kam ek set log karo","warn");touch(s);s.fin=Date.now();s.vol=Math.round(t.v);s.sets=t.done;stamp(s);ent(s.d).ticks.s10=true;save();saveL();vib([60,40,60]);toast("Workout done! Gym tick lag gaya 💪","ok");if(typeof celebrate==="function")celebrate();if(typeof checkAch==="function")checkAch();render()}
 /* ---------- public ---------- */
 function ensureDay(){load();const t=todayK();if(gauto||!gdate){if(gdate!==t){gdate=t;gday=fromK(t).getDay()}}if(gday<0)gday=fromK(gdate).getDay()}
 function draw(){ensureDay();app.innerHTML=workoutHTML();if(gsub==="history")historyCharts();durTick();rtTick()}
 function start(){load();gauto=true;gdate=todayK();gday=fromK(gdate).getDay();gsub="workout";const k=planKey();if(k!=="rest"){const s=sessFor(gdate,k);touch(s);saveL()}}
 function click(e){load();const T=e.target,q=s=>T.closest(s);let b;
  if(b=q("[data-gsub]")){gsub=b.dataset.gsub;render();return}
  if(b=q("[data-gday]")){gday=+b.dataset.gday;render();return}
  if(b=q("[data-hist]")){hslug=b.dataset.hist;gsub="history";render();scrollTo(0,0);return}
  if(b=q("[data-rt]")){rtAct(b.dataset.rt);if(!/^\d/.test(b.dataset.rt))return;document.querySelectorAll("[data-rt]").forEach(x=>x.classList.toggle("on",x.dataset.rt==b.dataset.rt));return}
  if(b=q("[data-rtopt]")){const o=b.dataset.rtopt;P.rt[o]=P.rt[o]?0:1;saveP();b.classList.toggle("on",!!P.rt[o]);b.setAttribute("aria-pressed",!!P.rt[o]);if(o==="snd"&&P.rt.snd)beep();return}
  if(q("[data-gstart]")){if(curSess){touch(curSess);saveL();render()}return}
  if(q("[data-gfin]")){finish();return}
  if(q("[data-greopen]")){const s=curSess;if(s){s.fin=0;unstamp(s);save();saveL();render()}return}
  const card=q(".ex"),k=planKey();
  if(card&&(b=q("[data-gok]"))){const x=planEx(k)[+card.dataset.xi],id=card.dataset.ex,s=curSess,en=entry(s,x),row=b.closest(".set"),i=+row.dataset.i,st=en.sets[i],on=!st.ok;touch(s);st.ok=on?1:0;
   if(on){const prev=prevOf(id,s);let used=false;row.querySelectorAll("[data-g]").forEach(inp=>{if(inp.value===""&&inp.placeholder&&!isNaN(parseFloat(inp.placeholder))&&prev){inp.value=inp.placeholder;st[inp.dataset.g]=inp.placeholder;used=true}});if(used)toast("Last time ka number use kiya");
    if(P.rt.auto&&x.k!=="cardio")rtAct(String(P.rt.preset));vib(12)}
   b.classList.toggle("on",on);b.setAttribute("aria-checked",on);saveSoon();updEx(id,x);updHeader();return}
  if(card&&q("[data-gadd]")){const x=planEx(k)[+card.dataset.xi],en=entry(curSess,x);en.sets.push({kg:"",reps:"",ok:0});touch(curSess);saveL();render();return}
  if(card&&q("[data-gdel]")){const x=planEx(k)[+card.dataset.xi],en=entry(curSess,x);if(en.sets.length>1){en.sets.pop();saveL();render()}return}
  if(card&&q("[data-gcopy]")){const x=planEx(k)[+card.dataset.xi],id=card.dataset.ex,prev=prevOf(id,curSess);if(!prev)return;const en=entry(curSess,x),L=prev.sets.filter(st=>logged(st,prev.k));touch(curSess);en.sets.forEach((st,i)=>{const p=L[i]||L[L.length-1];if(p){st.kg=p.kg;st.reps=p.reps}});saveL();render();toast("Last session copy ho gaya");return}
  if(b=q("[data-rchk]")){const d=gdate,r=LOG.rest[d]=LOG.rest[d]||{chk:{},sore:0},id=b.dataset.rchk;r.chk[id]=!r.chk[id];b.classList.toggle("on",r.chk[id]);b.setAttribute("aria-checked",r.chk[id]);if(id==="stretch"&&r.chk[id]){ent(d).ticks.stretch=true;save()}saveL();const n=GYM_REST_ITEMS.filter(i=>r.chk[i[0]]).length;const bb=document.querySelector(".card .hd b");if(bb)bb.textContent=n+"/"+GYM_REST_ITEMS.length;vib(10);return}
  if(b=q("[data-rsore]")){const d=gdate,r=LOG.rest[d]=LOG.rest[d]||{chk:{},sore:0};r.sore=+b.dataset.rsore;saveL();document.querySelectorAll("[data-rsore]").forEach(x=>{x.classList.toggle("on",x===b);x.setAttribute("aria-pressed",x===b)});return}
  /* plan editor */
  if(b=q("[data-pmode]")){P.mode=b.dataset.pmode;saveP();gday=fromK(gdate).getDay();render();return}
  const pi=q("[data-pi]");
  if(pi&&q("[data-pup]")){const a=editable(pedit),i=+pi.dataset.pi;if(i>0){[a[i-1],a[i]]=[a[i],a[i-1]];saveP();render()}return}
  if(pi&&q("[data-pdn]")){const a=editable(pedit),i=+pi.dataset.pi;if(i<a.length-1){[a[i+1],a[i]]=[a[i],a[i+1]];saveP();render()}return}
  if(pi&&q("[data-pdel]")){if(confirm("Ye exercise plan se hatayein? (History safe rahegi)")){editable(pedit).splice(+pi.dataset.pi,1);saveP();render()}return}
  if(q("[data-padd]")){const n=document.getElementById("pnn").value.trim(),s=Math.max(1,Math.min(10,Math.round(num(document.getElementById("pns").value))||3)),r=document.getElementById("pnr").value.trim()||"10",m=document.getElementById("pnm").value;if(!n)return toast("Exercise ka naam likho","warn");editable(pedit).push(gx(n,m,s,r,{k:m==="Cardio"?"cardio":"wt"}));saveP();render();return}
  if(q("[data-preset]")){if(confirm("Is din ka plan default par laayein?")){delete P.ed[pedit];saveP();render()}return}
  if(q("[data-presetall]")){if(confirm("Saare plans default par laayein? (Logs safe rahenge)")){P.ed={};saveP();render()}return}}
 function input(e){load();const T=e.target;
  if(T.dataset.g&&curSess){const card=T.closest(".ex"),x=planEx(planKey())[+card.dataset.xi],en=entry(curSess,x),i=+T.closest(".set").dataset.i;en.sets[i][T.dataset.g]=T.value;touch(curSess);saveSoon();updEx(card.dataset.ex,x);updHeader();return}
  if(T.dataset.body){const d=gdate,v=T.value.trim(),n=ent(d).numbers;n[T.dataset.body]=v===""?null:num(v);clearTimeout(input.bt);input.bt=setTimeout(save,500);return}
  if(T.id==="gnote"&&curSess){touch(curSess);curSess.note=T.value;saveSoon()}}
 function change(e){load();const T=e.target;
  if(T.id==="gdate"){if(T.value&&T.value<=todayK()){gdate=T.value;gauto=gdate===todayK();gday=fromK(gdate).getDay();render()}return}
  if(T.id==="hsel"){hslug=T.value;render();return}
  if(T.id==="psel"){pedit=T.value;render();return}
  if(T.dataset.goal){P.goals[T.dataset.goal]=num(T.value);saveP();return}
  const pi=T.closest("[data-pi]");
  if(pi&&T.dataset.pf){const a=editable(pedit),x=a[+pi.dataset.pi],f=T.dataset.pf;if(f==="n"){const v=T.value.trim();if(!v){T.value=x.n;return}x.n=v}else if(f==="s")x.s=Math.max(1,Math.min(10,Math.round(num(T.value))||x.s));else if(f==="r")x.r=T.value.trim()||x.r;else if(f==="m"){x.m=T.value;x.u=GYM_LOWER.includes(x.m)?"lower":"upper";if(x.m==="Cardio")x.k="cardio"}saveP();return}
  if(pi&&"swap"in T.dataset&&T.value){const a=editable(pedit),x=a[+pi.dataset.pi];x.n=T.value;saveP();render();toast("Exercise swap ho gaya")}}
 const leave=()=>flush();
 const reload=()=>{P=null;LOG=null;drafts={}};
 const stat=()=>{load();const f=Object.values(LOG.s).filter(s=>s.fin);let pr=false;Object.values(LOG.s).forEach(s=>{if(s.pr&&Object.values(s.pr).some(a=>a&&a.length))pr=true});return{done:f.length,pr}};
 return{render:draw,click,input,change,leave,start,reload,stat};
})();
