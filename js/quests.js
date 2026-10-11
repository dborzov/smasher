/* ============ the quests ============ */
Object.assign(CODE,{
vars:`from gpiozero import LED      # 1. borrow a spell from a library
led = LED(17)                 # 2. make a name tag: "led" is the thing on pin 17
led.on()                      # 3. tell that thing to do something`});

const QUESTS=[
{id:"rules",t:"Rules of the Dungeon",sub:"Three ways to kill your parts, and how to not.",html:()=>`
<p>Welcome, Hamish and Misha. You are about to build <b>Smasher</b>: a one-pound battlebot that obeys your commands and rams things. It starts small. By the end of this level you will have <b>two motors driving under the control of code you wrote</b>. Armor and glory come after.</p>
<p>Electronics at this size cannot hurt you. A 9V battery will not shock you (the Ohm quest proves it with maths). But <i>you</i> can absolutely hurt <i>them</i>. Parts die silently, with a faint smell, and it will be your fault. So, three laws:</p>
<div class="warn"><b>LAW 1: POWER OFF BEFORE YOU REWIRE</b>Unplug the battery and shut down the Pi before moving any wire. Moving wires on a live circuit is how you brush + against the wrong thing for a split second. A split second is plenty.</div>
<div class="warn"><b>LAW 2: PLUS NEVER TOUCHES MINUS DIRECTLY</b>That is a ${G("short","short circuit")}. It releases the ${G("smoke","magic smoke")}.</div>
<div class="warn"><b>LAW 3: MOTORS NEVER PLUG STRAIGHT INTO THE PI</b>The Pi's pins are for whispering signals. A motor tries to gulp far more ${G("current","current")} than a pin can give, and the Pi loses that argument permanently.</div>
<h3>How this guide works</h3>
<ul class="plain"><li>Words with <span style="color:var(--show);font-weight:700">yellow dots</span> are spellbook words. Tap one for a plain explanation.</li>
<li>Words with <span style="color:var(--sense);font-weight:700">teal dots</span>, and every part photo, open that part in the Loot Bestiary.</li>
<li>Dashed boxes are toys. Poke them. You cannot break anything in here.</li>
<li>Every quest ends with a <b>Trial</b>: a few questions or a puzzle. Pass it for XP. Wrong answers cost nothing and explain themselves, so guess boldly.</li>
<li>Your progress is saved in this browser. The <b>Party Sheet</b> tab shows what you have read, what you have passed and what is next.</li></ul>
<div class="idea"><b>TWO-PLAYER MODE</b>You are a party of two. A good system: one of you is the <b>Builder</b> (hands on the wires) and the other is the <b>Checker</b> (reads the step out loud and checks every wire before power goes on). Swap roles every quest. Real engineers do exactly this, because everyone is blind to their own mistakes.</div>`},

{id:"volts",t:"Electricity in Three Minutes",sub:"Push, flow, and the loop. That is honestly most of it.",html:()=>`
<p>You only need three ideas to build this whole robot.</p>
<ul class="plain"><li><b>${G("voltage","Voltage")} is push.</b> How hard the battery shoves. Measured in volts (V).</li>
<li><b>${G("current","Current")} is flow.</b> How much electricity actually moves. Measured in amps (A), or ${G("ma","milliamps (mA)")} for small stuff.</li>
<li><b>A ${G("circuit","circuit")} is a loop.</b> Electricity leaves the + side of the battery and <i>must</i> have a path back to the − side. Break the loop anywhere and everything stops.</li></ul>
<p>Think of a water slide park. Voltage is how tall the slide is. Current is how many kids go down per minute. The circuit is the stairs back to the top. No stairs, and you get one ride and then a pile of kids at the bottom.</p>
${loopTool()}
<p><b>Try this:</b> close the switch, then drag the push up and down. More volts, faster motor. Now open the switch at 12 volts. All that push, and nothing moves, because the loop is broken.</p>
<div class="idea"><b>THE BIG IDEA</b>A switch is just a controllable gap in the loop. Later, your <i>code</i> becomes the switch. That is all "programming a robot" really means: code deciding when loops are open and closed.</div>
<h3>Numbers you will actually meet</h3>
<div class="scroll"><table class="t"><tr><th>Thing</th><th>Push</th><th>Notes</th></tr>
<tr><td>AA battery</td><td class="mono">1.5 V</td><td>Gentle.</td></tr>
<tr><td>A Pi pin when ON</td><td class="mono">3.3 V</td><td>A signal, not a power supply.</td></tr>
<tr><td>USB and the power module</td><td class="mono">5 V</td><td>What our motor chip runs on.</td></tr>
<tr><td>Rectangular battery</td><td class="mono">9 V</td><td>Goes into the power module, which turns it into a steady 5V.</td></tr>
<tr><td>Wall socket</td><td class="mono">120 V</td><td><b>Never.</b> A completely different and deadly league. We only ever touch battery stuff.</td></tr></table></div>`,bind:bindLoop},

{id:"ohm",t:"The Law of Ohm",sub:"The one formula in this campaign. It explains why LEDs pop and why motors are greedy.",html:()=>`
<p>Last quest: voltage is push, current is flow. There is a third character: ${G("resistance","resistance")}. It is how hard something <b>squeezes</b> the flow, like a pinch in a hose. It is measured in ohms, written with the symbol <b>Ω</b>.</p>
<p>A man called Georg Ohm worked out in 1827 how the three fit together, and people were so impressed they named the unit after him:</p>
<div class="card" style="text-align:center"><div class="big"><span style="color:var(--show)">flow</span> = <span style="color:var(--power)">push</span> ÷ <span style="color:var(--plumb)">squeeze</span></div><p class="dim mono" style="margin:8px auto 0;font-size:.85rem">current (amps) = voltage (volts) ÷ resistance (ohms)</p></div>
<p>Read it like a recipe. <b>Push harder</b> and more flows. <b>Squeeze harder</b> and less flows. That is ${G("ohmslaw","Ohm's law")}, and you just learned the most used formula in all of electronics.</p>
${ohmTool()}
<p>Tap through all six examples. Every one is something real from this project:</p>
<ul class="plain"><li><b>Why the LED needs a ${P("resistors","resistor")}:</b> without that 220Ω squeeze, far too much current flows and either the LED or the Pi pin dies.</li>
<li><b>Why motors need their own driver:</b> a motor coil is only a few ohms. Tiny squeeze, huge flow.</li>
<li><b>Why a stuck motor is dangerous:</b> a ${G("stall","stalled")} motor draws several times more than a spinning one.</li>
<li><b>Why a 9V battery cannot shock you:</b> your skin is an enormous resistor.</li>
<li><b>Why a ${G("short","short circuit")} is bad:</b> almost zero squeeze means almost unlimited flow.</li></ul>
${pics([["r220","The 220Ω resistors"],["resistors","More resistors, still in the bag"]])}
<div class="tip"><b>WHICH RESISTOR IS WHICH?</b>The value is written on the paper tape holding them together. You can also decode the colour stripes with the ${P("chart","colour chart card")}, but reading the label is faster and nobody will judge you.</div>`,bind:bindOhm},

{id:"loot",t:"Gather Your Loot",sub:"Dig through the kit. Tick things off as you find them.",html:()=>{const items=[["pi","A Raspberry Pi with its SD card and power plug","The brain."],["scr","The little HDMI touchscreen, a keyboard and a mouse","So you can see and type."],["bb","The breadboard","Your workbench."],["tboard","The blue GPIO board","Brings the Pi's pins to the breadboard."],["ribbon","The ribbon cable","Connects the Pi to the blue board."],["jumpers","Jumper wires, about 15","Red, black, and a few other colours."],["leds","1 red LED","For the first spell."],["resistors","1 resistor from the tape marked 220Ω","The LED's bodyguard."],["chips","The L293D chip","Read the tiny text on each black chip to find it."],["dcmotor","The DC motor","Muscle number one."],["psu","The breadboard power module","Feeds the motors."],["clip9v","The 9V battery clip, and a 9V battery","The battery is not in the kit. You need to find or buy one."]];
 const ck=store.get("loot",{});return `<p>Here is everything for the rest of this level. The photos are <b>your actual parts</b> from the picture of your table, where we could find them. Tap any photo to see where it sits in the full picture.</p>
 ${pics(["bb","tboard","ribbon","psu","dcmotor","clip9v","chips",["led1","A red LED"],["r220","220Ω resistors"],"jumpers"])}
 <div class="tip"><b>YOUR KIT IS ALREADY PARTLY BUILT</b>In your photo, the blue board, the chips and some displays are already pushed into the breadboard. Good news: you found them. For the quests, gently pull the displays and the extra chips out so you have room. Keep the blue board in. Chips come out best if you lever each end up a little at a time, so the legs do not bend.</div>
 <h3>The checklist</h3>
 <div class="stack" style="gap:8px">${items.map(([id,n,d])=>`<label class="check"><input type="checkbox" id="loot-${id}" data-loot="${id}" ${ck[id]?"checked":""}><span>${id=="scr"?`<b>${n}</b>`:P(id,n)}<br><span class="dim" style="font-size:.9rem">${d}</span></span></label>`).join("")}</div>
 <h3>Lookalikes that will fool you</h3>
 ${pics([["uln","NOT the motor driver"],["stepper","NOT the motor we want"],["servo","Also not for wheels"]])}
 <p>The green board with a chip on it <i>says</i> motor driver, but it only works with the round ${P("stepper","stepper motor")}, which is slow and precise. The blue ${P("servo","servo")} only swings half a turn. For wheels we want the plain silver ${P("dcmotor","DC motor")} and the ${P("chips","L293D chip")}.</p>
 <div class="tip"><b>FOR THE TANK QUEST (NOT YET)</b>A second motor. That one comes from the pile of old RC toys. Do not take anything apart yet.</div>`},
 bind:r=>$$("[data-loot]",r).forEach(c=>c.onchange=()=>{const ck=store.get("loot",{});ck[c.dataset.loot]=c.checked;store.set("loot",ck)})},

{id:"brain",t:"Wake the Brain",sub:"Boot the Pi and cast your first line of code.",html:()=>`
<p>The ${P("pi","Raspberry Pi")} is a real computer, just naked. No case, no screen, no shame. It does the same job as the laptop you are reading this on, but it also has something a laptop does not: 40 metal pins that your code can switch on and off. That is what makes it a robot brain.</p>
<h3>Which Pi do you have?</h3>
<p>Look at the long double row of metal pins. Count one row. <b>20 pins per row (40 total)</b>: perfect, carry on. <b>13 per row (26 total)</b>: that is a very old Pi 1. It can still do this, but the ribbon cable will not fit, so use the other Pi if you can.</p>
<h3>Boot it</h3>
<ol class="plain"><li>Push the SD card into the slot underneath. The SD card is the Pi's hard drive. If the card is blank or missing, ask your adult-on-duty to follow <b>Installing Raspberry Pi OS.pdf</b> in the Freenove folder.</li>
<li>Plug the screen's HDMI cable into the Pi, and the screen's USB cable into a Pi USB port.</li><li>Plug in keyboard and mouse.</li><li>Plug in the Pi's power <b>last</b>. It has no power button. Plugging in is the power button.</li></ol>
<h3>Cast your first spell</h3>
<p>Open the raspberry menu → Programming → ${G("thonny","Thonny")}. Type this in the big top box, then press the green Run button. Save it as <span class="mono">hello.py</span> when it asks.</p>
${codeBlock("hello.py",CODE.hello)}
<p>If the words appear in the bottom box, you just programmed a computer in ${G("python","Python")}.</p>
<h3>What code actually is</h3>
<p>A program is a list of instructions. The computer does them <b>one at a time, top to bottom</b>, extremely fast and with zero common sense. It does exactly what you wrote, which is rarely what you meant. Almost all of our robot code is built from three moves:</p>
${codeBlock("three moves",CODE.vars)}
<ul class="plain"><li><b>Borrow.</b> <span class="mono">import</span> pulls in a ${G("library","library")}: code someone else wrote so you do not have to.</li>
<li><b>Name.</b> The <span class="mono">=</span> sign makes a ${G("variable","variable")}: a name tag for a thing.</li>
<li><b>Command.</b> The dot means "hey you, do this": <span class="mono">led.on()</span>, <span class="mono">motor.forward()</span>.</li></ul>
<h3>Meet the pins</h3>
<p>Those 40 pins are called ${G("gpio","GPIO pins")}. Annoying fact: each pin has <i>two</i> names. Its physical position (pin 1 to 40) and its GPIO name (like GPIO17). <b>Code always uses the GPIO name.</b> The blue board prints the GPIO names for you, which is why we love it.</p>
${pinTool()}
<div class="warn"><b>SHUT DOWN PROPERLY</b>Before unplugging the Pi, use Menu → Shutdown and wait for the screen to go dark. Yanking the plug can scramble the SD card. The Pi will forgive you about nine times.</div>`,bind:bindPins},

{id:"board",t:"The Breadboard",sub:"What it is for, how it works, and how to see through plastic.",html:()=>`
<h3>What is the point of it?</h3>
<p>In a finished gadget, parts are joined with ${G("solder","solder")}: melted metal that hardens like glue. It is strong and permanent. That is exactly the problem. When you are inventing, you change your mind every five minutes, and you do not want to un-melt metal every time.</p>
<p>A ${P("bb","breadboard")} is the fix. It is <b>Lego for circuits</b>. Push a wire in and it is connected. Pull it out and it is not. Nothing is permanent, so mistakes cost nothing. Engineers build a rough ${G("prototype","prototype")} on a breadboard first, and only solder once it works.</p>
${pics([["bb","Your breadboard: for trying things"],["proto","Solder boards: for the final robot, much later"]],260,150)}
<h3>How it works</h3>
<p>Under the plastic are rows of springy metal clips. Each clip grabs whatever legs you push into it and joins them together. The whole skill of breadboarding is knowing <b>which holes share a clip</b>.</p>
${bbTool()}
<h3>The four rules</h3>
<ol class="plain"><li><b>A column of 5 is one clip.</b> Two legs in the same column are connected, as if you had twisted them together.</li>
<li><b>The trench splits the board.</b> Columns above it and below it are separate. Chips sit across the trench like a bridge, so their left legs and right legs are not shorted together.</li>
<li><b>${G("rail","Rails")} run the long way.</b> The rows along the edges, marked with a red line (+) and a blue line (−), are for power. Put the battery's + on the red rail once, and every part can grab power from anywhere along it.</li>
<li><b>To join two parts, put one leg of each in the same column.</b> That is the whole game.</li></ol>
<div class="warn"><b>THE CLASSIC MISTAKE</b>Never put both legs of one part in the <i>same</i> column. The clip joins the two legs directly, so the current skips the part entirely. For an LED that means no light. For a battery it means a short circuit.</div>
<div class="tip"><b>CHECK YOUR RAILS</b>On some long breadboards the red and blue lines have a <b>gap in the middle</b>. That means the rail is split into a left half and a right half that are not joined. If yours has the gap, bridge it with a short jumper wire, or keep everything on one half.</div>
${bbPuzzle()}
<h3>Plug in the Pi's pins</h3>
<p><b>Shut down and unplug the Pi first.</b></p>
${pics([["tboard","The blue GPIO board, already in your breadboard"],["ribbon","The ribbon cable"]],260,150)}
<ol class="plain"><li>The ${P("tboard","blue board")} straddles the trench at one end of the breadboard. Yours is already in. Check it is pushed down evenly.</li><li>The ${P("ribbon","ribbon cable")} joins the Pi's 40 pins to the blue board. The plug on the blue board only fits one way. On the Pi end, the plug must cover all 40 pins exactly, not shifted sideways by a row. The Freenove tutorial PDF has a photo of this at the start. Copy it exactly.</li></ol>
<p>Here is what that end of the breadboard looks like as a diagram. Each label on the blue board names the column of holes next to it. Any wire you push into that column is now connected to that Pi pin.</p>
<div class="tool"><div class="cap">&gt; the blue board on the breadboard. each label owns the holes above or below it.</div><div class="scroll">${boardSVG({hot:["GPIO17","GND"]})}</div></div>
<div class="warn"><b>GET THE RIBBON RIGHT</b>A ribbon cable plugged in shifted or backwards sends power to the wrong pins. Have your Checker look before you power on.</div>`,
 bind:r=>{bindBB(r);bindBBPuzzle(r)}},

{id:"blink",t:"First Spell: Blink",sub:"Make a light blink. It is the 'hello world' of hardware.",html:()=>`
<p>Before motors, we prove that your code can reach out of the computer and poke the real world. An ${G("led","LED")} is the cheapest thing to poke.</p>
${pics([["led1","1 red LED"],["r220","1 resistor, 220Ω"],["jumpers","2 jumper wires"]])}
<h3>The idea</h3>
<div class="tool"><div class="cap">&gt; the loop. current flows left to right.</div><div class="scroll"><svg viewBox="0 0 620 120" style="min-width:480px" role="img" aria-label="GPIO17 to resistor to LED to ground">
<line x1="110" y1="60" x2="510" y2="60" stroke="#666" stroke-width="5"/>
<rect x="10" y="40" width="110" height="40" rx="4" fill="#12301a" stroke="var(--ctrl)" stroke-width="2"/><text x="65" y="65" text-anchor="middle" font-size="14">GPIO17</text>
<rect x="190" y="46" width="90" height="28" rx="6" fill="#c9a66b" stroke="#111" stroke-width="2"/><g stroke-width="7"><line x1="208" y1="46" x2="208" y2="74" stroke="#c0392b"/><line x1="224" y1="46" x2="224" y2="74" stroke="#c0392b"/><line x1="240" y1="46" x2="240" y2="74" stroke="#6b3f1d"/></g><text x="235" y="100" text-anchor="middle" font-size="12">220Ω resistor</text>
<path d="M360 36 L360 84 L404 60 Z" fill="var(--power)" stroke="#111" stroke-width="2"/><line x1="406" y1="36" x2="406" y2="84" stroke="var(--power)" stroke-width="5"/><text x="345" y="28" font-size="11">long leg (+)</text><text x="398" y="104" font-size="11">short leg (−)</text>
<rect x="500" y="40" width="110" height="40" rx="4" fill="#26272f" stroke="var(--gnd)" stroke-width="2"/><text x="555" y="65" text-anchor="middle" font-size="14">GND</text></svg></div></div>
<p>When your code switches GPIO17 ON, the pin pushes with 3.3 volts. Current flows through the resistor, lights the LED, and returns to the Pi through GND. One loop. Your code is the switch.</p>
<h3>Build it</h3>
${blinkBoard()}
<ol class="plain"><li><b>Jumper wire</b> from the column labelled <b>GPIO17</b> to an empty column further along.</li><li><b>${G("resistor","Resistor")}</b> from that column across to another empty column. Bend its legs into a staple shape. Resistors work either way round.</li><li><b>LED:</b> long leg in the resistor's column, short leg in the next column over.</li><li><b>Jumper wire</b> from the short leg's column back to a column labelled <b>GND</b>.</li></ol>
<p>Trace it with your finger and say it out loud: pin, wire, resistor, LED, wire, ground. If your finger can make the whole trip, so can the electricity.</p>
<h3>The code</h3>
${codeBlock("blink.py",CODE.blink)}
<p>Press Run. The red Stop button ends it. The text after each <span class="mono">#</span> is a comment: a note for humans that Python ignores.</p>
<div class="tip"><b>NOT BLINKING?</b>Nine times out of ten the LED is in backwards. Flip it. If that is not it, the next quest is an entire ritual for exactly this situation.</div>
<p><b>Mess with it:</b> change both <span class="mono">0.5</span> numbers to <span class="mono">0.05</span>. Then try making it blink S.O.S.</p>`},

{id:"debug",t:"The Ritual of Debugging",sub:"It will not work the first time. This is normal, and there is a method.",html:()=>`
<p>Here is a secret that adults hide from children: <b>nothing works the first time.</b> Not for you, not for NASA. The difference between people who build robots and people who give up is not talent. It is that the builders have a calm routine for finding the ${G("bug","bug")}.</p>
<p>When something does not work, do not poke randomly. Go down this list, in order. It is sorted from most likely to least likely.</p>
<ol class="plain">
<li><b>Is it actually powered?</b> Pi booted? Power module light on? Battery not dead? Half of all bugs die here.</li>
<li><b>Is the loop complete?</b> Trace every wire with your finger, from + all the way back to −. Say each stop out loud.</li>
<li><b>Is every leg in the hole you think it is?</b> Off by one column is the single most common breadboard bug. Look from directly above, not from the side.</li>
<li><b>Is anything backwards?</b> LEDs, chips and batteries all care which way round they go.</li>
<li><b>Does the code say the same pin as the wire?</b> GPIO17 in the code must be the column labelled GPIO17.</li>
<li><b>Did Python complain?</b> Red text in the bottom box of Thonny is not an insult. It is a clue, and it tells you the line number.</li>
<li><b>Swap the suspect.</b> Try a different LED, a different wire, a fresh battery. Parts do die. Wires break inside where you cannot see.</li></ol>
<div class="idea"><b>THE GOLDEN RULE: CHANGE ONE THING AT A TIME</b>If you change three things and it starts working, you do not know which one fixed it. If you change three things and it is still broken, you may have fixed it and broken it again. One change, test, repeat.</div>
<h3>Reading Python's complaints</h3>
<div class="scroll"><table class="t"><tr><th>Python says</th><th>It means</th><th>Usual cause</th></tr>
<tr><td class="mono">SyntaxError</td><td>"I cannot even read this line."</td><td>A missing bracket, quote mark or colon.</td></tr>
<tr><td class="mono">IndentationError</td><td>"The spaces at the start of this line are wrong."</td><td>Lines inside a <span class="mono">while</span> or <span class="mono">if</span> must be pushed in by the same amount.</td></tr>
<tr><td class="mono">NameError</td><td>"I have never heard of this word."</td><td>A typo. <span class="mono">mottor</span> is not <span class="mono">motor</span>. Capital letters count too.</td></tr>
<tr><td class="mono">GPIOPinInUse</td><td>"Something is already using that pin."</td><td>An old program is still running. Press Stop, then Run again.</td></tr></table></div>
<h3>The rubber duck</h3>
<p>Programmers have a famous trick: explain the problem, out loud, step by step, to a rubber duck. Halfway through explaining, you usually spot the mistake yourself, because explaining forces you to look at what is <i>really</i> there instead of what you <i>meant</i> to build. You have something better than a duck. You have a teammate. Use them.</p>
<div class="tip"><b>PRACTICE RUN</b>Break your blink circuit on purpose. Have one of you secretly make ONE change (flip the LED, move a wire one column, change 17 to 18 in the code) while the other looks away. Then the other one hunts the bug using the list. Swap. This is the most useful game in this whole guide.</div>`},

{id:"muscle",t:"Why the Brain Can't Lift",sub:"The Pi is a wizard, not a barbarian. It needs muscle.",html:()=>`
<p>You made a pin light an LED. So why not just plug a motor into a pin?</p>
${pics([["dcmotor","The DC motor"],["chips","The chips. One of them is the L293D"]],240,140)}
<h3>What is inside a motor</h3>
<p>The silver can holds two magnets and a coil of copper wire on a spinning shaft. When current flows through the coil it becomes an ${G("electromagnet","electromagnet")}, and the fixed magnets shove it around. Reverse the current and the shove reverses, so the motor spins the other way. That is ${G("polarity","polarity")}.</p>
${motorInside()}
<p>The coil is just wire, so its ${G("resistance","resistance")} is tiny, only a few ohms. You know what Ohm's law says about a tiny squeeze: <b>a big flow</b>.</p>
<div class="tool"><div class="cap">&gt; how much current things want</div>
<table class="t"><tr><th>Thing</th><th>Current</th><th></th></tr>
<tr><td>What one Pi pin can safely give</td><td class="mono">16 mA</td><td><div style="height:14px;width:6px;background:var(--ctrl)"></div></td></tr>
<tr><td>An LED with its resistor</td><td class="mono">6 mA</td><td><div style="height:14px;width:3px;background:var(--show)"></div></td></tr>
<tr><td>Small motor, spinning freely</td><td class="mono">~200 mA</td><td><div style="height:14px;width:75px;background:var(--muscle)"></div></td></tr>
<tr><td>Same motor, stuck against a wall</td><td class="mono">~750 mA or more</td><td><div style="height:14px;width:min(280px,100%);background:var(--power)"></div></td></tr></table></div>
<p>A motor asks for 10 to 50 times what a pin can deliver. The pin tries anyway, overheats, and dies. Worse, motors kick back electrical spikes when they stop, like a door slamming in the Pi's face.</p>
<h3>The fix: a manager</h3>
<p>A ${G("driver","motor driver")} sits between the brain and the muscle. The Pi sends a tiny signal that says "go". The driver obeys by opening a path from a <b>separate battery</b> to the motor. Brain gives orders, driver handles the heavy current. The Pi never touches motor power at all.</p>
<h3>The trick inside: an H-bridge</h3>
<p>To reverse a motor you swap its two wires. A robot cannot stop mid-fight to swap wires, so we use four switches arranged in an ${G("hbridge","H-bridge")}. Tap the switches yourself:</p>
${hTool()}
<p>Your ${P("chips","L293D chip")} contains <b>two</b> H-bridges, one per motor. The switches inside are ${P("transistors","transistors")}: switches with no moving parts, flipped by a tiny signal instead of a finger. Each H-bridge has two signal inputs (which direction) and one enable input (allowed to run or not).</p>`,bind:bindH},

{id:"motor",t:"Summon the Motor",sub:"Nine wires stand between you and a spinning thing.",html:()=>`
<p>This is the big one. Take the LED circuit apart first, because we reuse GPIO17. <b>Pi shut down, battery unplugged.</b></p>
${pics(["chips","psu","dcmotor","clip9v"],200,130)}
<h3>The plan</h3>
${powerMap()}
<p>Notice there are <b>two separate power supplies</b>. The Pi keeps its own clean power from the wall. The motor gets rough, heavy power from the battery. If they shared one supply, every time the motor started it would gulp so much that the Pi's voltage would dip and the Pi would reboot mid-fight. The only thing the two sides share is ${G("gnd","ground")}, so that they agree on what "zero volts" means.</p>
<h3>1. Seat the chip</h3>
<p>Find the ${P("chips","L293D")} (read the tiny print on top). One end has a half-moon notch. Press the chip into the breadboard <b>across the trench</b>, notch pointing toward the blue board, a few columns away from it. With the notch on the left, <b>leg 1 is bottom left</b> and the numbers run along the bottom, then back along the top, so leg 16 is top left.</p>
<h3>2. Mount the power module</h3>
<p>The ${P("psu","power module")} pushes onto the far end of the breadboard so its pins drop into the power rails. Check that the module's <b>+</b> marking lines up with the red rail and <b>−</b> with the blue rail. Set both yellow jumper caps to <b>5V</b>. Do not connect the battery yet.</p>
<h3>3. Wire it, one wire at a time</h3>
${chipTool("A")}
<div class="warn"><b>THE ONE RULE OF THIS BUILD</b>The Pi and the motor circuit share exactly <b>one</b> power wire: ground. Never connect the Pi's 5V or 3V3 columns to the rails. The power module feeds the rails. The Pi only sends signals.</div>
<h3>4. Pre-flight check</h3>
<p>Builder reads each line. Checker looks and ticks.</p>
<div class="stack" style="gap:8px">
<label class="check"><input type="checkbox" id="pf1"><span>Chip notch points at the blue board, and the chip bridges the trench.</span></label>
<label class="check"><input type="checkbox" id="pf2"><span>Red rails only have red-type wires on them. Blue rails only have ground wires.</span></label>
<label class="check"><input type="checkbox" id="pf3"><span>There is a wire from a Pi GND column to the blue rail.</span></label>
<label class="check"><input type="checkbox" id="pf4"><span>Nothing from the Pi's 5V or 3V3 columns is connected to anything.</span></label></div>
<h3>5. Power and code</h3>
<p>Boot the Pi. Snap a 9V battery onto the ${P("clip9v","battery clip")}, plug it into the power module, and press the module's button. A green light means the rails are live. Then run:</p>
${codeBlock("motor.py",CODE.motor)}
<p>Two seconds one way, two seconds the other, stop. <b>You are now controlling a motor with code.</b> Put a bit of tape on the shaft so you can see it spin.</p>
<div class="tip"><b>NOTHING HAPPENS?</b>Run the Ritual of Debugging. For this circuit the usual suspects are: power module light off, missing Pi GND wire, chip in backwards, or a tired 9V battery. If the chip gets too hot to touch, kill the power at once and recheck legs 8 and 16.</div>`,bind:r=>bindChip($(".wiring",r))},

{id:"speed",t:"Speed Control",sub:"A pin only knows ON and OFF. So how do you get 'medium'?",html:()=>`
<p>Full speed forward and full speed backward is a fine personality, but a driver needs a throttle. The pins can only be fully ON or fully OFF. The trick is to cheat with time.</p>
<p>${G("pwm","PWM")} switches the power on and off hundreds of times a second. The motor is too heavy to stop and start that fast, so it just feels the <b>average</b>. On half the time feels like half power.</p>
<p>It is like pushing a kid on a swing. You are not pushing the whole time. You give short shoves, and the swing smooths them out. More shoves per minute, higher swing.</p>
${pwmTool()}
<p>In code, you pass a number from 0 to 1:</p>
${codeBlock("speed.py",CODE.speed)}
<p>Listen as it steps up through the gears. The <span class="mono">for</span> line means: do the indented part once for each number in the list.</p>
<p><b>Mess with it:</b> find the lowest power where your motor still starts on its own. That number matters later: it is Smasher's creeping speed.</p>
<div class="tip"><b>WHY IS FULL POWER A BIT WEAK?</b>The L293D is an old design and wastes about 1.5 to 2 volts as heat. Feed it 5V and the motor only sees about 3V. It is the chip's tax. Fine for learning. The real battlebot will get a newer, stingier driver.</div>`,bind:bindPwm},

{id:"tank",t:"Two Motors, One Tank",sub:"Loot a second motor. Then steer like a tank.",html:()=>`
<p>One motor is a fan. Two motors is a vehicle. With a motor on each side, you steer by running them at different speeds. That is ${G("tank","tank steering")}, and nearly every battlebot uses it because there is no fragile steering gear to smash.</p>
${tankTool()}
<h3>Loot the second motor</h3>
<p>Raid the old RC toys. With an adult and a screwdriver:</p>
<ul class="plain"><li>You want a silver can motor like the one in the kit, with <b>two wires</b> coming out of it.</li>
<li>The best find is a motor <b>still attached to its gearbox and wheel</b>. ${G("gears","Gears")} trade speed for ${G("torque","torque")} (pushing strength), and a ramming bot is all about the shove. A bare motor is fast but could not push a sandwich.</li>
<li>The jackpot is a toy with <b>two</b> drive motors, one per side, like an RC tank. Then you get a matched pair plus a ready-made skeleton.</li>
<li>Keep the wires long. If they are cut short or have no pin on the end, ask an adult about soldering jumper wires on.</li></ul>
${pics([["dcmotor","What you are hunting for inside the toy"]],240,140)}
<h3>Wire motor B</h3>
<p>Power off. Motor A's wires stay exactly as they are (shown faded). Add six more, all on the <b>top</b> half of the chip:</p>
${chipTool("B")}
<h3>Drive it</h3>
${codeBlock("drive.py",CODE.drive)}
<p>Run it, click in the bottom box, type <span class="mono">w</span> and press Enter. Both motors should spin. Tape the motors to something with wheels and it will crawl across the table, dragging its wires like a dog on a leash.</p>
<div class="tip"><b>ONE SIDE GOES THE WRONG WAY?</b>Totally normal. Swap that motor's two wires at the chip. Done.</div>
<div class="tip"><b>MOTORS WEAK OR STUTTERING?</b>A little 9V battery runs out of breath with two motors. A fresh one helps for testing. Better batteries are a quest of their own.</div>`,
 bind:r=>{bindTank(r);bindChip($(".wiring",r))}},

{id:"boss",t:"The Boss Door",sub:"You can drive. Here is what is behind the next door.",html:()=>`
<p>If you got here, you understand circuits, Ohm's law, breadboards, pins, motor drivers, PWM and tank steering, and you have code that drives two motors. That is the real core of every battlebot ever built. The rest is making it smaller, tougher and meaner.</p>
<h3>What comes next</h3>
<div class="levels">
<div class="lvl"><div class="n">LEVEL 2</div><h4>Cut the Leash</h4><p>Battery power for the Pi, and control over Wi-Fi from a phone or laptop.</p></div>
<div class="lvl"><div class="n">LEVEL 3</div><h4>A Real Skeleton</h4><p>Mount everything on a looted RC chassis. Geared motors, real wheels.</p></div>
<div class="lvl"><div class="n">LEVEL 4</div><h4>The Diet</h4><p>1 pound is 454 grams. Weigh every part. Cry. Swap parts for lighter ones.</p></div>
<div class="lvl"><div class="n">LEVEL 5</div><h4>Armor Up</h4><p>Metal wedge, soldered wiring, a kill switch, and a failsafe so it stops if the signal drops.</p></div></div>
<h3>An honest look at the diet</h3>
<div class="scroll"><table class="t"><tr><th>Part</th><th>About</th><th>Verdict</th></tr>
<tr><td>Full-size Raspberry Pi</td><td class="mono">45 g</td><td>Chunky but possible</td></tr>
<tr><td>Raspberry Pi Zero</td><td class="mono">10 g</td><td>The brain a 1 lb bot wants</td></tr>
<tr><td>Big breadboard</td><td class="mono">80+ g</td><td>Must go. Gets replaced by a small soldered board</td></tr>
<tr><td>9V battery</td><td class="mono">45 g</td><td>Heavy and weak. Gets replaced</td></tr>
<tr><td>Two small gear motors with wheels</td><td class="mono">60 to 100 g</td><td>Worth every gram</td></tr>
<tr><td>Everything left over</td><td class="mono">~200 g</td><td>Chassis and ARMOR</td></tr></table></div>
<p>So the breadboard build is your training dummy. Nobody fights with the training dummy. You learn on it, then build the real one small and tough.</p>
<div class="warn"><b>ABOUT BIG BATTERIES</b>Real combat robots use lithium batteries. They are amazing and they can catch fire if shorted, crushed or charged wrong. That level needs an adult, a proper charger and a fireproof bag. No exceptions.</div>`}
];

/* ============ trials ============ */
/* each question: q, options, index of the right one, and what to say for each option */
const QUIZ={
rules:[{q:"You spot a wire in the wrong hole. What do you do first?",o:["Quickly move it while it is running","Switch off the power, then move it","Add a second wire to cancel it out"],a:1,w:["That split second of brushing the wrong contact is exactly how parts die.","Right. Law 1. Power off, then rewire.","Two wrongs do not make a right. They make smoke."]},
 {q:"Why can't a motor plug straight into a Pi pin?",o:["Motors only work with batteries","The motor wants far more current than a pin can give","The pin would spin the motor too fast"],a:1,w:["Not quite. The issue is how much current the pin can supply.","Yes. The pin gives a whisper and the motor wants a firehose.","The opposite problem: the pin is far too weak, and breaks trying."]}],
volts:[{q:"A motor is wired to a battery, but one wire has fallen out. What happens?",o:["It runs at half speed","Nothing. The loop is broken","Electricity leaks out of the loose end"],a:1,w:["There is no half. Without a complete loop, nothing flows at all.","Right. No loop, no flow.","Electricity does not drip out of wires. It needs a full path back to the battery."]},
 {q:"Voltage is...",o:["how hard the electricity is pushed","how much electricity flows","how long the battery lasts"],a:0,w:["Yes. Voltage is push.","That is current. Voltage is the push that causes the flow.","Nope. Voltage is the push."]},
 {q:"In a robot, what does your code mostly do?",o:["Makes electricity","Decides when loops are open or closed","Stores power for later"],a:1,w:["Batteries do that. Code only controls.","Exactly. Code is a very fast, very obedient switch.","That is a battery's job."]}],
ohm:[{q:"Same battery, but you swap in a BIGGER resistor. The current...",o:["goes up","goes down","stays the same"],a:1,w:["More squeeze means less flow, not more.","Right. Flow = push ÷ squeeze. Bigger squeeze, smaller flow.","The squeeze changed, so the flow has to change."]},
 {q:"You are picking a bodyguard for an LED on a Pi pin. Which one?",o:["No resistor: about 52 mA","220Ω: about 6 mA","10,000Ω: about 0.13 mA"],a:1,w:["52 mA is over three times the pin's 16 mA limit. Something pops.","Yes. Bright enough to see, gentle enough for the pin.","Safe, but so little current that the LED barely glows."]},
 {q:"Why does a motor stuck against a wall draw so much current?",o:["It gets angry","Stopped, it is just a low-resistance coil of wire","The battery pushes harder to help"],a:1,w:["Emotionally true. Electrically, no.","Right. About 4Ω of copper. Small squeeze, big flow.","Batteries do not try harder. The push stays the same and the squeeze drops."]}],
loot:[{q:"Which of these is NOT in the kit, so you must find or buy it?",o:["The L293D chip","A 9V battery","The breadboard"],a:1,w:["It is in there. It is one of the black chips.","Right. The clip is in the kit, the battery is not.","That is the big white board. Hard to miss."]},
 {q:"Which part do we use to drive the wheels?",o:["The round stepper motor","The blue servo","The silver DC motor"],a:2,w:["Steppers are precise but far too slow for a battlebot.","A servo only swings about half a turn. Good for a flipper, not for wheels.","Yes. Simple, fast, and it reverses when you swap the wires."]}],
brain:[{q:"In Python, which name do you use for a pin?",o:["Its GPIO name, like 17","Its physical position, like pin 11","Its colour"],a:0,w:["Right. Code uses GPIO names. The blue board prints them for you.","That is where the pin sits, but code uses the GPIO name.","Pins are all the same shade of disappointment."]},
 {q:"What does led = LED(17) do?",o:["Turns the LED on","Makes the name 'led' mean the thing on GPIO17","Blinks 17 times"],a:1,w:["Not yet. It only sets up the name. led.on() turns it on.","Yes. It is a name tag, so later lines can say led.on().","Nope. 17 is the pin, not a count."]},
 {q:"Before unplugging the Pi you should...",o:["Just pull the plug, it is fine","Use Menu → Shutdown and wait for the screen to go dark","Hold down every key"],a:1,w:["Fine about nine times. The tenth scrambles the SD card.","Right. Let it finish saving first.","Creative. No."]}],
blink:[{q:"The LED does not light. What is the first thing to try?",o:["Flip the LED around","Rewrite all the code","Use a bigger battery"],a:0,w:["Yes. LEDs only work one way round, and it is the most common mistake.","The code is three lines. Check the cheap, likely thing first.","More push through a backwards LED is still nothing. Or worse."]},
 {q:"What does sleep(0.5) do?",o:["Turns the Pi off for half a second","Makes the program wait half a second","Dims the LED to half"],a:1,w:["The Pi stays on. Only the program pauses.","Right. Without the waits, it would blink too fast to see.","Dimming needs PWM, which comes later."]},
 {q:"In the blink circuit, where does the current go after the LED?",o:["It gets used up by the LED","Back to the Pi through GND","Into the air"],a:1,w:["Current is not used up. It always has to return, or the loop is broken.","Yes. Out of GPIO17, through everything, and home through ground.","If it could do that we would not need wires."]}],
debug:[{q:"Your circuit worked yesterday and is dead today. Best first move?",o:["Rewrite the program from scratch","Check it has power, then trace the wires","Buy a new Raspberry Pi"],a:1,w:["The program did not change overnight. Check the cheap stuff first.","Right. Power, then the loop. Half of all bugs die at step one.","The Pi is almost never the problem. A loose wire almost always is."]},
 {q:"When hunting a bug, how many things should you change at a time?",o:["One","As many as possible, to save time","None. Stare at it harder"],a:0,w:["Yes. One change, test, repeat. Then you know what fixed it.","Then you will never know which change mattered.","Tempting, but circuits are immune to staring."]},
 {q:"Thonny shows red text: NameError: name 'mottor' is not defined. What happened?",o:["The motor is broken","There is a spelling mistake in the code","The battery is flat"],a:1,w:["Python cannot see your motor. It is complaining about a word.","Right. Python has never heard of 'mottor'. It wanted 'motor'.","Python knows nothing about batteries. It is complaining about a word."]}],
muscle:[{q:"What is the motor driver's job?",o:["To make the Pi think faster","To switch big battery power to the motor when the Pi sends a small signal","To store electricity"],a:1,w:["It does nothing for the Pi's thinking.","Yes. The brain decides, the driver does the heavy lifting.","That is a battery."]},
 {q:"How does an H-bridge make a motor go backward?",o:["It slows the motor until it reverses","It sends the current through the motor in the other direction","It flips the motor over"],a:1,w:["Slowing down never becomes going backward.","Right. Same battery, opposite direction through the motor.","Mechanically ambitious. No."]}],
motor:[{q:"Which wire does everybody forget?",o:["The one from a Pi GND to the − rail","The red one to leg 16","The motor's second wire"],a:0,w:["Yes. Without a shared ground, the chip cannot understand the Pi's signals.","People usually remember power. It is ground they forget.","A motor with one wire is obviously unfinished. Ground is sneakier."]},
 {q:"The motor spins, but the wrong way. Easiest fix?",o:["Swap the motor's two wires","Turn the chip around","Use a different battery"],a:0,w:["Right. Swap the wires and the current goes the other way through it.","A backwards chip does not reverse the motor. It kills the chip.","The battery does not decide direction."]},
 {q:"Why does the motor get a battery of its own instead of using the Pi's power?",o:["Motors gulp so much current they would make the Pi's power dip and reboot it","Batteries make motors spin smoother","The Pi's power is the wrong colour"],a:0,w:["Yes. Clean power for the brain, rough power for the muscle.","Not really. It is about protecting the Pi.","Electricity is not colour coded. Wires are, by humans, for humans."]}],
speed:[{q:"What does motor.forward(0.25) do?",o:["Runs the motor for a quarter of a second","Power is ON for a quarter of the time, so it runs at about quarter power","Runs it at 0.25 volts"],a:1,w:["The number is power, not time.","Right. Fast flicking that is ON 25% of the time.","Not volts. It is the fraction of time the power is on."]},
 {q:"How does PWM change the speed if a pin can only be ON or OFF?",o:["It flicks ON and OFF very fast, and the motor feels the average","It lowers the voltage smoothly","It uses a smaller battery"],a:0,w:["Yes. Like short shoves on a swing.","A pin cannot do in-between voltages. That is why we need the trick.","Same battery. The trick is in the timing."]}],
tank:[{q:"Left motor forward, right motor backward. What does the bot do?",o:["Drives straight","Spins to the right on the spot","Spins to the left on the spot"],a:1,w:["Straight needs both motors going the same way.","Right. The left side pushes forward and the right side pulls back, so the nose swings right.","Other way. The side going forward swings the nose toward the opposite side."]},
 {q:"Why is a motor with a gearbox better for ramming than a bare motor?",o:["Gears make it faster","Gears trade speed for pushing strength","Gears use less metal"],a:1,w:["The opposite. Gears slow it down, and that is the point.","Yes. Slower wheels, much bigger shove.","Gears are extra metal. Worth it."]}]
};
const PUZ={board:["bb","Solve the 'joined or not' puzzle above"],muscle:["hbridge","Make the H-bridge spin backward with the switches"],tank:["tank","Collect the 3 coins in the simulator"]};
