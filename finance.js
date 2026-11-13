/* finance.js: "Scratch to Legend" learning tracker. Curriculum is read-only defaults; progress lives in dos_fin.
   Topic syntax: "Text" | "Text|custom search query" | trailing § = RBI Grade B overlap.
   Educational content only, not financial advice. Markets carry risk. */
const FIN_LEVELS=[
{id:"L0",t:"Money mindset and basics",h:6,ctx:"money basics India",mods:[
 {t:"Money & inflation",h:2.5,m:"Watch 2 short videos, then write 5 lines in your own words",task:"List last month's 10 biggest expenses and mark each as need or want.",topics:["What money is and how it works","Inflation and purchasing power","Needs vs wants"]},
 {t:"Your money map",h:1.5,m:"Read 1 article, then fill your own numbers",task:"Write your personal balance sheet (assets vs liabilities) and find your net worth.",topics:["Income, expenses, assets and liabilities","Opportunity cost"]},
 {t:"Time & compounding",h:2,m:"Video + play with the Tools tab calculators",task:"Use Tools: how long does Rs 10,000 take to double at 6%, 8% and 12%?",topics:["Time value of money","Compounding and the Rule of 72"]}]},
{id:"L1",t:"Personal finance foundation",h:10,ctx:"personal finance India",mods:[
 {t:"Budgeting & tracking",h:3,m:"Video, then build your own sheet",task:"Make a one-month budget and track every rupee for 30 days.",topics:["Budgeting methods (50/30/20, zero-based)","Expense tracking","Emergency fund","Savings vs investing"]},
 {t:"Banking & online safety",h:2.5,m:"Read bank/RBI safety pages + 1 video",task:"Check your UPI and bank app security settings and list 5 common scams.",topics:["Bank account types (savings, current, salary)","UPI and online fraud safety"]},
 {t:"Credit & debt",h:4.5,m:"Videos + check your own report",task:"Download your free CIBIL report and compute EMI for a Rs 5 lakh loan at 3 different rates.",topics:["Credit score and CIBIL","Credit cards","Good debt vs bad debt","EMI maths","Loans (home, personal, education)"]}]},
{id:"L2",t:"Protection",h:8,ctx:"insurance India",mods:[
 {t:"Term & health insurance",h:3.5,m:"Videos + compare plans on 2 aggregator sites",task:"Compare 3 term plans: premium, cover, claim settlement ratio.",topics:["Term insurance","Health insurance","Waiting periods and exclusions"]},
 {t:"Motor & home basics",h:1.5,m:"Read your own policy documents",task:"Find your vehicle policy: IDV, add-ons, renewal date.",topics:["Motor insurance basics","Home insurance basics"]},
 {t:"Claims, nominee & traps",h:3,m:"Video + read IRDAI claim guidance",task:"Write a one-page list of your policies, nominees and where documents are kept.",topics:["How claims work (cashless vs reimbursement)","Nominee and documentation","Why not to mix insurance with investment (ULIP, endowment)"]}]},
{id:"L3",t:"Tax basics (India)",h:10,ctx:"income tax India",mods:[
 {t:"Salary & regimes",h:4,m:"Video + use the income tax portal calculator",task:"Take your payslip and compute tax under both regimes.",topics:["Salary structure and CTC breakdown","Old vs new tax regime","Income tax slabs","TDS"]},
 {t:"Forms & filing",h:3.5,m:"Follow a filing walkthrough on last year's data",task:"Download your AIS and match it with Form 16.",topics:["Form 16, Form 26AS and AIS|Form 16 Form 26AS AIS explained","Filing ITR step by step","Advance tax"]},
 {t:"Saving tax & gains",h:2.5,m:"Videos + official IT department pages",task:"List which deductions you can actually use this year.",topics:["Section 80C, 80D and NPS","HRA","Capital gains basics (STCG and LTCG)"]}]},
{id:"L4",t:"Safe investments and debt instruments",h:8,ctx:"fixed income India",mods:[
 {t:"Bank & small savings",h:3,m:"Videos + compare on bank and post office sites",task:"Compare FD vs PPF vs EPF: rate, lock-in, tax.",topics:["FD and RD","PPF","EPF and VPF"]},
 {t:"NPS & government securities",h:2,m:"Read NPS and RBI Retail Direct pages",task:"Read about RBI Retail Direct and note how G-Secs are bought.",topics:["NPS","Government bonds and T-bills§|government securities G-Sec T-bill explained India"]},
 {t:"Bonds & debt funds",h:3,m:"Videos + read a debt fund factsheet",task:"Compute the real return of a 7% FD with 6% inflation and 30% tax.",topics:["Corporate bonds basics","Debt mutual funds","Real return vs inflation"]}]},
{id:"L5",t:"Mutual funds and index investing",h:12,ctx:"mutual funds India",mods:[
 {t:"Mutual fund basics",h:4,m:"Videos + open a real factsheet",task:"Open any fund factsheet and find NAV, expense ratio, AUM and exit load.",topics:["NAV","AMC and how a mutual fund works","Expense ratio","Direct vs regular plans"]},
 {t:"Fund types & styles",h:4,m:"Videos + Tools tab SIP calculator",task:"Use Tools: Rs 5,000/month for 10, 15 and 20 years at 10%.",topics:["SIP vs lumpsum","Index funds and ETFs","Large, mid, small and flexi cap","Hybrid funds and ELSS"]},
 {t:"Measuring & managing",h:4,m:"Videos + spreadsheet practice",task:"Draft a sample asset allocation for your risk level (on paper only).",topics:["CAGR vs XIRR","Asset allocation","Rebalancing","How to choose a fund"]}]},
{id:"L6",t:"Stock market fundamentals",h:15,ctx:"stock market India",mods:[
 {t:"Market structure",h:5,m:"Videos + NSE/SEBI investor education pages",task:"Read how a demat account works and list its charges.",topics:["Exchanges (NSE, BSE) and SEBI","Demat and trading account","Order types (market, limit, stop-loss)"]},
 {t:"Trading mechanics",h:5,m:"Videos + watch the market live (no trading)",task:"Track Nifty vs one stock for a week on paper.",topics:["Circuits (price bands)","Settlement (T+1)","Indices (Nifty, Sensex)","Market cap"]},
 {t:"Corporate actions & mindset",h:5,m:"Videos + read one IPO summary",task:"Read one recent IPO's RHP summary and list 3 risks.",topics:["IPO process","Dividends, splits and bonus","Behavioral biases"]}]},
{id:"L7",t:"Fundamental analysis",h:20,ctx:"fundamental analysis India",mods:[
 {t:"Reading financials",h:7,m:"Videos + read a real annual report",task:"Pick one company: note revenue, profit, debt and operating cash flow for 5 years.",topics:["How to read an annual report","Income statement (P&L)","Balance sheet","Cash flow statement"]},
 {t:"Ratios & quality",h:7,m:"Videos + compute ratios by hand",task:"Compute ROE and D/E for two companies in the same industry.",topics:["Key ratios: PE, PB, ROE, ROCE","D/E, interest cover and margins","Moat and business quality","Industry analysis"]},
 {t:"Valuation & screening",h:6,m:"Videos + practise on a screener website",task:"Build a 10-stock watchlist with a reason for each (no buying).",topics:["Valuation basics and intro to DCF","Using screeners","Red flags in accounts","Building a watchlist"]}]},
{id:"L8",t:"Technical analysis and trading basics",h:15,ctx:"technical analysis",mods:[
 {t:"Charts",h:6,m:"Videos + practise on free charts",task:"Mark support and resistance on 3 charts.",topics:["Candlesticks","Trend","Support and resistance","Volume"]},
 {t:"Indicators",h:4,m:"Videos + plot on a charting site",task:"Plot 50 and 200 day moving averages on Nifty and note crossovers.",topics:["Moving averages","RSI and MACD"]},
 {t:"Risk & discipline",h:5,m:"Videos + read the SEBI study summary",task:"Paper-trade 10 trades in a journal and compute risk per trade.",topics:["Risk management","Position sizing and stop-loss","Trading journal","Why most retail traders lose money (SEBI study)"]}]},
{id:"L9",t:"Derivatives and risk",h:12,ctx:"futures and options India",mods:[
 {t:"Futures",h:4,m:"Videos + NSE learning pages",task:"Explain in 5 lines how a futures contract settles.",topics:["Futures","Margin","Hedging"]},
 {t:"Options",h:5,m:"Videos + option chain (watch only)",task:"Pick one option on the chain and write its payoff at expiry for 3 prices.",topics:["Options (calls and puts)","Option pricing intuition","The Greeks"]},
 {t:"Risk reality",h:3,m:"Read SEBI study summaries",task:"Read the latest SEBI F&O study summary and write 3 takeaways.",topics:["Why F&O is high risk","SEBI findings on retail F&O losses"]}]},
{id:"L10",t:"Other assets",h:10,ctx:"investing India",mods:[
 {t:"Gold & real estate",h:4,m:"Videos + compare products",task:"Compare SGB, gold ETF and physical gold on cost, tax and risk.",topics:["Gold (SGB, gold ETFs)|Sovereign Gold Bond vs gold ETF India","Real estate, REITs and InvITs"]},
 {t:"Crypto & commodities",h:3,m:"Read RBI/SEBI/tax notes + 1 video",task:"Write the tax rules for crypto gains in India in your own words and verify them on the official site.",topics:["Crypto (risks, regulation, tax in India)","Commodities"]},
 {t:"Global & alternatives",h:3,m:"Videos + read about LRS rules",task:"List 3 ways an Indian can invest globally and one risk each.",topics:["International investing","Alternative assets"]}]},
{id:"L11",t:"Income growth and wealth building",h:15,ctx:"career income India",mods:[
 {t:"Skills & income",h:5,m:"Videos + write your own plan",task:"Write 3 skills that could raise your income and a 90-day plan for one.",topics:["Skill to income","Salary negotiation","Freelancing and side income"]},
 {t:"Business thinking",h:5,m:"Videos + case studies",task:"Pick a small business and compute its unit economics on paper.",topics:["Business basics","Unit economics","Multiple income streams"]},
 {t:"Wealth reality",h:5,m:"Videos + books/essays",task:"Write what 'wealth' means for you in numbers (net worth, monthly income).",topics:["Ownership and leverage","Reality of passive income","Personal brand","How wealth is actually built"]}]},
{id:"L12",t:"Macroeconomics and banking",h:15,ctx:"Indian economy RBI",mods:[
 {t:"Growth & prices",h:4,m:"Videos + RBI/MoSPI data pages",task:"Find latest GDP growth and CPI inflation figures and note the source and date.",topics:["GDP§","Inflation (CPI and WPI)§"]},
 {t:"Policy",h:5,m:"Videos + read the latest MPC statement",task:"Summarise the latest MPC decision in 5 lines.",topics:["Repo rate and RBI MPC§","Monetary vs fiscal policy§","Union Budget§"]},
 {t:"External sector",h:3,m:"Videos + RBI bulletin",task:"Explain why the rupee moved recently, with 2 reasons.",topics:["Forex and the rupee§","Balance of payments§"]},
 {t:"Banking & markets",h:3,m:"Videos + RBI reports",task:"Find the latest gross NPA ratio of the banking system and note the source.",topics:["Banking system (CRR, SLR)§","NPAs§","Structure of financial markets§"]}]},
{id:"L13",t:"Financial planning and goals",h:10,ctx:"financial planning India",mods:[
 {t:"Goals & net worth",h:4,m:"Videos + your own sheet",task:"List 3 goals with amount, year and monthly investment needed.",topics:["Goal-based planning","Net worth tracking"]},
 {t:"Retirement & FIRE",h:3.5,m:"Videos + calculators",task:"Estimate your retirement corpus using today's expenses and inflation (Tools).",topics:["Retirement and FIRE maths","Safe withdrawal rate"]},
 {t:"Estate & review",h:2.5,m:"Read guides, write your own documents",task:"Write a first draft of your own Investment Policy Statement (1 page).",topics:["Wills and estate basics","Annual financial review","Building my own investment policy statement"]}]},
{id:"L14",t:"Advanced / Legend",h:20,ctx:"investing",mods:[
 {t:"Portfolio & factors",h:5,m:"Books, papers, videos",task:"Describe your ideal portfolio in one paragraph and justify the weights.",topics:["Portfolio construction","Factor and value investing","Risk-adjusted returns (Sharpe ratio)"]},
 {t:"Behavior",h:3,m:"Books + reflection",task:"Write down your 3 biggest money biases and how you will counter them.",topics:["Behavioral finance"]},
 {t:"Market history & cases",h:8,m:"Documentaries, articles, case write-ups",task:"Pick one case and write: what happened, what warning signs existed, what you would check.",topics:["Harshad Mehta scam (1992)","Ketan Parekh and the dot-com bust (2000)","2008 global financial crisis","Covid crash (2020)","Satyam (2009)","IL&FS (2018)","Yes Bank (2020)"]},
 {t:"Reading & my system",h:4,m:"Read one book at a time, write a 1-page summary",task:"Write your personal investing rules on one page.",topics:["The Psychology of Money (Morgan Housel)","The Intelligent Investor (Benjamin Graham)","The Little Book of Common Sense Investing (John Bogle)","More reading: The Most Important Thing (Howard Marks)","Building my personal investing system"]}]},
{id:"LH",t:"Halal / Shariah-aware finance (optional)",h:8,ctx:"Islamic finance India",opt:1,mods:[
 {t:"Principles",h:4,m:"Videos + ask a qualified scholar",task:"List 3 interest-based products in your life and halal alternatives to discuss with a scholar.",topics:["Riba (interest)","Gharar and maysir","Zakat calculation"]},
 {t:"Practice",h:4,m:"Videos + read screening methodologies",task:"Read one halal screening method and write its 3 main filters.",topics:["Halal stock screening basics","Shariah-compliant funds and options available in India","Avoiding interest-based products","Ethical income"]}]}
];
const FIN_CALCS=[
{id:"sip",t:"SIP / lumpsum calculator",f:"SIP FV = P × [((1+i)ⁿ − 1) / i] × (1+i), i = rate/12/100, n = months · Lumpsum FV = L × (1+r)ʸ",fields:[["sip","Monthly SIP (₹)",5000],["lump","Lumpsum (₹)",0],["rate","Expected return (% per year)",10],["yrs","Years",15]],run:v=>{const i=v.rate/1200,n=v.yrs*12,fvS=i?v.sip*((Math.pow(1+i,n)-1)/i)*(1+i):v.sip*n,fvL=v.lump*Math.pow(1+v.rate/100,v.yrs),inv=v.sip*n+v.lump,fv=fvS+fvL;return `Invested ${inr(inv)} → value ${inr(fv)} (gain ${inr(fv-inv)})`}},
{id:"emi",t:"EMI calculator",f:"EMI = P × i × (1+i)ⁿ / ((1+i)ⁿ − 1), i = rate/12/100",fields:[["p","Loan amount (₹)",500000],["rate","Interest (% per year)",10],["m","Tenure (months)",60]],run:v=>{const i=v.rate/1200;if(!v.m)return"–";const e=i?v.p*i*Math.pow(1+i,v.m)/(Math.pow(1+i,v.m)-1):v.p/v.m;return `EMI ${inr(e)} / month · total ${inr(e*v.m)} · interest ${inr(e*v.m-v.p)}`}},
{id:"r72",t:"Rule of 72",f:"Years to double ≈ 72 / rate% · Rate needed ≈ 72 / years",fields:[["rate","Return (% per year)",8],["yrs","Years to double (optional)",0]],run:v=>`At ${v.rate}% money doubles in ≈ ${v.rate?(72/v.rate).toFixed(1):"–"} years`+(v.yrs?` · to double in ${v.yrs} years you need ≈ ${(72/v.yrs).toFixed(1)}%`:"")},
{id:"inf",t:"Inflation-adjusted value",f:"Future cost = A × (1+i)ⁿ · Value in today's money = A / (1+i)ⁿ",fields:[["a","Amount (₹)",100000],["i","Inflation (% per year)",6],["n","Years",10]],run:v=>`Same things will cost ${inr(v.a*Math.pow(1+v.i/100,v.n))} · ${inr(v.a)} then buys what ${inr(v.a/Math.pow(1+v.i/100,v.n))} buys today`},
{id:"emg",t:"Emergency fund",f:"Fund = (essential monthly expenses + EMIs + insurance) × months (usually 6)",fields:[["e","Essential expenses / month (₹)",30000],["m","EMIs + premiums / month (₹)",5000],["mo","Months to cover",6]],run:v=>`Target emergency fund: ${inr((v.e+v.m)*v.mo)}`},
{id:"zk",t:"Simple zakat calculator",f:"Zakat = 2.5% × (zakatable wealth − short-term debts) if ≥ nisab · Silver nisab = 612.36 g × silver price per gram",fields:[["cash","Cash + bank (₹)",0],["gold","Gold value (₹)",0],["silver","Silver value (₹)",0],["inv","Investments, market value (₹)",0],["biz","Business stock/receivables (₹)",0],["debt","Short-term debts due (₹)",0],["sp","Silver price per gram (₹, check today)",0],["nis","Nisab override (₹, optional)",0]],run:v=>{const net=Math.max(0,v.cash+v.gold+v.silver+v.inv+v.biz-v.debt),nis=v.nis>0?v.nis:612.36*v.sp;if(!nis)return"Enter today's silver price per gram (or your own nisab).";return net>=nis?`Net wealth ${inr(net)} ≥ nisab ${inr(nis)} → zakat due ≈ ${inr(net*0.025)} (if held a full lunar year)`:`Net wealth ${inr(net)} is below nisab ${inr(nis)} → no zakat due`}}
];
const inr=n=>"₹"+Math.round(n).toLocaleString("en-IN");
const FIN=(()=>{
 const KEY="dos_fin",ST=[["n","Not started"],["l","Learning"],["d","Done"],["r","Need revision"]],SN=Object.fromEntries(ST);
 let F=null,fsub="overview",flevel="",fcust=false,open=new Set(),PARSED=null,TMAP={},noteT=0,toolT=0;
 const load=()=>{if(F)return;const o=jp(localStorage.getItem(KEY),{});F={v:1,p:o.p&&typeof o.p==="object"?o.p:{},c:o.c&&typeof o.c==="object"?o.c:{},days:o.days&&typeof o.days==="object"?o.days:{},hide:o.hide||{},lh:o.lh?1:0,custom:o.custom||{},tools:o.tools||{}}};
 const sv=()=>sset(KEY,F);
 function parse(){if(PARSED)return PARSED;PARSED=FIN_LEVELS.map(L=>({...L,mods:L.mods.map((M,mi)=>{const id=L.id+"."+(mi+1);return{...M,id,topics:M.topics.map((raw,ti)=>{const rbi=/§/.test(raw),[t,q]=raw.replace(/§/g,"").split("|"),tid=id+"."+(ti+1),o={id:tid,t,q:q||"",rbi,h:M.h/M.topics.length,L:L.id,Lt:L.t,ctx:L.ctx};TMAP[tid]=o;return o})}})}));return PARSED}
 const visible=()=>parse().filter(L=>L.id==="LH"?F.lh:!F.hide[L.id]);
 const customOf=L=>(F.custom[L]||[]).map(c=>{TMAP[c.id]={id:c.id,t:c.t,q:"",rbi:false,h:.5,L,Lt:(parse().find(x=>x.id===L)||{}).t,ctx:"investing India",custom:1};return TMAP[c.id]});
 const allTopics=L=>[...L.mods.flatMap(m=>m.topics),...customOf(L.id)];
 const st=id=>(F.p[id]||{}).s||"n";
 function lvStat(L){const T=allTopics(L);let d=0,hd=0,ht=0;T.forEach(t=>{ht+=t.h;if(st(t.id)==="d"){d++;hd+=t.h}});return{n:T.length,d,hd,ht,pct:ht?Math.round(100*hd/ht):0}}
 function overall(){let hd=0,ht=0,d=0,n=0;visible().forEach(L=>{const s=lvStat(L);hd+=s.hd;ht+=s.ht;d+=s.d;n+=s.n});return{hd,ht,d,n,pct:ht?Math.round(100*hd/ht):0}}
 const curLevel=()=>visible().find(L=>lvStat(L).pct<100)||null;
 function nextUp(){const L=curLevel();if(!L)return null;const T=allTopics(L);return T.find(t=>st(t.id)==="l")||T.find(t=>st(t.id)==="r")||T.find(t=>st(t.id)==="n")||null}
 function streak(){let d=new Date();if(!F.days[dk(d)])d.setDate(d.getDate()-1);let n=0;while(F.days[dk(d)]){n++;d.setDate(d.getDate()-1)}return n}
 const unlocked=(L,i,vis)=>i===0||lvStat(vis[i-1]).pct>=60||lvStat(L).pct>0;
 const enc=encodeURIComponent;
 const ytQ=t=>t.q||`${t.t} ${t.ctx||"India"} explained`,gQ=t=>t.q||`${t.t} ${t.ctx||"India"}`;
 const aiPrompt=t=>`Explain "${t.t}" (${t.Lt}, India) like I'm a beginner using Indian examples. Then give 5 quiz questions with answers and 1 real-life exercise I can do this week. Be factual, mention risks, and tell me what to verify on official sources (RBI, SEBI, income tax portal).`;
 function setStatus(id,s){load();const t=TMAP[id];if(!t)return;if(s==="n"){delete F.p[id]}else{const p=F.p[id]=F.p[id]||{};p.s=s;if(s==="d")p.at=todayK()}
  if(s==="d"||s==="l")F.days[todayK()]=1;sv();
  if(s==="d"){ent(todayK()).ticks.finlearn=true;save();vib(15)}
  if(typeof checkAch==="function")checkAch()}
 /* ---------- html ---------- */
 const bar=p=>`<div class="pbar" role="progressbar" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="100"><i style="width:${p}%"></i></div>`;
 function topicRow(t){const s=st(t.id),p=F.p[t.id]||{},isO=open.has(t.id);
  return `<details class="topic" data-tid="${t.id}" ${isO?"open":""}><summary><button class="ck ${s==="d"?"on":""}" data-fdone="${t.id}" role="checkbox" aria-checked="${s==="d"}" aria-label="Mark ${esc(t.t)} done">${CK}</button><div class="tt"><div>${esc(t.t)}${t.rbi?' <span class="tag">RBI Grade B</span>':""}</div><div class="p">${SN[s]}${s==="d"&&p.at?" · "+p.at:""}${p.n?" · ✎":""}</div></div></summary>
  <div class="tdet"><div class="seg" role="group" aria-label="Status">${ST.map(x=>`<button class="btn ${s===x[0]?"on":""}" data-fst="${t.id}:${x[0]}" aria-pressed="${s===x[0]}">${x[1]}</button>`).join("")}</div>
  <label>I learned:<input data-fnote="${t.id}" value="${esc(p.n||"")}" placeholder="Ek line me samjhao (teach-back)" maxlength="300"></label>
  <div class="seg"><a class="btn" target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/results?search_query=${enc(ytQ(t))}">YouTube</a><a class="btn" target="_blank" rel="noopener noreferrer" href="https://www.google.com/search?q=${enc(gQ(t))}">Google</a><button class="btn g" data-fai="${t.id}">Ask AI (copy prompt)</button>${t.custom?`<button class="btn" data-fdel="${t.id}">Delete</button>`:""}</div></div></details>`}
 const CHK_EX=["Can I give one real Indian example?","Can I name one common beginner mistake here?","Can I teach this module in 2 minutes?","Can I say what could go wrong and how to check it?","Can I do the mini task below without help?"];
 const chkQs=M=>{const q=M.topics.slice(0,4).map(t=>`Can I explain ${t.t.replace(/\s*\(.*?\)\s*/g," ").trim()} in my own words?`);let i=0;while(q.length<5)q.push(CHK_EX[i++]);return q};
 function modHTML(M){const mask=F.c[M.id]||0,qs=chkQs(M),dn=M.topics.filter(t=>st(t.id)==="d").length,all=dn===M.topics.length&&mask===31;
  return `<div class="card mod"><div class="hd"><div><h3>${esc(M.t)}</h3><div class="mut">${M.h} h · ${esc(M.m)}</div></div>${all?'<span class="bdg">Module ✓</span>':`<span class="mut">${dn}/${M.topics.length}</span>`}</div>${M.topics.map(topicRow).join("")}
  <details class="chk"><summary><h3>Self-check (${[0,1,2,3,4].filter(i=>mask>>i&1).length}/5)</h3></summary>${qs.map((q,i)=>`<div class="row"><div>${esc(q)}</div><button class="ck ${mask>>i&1?"on":""}" data-fchk="${M.id}:${i}" role="checkbox" aria-checked="${!!(mask>>i&1)}" aria-label="${esc(q)}">${CK}</button></div>`).join("")}<p class="mut"><b>Mini task:</b> ${esc(M.task)}</p></details></div>`}
 function levelHTML(){const L=parse().find(x=>x.id===flevel);if(!L){flevel="";return learnHTML()}const s=lvStat(L),cu=customOf(L.id);
  return `<button class="btn" data-fback>‹ Levels</button><div class="card hero"><h2 style="margin:0">${L.id} · ${esc(L.t)}</h2><div class="mut">${s.d}/${s.n} topics · ${s.hd.toFixed(1)}/${s.ht.toFixed(1)} h estimated</div>${bar(s.pct)}</div>${L.mods.map(modHTML).join("")}
  <div class="card"><h3>Mere topics (${L.id})</h3>${cu.map(topicRow).join("")||'<p class="mut empty">Apna topic add karo; wo is level ki progress me ginega (0.5 h).</p>'}<label>Naya topic<input id="fnew" placeholder="jaise: Gold loan kaise kaam karta hai" maxlength="120"></label><button class="btn g" data-fadd="${L.id}">+ Add topic</button></div>`}
 function learnHTML(){const vis=visible();return `${vis.map(L=>{const s=lvStat(L);return `<button class="card lvl" data-flevel="${L.id}"><div class="hd"><div><h3>${L.id} · ${esc(L.t)}</h3><div class="mut">${L.h} h · ${s.d}/${s.n} topics</div></div><b>${s.pct}%</b></div>${bar(s.pct)}</button>`}).join("")}
  <details class="card" id="fcust" ${fcust?"open":""}><summary><h3>Levels dikhao / chhupao</h3></summary>${parse().filter(L=>L.id!=="LH").map(L=>`<div class="row"><div>${L.id} · ${esc(L.t)}</div><button class="btn ${F.hide[L.id]?"":"on"}" data-fhide="${L.id}" aria-pressed="${!F.hide[L.id]}">${F.hide[L.id]?"Hidden":"Shown"}</button></div>`).join("")}<div class="row"><div>LH · Halal / Shariah-aware track (optional)</div><button class="btn ${F.lh?"on":""}" data-flh aria-pressed="${!!F.lh}">${F.lh?"Enabled":"Enable"}</button></div></details>`}
 function overviewHTML(){const o=overall(),cl=curLevel(),nx=nextUp(),vis=visible(),sk=streak();
  return `<div class="gstats"><div><b>${o.pct}%</b><span>complete</span></div><div><b>${o.hd.toFixed(0)}/${o.ht.toFixed(0)}</b><span>hours</span></div><div><b>${cl?cl.id:"✓"}</b><span>level</span></div><div><b>${sk}</b><span>day streak</span></div></div>${bar(o.pct)}
  ${nx?`<div class="card hero"><div class="mut">Next up · ${esc(TMAP[nx.id].Lt)}</div><h3>${esc(nx.t)}</h3><div class="seg"><a class="btn" target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/results?search_query=${enc(ytQ(nx))}">YouTube</a><a class="btn" target="_blank" rel="noopener noreferrer" href="https://www.google.com/search?q=${enc(gQ(nx))}">Google</a><button class="btn g" data-fai="${nx.id}">Ask AI</button><button class="btn" data-fopen="${nx.id}">Open ›</button></div></div>`:'<div class="card"><p>Saare visible levels poore. MashaAllah! Naya level enable karo ya apne topics add karo.</p></div>'}
  <h2>Level map</h2><div class="lmap" role="list">${vis.map((L,i)=>{const s=lvStat(L),done=s.pct>=100,cur=cl&&cl.id===L.id,un=unlocked(L,i,vis);return `<button class="ln ${done?"done":cur?"cur":un?"open":"lock"}" role="listitem" data-flevel="${L.id}" aria-label="${L.id} ${esc(L.t)} ${s.pct}% ${done?"complete":un?"unlocked":"recommended later"}"><span>${done?"✓":L.id==="LH"?"H":L.id.slice(1)}</span><small>${s.pct}%</small></button>`}).join("")}</div><p class="mut">Levels hard-locked nahi hain; order sirf recommendation hai. Faded level = pichla level abhi 60% se kam.</p>
  <p class="mut">Tip: Finance habit "Finance learning (30 min)" Today me dikhne ke liye Core mode band karo. Topic Done karte hi aaj ka habit khud tick ho jata hai.</p>`}
 function toolsHTML(){const T=F.tools;return FIN_CALCS.map(c=>`<div class="card calc" data-calc="${c.id}"><h3>${c.t}</h3><div class="mut formula">${esc(c.f)}</div><div class="bodygrid">${c.fields.map(f=>`<label>${esc(f[1])}<input class="gin" inputmode="decimal" data-ci="${c.id}.${f[0]}" value="${(T[c.id]||{})[f[0]]??f[2]}"></label>`).join("")}</div><div class="out" id="out-${c.id}" aria-live="polite">${calc(c)}</div></div>`).join("")+`<p class="mut">Calculators estimate only; real returns/rates vary. Zakat: confirm with a qualified scholar.</p>`}
 function vals(c){const o={};c.fields.forEach(f=>{const raw=(F.tools[c.id]||{})[f[0]];const v=parseFloat(String(raw??f[2]).replace(/,/g,""));o[f[0]]=isFinite(v)?v:0});return o}
 const calc=c=>{try{return esc(c.run(vals(c)))}catch(_){return"–"}};
 function html(){load();const vis=visible();void vis;return `<h1>Finance</h1><div class="banner" role="note">Educational content only, not financial advice. Markets carry risk.</div><div class="seg" role="tablist">${[["overview","Overview"],["learn","Learn"],["tools","Tools"]].map(t=>`<button class="btn ${fsub===t[0]?"on":""}" role="tab" aria-selected="${fsub===t[0]}" data-fsub="${t[0]}">${t[1]}</button>`).join("")}</div>${fsub==="tools"?toolsHTML():fsub==="learn"?(flevel?levelHTML():learnHTML()):overviewHTML()}`}
 const draw=()=>{app.innerHTML=html()};
 /* ---------- events ---------- */
 function click(e){load();const T=e.target,q=s=>T.closest(s);let b;
  if(b=q("[data-fsub]")){fsub=b.dataset.fsub;flevel="";render();scrollTo(0,0);return}
  if(b=q("[data-flevel]")){flevel=b.dataset.flevel;fsub="learn";render();scrollTo(0,0);return}
  if(q("[data-fback]")){flevel="";render();return}
  if(b=q("[data-fopen]")){const t=TMAP[b.dataset.fopen];flevel=t.L;fsub="learn";open.add(t.id);render();setTimeout(()=>{const n=document.querySelector(`[data-tid="${t.id}"]`);if(n)n.scrollIntoView({block:"center"})},30);return}
  if(b=q("[data-fdone]")){e.preventDefault();const id=b.dataset.fdone;setStatus(id,st(id)==="d"?"n":"d");render();return}
  if(b=q("[data-fst]")){const[id,s]=b.dataset.fst.split(":");setStatus(id,s);open.add(id);render();return}
  if(b=q("[data-fai]")){const t=TMAP[b.dataset.fai];copyText(aiPrompt(t)).then(ok=>toast(ok?"AI prompt copy ho gaya. Ab ChatGPT/Claude/Gemini me paste karo":"Copy nahi hua",ok?"ok":"warn"));return}
  if(b=q("[data-fchk]")){const[id,i]=b.dataset.fchk.split(":");let m=F.c[id]||0;m^=1<<+i;F.c[id]=m;if(m)F.days[todayK()]=1;sv();b.classList.toggle("on",!!(m>>+i&1));b.setAttribute("aria-checked",!!(m>>+i&1));const h=b.closest(".chk").querySelector("summary h3");if(h)h.textContent=`Self-check (${[0,1,2,3,4].filter(x=>m>>x&1).length}/5)`;vib(8);return}
  if(b=q("[data-fhide]")){const id=b.dataset.fhide;if(F.hide[id])delete F.hide[id];else F.hide[id]=1;sv();render();return}
  if(q("[data-flh]")){F.lh=F.lh?0:1;sv();render();return}
  if(b=q("[data-fadd]")){const inp=document.getElementById("fnew"),v=inp.value.trim();if(!v)return toast("Topic ka naam likho","warn");const L=b.dataset.fadd;(F.custom[L]=F.custom[L]||[]).push({id:"u"+Date.now(),t:v});sv();render();return}
  if(b=q("[data-fdel]")){const id=b.dataset.fdel;if(!confirm("Ye topic delete karein?"))return;Object.keys(F.custom).forEach(L=>{F.custom[L]=F.custom[L].filter(c=>c.id!==id)});delete F.p[id];sv();render()}}
 function input(e){load();const T=e.target;
  if(T.dataset.fnote){const id=T.dataset.fnote,v=T.value;clearTimeout(noteT);noteT=setTimeout(()=>{const p=F.p[id]=F.p[id]||{};p.n=v.trim();if(!p.n&&!p.s)delete F.p[id];if(p.n)F.days[todayK()]=1;sv()},500);return}
  if(T.dataset.ci){const[cid,k]=T.dataset.ci.split("."),c=FIN_CALCS.find(x=>x.id===cid);(F.tools[cid]=F.tools[cid]||{})[k]=T.value;document.getElementById("out-"+cid).textContent=(()=>{try{return c.run(vals(c))}catch(_){return"–"}})();clearTimeout(toolT);toolT=setTimeout(sv,600)}}
 function toggle(e){const d=e.target;if(d.id==="fcust")fcust=d.open;if(d.classList&&d.classList.contains("topic")){const id=d.dataset.tid;if(d.open)open.add(id);else open.delete(id)}}
 /* ---------- hooks for Progress / achievements ---------- */
 function weeks(){load();const out=[],ws=d=>{const x=fromK(d),g=(x.getDay()+6)%7;x.setDate(x.getDate()-g);return dk(x)},base=fromK(ws(todayK()));const cnt={};Object.values(F.p).forEach(p=>{if(p.s==="d"&&p.at)cnt[ws(p.at)]=(cnt[ws(p.at)]||0)+1});for(let i=11;i>=0;i--){const x=new Date(base);x.setDate(x.getDate()-7*i);const k=dk(x);out.push([k.slice(5),cnt[k]||0])}return out}
 function progCard(){load();const o=overall(),w=weeks(),any=w.some(x=>x[1]>0);return `<div class="card"><h3>Finance learning</h3><p class="mut">${o.d}/${o.n} topics · ${o.hd.toFixed(0)}/${o.ht.toFixed(0)} h · ${o.pct}%</p>${bar(o.pct)}${any?'<div class="cb" id="fch"></div><p class="mut">Topics done per week (last 12 weeks)</p>':'<p class="mut">Finance tab me topic Done karo; yahan weekly trend dikhega.</p>'}</div>`}
 function progDraw(){const h=document.getElementById("fch");if(h){const w=weeks();mkChart(h,"bar",w.map(x=>x[0]),[{label:"Topics done",data:w.map(x=>x[1])}])}}
 const levelDone=id=>{load();const L=parse().find(x=>x.id===id);return !!L&&lvStat(L).pct>=100};
 const stat=()=>{load();return{done:Object.values(F.p).filter(p=>p.s==="d").length}};
 return{render:draw,click,input,change(){},toggle,progCard,progDraw,levelDone,stat,reload(){F=null},leave(){}};
})();
