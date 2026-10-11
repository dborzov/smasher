/* ============ extra spellbook words ============ */
Object.assign(GLOSS,{
 resistance:["Resistance (ohms, Ω)","How hard something is to push electricity through. A fat copper wire has almost none. A resistor has a lot. Your dry skin has a huge amount. Measured in ohms, written Ω."],
 ohmslaw:["Ohm's law","The one formula of this whole campaign: <b>current = voltage ÷ resistance</b>. More push means more flow. More resistance means less flow. That is it."],
 stall:["Stall","When a motor has power but cannot turn, like a bot pushing a wall. A stalled motor draws its biggest possible current and gets hot fast."],
 prototype:["Prototype","A rough first version you build to find out if your idea works. It is supposed to be ugly. If it is pretty, you spent too long on it."],
 solder:["Solder","Metal that melts easily. You melt it onto two wires and it hardens into a permanent joint. It is how real circuit boards are held together. Hot enough to burn, so it is an adult-supervised skill."],
 library:["Library","Code that somebody else already wrote, which you borrow with the word <span class='mono'>import</span>. gpiozero is a library that knows how to talk to the Pi's pins, so you do not have to."],
 variable:["Variable","A name tag you stick on something so you can talk about it later. <span class='mono'>led = LED(17)</span> means: from now on, 'led' is the thing on pin 17."],
 bug:["Bug","Anything that makes your thing not work. The name is from 1947, when engineers found an actual moth stuck in a computer and taped it into the logbook."],
 gears:["Gears","Toothed wheels. A small gear driving a big gear turns slower but pushes harder. That trade, speed for strength, is why almost every robot wheel has a gearbox."],
 electromagnet:["Electromagnet","A coil of wire that becomes a magnet only while current flows through it. Switch the current off and the magnetism is gone. Motors are built out of these."]
});

/* ============ photo crops ============ */
const IMG={kit:{src:"img/kit.jpg",w:1454,h:1453},table:{src:"img/table.jpg",w:1203,h:1620}};
/* boxes on the table photo, in pixels: left, top, right, bottom */
const RBOX={lcd:[195,85,340,350],stepper:[398,138,540,285],chart:[700,140,1000,435],resistors:[678,335,880,585],pir:[238,372,350,492],psu:[382,388,500,558],uln:[525,360,634,472],pots:[440,565,705,770],servo:[150,575,370,855],joy:[348,748,474,862],ribbon:[825,450,1203,865],bb:[430,690,995,1070],dcmotor:[200,985,340,1065],clip9v:[525,1105,940,1200],sonic:[285,1175,440,1280],proto:[110,1220,740,1595],adc:[790,1285,870,1360],headers:[145,1555,335,1620],tboard:[735,765,890,885],chips:[615,810,765,905],mpu:[550,875,628,940],matrix:[630,872,695,942],seg4:[565,925,668,990],seg1:[720,762,775,832],buzzers:[762,712,845,800],relay:[832,822,885,872]};
const XBOX={led1:{img:"kit",b:[0,0,13,10],p:"leds",n:"Red LED"},r220:{img:"kit",b:[73,0,27,14.5],p:"resistors",n:"220Ω resistors"}};
const pct=id=>{const [a,b,c,d]=RBOX[id],I=IMG.table;return [a/I.w*100,b/I.h*100,(c-a)/I.w*100,(d-b)/I.h*100]};
function boxOf(id){if(XBOX[id])return XBOX[id];const p=PARTS.find(x=>x.id===id);if(!p)return null;
 if(RBOX[id])return{img:"table",b:pct(id),p:id,n:p.n};return p.b?{img:"kit",b:p.b,p:id,n:p.n}:null}
function cropStyle(bx,maxW=210,maxH=140){const I=IMG[bx.img],[l,t,w,h]=bx.b,pw=w*I.w/100,ph=h*I.h/100,sc=Math.min(maxW/pw,maxH/ph);
 return `width:${Math.round(pw*sc)}px;aspect-ratio:${Math.round(pw)}/${Math.round(ph)};background-image:url(${I.src});background-size:${(10000/w).toFixed(1)}% ${(10000/h).toFixed(1)}%;background-position:${(l/(100-w)*100).toFixed(2)}% ${(t/(100-h)*100).toFixed(2)}%`}
function pic(id,cap,mw,mh){const bx=boxOf(id);if(!bx)return"";
 return `<figure class="pic"><button class="plink picbtn" data-p="${bx.p}" aria-label="${bx.n}: open in the bestiary"><span class="crop" style="${cropStyle(bx,mw,mh)}"></span></button><figcaption><b>${cap||bx.n}</b><small>${bx.img=="table"?"photo of your actual part":"catalogue photo"}</small></figcaption></figure>`}
const pics=list=>`<div class="pics">${list.map(x=>Array.isArray(x)?pic(...x):pic(x)).join("")}</div>`;

/* ============ breadboard picture with real hole positions ============ */
const BX=c=>30+c*16, BY={tp:18,tn:32,a:56,b:69,c:82,d:95,e:108,f:136,g:149,h:162,i:175,j:188,bp:212,bn:226};
const ODD=["3V3","SDA","SCL","GPIO4","GND","GPIO17","GPIO27","GPIO22","3V3","MOSI","MISO","SCLK","GND","ID_SD","GPIO5","GPIO6","GPIO13","GPIO19","GPIO26","GND"];
const EVEN=["5V","5V","GND","TXD","RXD","GPIO18","GND","GPIO23","GPIO24","GND","GPIO25","CE0","CE1","ID_SC","GND","GPIO12","GND","GPIO16","GPIO20","GPIO21"];
const WCOL={pwr:"var(--power)",gnd:"#5d6275",sig:"var(--ctrl)",mot:"var(--muscle)"};
const hp=p=>Array.isArray(p)?[BX(p[0]),BY[p[1]]]:[p.x,p.y];
function wirePath(w){const [x1,y1]=hp(w.a),[x2,y2]=hp(w.b),bl=w.bulge||0;
 return `<g class="bw ${w.cls||""}" data-w="${w.id}"><path d="M${x1} ${y1} Q${(x1+x2)/2} ${(y1+y2)/2+bl} ${x2} ${y2}" stroke="#000" stroke-width="8"/><path d="M${x1} ${y1} Q${(x1+x2)/2} ${(y1+y2)/2+bl} ${x2} ${y2}" stroke="${WCOL[w.ty]}" stroke-width="5"/><circle cx="${x1}" cy="${y1}" r="4.5" fill="${WCOL[w.ty]}" stroke="#000"/><circle cx="${x2}" cy="${y2}" r="4.5" fill="${WCOL[w.ty]}" stroke="#000"/></g>`}
function boardSVG({chip=false,psu=false,motorA=false,motorB=false,wires=[],extra="",hot=[],label="Breadboard wiring picture"}={}){
 const top=motorB?-84:-4,bot=motorA?312:246;
 let s=`<svg class="board" viewBox="0 ${top} 700 ${bot-top}" style="min-width:600px" role="img" aria-label="${label}">
 <rect x="34" y="4" width="660" height="236" rx="6" fill="#ece8dc"/><rect x="40" y="116" width="648" height="12" fill="#d3cebd"/>
 <g stroke-width="1.5"><line x1="42" y1="10" x2="686" y2="10" stroke="#d63b3b"/><line x1="42" y1="40" x2="686" y2="40" stroke="#3b6fd6"/><line x1="42" y1="204" x2="686" y2="204" stroke="#d63b3b"/><line x1="42" y1="234" x2="686" y2="234" stroke="#3b6fd6"/></g>
 <g font-size="10"><text x="36" y="22" style="fill:#c0392b">+</text><text x="36" y="36" style="fill:#2b55b0">−</text><text x="36" y="216" style="fill:#c0392b">+</text><text x="36" y="230" style="fill:#2b55b0">−</text></g><g fill="#4a4658">`;
 for(const r in BY)for(let c=1;c<=40;c++)s+=`<circle cx="${BX(c)}" cy="${BY[r]}" r="2.5"/>`;
 s+=`</g><g font-size="7" text-anchor="middle">${["a","b","c","d","e","f","g","h","i","j"].map(r=>`<text x="${BX(22)}" y="${BY[r]+2.5}" style="fill:#8d887a">${r}</text>`).join("")}</g>`;
 // blue GPIO board over columns 1 to 20
 s+=`<rect x="${BX(1)-9}" y="76" width="${19*16+18}" height="92" rx="3" fill="#1d4fa3" stroke="#0d2c63" stroke-width="2"/>`;
 for(let k=0;k<20;k++){const x=BX(k+1)+2.6,he=hot.includes(EVEN[k]),ho=hot.includes(ODD[k]);
  s+=`<text transform="translate(${x} 116) rotate(-90)" font-size="7.2" style="fill:${he?"#ffe14d":"#dbe6ff"};font-weight:${he?700:400}">${EVEN[k]}</text><text transform="translate(${x} 128) rotate(-90)" text-anchor="end" font-size="7.2" style="fill:${ho?"#ffe14d":"#dbe6ff"};font-weight:${ho?700:400}">${ODD[k]}</text>`}
 if(chip){s+=`<g>`;for(let k=0;k<8;k++){const x=BX(26+k);s+=`<rect x="${x-2.5}" y="101" width="5" height="9" fill="#b9b9b9"/><rect x="${x-2.5}" y="134" width="5" height="9" fill="#b9b9b9"/>`}
  s+=`<rect x="${BX(26)-8}" y="107" width="${7*16+16}" height="30" rx="2" fill="#111"/><circle cx="${BX(26)-8}" cy="122" r="5" fill="#ece8dc"/><text x="${BX(29.5)}" y="125" text-anchor="middle" font-size="8" style="fill:#777">L293D</text>`;
  for(let k=0;k<8;k++){const x=BX(26+k);s+=`<text x="${x}" y="135" text-anchor="middle" font-size="6.5" style="fill:#eee">${k+1}</text><text x="${x}" y="115" text-anchor="middle" font-size="6.5" style="fill:#eee">${16-k}</text>`}s+=`</g>`}
 if(psu)s+=`<g><rect x="${BX(37)+4}" y="-2" width="64" height="248" rx="4" fill="#1b1b1f" stroke="#444" stroke-width="2"/><rect x="${BX(38)-4}" y="13" width="26" height="22" fill="#e2c21b"/><text x="${BX(38)+9}" y="28" text-anchor="middle" font-size="9" style="fill:#111;font-weight:700">5V</text><rect x="${BX(38)-4}" y="207" width="26" height="22" fill="#e2c21b"/><text x="${BX(38)+9}" y="222" text-anchor="middle" font-size="9" style="fill:#111;font-weight:700">5V</text><circle cx="${BX(39)+4}" cy="80" r="5" fill="#49e07a"/><rect x="${BX(38)}" y="140" width="34" height="40" rx="3" fill="#333" stroke="#666"/><circle cx="${BX(38)+17}" cy="160" r="8" fill="#000" stroke="#888"/><text transform="translate(${BX(38)+2} 128) rotate(-90)" font-size="7.5" style="fill:#bbb">POWER MODULE</text><text x="${BX(38)+17}" y="194" text-anchor="middle" font-size="6.5" style="fill:#bbb">9V in</text></g>`;
 const mot=(y,n)=>`<g><rect x="425" y="${y}" width="100" height="42" rx="8" fill="#5a3413" stroke="var(--muscle)" stroke-width="2.5"/><text x="475" y="${y+26}" text-anchor="middle" font-size="12">MOTOR ${n}</text></g>`;
 if(motorA)s+=mot(262,"A");if(motorB)s+=mot(-76,"B");
 return s+extra+wires.map(wirePath).join("")+`</svg>`}

/* ============ x-ray breadboard + puzzle ============ */
const MROWS={P1:24,N1:44,a:66,b:79,c:92,d:105,e:118,f:152,g:165,h:178,i:191,j:204,P2:226,N2:246};
const grpOf=(r,c)=>r[0]=="P"||r[0]=="N"?r:("abcde".includes(r)?"T":"B")+c;
function miniBB(){let s=`<svg viewBox="0 0 640 270" style="min-width:520px" role="img" aria-label="Breadboard"><rect x="4" y="4" width="632" height="262" rx="8" fill="#e9e6da"/><rect x="20" y="128" width="600" height="14" fill="#cfcbbd"/>
<line x1="24" y1="14" x2="616" y2="14" stroke="#d63b3b" stroke-width="2"/><line x1="24" y1="54" x2="616" y2="54" stroke="#3b6fd6" stroke-width="2"/><line x1="24" y1="216" x2="616" y2="216" stroke="#d63b3b" stroke-width="2"/><line x1="24" y1="256" x2="616" y2="256" stroke="#3b6fd6" stroke-width="2"/><g class="strips"></g>`;
 for(const [r,y] of Object.entries(MROWS))for(let c=0;c<30;c++)s+=`<circle class="bb-hole" cx="${30+c*20}" cy="${y}" r="5" data-r="${r}" data-c="${c}" data-grp="${grpOf(r,c)}"/>`;
 return s+`<text x="12" y="28" font-size="11" style="fill:#c0392b">+</text><text x="12" y="48" font-size="11" style="fill:#2b55b0">−</text><text x="12" y="230" font-size="11" style="fill:#c0392b">+</text><text x="12" y="250" font-size="11" style="fill:#2b55b0">−</text></svg>`}
function bbTool(){return `<div class="tool" id="bbx"><div class="cap">&gt; x-ray breadboard. tap any hole to see what it is secretly joined to.</div><div class="scroll">${miniBB()}</div><p class="bbMsg dim" style="margin-top:10px"></p></div>`}
function bindBB(root){const r=$("#bbx",root),msg={P:"A <b>+ power rail</b>. One long strip running the whole length. Put + power in anywhere and every hole on this row has it.",N:"A <b>− ground rail</b>. One long strip for ground (−). Same deal.",T:"A <b>column of 5</b> in the top half. These five holes are joined to each other, and to nothing else.",B:"A <b>column of 5</b> in the bottom half. It is NOT joined to the column above it. The trench in the middle separates them."};
 const strips=$(".strips",r);
 $$(".bb-hole",r).forEach(h=>h.addEventListener("click",()=>{const g=h.dataset.grp,mates=$$(".bb-hole",r).filter(o=>o.dataset.grp===g);
  $$(".bb-hole",r).forEach(o=>{o.classList.toggle("lit",o.dataset.grp===g);o.classList.remove("me")});h.classList.add("me");
  const xs=mates.map(m=>+m.getAttribute("cx")),ys=mates.map(m=>+m.getAttribute("cy"));
  strips.innerHTML=`<rect x="${Math.min(...xs)-8}" y="${Math.min(...ys)-8}" width="${Math.max(...xs)-Math.min(...xs)+16}" height="${Math.max(...ys)-Math.min(...ys)+16}" rx="8" fill="#b08d3c" opacity=".55"/>`;
  $(".bbMsg",r).innerHTML=msg[g[0]]}));
 $$(".bb-hole",r)[64].dispatchEvent(new Event("click"))}
const BBROUNDS=[[["a",4],["e",4],true,"Same column, same half. One metal strip joins all five."],[["c",10],["h",10],false,"Same column, but the trench cuts it in two. Top half and bottom half are strangers."],[["b",7],["b",8],false,"Next-door columns are not joined. The strips run up and down, never sideways."],[["P1",2],["P1",27],true,"A rail is one long strip from end to end."],[["P1",15],["N1",15],false,"The plus rail and the minus rail are separate. Thankfully. Otherwise every breadboard would be one big short circuit."],[["f",20],["j",20],true,"Same column, same half."],[["e",12],["f",12],false,"So close, but e and f sit on opposite sides of the trench."]];
function bbPuzzle(){return `<div class="tool" id="bbp"><div class="cap">&gt; puzzle: joined or not? ${BBROUNDS.length} rounds.</div><div class="scroll">${miniBB()}</div>
<p style="margin-top:10px"><b class="mono rd"></b> Are the <b style="color:var(--sense)">teal</b> hole and the <b style="color:var(--fire)">orange</b> hole secretly connected?</p>
<div class="row" style="margin-top:8px"><button class="btn" data-ans="1">Joined</button><button class="btn" data-ans="0">Not joined</button><button class="btn on nx" hidden>Next round →</button></div><p class="say" style="margin-top:8px;min-height:1.6em"></p></div>`}
function bindBBPuzzle(root){const r=$("#bbp",root);let i=0,score=0,locked=false;const hole=([row,c])=>$(`.bb-hole[data-r="${row}"][data-c="${c}"]`,r);
 const show=()=>{locked=false;$$(".bb-hole",r).forEach(o=>o.classList.remove("pa","pb","lit"));if(i>=BBROUNDS.length){$(".rd",r).textContent="DONE.";
   $(".say",r).innerHTML=score===BBROUNDS.length?"<b style='color:var(--ctrl)'>Perfect. You can see through plastic now.</b>":`You got ${score} of ${BBROUNDS.length}. You need all of them. <button class="btn small again">Try again</button>`;
   if(score===BBROUNDS.length)passPuzzle("bb");else $(".again",r).onclick=()=>{i=0;score=0;show()};$$("[data-ans]",r).forEach(b=>b.hidden=true);$(".nx",r).hidden=true;return}
  $$("[data-ans]",r).forEach(b=>b.hidden=false);$(".nx",r).hidden=true;const R=BBROUNDS[i];hole(R[0]).classList.add("pa");hole(R[1]).classList.add("pb");$(".rd",r).textContent=`ROUND ${i+1}/${BBROUNDS.length}.`;$(".say",r).textContent=""};
 $$("[data-ans]",r).forEach(b=>b.onclick=()=>{if(locked)return;locked=true;const R=BBROUNDS[i],ok=(b.dataset.ans==="1")===R[2];if(ok)score++;
  $$(".bb-hole",r).filter(o=>o.dataset.grp===hole(R[0]).dataset.grp).forEach(o=>o.classList.add("lit"));
  $(".say",r).innerHTML=(ok?"<b style='color:var(--ctrl)'>Yes.</b> ":"<b style='color:var(--power)'>Nope.</b> ")+R[3]+" <span class='dim'>(Yellow shows everything joined to the teal hole.)</span>";$$("[data-ans]",r).forEach(x=>x.hidden=true);$(".nx",r).hidden=false});
 $(".nx",r).onclick=()=>{i++;show()};show()}

/* ============ Ohm's law machine ============ */
const fmtI=a=>a>=1?(a>=100?Math.round(a):a.toFixed(a>=10?0:1))+" A":a*1000>=1?(a*1000).toFixed(a*1000>=10?0:1)+" mA":(a*1000).toFixed(2)+" mA";
const fmtR=r=>r>=1000?(r/1000).toFixed(r>=10000?0:1)+" kΩ":r>=10?Math.round(r)+" Ω":r.toFixed(1)+" Ω";
const OHMP=[["LED with its 220Ω bodyguard",1.3,220,"The pin gives 3.3V, but the LED keeps about 2V for itself to make light. That leaves 1.3V across the resistor. 1.3 ÷ 220 = about 6 mA. A happy LED and a safe pin."],
 ["LED with NO bodyguard",1.3,25,"Take the resistor away and the only thing slowing the flow is the tiny resistance inside the pin and wires, about 25Ω. Now 52 mA tries to flow. The pin's limit is 16 mA. Something dies."],
 ["Our motor, spinning freely",3,15,"A spinning motor fights back against the current (it acts a bit like a generator), so it behaves like a bigger resistance. About 200 mA. Already 12 times too much for a pin."],
 ["Our motor, stalled against a wall",3,4,"Stopped, the motor is just a coil of copper wire with about 4Ω of resistance. 3 ÷ 4 = 750 mA. This is why a robot shoving against a wall drains its battery and cooks its driver."],
 ["Your finger across a 9V battery",9,100000,"Dry skin is about 100,000Ω. 9 ÷ 100,000 = 0.09 mA. Far too little to feel. This is why a 9V battery cannot shock you."],
 ["A bare wire across a 9V battery",9,0.1,"A wire has almost no resistance. Ohm's law says 90 amps. The battery cannot really deliver that, so instead it gets hot and dies trying. This is a short circuit. Do not do it."]];
function ohmTool(){return `<div class="tool" id="ohm"><div class="cap">&gt; the ohm machine. drag the sliders, or load a real example from the robot.</div>
<div class="ohm"><div style="--c:var(--power)"><div class="k">PUSH (voltage)</div><div class="v" id="oV"></div></div><div style="--c:var(--plumb)"><div class="k">÷ SQUEEZE (resistance)</div><div class="v" id="oR"></div></div><div style="--c:var(--show)"><div class="k">= FLOW (current)</div><div class="v" id="oI"></div></div></div>
<svg viewBox="0 0 600 70" style="margin-top:12px" role="img" aria-label="A pipe that gets narrower as resistance goes up"><rect x="0" y="14" width="600" height="42" fill="#23304a"/><path id="oPinch" d="" fill="#100e19"/><line id="oFlow" class="flow" x1="0" y1="35" x2="600" y2="35" stroke="var(--show)" stroke-width="5"/><text x="300" y="68" text-anchor="middle" font-size="10" style="fill:var(--dim)">resistance is a pinch in the pipe</text></svg>
<label class="mono" style="font-size:.8rem;display:block;margin-top:8px">push<input type="range" id="oVs" min="0.1" max="12" step="0.1" value="1.3" aria-label="Voltage"></label>
<label class="mono" style="font-size:.8rem;display:block">squeeze<input type="range" id="oRs" min="0" max="100" step="0.5" value="56" aria-label="Resistance"></label>
<div class="meterwrap"><div class="meter"><span style="background:var(--ctrl)">a Pi pin can do this</span><span style="background:var(--muscle)">needs a motor driver</span><span style="background:var(--power)">things melt</span></div><div class="needle" id="oN"></div></div>
<p id="oMsg" style="margin-top:12px;min-height:4.8em"></p>
<div class="row" style="gap:6px">${OHMP.map((p,k)=>`<button class="btn small" data-ohm="${k}">${p[0]}</button>`).join("")}</div></div>`}
function bindOhm(root){const r=$("#ohm",root),Vs=$("#oVs",r),Rs=$("#oRs",r);const R=()=>0.1*Math.pow(10,Rs.value/100*6);let note="";
 const up=()=>{const v=+Vs.value,res=R(),i=v/res;$("#oV",r).textContent=v.toFixed(1)+" V";$("#oR",r).textContent=fmtR(res);$("#oI",r).textContent=fmtI(i);
  const gap=Math.max(2,21*(1-Rs.value/100));$("#oPinch",r).setAttribute("d",`M250 14 L300 ${35-gap} L350 14 Z M250 56 L300 ${35+gap} L350 56 Z`);
  const fl=$("#oFlow",r);fl.style.animationPlayState="running";fl.style.animationDuration=Math.min(6,Math.max(.08,0.02/i))+"s";fl.style.opacity=i<0.0005?.25:1;
  // needle on a log scale: 0.1 mA to 100 A, with zone edges at 16 mA and 1.5 A
  const lg=Math.log10(Math.max(1e-4,Math.min(100,i))),pos=lg<Math.log10(.016)?(lg+4)/(Math.log10(.016)+4)/3:lg<Math.log10(1.5)?1/3+(lg-Math.log10(.016))/(Math.log10(1.5)-Math.log10(.016))/3:2/3+(lg-Math.log10(1.5))/(2-Math.log10(1.5))/3;
  $("#oN",r).style.left=`calc(${(pos*100).toFixed(1)}% - 2px)`;
  $("#oMsg",r).innerHTML=note||(i<=.016?"Gentle enough for a Pi pin to supply directly.":i<=1.5?"More than a pin can give. This is motor territory, and it needs a driver chip and its own battery.":"Way too much. Wires get hot, chips die, batteries complain.")};
 Vs.oninput=Rs.oninput=()=>{note="";$$("[data-ohm]",r).forEach(b=>b.classList.remove("on"));up()};
 $$("[data-ohm]",r).forEach(b=>b.onclick=()=>{const p=OHMP[b.dataset.ohm];Vs.value=p[1];Rs.value=Math.log10(p[2]/0.1)/6*100;note=`<b>${p[0]}.</b> ${p[3]}`;$$("[data-ohm]",r).forEach(x=>x.classList.toggle("on",x===b));up()});
 $("[data-ohm='0']",r).click()}

/* ============ H-bridge with real switches ============ */
function hTool(){return `<div class="tool" id="hb"><div class="cap">&gt; the H-bridge. four switches, one motor. tap a switch to flip it.</div>
<svg viewBox="0 0 420 300" role="img" aria-label="H bridge with four switches around a motor">
 <line x1="60" y1="30" x2="360" y2="30" stroke="var(--power)" stroke-width="5"/><text x="30" y="35" font-size="14" style="fill:var(--power)">+</text>
 <line x1="60" y1="270" x2="360" y2="270" stroke="var(--gnd)" stroke-width="5"/><text x="30" y="275" font-size="14" style="fill:var(--gnd)">−</text>
 <g stroke="#666" stroke-width="5" fill="none"><path d="M110 30 V60 M110 110 V190 M110 240 V270 M310 30 V60 M310 110 V190 M310 240 V270 M110 150 H180 M240 150 H310"/></g>
 <path class="hPath flow" d="" fill="none" stroke="var(--show)" stroke-width="5"/><g class="hSw"></g>
 <circle cx="210" cy="150" r="30" fill="#5a3413" stroke="var(--muscle)" stroke-width="3"/><g class="hRot spin"><path d="M210 126 V174 M186 150 H234" stroke="#fff" stroke-width="4"/></g>
 <text x="64" y="90" font-size="12" text-anchor="end">S1</text><text x="64" y="220" font-size="12" text-anchor="end">S2</text><text x="356" y="90" font-size="12">S3</text><text x="356" y="220" font-size="12">S4</text>
</svg>
<div class="row"><button class="btn" data-h="1001">Show me forward</button><button class="btn" data-h="0000">All open</button><button class="btn on" data-h="trial">Trial: make it go BACKWARD yourself</button></div>
<p class="hMsg" style="margin-top:10px;min-height:4.8em"></p></div>`}
function bindH(root){const r=$("#hb",root);let sw=[1,0,0,1],trial=false;const pos=[[110,60],[110,190],[310,60],[310,190]];
 const draw=()=>{const [a,b,c,d]=sw,shortL=a&&b,shortR=c&&d,short=shortL||shortR,fwd=!short&&a&&d,back=!short&&c&&b;
  $(".hSw",r).innerHTML=pos.map(([x,y],i)=>`<g class="hsw" data-s="${i}" role="button" tabindex="0" aria-label="Switch S${i+1}, ${sw[i]?"closed":"open"}"><rect x="${x-26}" y="${y-8}" width="62" height="66" fill="transparent"/><line x1="${x}" y1="${y}" x2="${sw[i]?x:x+28}" y2="${y+(sw[i]?50:42)}" stroke="${sw[i]?"var(--ctrl)":"#999"}" stroke-width="6" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="5" fill="#999"/><circle cx="${x}" cy="${y+50}" r="5" fill="#999"/></g>`).join("");
  $$(".hsw",r).forEach(g=>{const t=()=>{sw[+g.dataset.s]^=1;draw()};g.onclick=t;g.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();t()}}});
  const p=$(".hPath",r);p.setAttribute("d",shortL?"M110 30 V270":shortR?"M310 30 V270":fwd?"M110 30 V150 H310 V270":back?"M310 30 V150 H110 V270":"");
  p.style.stroke=short?"var(--power)":"var(--show)";p.style.animationPlayState=short||fwd||back?"running":"paused";p.style.animationDuration=short?".25s":".8s";
  const rot=$(".hRot",r);rot.style.animationPlayState=fwd||back?"running":"paused";rot.style.animationDirection=back?"reverse":"normal";
  let m;if(short){m="<b style='color:var(--power)'>SHORT CIRCUIT.</b> You closed both switches on one side, so + runs straight down to − and skips the motor. The chip is now a tiny heater. In real life you would be buying a new one. The L293D is designed so your code cannot do this by accident, which is one big reason we use it.";noteSmoke()}
  else if(fwd)m="<b>S1 and S4 closed.</b> Current runs down the left, through the motor from left to right, and out the bottom right. Motor spins forward.";
  else if(back){m="<b>S3 and S2 closed.</b> Same battery, but now the current crosses the motor from right to left. It spins backward, and no wires were swapped. That is the whole trick.";if(trial){m+=" <b style='color:var(--ctrl)'>Trial passed.</b>";passPuzzle("hbridge");trial=false}}
  else if(a&&c||b&&d)m="Both sides of the motor are connected to the same rail. No difference in push across it, so no current. Nothing happens.";
  else m=trial?"All open. Close two switches so the current crosses the motor from <b>right to left</b>. Careful which two.":"No complete loop through the motor. It coasts.";
  $(".hMsg",r).innerHTML=m};
 $$("[data-h]",r).forEach(b=>b.onclick=()=>{if(b.dataset.h==="trial"){trial=true;sw=[0,0,0,0]}else{sw=[...b.dataset.h].map(Number)}draw()});draw()}

/* ============ wiring: breadboard picture + leg map, in sync ============ */
const TYPES={pwr:["--power","+ rail"],gnd:["--gnd","− rail"],sig:["--ctrl","Pi pin"],mot:["--muscle","motor"],none:["--line","empty"]};
const WIRES=[
 {pin:16,nm:"VCC",to:"+ rail",ty:"pwr",st:"A",a:[26,"c"],b:[26,"tp"],why:"Power for the chip's own little brain. Plug one end into a free hole in leg 16's column (above the chip, far left). Other end into the red + rail."},
 {pin:8,nm:"V-MOTOR",to:"+ rail",ty:"pwr",st:"A",a:[33,"h"],b:[33,"bp"],why:"Power that the chip passes on to the motors. Leg 8 is bottom right. Jumper from its column to the red + rail."},
 {pin:4,nm:"GND",to:"− rail",ty:"gnd",st:"A",a:[29,"h"],b:[29,"bn"],why:"The chip's ground. Leg 4's column to the blue − rail."},
 {pin:0,nm:"Pi GND",to:"− rail",ty:"gnd",st:"A",a:[5,"j"],b:[5,"bn"],why:"<b>The wire everybody forgets.</b> From a column labelled GND on the blue board to the blue − rail. Without a shared ground the Pi and the chip cannot understand each other, like two people measuring height from different floors."},
 {pin:1,nm:"ENABLE A",to:"GPIO22",ty:"sig",st:"A",a:[8,"i"],b:[26,"i"],bulge:70,why:"Master switch for Motor A. ON means 'motor A is allowed to run'. From the GPIO22 column to leg 1's column (bottom left of the chip)."},
 {pin:2,nm:"IN 1",to:"GPIO27",ty:"sig",st:"A",a:[7,"j"],b:[27,"j"],bulge:100,why:"Signal: ON here (and OFF on IN 2) means spin forward. From the GPIO27 column to leg 2's column."},
 {pin:7,nm:"IN 2",to:"GPIO17",ty:"sig",st:"A",a:[6,"i"],b:[32,"i"],bulge:135,why:"Signal: ON here (and OFF on IN 1) means spin backward. From the GPIO17 column to leg 7's column."},
 {pin:3,nm:"OUT 1",to:"Motor A wire",ty:"mot",st:"A",a:[28,"g"],b:{x:445,y:264},why:"One of the motor's two wires goes into leg 3's column. Either wire, it does not matter yet."},
 {pin:6,nm:"OUT 2",to:"Motor A wire",ty:"mot",st:"A",a:[31,"g"],b:{x:505,y:264},why:"The motor's other wire goes into leg 6's column. If the motor ends up spinning the wrong way, swap these two."},
 {pin:13,nm:"GND",to:"− rail",ty:"gnd",st:"B",a:[29,"c"],b:[29,"tn"],why:"Ground for the second half of the chip. Leg 13's column (top side) to the top blue − rail."},
 {pin:9,nm:"ENABLE B",to:"GPIO25",ty:"sig",st:"B",a:[11,"a"],b:[33,"a"],bulge:-110,why:"Master switch for Motor B. From the GPIO25 column to leg 9's column (top right of the chip)."},
 {pin:10,nm:"IN 3",to:"GPIO23",ty:"sig",st:"B",a:[8,"b"],b:[32,"b"],bulge:-70,why:"Motor B forward signal. From the GPIO23 column to leg 10's column."},
 {pin:15,nm:"IN 4",to:"GPIO24",ty:"sig",st:"B",a:[9,"a"],b:[27,"a"],bulge:-150,why:"Motor B backward signal. From the GPIO24 column to leg 15's column."},
 {pin:11,nm:"OUT 3",to:"Motor B wire",ty:"mot",st:"B",a:[31,"d"],b:{x:505,y:-36},why:"One wire of the second motor goes into leg 11's column."},
 {pin:14,nm:"OUT 4",to:"Motor B wire",ty:"mot",st:"B",a:[28,"d"],b:{x:445,y:-36},why:"The other wire of the second motor goes into leg 14's column."},
 {pin:5,nm:"GND",to:"leave empty",ty:"none",st:"-",why:""},{pin:12,nm:"GND",to:"leave empty",ty:"none",st:"-",why:""}
];
function legMap(stage){let s=`<svg viewBox="0 0 700 500" style="min-width:540px" role="img" aria-label="L293D chip with a label on every leg">
 <rect x="270" y="30" width="160" height="410" rx="8" fill="#111" stroke="#555" stroke-width="3"/><path d="M330 30 a20 20 0 0 0 40 0" fill="#333"/><circle cx="286" cy="48" r="5" fill="#777"/>
 <text x="350" y="240" text-anchor="middle" font-size="18" transform="rotate(-90 350 240)" style="fill:#777">L293D</text>
 <text x="350" y="22" text-anchor="middle" font-size="11" style="fill:var(--dim)">notch at this end. leg 1 is next to the dot.</text>`;
 WIRES.forEach((w,idx)=>{const t=TYPES[w.ty],live=w.st===stage,done=stage==="B"&&w.st==="A",left=w.pin<=8,y=w.pin===0?475:left?65+(w.pin-1)*50:65+(16-w.pin)*50,tx=left?40:450;
  s+=`<g class="wire ${live||done?"":"off"}" data-w="${idx}" ${live?"":'style="pointer-events:none"'}>`;
  s+=w.pin?`<rect x="${left?258:430}" y="${y-7}" width="12" height="14" fill="#bbb"/><text x="${left?282:418}" y="${y+4}" font-size="11" text-anchor="${left?"start":"end"}" style="fill:#ddd">${w.pin} ${w.nm}</text>`:`<text x="270" y="${y+4}" font-size="11" style="fill:#ddd">a GND pin on the blue board</text>`;
  s+=`<line x1="${left?258:442}" y1="${y}" x2="${left?250:450}" y2="${y}" stroke="var(${t[0]})" stroke-width="5"/><rect class="tag" x="${tx}" y="${y-17}" width="210" height="34" rx="4" fill="color-mix(in srgb,var(${t[0]}) 22%,#111)" stroke="var(${t[0]})" stroke-width="2"/><text x="${tx+105}" y="${y+5}" font-size="13" text-anchor="middle">${done?"✓ ":""}${w.to}</text></g>`});
 return s+`</svg>`}
function chipTool(stage){const ws=WIRES.map((w,id)=>({...w,id})).filter(w=>w.a&&(w.st===stage||stage==="B")).map(w=>({...w,cls:w.st===stage?"":"old"}));
 return `<div class="tool wiring" data-stage="${stage}"><div class="cap">&gt; wiring picture. ${stage=="A"?"nine wires":"six more wires"}, one at a time. tap a wire or use the buttons.</div>
 <div class="scroll">${boardSVG({chip:true,psu:true,motorA:true,motorB:stage==="B",wires:ws,hot:stage==="A"?["GPIO17","GPIO27","GPIO22"]:["GPIO23","GPIO24","GPIO25"],label:"Breadboard with the blue GPIO board on the left, the L293D chip in the middle and the power module on the right"})}</div>
 <div class="card" style="margin-top:12px"><div class="row" style="justify-content:space-between"><b class="mono cwN"></b><div class="row"><button class="btn cwPrev">← prev wire</button><button class="btn on cwNext">next wire →</button><button class="btn cwAll">show all</button></div></div><h3 class="cwT" style="margin-top:8px"></h3><p class="cwB"></p></div>
 <div class="legend" style="margin-top:10px">${["pwr","gnd","sig","mot"].map(k=>`<span class="chip" style="--c:var(${TYPES[k][0]})">${TYPES[k][1]}</span>`).join("")}</div>
 <p class="dim" style="font-size:.9rem;margin-top:8px">Your blue board might sit the other way up, with the GPIO17 side on top. Do not count holes from this picture. <b>Trust the labels printed on your board</b> and the leg numbers of the chip.</p>
 <details style="margin-top:10px"><summary class="mono" style="cursor:pointer;color:var(--term)">open the chip's leg-by-leg map</summary><div class="scroll" style="margin-top:10px">${legMap(stage)}</div></details></div>`}
function bindChip(r){const stage=r.dataset.stage,act=WIRES.filter(w=>w.st===stage),brd=$(".board",r);let i=0;
 const show=()=>{const w=act[i],idx=WIRES.indexOf(w);brd.classList.add("focus");$$("[data-w]",r).forEach(g=>g.classList.toggle("sel",+g.dataset.w===idx));
  $(".cwN",r).textContent=`WIRE ${i+1} OF ${act.length}`;$(".cwT",r).innerHTML=(w.pin?`Leg ${w.pin} (${w.nm})`:"Pi ground")+` → ${w.to}`;$(".cwT",r).style.color=`var(${TYPES[w.ty][0]})`;$(".cwB",r).innerHTML=w.why};
 $(".cwNext",r).onclick=()=>{i=(i+1)%act.length;show()};$(".cwPrev",r).onclick=()=>{i=(i-1+act.length)%act.length;show()};
 $(".cwAll",r).onclick=()=>{brd.classList.remove("focus");$$("[data-w]",r).forEach(g=>g.classList.remove("sel"));$(".cwN",r).textContent="ALL WIRES";$(".cwT",r).textContent="The finished thing";$(".cwT",r).style.color="";$(".cwB",r).textContent="This is what you are aiming for. Press next to go back to one wire at a time."};
 $$("[data-w]",r).forEach(g=>g.addEventListener("click",()=>{const k=act.indexOf(WIRES[+g.dataset.w]);if(k>=0){i=k;show()}}));show()}

/* blink circuit on the same board */
function blinkBoard(){const rx1=BX(24),rx2=BX(28),ry=BY.h,lx=BX(28.5),ly=BY.g;
 const extra=`<g><line x1="${rx1}" y1="${ry}" x2="${rx2}" y2="${ry}" stroke="#999" stroke-width="2.5"/><rect x="${rx1+12}" y="${ry-6}" width="40" height="12" rx="4" fill="#c9a66b" stroke="#111"/><g stroke-width="4"><line x1="${rx1+20}" y1="${ry-6}" x2="${rx1+20}" y2="${ry+6}" stroke="#c0392b"/><line x1="${rx1+28}" y1="${ry-6}" x2="${rx1+28}" y2="${ry+6}" stroke="#c0392b"/><line x1="${rx1+36}" y1="${ry-6}" x2="${rx1+36}" y2="${ry+6}" stroke="#6b3f1d"/></g>
 <circle cx="${rx1}" cy="${ry}" r="3.5" fill="#999"/><circle cx="${rx2}" cy="${ry}" r="3.5" fill="#999"/>
 <circle cx="${lx}" cy="${ly-2}" r="11" fill="#ff4d4d" stroke="#7a1010" stroke-width="2"/><circle cx="${BX(28)}" cy="${ly}" r="3" fill="#ddd"/><circle cx="${BX(29)}" cy="${ly}" r="3" fill="#ddd"/>
 <text x="${BX(28)-4}" y="${ly-16}" font-size="8" text-anchor="end" style="fill:#333">long leg</text><text x="${BX(29)+4}" y="${ly-16}" font-size="8" style="fill:#333">short leg</text></g>
 ${[[BX(15),218,1],[BX(26),ry-14,2],[lx,ly-22,3],[BX(17),250,4]].map(([x,y,n])=>`<g><circle cx="${x}" cy="${y}" r="9" fill="var(--show)" stroke="#000"/><text x="${x}" y="${y+4}" text-anchor="middle" font-size="11" style="fill:#111;font-weight:700">${n}</text></g>`).join("")}`;
 return `<div class="tool"><div class="cap">&gt; wiring picture: the blink circuit. follow the numbers.</div><div class="scroll">${boardSVG({extra,hot:["GPIO17","GND"],wires:[{id:"b1",ty:"sig",a:[6,"j"],b:[24,"j"],bulge:60},{id:"b4",ty:"gnd",a:[29,"i"],b:[5,"i"],bulge:150}],label:"Blink circuit: GPIO17 to resistor to LED and back to GND"}).replace('viewBox="0 -4 700 250"','viewBox="0 -4 700 280"')}</div></div>`}

/* who powers what */
function powerMap(){return `<div class="tool"><div class="cap">&gt; who powers what. two separate power supplies, one shared ground.</div><div class="scroll"><svg viewBox="0 0 700 250" style="min-width:560px" role="img" aria-label="The Pi is powered from the wall, the motors from a battery, and they share ground">
<rect x="20" y="20" width="130" height="50" rx="5" fill="#33285c" stroke="var(--brain)" stroke-width="2"/><text x="85" y="42" text-anchor="middle" font-size="12">WALL PLUG</text><text x="85" y="58" text-anchor="middle" font-size="9" style="fill:var(--dim)">clean, steady power</text>
<rect x="20" y="120" width="130" height="70" rx="5" fill="#33285c" stroke="var(--brain)" stroke-width="3"/><text x="85" y="150" text-anchor="middle" font-size="14">PI</text><text x="85" y="168" text-anchor="middle" font-size="9" style="fill:var(--dim)">the brain</text>
<path d="M85 70 V120" stroke="var(--brain)" stroke-width="4"/>
<rect x="285" y="120" width="130" height="70" rx="5" fill="#111" stroke="var(--muscle)" stroke-width="3"/><text x="350" y="150" text-anchor="middle" font-size="14">L293D</text><text x="350" y="168" text-anchor="middle" font-size="9" style="fill:var(--dim)">the driver</text>
<rect x="550" y="120" width="130" height="70" rx="5" fill="#5a3413" stroke="var(--muscle)" stroke-width="3"/><text x="615" y="159" text-anchor="middle" font-size="14">MOTOR</text>
<rect x="285" y="20" width="130" height="50" rx="5" fill="#4d1c1c" stroke="var(--power)" stroke-width="2"/><text x="350" y="42" text-anchor="middle" font-size="12">9V BATTERY</text><text x="350" y="58" text-anchor="middle" font-size="9" style="fill:var(--dim)">via the power module</text>
<path d="M350 70 V120" stroke="var(--power)" stroke-width="6"/><text x="360" y="100" font-size="9" style="fill:var(--power)">big power</text>
<path d="M150 145 H285" stroke="var(--ctrl)" stroke-width="3" stroke-dasharray="6 5"/><text x="217" y="138" text-anchor="middle" font-size="9" style="fill:var(--ctrl)">3 thin signal wires</text>
<path d="M415 155 H550" stroke="var(--muscle)" stroke-width="6"/><text x="482" y="146" text-anchor="middle" font-size="9" style="fill:var(--muscle)">big power, switched</text>
<path d="M85 190 V225 H350 V190" fill="none" stroke="var(--gnd)" stroke-width="4"/><text x="217" y="242" text-anchor="middle" font-size="10" style="fill:var(--gnd)">shared ground: the one power wire they have in common</text></svg></div></div>`}

/* inside a motor */
function motorInside(){return `<div class="tool"><div class="cap">&gt; inside the silver can</div><svg viewBox="0 0 520 190" role="img" aria-label="Cutaway of a DC motor: two magnets around a spinning coil">
<rect x="130" y="20" width="260" height="150" rx="14" fill="#2a2936" stroke="#888" stroke-width="3"/>
<rect x="142" y="32" width="236" height="26" fill="#c0392b"/><text x="260" y="50" text-anchor="middle" font-size="12">magnet (N)</text>
<rect x="142" y="132" width="236" height="26" fill="#2b55b0"/><text x="260" y="150" text-anchor="middle" font-size="12">magnet (S)</text>
<g class="spin" style="animation-play-state:running;animation-duration:2.4s"><ellipse cx="260" cy="95" rx="70" ry="24" fill="none" stroke="var(--muscle)" stroke-width="7"/><line x1="190" y1="95" x2="330" y2="95" stroke="#fff" stroke-width="3"/></g>
<line x1="390" y1="95" x2="470" y2="95" stroke="#ccc" stroke-width="7"/><text x="475" y="85" font-size="11">shaft</text>
<path d="M130 80 H70 M130 110 H70" stroke="var(--power)" stroke-width="4"/><text x="20" y="84" font-size="12">+</text><text x="20" y="114" font-size="12">−</text>
<text x="260" y="186" text-anchor="middle" font-size="10" style="fill:var(--dim)">orange = coil of copper wire, the part that spins</text></svg></div>`}

/* ============ tank simulator with a coin hunt ============ */
let simRAF=0;
function tankTool(){return `<div class="tool" id="tank"><div class="cap">&gt; tank steering simulator. drag the sliders, or hold W A S D.</div>
<div class="row" style="align-items:stretch;flex-wrap:nowrap;gap:10px"><div class="vsl"><span>LEFT</span><input type="range" id="tkL" min="-100" max="100" value="0" aria-label="Left motor power"><b id="tkLv">0</b></div>
<canvas id="tkC" width="520" height="340" style="flex:1;min-width:0"></canvas>
<div class="vsl"><span>RIGHT</span><input type="range" id="tkR" min="-100" max="100" value="0" aria-label="Right motor power"><b id="tkRv">0</b></div></div>
<div class="row" style="margin-top:10px"><button class="btn" data-tk="70,70">Forward</button><button class="btn" data-tk="-70,-70">Back</button><button class="btn" data-tk="70,-70">Spin right</button><button class="btn" data-tk="-70,70">Spin left</button><button class="btn" data-tk="90,40">Wide curve</button><button class="btn" data-tk="0,0">Stop</button><button class="btn on" id="tkHunt">Trial: collect 3 coins</button></div>
<p id="tkMsg" class="dim" style="margin-top:8px;min-height:1.6em"></p></div>`}
function bindTank(root){const r=$("#tank",root),cv=$("#tkC",r),cx=cv.getContext("2d"),L=$("#tkL",r),R=$("#tkR",r);let x=260,y=220,th=-Math.PI/2,trail=[],last=performance.now(),coins=[],hunt=false;
 const css=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
 const say=()=>{const l=+L.value,rr=+R.value;$("#tkLv",r).textContent=l;$("#tkRv",r).textContent=rr;if(hunt){$("#tkMsg",r).innerHTML=`<b style="color:var(--show)">Coins left: ${coins.length}.</b> Drive Smasher over them.`;return}
  $("#tkMsg",r).textContent=l==0&&rr==0?"Both motors off. Smasher contemplates existence.":l==rr?"Both motors the same: dead straight.":Math.sign(l)!=Math.sign(rr)&&l&&rr?"Motors fighting each other: spins on the spot. Great for facing an enemy fast.":Math.abs(l)>Math.abs(rr)?"Left side is faster, so the bot curves to the RIGHT.":"Right side is faster, so the bot curves to the LEFT."};
 const set=(l,rr)=>{L.value=l;R.value=rr;say()};L.oninput=R.oninput=say;$$("[data-tk]",r).forEach(b=>b.onclick=()=>set(...b.dataset.tk.split(",")));
 $("#tkHunt",r).onclick=()=>{hunt=true;coins=[[70,60],[450,90],[420,290]];x=260;y=220;th=-Math.PI/2;trail=[];set(0,0)};
 const keys={w:[70,70],s:[-70,-70],a:[-70,70],d:[70,-70]};
 const kd=e=>{if(/INPUT|TEXTAREA/.test(e.target.tagName)&&e.target.type!="range")return;const k=keys[e.key.toLowerCase()];if(k){set(...k);e.preventDefault()}},ku=e=>{if(keys[e.key.toLowerCase()])set(0,0)};
 document.addEventListener("keydown",kd);document.addEventListener("keyup",ku);cancelAnimationFrame(simRAF);
 const frame=t=>{if(!cv.isConnected){document.removeEventListener("keydown",kd);document.removeEventListener("keyup",ku);return}
  const dt=Math.min(.05,(t-last)/1000);last=t;const l=L.value/100,rr=R.value/100,v=(l+rr)/2*130,om=(l-rr)*2.4;th+=om*dt;x+=Math.cos(th)*v*dt;y+=Math.sin(th)*v*dt;
  x=(x+cv.width)%cv.width;y=(y+cv.height)%cv.height;if(v||om){trail.push([x,y]);if(trail.length>260)trail.shift()}
  if(hunt){const n=coins.length;coins=coins.filter(c=>Math.hypot(c[0]-x,c[1]-y)>24);if(coins.length!==n){say();if(!coins.length){hunt=false;set(0,0);$("#tkMsg",r).innerHTML="<b style='color:var(--ctrl)'>All three coins. You can drive a tank.</b>";passPuzzle("tank")}}}
  cx.clearRect(0,0,cv.width,cv.height);cx.strokeStyle="#231f36";cx.lineWidth=1;for(let g=0;g<cv.width;g+=40){cx.beginPath();cx.moveTo(g,0);cx.lineTo(g,cv.height);cx.stroke()}for(let g=0;g<cv.height;g+=40){cx.beginPath();cx.moveTo(0,g);cx.lineTo(cv.width,g);cx.stroke()}
  coins.forEach(c=>{cx.fillStyle=css("--show");cx.beginPath();cx.arc(c[0],c[1],11,0,7);cx.fill();cx.strokeStyle="#7a5c00";cx.lineWidth=3;cx.stroke()});
  cx.fillStyle=css("--fire");trail.forEach((p,i)=>{cx.globalAlpha=i/trail.length*.6;cx.fillRect(p[0]-1.5,p[1]-1.5,3,3)});cx.globalAlpha=1;
  cx.save();cx.translate(x,y);cx.rotate(th);cx.lineWidth=2;
  [[-22,l],[14,rr]].forEach(([wy,p])=>{cx.fillStyle="#111";cx.strokeStyle=css("--muscle");cx.fillRect(-16,wy,32,8);cx.strokeRect(-16,wy,32,8);if(p){cx.fillStyle=p>0?css("--ctrl"):css("--power");cx.fillRect(p>0?16:-16-Math.abs(p)*14,wy+2,Math.abs(p)*14,4)}});
  cx.fillStyle="#3b3a4d";cx.strokeStyle=css("--gnd");cx.beginPath();cx.moveTo(-20,-14);cx.lineTo(14,-14);cx.lineTo(28,0);cx.lineTo(14,14);cx.lineTo(-20,14);cx.closePath();cx.fill();cx.stroke();
  cx.fillStyle=css("--brain");cx.fillRect(-12,-7,16,14);cx.restore();simRAF=requestAnimationFrame(frame)};
 say();simRAF=requestAnimationFrame(frame)}
