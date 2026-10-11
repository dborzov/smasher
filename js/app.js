/* ============ progress (saved in this browser only) ============ */
const blank=()=>({read:{},tq:{},miss:{},puz:{},terms:{},parts:{},badges:{},smoke:false});
let prog=Object.assign(blank(),store.get("prog",{}));
const hasQuiz=id=>!!(QUIZ[id]&&QUIZ[id].length), hasTrial=id=>hasQuiz(id)||!!PUZ[id];
const trialDone=id=>hasTrial(id)&&(!hasQuiz(id)||!!prog.tq[id])&&(!PUZ[id]||!!prog.puz[PUZ[id][0]]);
const questDone=id=>!!prog.read[id]&&(!hasTrial(id)||trialDone(id));
const count=o=>Object.values(o).filter(Boolean).length;
const TRIALS=QUESTS.filter(q=>hasTrial(q.id));
const NPARTS=PARTS.length, NTERMS=Object.keys(GLOSS).length;
const xpNow=()=>QUESTS.filter(q=>prog.read[q.id]).length*10+TRIALS.filter(q=>trialDone(q.id)).length*25+count(prog.terms)+count(prog.parts);
const XPMAX=QUESTS.length*10+TRIALS.length*25+NTERMS+NPARTS;
const LEVELS=[[0,"Level 1 Apprentice Tinkerers"],[60,"Level 2 Pin Pokers"],[140,"Level 3 Wire Wranglers"],[230,"Level 4 Motor Mages"],[330,"Level 5 Smasher Captains"],[XPMAX,"Level 6 Legends of the Arena"]];
const levelOf=xp=>LEVELS.filter(l=>xp>=l[0]).pop();
const BADGES=[
 ["law","Lawful Good","Passed the trial of the three laws.",()=>trialDone("rules")],
 ["ohm","Ohm Sweet Ohm","Passed the trial of Ohm's law.",()=>trialDone("ohm")],
 ["hole","The Hole Truth","Solved the breadboard puzzle.",()=>!!prog.puz.bb],
 ["light","Let There Be Light","Finished the Blink quest.",()=>questDone("blink")],
 ["duck","Duck Whisperer","Learned the ritual of debugging.",()=>questDone("debug")],
 ["troll","Bridge Troll","Reversed a motor using bare switches.",()=>!!prog.puz.hbridge],
 ["smoke","Smoke Summoner","Short-circuited the H-bridge. In a simulator, luckily.",()=>prog.smoke],
 ["alive","It's Alive","Finished Summon the Motor.",()=>questDone("motor")],
 ["tank","Tank Commander","Collected all three coins.",()=>!!prog.puz.tank],
 ["nat20","Natural 20","Passed a quiz with zero wrong answers.",()=>Object.keys(prog.tq).some(k=>prog.tq[k]&&!prog.miss[k])],
 ["lore","Loremaster","Opened every word in the spellbook.",()=>count(prog.terms)>=NTERMS],
 ["goblin","Loot Goblin","Inspected every part in the bestiary.",()=>count(prog.parts)>=NPARTS],
 ["boss","Boss Door Opened","Read every quest and passed every trial.",()=>QUESTS.every(q=>questDone(q.id))]];
function toast(title,body,cls=""){const t=document.createElement("div");t.className="toast "+cls;t.innerHTML=`<b>${title}</b>${body}`;$("#toasts").appendChild(t);setTimeout(()=>t.remove(),4200)}
function save(){const before=levelOf(store.get("xp",0))[1],xp=xpNow();
 BADGES.forEach(([id,n,d,test])=>{if(test()&&!prog.badges[id]){prog.badges[id]=true;toast("Badge: "+n,d,"badge-t")}});
 store.set("prog",prog);store.set("xp",xp);if(levelOf(xp)[1]!==before)toast("Level up!","You are now "+levelOf(xp)[1]+".");hud()}
function markRead(id){if(prog.read[id])return;prog.read[id]=true;toast("+10 XP","Quest read: "+QUESTS.find(q=>q.id===id).t);save();paintList()}
function passPuzzle(name){if(prog.puz[name])return;prog.puz[name]=true;const q=QUESTS.find(q=>PUZ[q.id]&&PUZ[q.id][0]===name);if(trialDone(q.id))toast("+25 XP","Trial passed: "+q.t);save();paintList();paintTrial()}
function noteSmoke(){if(prog.smoke)return;prog.smoke=true;save()}
function hud(){const xp=xpNow(),lv=levelOf(xp),nx=LEVELS[LEVELS.indexOf(lv)+1];$("#xpFill").style.width=(xp/XPMAX*100)+"%";$("#xpLvl").textContent=lv[1];$("#xpTxt").textContent=nx?`${xp} XP · next level at ${nx[0]}`:`${xp} XP · maxed out`}
function nextUp(){const a=QUESTS.find(q=>!prog.read[q.id]);if(a)return{q:a,why:"Not read yet"};const b=QUESTS.find(q=>hasTrial(q.id)&&!trialDone(q.id));if(b)return{q:b,why:"Trial not passed yet"};return null}

/* ============ app shell ============ */
let state={tab:store.get("tab","map"),q:store.get("q",0),part:"chips",cat:"all",photo:store.get("photo","table")};
const view=$("#view");let readIO=null;
function go(tab){state.tab=tab;store.set("tab",tab);render();window.scrollTo(0,0)}
function render(){$$("nav.tabs button").forEach(b=>b.setAttribute("aria-selected",b.dataset.tab===state.tab));cancelAnimationFrame(simRAF);if(readIO){readIO.disconnect();readIO=null}
 ({map:vMap,quests:vQuests,sheet:vSheet,loot:vLoot,book:vBook})[state.tab]();hud()}
function setQ(k){state.q=k;store.set("q",k);state.tab="quests";store.set("tab","quests");render();window.scrollTo(0,0)}
const qIndex=id=>QUESTS.findIndex(q=>q.id===id);

function vMap(){const nu=nextUp();view.innerHTML=`<div class="stack" style="gap:34px">
<section class="hero"><div class="stack">
 <h2>Build a one-pound robot that rams things.</h2>
 <p>Smasher is a battlebot project by two sixth graders. This guide is the campaign: a set of quests that take you from "what is a volt" to <b>two motors driving from code you wrote yourself</b>. No armor yet, no arena. Just a twitching pile of wires that obeys you. Everything else grows from that.</p>
 <p class="dim">You will need: the Freenove starter kit, a Raspberry Pi, a 9V battery, one old RC toy to sacrifice, and a tolerance for things not working the first time.</p>
 <div class="nextup"><div><div class="mono dim" style="font-size:.75rem">NEXT UP</div>${nu?`<b style="font-size:1.15rem">Quest ${qIndex(nu.q.id)+1}: ${nu.q.t}</b><div class="dim" style="font-size:.9rem">${nu.why}</div>`:`<b style="font-size:1.15rem">Level 1 complete.</b><div class="dim" style="font-size:.9rem">Go build the real thing.</div>`}</div>
 <div class="row">${nu?`<button class="btn go" id="startBtn">${count(prog.read)?"Continue →":"Begin →"}</button>`:""}<button class="btn" data-goto="sheet">Party Sheet</button></div></div>
</div>
<div class="tool"><div class="cap">&gt; anatomy of a battlebot. tap an organ.</div>${anatomy()}<div id="organInfo" style="min-height:120px;margin-top:8px"></div></div></section>
<section class="stack"><h2>How the pieces talk</h2>
<p>Every robot on earth, from this one to a Mars rover, is the same chain. Something decides, something switches power, something moves.</p>
<div class="scroll"><svg viewBox="0 0 900 150" style="min-width:640px" role="img" aria-label="You, code, Pi, driver, motors">
${[["YOU","press a key","--ctrl"],["CODE","Python decides","--term"],["BRAIN","Pi flips pins","--brain"],["DRIVER","switches battery power","--muscle"],["MOTORS","spin","--muscle"]].map(([a,b,c],i)=>`<rect x="${10+i*180}" y="30" width="150" height="70" rx="5" fill="var(--panel)" stroke="var(${c})" stroke-width="3"/><text x="${85+i*180}" y="62" text-anchor="middle" font-size="17" style="fill:var(${c})">${a}</text><text x="${85+i*180}" y="84" text-anchor="middle" font-size="11" style="fill:var(--dim)">${b}</text>${i<4?`<path d="M${162+i*180} 65 h22 m-8 -7 l8 7 l-8 7" stroke="var(--ink)" stroke-width="3" fill="none"/>`:""}`).join("")}
<rect x="560" y="118" width="150" height="26" rx="4" fill="#4d1c1c" stroke="var(--power)" stroke-width="2"/><text x="635" y="136" text-anchor="middle" font-size="12">BATTERY</text><path d="M635 118 V102" stroke="var(--power)" stroke-width="3"/></svg></div>
<p>Notice the battery feeds the <b>driver</b>, not the brain. The brain only sends orders. That split is the most important idea in the whole campaign.</p></section>
<section class="stack"><h2>What you will need to learn</h2>
<div class="levels">${[["Electricity basics","Push, flow, loops and Ohm's law. Three short quests.","volts"],["Your tools","The kit, the Pi, the breadboard, and how to debug.","loot"],["Muscle","Motors, why they need a driver chip, and how an H-bridge reverses them.","muscle"],["Control","Wiring it for real, speed control, and tank steering.","motor"]].map(([a,b,id])=>`<button class="lvl" data-jump="${id}" style="text-align:left"><h4>${a}</h4><p>${b}</p></button>`).join("")}</div></section>
<section class="stack"><h2>The campaign</h2>
<div class="levels"><div class="lvl here"><div class="n">LEVEL 1 · YOU ARE HERE</div><h4>Make It Twitch</h4><p>Blink a light, spin a motor, drive two motors from the keyboard. ${QUESTS.length} quests.</p></div>
<div class="lvl fog"><div class="n">LEVEL 2 · FOG OF WAR</div><h4>Cut the Leash</h4><p>Battery power and wireless control.</p></div>
<div class="lvl fog"><div class="n">LEVEL 3 · FOG OF WAR</div><h4>A Real Skeleton</h4><p>Chassis, gears, wheels that grip.</p></div>
<div class="lvl fog"><div class="n">LEVEL 4 · FOG OF WAR</div><h4>The Diet</h4><p>Everything under 454 grams.</p></div>
<div class="lvl fog"><div class="n">LEVEL 5 · FOG OF WAR</div><h4>Armor Up</h4><p>Metal wedge. Ramming speed.</p></div></div></section>
<section class="stack"><h2>Colour code</h2><p>The same colours mean the same thing everywhere in this guide, and you should copy them with your real wires.</p>
<div class="legend">${Object.values(CATS).map(([n,c])=>`<span class="chip" style="--c:var(${c})">${n}</span>`).join("")}</div>
<div class="legend"><span class="chip" style="--c:var(--power)">red wire = plus (+)</span><span class="chip" style="--c:var(--gnd)">black or grey wire = ground (−)</span><span class="chip" style="--c:var(--ctrl)">green = signal from a Pi pin</span><span class="chip" style="--c:var(--muscle)">orange = to a motor</span></div></section></div>`;
 bindAnatomy(view);$("#startBtn")&&($("#startBtn").onclick=()=>setQ(qIndex(nu.q.id)));$$("[data-jump]").forEach(b=>b.onclick=()=>setQ(qIndex(b.dataset.jump)))}

/* ---- quests ---- */
const stGlyph=id=>questDone(id)?"★":prog.read[id]?"◐":"○", stCls=id=>questDone(id)?"done":prog.read[id]?"read":"";
function paintList(){$$(".qlist [data-q]").forEach(b=>{const id=QUESTS[+b.dataset.q].id;b.classList.remove("done","read");stCls(id)&&b.classList.add(stCls(id));$(".st",b).textContent=stGlyph(id)})}
function trialHTML(q){if(!hasTrial(q.id))return"";const done=trialDone(q.id),pz=PUZ[q.id];
 return `<section class="trial ${done?"passed":""}" id="trial"><div><div class="mono" style="font-size:.78rem;letter-spacing:.08em">&gt; THE TRIAL</div><h3>${done?"Trial passed. +25 XP":"Prove you were paying attention"}</h3></div>
 ${pz?`<div class="puzline">${prog.puz[pz[0]]?"<span style='color:var(--ctrl)'>✔</span>":"<span style='color:var(--show)'>☐</span>"} ${pz[1]}${prog.puz[pz[0]]?"":" (scroll up to find it)"}</div>`:""}
 ${(QUIZ[q.id]||[]).map((x,k)=>`<div class="qq" data-k="${k}"><b>${k+1}. ${x.q}</b><div class="opts">${x.o.map((o,j)=>`<button data-j="${j}">${o}</button>`).join("")}</div><div class="say"></div></div>`).join("")}
 ${hasQuiz(q.id)&&prog.tq[q.id]?`<p class="dim" style="font-size:.9rem">You already passed this quiz. Answer again any time for practice.</p>`:""}</section>`}
function paintTrial(){const q=QUESTS[state.q],el=$("#trial");if(!el||state.tab!=="quests")return;const done=trialDone(q.id);el.classList.toggle("passed",done);$("h3",el).textContent=done?"Trial passed. +25 XP":"Prove you were paying attention";
 const pl=$(".puzline",el),pz=PUZ[q.id];if(pl&&pz&&prog.puz[pz[0]])pl.innerHTML=`<span style='color:var(--ctrl)'>✔</span> ${pz[1]}`}
function bindTrial(q){const el=$("#trial");if(!el||!hasQuiz(q.id))return;const solved=new Set();let miss=0;
 $$(".qq",el).forEach(box=>{const x=QUIZ[q.id][+box.dataset.k];$$("button",box).forEach(b=>b.onclick=()=>{const j=+b.dataset.j;
  if(j===x.a){b.classList.add("right");$$("button",box).forEach(o=>o.disabled=true);$(".say",box).innerHTML=`<b style="color:var(--ctrl)">Correct.</b> ${x.w[j]}`;solved.add(box.dataset.k);
   if(solved.size===QUIZ[q.id].length&&!prog.tq[q.id]){prog.tq[q.id]=true;prog.miss[q.id]=miss;if(trialDone(q.id))toast("+25 XP","Trial passed: "+q.t);save();paintList();paintTrial()}}
  else{b.classList.add("wrong");b.disabled=true;miss++;$(".say",box).innerHTML=`<b style="color:var(--power)">Not that one.</b> ${x.w[j]} Try again.`}})})}
function vQuests(){const i=state.q,q=QUESTS[i];
 view.innerHTML=`<div class="quests"><aside class="qlist" aria-label="Quest list">${QUESTS.map((x,k)=>`<button class="${k===i?"cur":""} ${stCls(x.id)}" data-q="${k}" title="${x.t}"><span class="st">${stGlyph(x.id)}</span><span class="t">${k+1}. ${x.t}</span></button>`).join("")}
 <div class="key">○ not read &nbsp; <span style="color:var(--show)">◐</span> read, trial waiting<br><span style="color:var(--ctrl)">★</span> done</div></aside>
 <article class="stack" style="gap:20px;min-width:0"><div class="qhead"><div class="eyebrow">&gt; QUEST ${i+1} OF ${QUESTS.length}</div><h2>${q.t}</h2><p>${q.sub}</p></div>
 <div class="stack" id="qbody">${q.html()}</div>${trialHTML(q)}
 <div class="qnav" id="qnav">${i>0?`<button class="btn" id="qPrev">← Back</button>`:"<span></span>"}${i<QUESTS.length-1?`<button class="btn go" id="qNext">Onward to Quest ${i+2} →</button>`:`<button class="btn go" id="qNext">See the Party Sheet</button>`}</div></article></div>`;
 q.bind&&q.bind($("#qbody"));bindTrial(q);
 $$("[data-q]").forEach(b=>b.onclick=()=>setQ(+b.dataset.q));
 $("#qPrev")&&($("#qPrev").onclick=()=>setQ(i-1));
 $("#qNext").onclick=()=>{markRead(q.id);i<QUESTS.length-1?setQ(i+1):go("sheet")};
 // reaching the bottom of the page counts as having read the quest
 if("IntersectionObserver" in window&&!prog.read[q.id]){const t0=Date.now();readIO=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)&&Date.now()-t0>4000)markRead(q.id)},{threshold:.6});readIO.observe($("#qnav"))}}

/* ---- party sheet ---- */
function vSheet(){const xp=xpNow(),lv=levelOf(xp),nu=nextUp(),rd=count(prog.read),td=TRIALS.filter(q=>trialDone(q.id)).length,bd=BADGES.filter(b=>prog.badges[b[0]]).length;
 const stat=(k,v,of,c)=>`<div class="stat"><div class="k">${k}</div><div class="v">${v}<small> / ${of}</small></div><div class="mini" style="--c:var(${c})"><i style="width:${v/of*100}%"></i></div></div>`;
 view.innerHTML=`<div class="stack" style="gap:28px"><div class="stack"><div class="mono" style="color:var(--term);font-size:.8rem">&gt; PARTY SHEET</div><h2>Hamish and Misha</h2><p class="big" style="color:var(--fire)">${lv[1]}</p>
 <p class="dim">Class: Artificers. Alignment: Chaotic Curious. Progress is saved in this browser only, so use the same computer and browser each time.</p></div>
 <div class="stats">${stat("Quests read",rd,QUESTS.length,"--show")}${stat("Trials passed",td,TRIALS.length,"--ctrl")}${stat("Spellbook words",count(prog.terms),NTERMS,"--brain")}${stat("Loot inspected",count(prog.parts),NPARTS,"--sense")}${stat("Badges",bd,BADGES.length,"--fire")}${stat("XP",xp,XPMAX,"--fire")}</div>
 <div class="nextup"><div><div class="mono dim" style="font-size:.75rem">WHAT TO DO NEXT</div>${nu?`<b style="font-size:1.15rem">Quest ${qIndex(nu.q.id)+1}: ${nu.q.t}</b><div class="dim" style="font-size:.9rem">${nu.why}</div>`:`<b style="font-size:1.15rem">Everything is done. The Boss Door is open.</b>`}</div>${nu?`<button class="btn go" id="nuBtn">Go →</button>`:""}</div>
 <div class="stack"><h3>Quest log</h3><div class="scroll"><table class="t"><tr><th>#</th><th>Quest</th><th>Reading</th><th>Trial</th><th></th></tr>
 ${QUESTS.map((q,k)=>`<tr><td class="mono">${k+1}</td><td>${q.t}</td><td><span class="pill ${prog.read[q.id]?"yes":"no"}">${prog.read[q.id]?"read":"not read"}</span></td><td>${hasTrial(q.id)?`<span class="pill ${trialDone(q.id)?"yes":(prog.tq[q.id]||(PUZ[q.id]&&prog.puz[PUZ[q.id][0]]))?"half":"no"}">${trialDone(q.id)?"passed":(prog.tq[q.id]||(PUZ[q.id]&&prog.puz[PUZ[q.id][0]]))?"half done":"waiting"}</span>`:`<span class="dim">none</span>`}</td><td><button class="btn small" data-q="${k}">open</button></td></tr>`).join("")}</table></div></div>
 <div class="stack"><h3>Badges</h3><div class="badges">${BADGES.map(([id,n,d])=>`<div class="badge ${prog.badges[id]?"got":""}"><b>${prog.badges[id]?n:"???"}</b><span>${prog.badges[id]?d:"Locked. "+d}</span></div>`).join("")}</div></div>
 <div class="stack"><h3>Danger zone</h3><div class="row"><button class="btn" id="wipe">Wipe all progress</button><span id="wipeAsk" hidden>Really? This cannot be undone. <button class="btn small" id="wipeYes">Yes, wipe it</button> <button class="btn small" id="wipeNo">No, keep it</button></span></div></div></div>`;
 $("#nuBtn")&&($("#nuBtn").onclick=()=>setQ(qIndex(nu.q.id)));$$("[data-q]").forEach(b=>b.onclick=()=>setQ(+b.dataset.q));
 $("#wipe").onclick=()=>$("#wipeAsk").hidden=false;$("#wipeNo").onclick=()=>$("#wipeAsk").hidden=true;
 $("#wipeYes").onclick=()=>{prog=blank();store.set("prog",prog);store.set("xp",0);store.set("loot",{});store.set("q",0);state.q=0;render()}}

/* ---- bestiary ---- */
function vLoot(){const cv=p=>`var(${CATS[p.c][1]})`,tbl=state.photo==="table",box=p=>tbl?(RBOX[p.id]?pct(p.id):null):p.b;
 view.innerHTML=`<div class="stack"><h2>Loot Bestiary</h2><p><b>Tap any part</b> to learn what it is and whether Smasher needs it. Switch between the photo of your own table and the catalogue photo of the full kit.</p>
 <div class="row"><button class="btn ${tbl?"on":""}" data-photo="table">Our table</button><button class="btn ${tbl?"":"on"}" data-photo="kit">Full kit catalogue</button><span class="dim">|</span>
 <button class="btn ${state.cat=="all"?"on":""}" data-cat="all">Everything</button><button class="btn ${state.cat=="now"?"on":""}" data-cat="now">Needed for Level 1</button>${Object.entries(CATS).map(([k,[n,c]])=>`<button class="btn ${state.cat==k?"on":""}" data-cat="${k}" style="border-left:6px solid var(${c})">${n}</button>`).join("")}
 <label class="row" style="gap:6px"><input type="checkbox" id="showAll" ${store.get("outl",true)?"checked":""}> show outlines</label></div>
 <div class="best"><div class="stack"><div class="photo ${store.get("outl",true)?"all":""}" id="photo"><img src="${IMG[state.photo].src}" alt="${tbl?"Photo of the kit parts spread out on a wooden table":"Catalogue photo of every part in the Freenove starter kit"}">
 ${PARTS.filter(box).map(p=>{const b=box(p);return `<button class="hot" data-part="${p.id}" aria-label="${p.n}" title="${p.n}" style="--c:${cv(p)};left:${b[0]}%;top:${b[1]}%;width:${b[2]}%;height:${b[3]}%"></button>`}).join("")}</div>
 <div class="plist">${PARTS.map(p=>`<button data-part="${p.id}" class="${prog.parts[p.id]?"seen":""}" style="--c:${cv(p)}">${p.n}</button>`).join("")}</div></div>
 <aside class="card pinfo" id="pinfo"></aside></div></div>`;
 const match=p=>state.cat=="all"||(state.cat=="now"?p.v=="now":p.c==state.cat);
 const sel=(id,user)=>{state.part=id;const p=PARTS.find(x=>x.id===id),[cn,cc]=CATS[p.c];$$("[data-part]").forEach(b=>b.classList.toggle("sel",b.dataset.part===id));
  if(user&&!prog.parts[id]){prog.parts[id]=true;save();$$(`.plist [data-part="${id}"]`).forEach(b=>b.classList.add("seen"))}
  const bx=boxOf(id),other=RBOX[id]&&p.b?{img:"kit",b:p.b}:null;
  $("#pinfo").innerHTML=`<div class="stack" style="gap:12px"><div class="row"><span class="chip" style="--c:var(${cc})">${cn}</span><span class="verdict v-${p.v}">${{now:"NEEDED NOW",later:"LATER LEVELS",side:"SIDE QUEST"}[p.v]}</span></div><h3>${p.n}</h3>
  ${bx?`<div class="pics"><figure class="pic"><span class="crop" style="${cropStyle(bx,220,170)};border-radius:6px"></span><figcaption><small>${bx.img=="table"?"yours, on the table":"catalogue photo"}</small></figcaption></figure>${other?`<figure class="pic"><span class="crop" style="${cropStyle(other,150,170)};border-radius:6px"></span><figcaption><small>catalogue photo</small></figcaption></figure>`:""}</div>`:""}
  <div><b class="mono dim" style="font-size:.75rem">WHAT IT IS</b><p>${p.w}</p></div><div><b class="mono dim" style="font-size:.75rem">FOR SMASHER</b><p>${p.u}</p></div>
  ${tbl&&!RBOX[id]&&p.b?`<p class="dim" style="font-size:.9rem">Not visible in the table photo. Switch to the catalogue photo to see where it is.</p>`:""}</div>`};
 $$("[data-part]").forEach(b=>{const p=PARTS.find(x=>x.id===b.dataset.part);if(b.classList.contains("hot"))b.classList.toggle("dimmed",!match(p));else b.hidden=!match(p);b.onclick=()=>sel(p.id,true)});
 $$("[data-cat]").forEach(b=>b.onclick=()=>{state.cat=b.dataset.cat;vLoot()});$$("[data-photo]").forEach(b=>b.onclick=()=>{state.photo=b.dataset.photo;store.set("photo",state.photo);vLoot()});
 $("#showAll").onchange=e=>{store.set("outl",e.target.checked);$("#photo").classList.toggle("all",e.target.checked)};
 sel(match(PARTS.find(p=>p.id===state.part))?state.part:PARTS.find(match).id,!!state.partUser);state.partUser=false}

/* ---- spellbook ---- */
function vBook(){view.innerHTML=`<div class="stack" style="gap:26px"><div class="stack"><h2>Spellbook</h2><p>Every strange word in this campaign, in plain language. Words with a green border are ones you have already opened in a quest. Plus the pin map, because you will need it again.</p></div>
 <div class="split"><div id="bookPins">${pinTool()}</div><div class="card stack"><h3>Our pin assignments</h3><div class="scroll"><table class="t"><tr><th>Pi pin</th><th>Goes to</th><th>Job</th></tr>
 <tr><td class="mono">GPIO22</td><td>L293D leg 1</td><td>Motor A enable</td></tr><tr><td class="mono">GPIO27</td><td>L293D leg 2</td><td>Motor A forward</td></tr><tr><td class="mono">GPIO17</td><td>L293D leg 7</td><td>Motor A backward</td></tr>
 <tr><td class="mono">GPIO25</td><td>L293D leg 9</td><td>Motor B enable</td></tr><tr><td class="mono">GPIO23</td><td>L293D leg 10</td><td>Motor B forward</td></tr><tr><td class="mono">GPIO24</td><td>L293D leg 15</td><td>Motor B backward</td></tr>
 <tr><td class="mono">GND</td><td>− rail</td><td>Shared ground</td></tr></table></div></div></div>
 <div class="gl">${Object.entries(GLOSS).sort((a,b)=>a[1][0].localeCompare(b[1][0])).map(([k,[t,b]])=>`<div class="card ${prog.terms[k]?"seen":""}"><h4>${t}</h4><p>${b}</p></div>`).join("")}</div></div>`;bindPins($("#bookPins"))}

/* ============ global clicks ============ */
document.addEventListener("click",e=>{const g=e.target.closest(".g"),p=e.target.closest(".plink"),c=e.target.closest("[data-copy]"),t=e.target.closest("[data-goto]");
 if(g){const k=g.dataset.g,[ti,b]=GLOSS[k];$("#scrollT").textContent=ti;$("#scrollB").innerHTML=b;$("#scroll").hidden=false;if(!prog.terms[k]){prog.terms[k]=true;save()}e.preventDefault();return}
 if(p){e.preventDefault();state.part=p.dataset.p;state.partUser=true;state.cat="all";if(!RBOX[state.part])state.photo="kit";go("loot");return}
 if(t){go(t.dataset.goto);return}
 if(c){const txt=decodeURIComponent(c.dataset.copy);(navigator.clipboard?navigator.clipboard.writeText(txt):Promise.reject()).then(()=>{c.textContent="copied";setTimeout(()=>c.textContent="copy",1200)}).catch(()=>{const pre=c.closest(".code").querySelector("pre"),r=document.createRange();r.selectNodeContents(pre);const s=getSelection();s.removeAllRanges();s.addRange(r);c.textContent="selected, press Ctrl+C"});return}
 if(!e.target.closest("#scroll"))$("#scroll").hidden=true});
$("#scrollX").onclick=()=>$("#scroll").hidden=true;
document.addEventListener("keydown",e=>{if(e.key==="Escape")$("#scroll").hidden=true});
$$("nav.tabs button").forEach(b=>b.onclick=()=>go(b.dataset.tab));
$("#xpBtn").onclick=()=>go("sheet");
if(!(state.q>=0&&state.q<QUESTS.length))state.q=0;
if(!({map:1,quests:1,sheet:1,loot:1,book:1})[state.tab])state.tab="map";
store.set("xp",xpNow());render();
