
/* ============ data: glossary ============ */
const GLOSS={
 voltage:["Voltage (volts, V)","How hard electricity is being <b>pushed</b>. Like water pressure in a hose. A 9V battery pushes harder than a 1.5V AA. More push = motor spins faster (until it melts)."],
 current:["Current (amps, A)","How <b>much</b> electricity is actually flowing. Like how many litres per second come out of the hose. Motors are thirsty and drink lots. An LED only sips."],
 ma:["Milliamp (mA)","One thousandth of an amp. 1000 mA = 1 A. A Pi pin can safely give about 16 mA. A small motor wants 200 to 1000 mA. That gap is the whole reason this guide exists."],
 circuit:["Circuit","A <b>complete loop</b> from the + side of a battery, through stuff, back to the − side. No loop, no flow, nothing happens. Electricity is lazy and will not go on a one-way trip."],
 short:["Short circuit","When + is connected straight to − with nothing useful in between. All the current rushes through at once. Wires get hot, batteries get angry, parts die. This is how you release the magic smoke."],
 smoke:["Magic smoke","Engineer joke: every electronic part runs on magic smoke sealed inside. If you wire it wrong and the smoke escapes, the part stops working forever. You cannot put the smoke back."],
 gnd:["Ground (GND, −)","The 'return road' for electricity, the minus side of the battery. Every part of a circuit has to agree on where ground is. That is why the Pi's GND and the battery's − must be joined by a wire."],
 gpio:["GPIO pin","General Purpose Input/Output. The 40 metal pins on the Pi. Your code can switch each one ON (3.3 volts) or OFF (0 volts). They are tiny signal wires for <i>telling</i> things what to do. They are not power outlets."],
 resistor:["Resistor","A part that slows current down, like pinching a hose. We put one in front of an LED so the LED does not drink too much and pop. The coloured stripes are a code for how strong it is."],
 led:["LED","Light Emitting Diode. A tiny lamp. It only works one way round: long leg to +, short leg to −. Backwards it just sits there judging you."],
 breadboard:["Breadboard","A plastic board full of holes with hidden metal strips underneath. Push wires in and they connect, no soldering. Named after actual bread-cutting boards that people used to nail circuits to. Really."],
 rail:["Power rail","The long rows along the top and bottom edge of the breadboard, marked with a red line (+) and a blue line (−). Each one is a single long metal strip, so power is available all the way along."],
 driver:["Motor driver","A chip that sits between the brain and the motor. The Pi whispers a weak signal ('go forward'), and the driver opens a big valve from the battery to the motor. Brain decides, driver does the heavy lifting."],
 hbridge:["H-bridge","Four switches around a motor, shaped like the letter H. Close one diagonal pair and current goes left to right (forward). Close the other pair and it goes right to left (backward). The L293D has two of these inside."],
 pwm:["PWM","Pulse Width Modulation. Switching power ON and OFF very fast, hundreds of times a second. If it is ON half the time, the motor acts like it gets half power. This is how code controls speed with a pin that only knows ON and OFF."],
 ic:["Chip (IC)","Integrated Circuit. A black plastic bug with metal legs. Inside is a tiny slice of silicon with a whole circuit on it. The legs are numbered starting from the notch or dot, going anticlockwise."],
 torque:["Torque","Turning strength. How hard a wheel can shove. A bare motor is fast but weak. Gears trade speed for torque. A ramming bot wants lots of torque so it pushes instead of stalling."],
 polarity:["Polarity","Which way round + and − are. Swap the two wires on a DC motor and it spins the other way. Swap them on a chip and you get a small, sad smell."],
 thonny:["Thonny","A simple program on the Raspberry Pi where you type Python code and press a green button to run it. Find it under Menu → Programming."],
 python:["Python","The programming language we use. It reads almost like English, which is suspicious but convenient."],
 jumper:["Jumper wire","A wire with a pin (male) or a socket (female) on each end, for plugging into breadboards and pins. The colour means nothing to electricity. It only helps humans."],
 tank:["Tank steering","Steering with no steering wheel. Two wheels, each with its own motor. Both forward = straight. One faster = turn. Opposite directions = spin on the spot. Almost every battlebot does this."]
};
/* ============ data: parts (boxes are % of the photo: left, top, width, height) ============ */
const CATS={brain:["Brain","--brain"],power:["Power","--power"],muscle:["Muscles","--muscle"],sense:["Senses","--sense"],show:["Lights and noise","--show"],plumb:["Wires and small parts","--plumb"],ctrl:["Buttons and knobs","--ctrl"]};
const PARTS=[
 {id:"leds",n:"LEDs",c:"show",b:[0,0,48,10],v:"now",w:"Tiny lamps in four colours. Long leg goes to +, short leg to −. Always use a 220Ω resistor with them.",u:"First spell: blinking one proves your Pi and code work. Later: status lights on the bot ('armed', 'low battery', 'on fire')."},
 {id:"ribbon",n:"Ribbon cable",c:"plumb",b:[49.5,0.5,13.5,29.5],v:"now",w:"A flat cable with 40 wires. It carries all 40 Pi pins over to the breadboard.",u:"Plugs between the Pi and the blue GPIO extension board."},
 {id:"chips",n:"Black chips (L293D lives here)",c:"muscle",b:[64,0.5,8.5,14],v:"now",w:"Four chips that look identical. Read the tiny text printed on top with a flashlight. One says <b>L293D</b>: that is the motor driver. The others (74HC595 and friends) are for LED displays.",u:"The L293D is the star of this campaign. It can drive two motors, forward and backward."},
 {id:"adc",n:"ADC module",c:"sense",b:[64,14.8,8.5,6],v:"side",w:"Lets the Pi measure 'how much' instead of only ON or OFF. Needed to read knobs and joysticks.",u:"Side quest: joystick control. Not needed to drive."},
 {id:"matrix",n:"8×8 LED matrix",c:"show",b:[63.5,21,9,9],v:"side",w:"64 LEDs in a square. Can draw tiny pixel faces.",u:"Side quest. An angry face on your bot is good psychological warfare but heavy."},
 {id:"resistors",n:"Resistors",c:"plumb",b:[73,0,27,30.5],v:"now",w:"Current limiters. Three kinds, labelled on the paper tape: 220Ω, 1kΩ, 10kΩ. Bigger number = pinches harder.",u:"Grab one 220Ω for the LED quest."},
 {id:"smallfry",n:"Capacitors, diodes, RGB LED",c:"plumb",b:[0,11.5,17.5,13.5],v:"side",w:"Assorted small fry. Capacitors are tiny buckets that store charge. Diodes are one-way valves. The white LED with four legs is an RGB LED that can make any colour.",u:"Not needed yet. The L293D already has protection diodes built in."},
 {id:"minibtn",n:"Small push buttons",c:"ctrl",b:[18,16,8.5,6.5],v:"side",w:"Click-buttons. They connect two wires only while pressed.",u:"Side quest: a physical 'GO' button."},
 {id:"bigbtn",n:"Big buttons with caps",c:"ctrl",b:[27.5,11.5,21,10],v:"side",w:"Same as the small buttons but arcade style, with coloured caps.",u:"Side quest: build a wired controller."},
 {id:"tboard",n:"GPIO extension board",c:"brain",b:[28,22,20.5,23],v:"now",w:"The blue T-shaped board. It plugs into the breadboard and labels every Pi pin, so you do not have to count pins on the Pi itself.",u:"Use it. Counting 40 unlabeled pins by eye is how Pis die."},
 {id:"pots",n:"Potentiometers (knobs)",c:"ctrl",b:[28.5,27,6,6.5],v:"side",w:"A knob that changes resistance as you turn it. Volume-dial style. There are three in the kit.",u:"Side quest: a speed knob (needs the ADC module)."},
 {id:"psu",n:"Breadboard power module",c:"power",b:[9,23,16.5,9],v:"now",w:"Takes a battery in through the round jack and feeds a steady 5V (or 3.3V) into the breadboard's power rails. Has an ON/OFF button and a green light.",u:"This is the motors' own power supply, so they do not suck the life out of the Pi."},
 {id:"transistors",n:"Transistors",c:"plumb",b:[0.5,25.5,7,17],v:"side",w:"Three-legged electric switches. A small current on one leg controls a big current through the other two. An H-bridge is built out of these.",u:"The L293D chip has them inside already."},
 {id:"buzzers",n:"Buzzers",c:"show",b:[9.5,33.3,16,6],v:"later",w:"Make beeps. The one with a sticker is 'active' (just beeps). The other is 'passive' (can play notes).",u:"Later: a war horn. Or a reversing beep like a garbage truck."},
 {id:"stepper",n:"Stepper motor",c:"muscle",b:[9,39.5,15,13],v:"side",w:"A motor that moves in tiny exact steps. Very precise, very slow.",u:"Wrong tool for a battlebot. It would lose a race to a snail with a grudge."},
 {id:"sonic",n:"Ultrasonic sensor",c:"sense",b:[1,43,7,13],v:"later",w:"Two 'eyes' that are really a speaker and a microphone. It squeaks too high to hear and times the echo, like a bat, to measure distance.",u:"Later: auto-ram mode. See enemy, charge."},
 {id:"seg1",n:"7-segment digit",c:"show",b:[24.5,44.5,4.5,6.5],v:"side",w:"Shows one number using seven LED bars.",u:"Side quest."},
 {id:"uln",n:"Stepper driver board",c:"muscle",b:[31,46,12.5,11.5],v:"side",w:"The green board with a chip. It only drives the stepper motor, and only one direction per channel.",u:"Not for DC motors that need to reverse. Easy to confuse with the motor driver we want."},
 {id:"dht",n:"Temperature and humidity sensor",c:"sense",b:[50,30.5,5,9],v:"side",w:"The blue box with a grille. Reports how warm and damp the air is.",u:"Useful only if you fight in a swamp."},
 {id:"pir",n:"Motion sensor (PIR)",c:"sense",b:[46,40,9,12],v:"side",w:"The white dome. Detects warm bodies moving nearby.",u:"Side quest: a trap alarm for your room."},
 {id:"seg4",n:"4-digit display",c:"show",b:[45,52.5,10,4.8],v:"side",w:"Four number digits. Good for a countdown or stopwatch.",u:"Side quest: match timer."},
 {id:"dcmotor",n:"DC motor",c:"muscle",b:[10,52.5,15.5,8],v:"now",w:"The silver can with a shaft. Give it voltage and it spins. Swap the two wires and it spins backward. Simple, fast, hungry.",u:"The muscle. You have one in the kit and need a second one, looted from an old RC toy."},
 {id:"relay",n:"Relay",c:"plumb",b:[26.3,52.3,4.5,5.5],v:"side",w:"The orange box. A switch flipped by an electromagnet. Goes 'click'.",u:"Not needed. Too slow for motor control."},
 {id:"jumpers",n:"Jumper wires (pin to pin)",c:"plumb",b:[62,30.5,37,9],v:"now",w:"Wires with a metal pin on both ends, for breadboard-to-breadboard connections.",u:"You will use about 15. Tip: red for +, black for −, any other colour for signals."},
 {id:"clip9v",n:"9V battery clip",c:"power",b:[68,39.8,25,6.5],v:"now",w:"Snaps onto a rectangular 9V battery. The round plug goes into the power module.",u:"The 9V battery itself is NOT in the kit. Raid a smoke alarm drawer (not the smoke alarm) or buy one."},
 {id:"holder",n:"Battery holder",c:"power",b:[56.5,41,9,16.5],v:"later",w:"A holder for two large round lithium cells (size 18650), which are also not included.",u:"Later, and only with an adult. Lithium cells are serious business."},
 {id:"ffwires",n:"Jumper wires (with sockets)",c:"plumb",b:[66,46.5,33,11],v:"later",w:"Rainbow wires with a socket on one or both ends. They slide onto pins.",u:"Handy for sensors, and for connecting straight to Pi pins if you skip the ribbon cable."},
 {id:"servo",n:"Servo",c:"muscle",b:[0.3,58,10.5,10],v:"later",w:"A motor that turns to an exact angle and holds it, like a robot elbow. It only swings about half a turn.",u:"Later: a flipper arm or a wedge that lifts. Not for wheels."},
 {id:"mpu",n:"Motion chip (MPU6050)",c:"sense",b:[13.3,61.5,9.5,7.5],v:"later",w:"Feels tilt and rotation, like the sensor that flips your phone screen.",u:"Later: detect when the bot is upside down, and reverse the controls."},
 {id:"lcd",n:"LCD screen",c:"show",b:[25,58.3,29,13.5],v:"side",w:"Shows two lines of text.",u:"Side quest: trash talk display."},
 {id:"keypad",n:"Keypad",c:"ctrl",b:[55,60,18.5,18.5],v:"side",w:"Sixteen buttons in a grid.",u:"Side quest: a secret code to arm the bot."},
 {id:"proto",n:"Solder boards",c:"plumb",b:[75,59.7,24,19],v:"later",w:"Orange boards full of holes for soldering a circuit permanently.",u:"Later: a breadboard circuit falls apart in a fight. The final bot gets soldered."},
 {id:"horns",n:"Servo arms and screws",c:"muscle",b:[2,68,9,10],v:"later",w:"Little plastic arms that screw onto the servo shaft.",u:"Go with the servo."},
 {id:"joy",n:"Joystick",c:"ctrl",b:[11.3,69.3,12,9.2],v:"later",w:"A thumbstick like on a game controller. Two knobs in one, plus a click.",u:"Later: build your own controller (needs the ADC module)."},
 {id:"headers",n:"Pin headers",c:"plumb",b:[26,73.5,27,5.5],v:"later",w:"Strips of metal pins you can snap to length and solder on.",u:"Later, for soldered boards."},
 {id:"bb",n:"Breadboard",c:"plumb",b:[0.3,79.7,59,20],v:"now",w:"The white board full of holes. Hidden metal strips connect the holes in a pattern. There is an x-ray one in the Breadboard quest.",u:"Your workbench for the whole campaign."},
 {id:"chart",n:"Resistor colour chart",c:"plumb",b:[69.3,80.7,29.7,17.5],v:"side",w:"A decoder card for resistor stripes.",u:"Or just read the label on the paper tape like a sane person."},
 {id:"pi",n:"Raspberry Pi (not in photo)",c:"brain",b:null,v:"now",w:"A whole computer on a green board the size of a playing card. It runs your code and has 40 pins your code can switch on and off.",u:"The brain of the robot. You have two old ones. Either works if it has 40 pins."}
];
/* ============ helpers ============ */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const G=(k,t)=>`<button class="g" data-g="${k}">${t||GLOSS[k][0]}</button>`;
const P=(id,t)=>`<button class="plink" data-p="${id}">${t}</button>`;
const store={get(k,d){try{const v=localStorage.getItem("smasher_"+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem("smasher_"+k,JSON.stringify(v))}catch(e){}}};
function hl(src){return src.replace(/&/g,"&amp;").replace(/</g,"&lt;").split("\n").map(l=>{
  const i=l.indexOf("#");let code=i>=0?l.slice(0,i):l,com=i>=0?l.slice(i):"";
  code=code.replace(/("[^"]*")/g,'<span class="s">$1</span>').replace(/\b(from|import|while|if|elif|else|break|True|for|in)\b/g,'<span class="k">$1</span>').replace(/(?<![\w"])(\d+\.?\d*)(?![\w"])/g,'<span class="nmb">$1</span>');
  return code+(com?`<span class="c">${com}</span>`:"")}).join("\n")}
const codeBlock=(name,src)=>`<div class="code"><div class="bar"><span>${name}</span><button data-copy="${encodeURIComponent(src)}">copy</button></div><pre>${hl(src)}</pre></div>`;
const CODE={
hello:`print("It lives. Sort of.")`,
blink:`from gpiozero import LED      # borrow the LED spell from the gpiozero library
from time import sleep        # borrow the "wait" spell

led = LED(17)                 # our LED is wired to pin GPIO17

while True:                   # repeat forever
    led.on()                  # pin 17 ON  -> current flows -> light
    sleep(0.5)                # wait half a second
    led.off()                 # pin 17 OFF -> dark
    sleep(0.5)`,
motor:`from gpiozero import Motor
from time import sleep

# Tell Python which Pi pins go to which legs of the L293D
motor = Motor(forward=27, backward=17, enable=22)

motor.forward()               # full speed ahead
sleep(2)
motor.backward()              # full speed the other way
sleep(2)
motor.stop()                  # and breathe`,
speed:`from gpiozero import Motor
from time import sleep

motor = Motor(forward=27, backward=17, enable=22)

for power in [0.3, 0.5, 0.7, 1.0]:   # 0.3 means 30% power
    print("power:", power)
    motor.forward(power)
    sleep(2)

motor.stop()`,
drive:`from gpiozero import Robot

# each motor: (forward pin, backward pin, enable pin)
bot = Robot(left=(27, 17, 22), right=(23, 24, 25))

print("w = forward   s = back   a = left   d = right")
print("x = stop      q = quit   (press Enter after each)")

while True:
    key = input("> ")
    if key == "w":
        bot.forward(0.7)
    elif key == "s":
        bot.backward(0.7)
    elif key == "a":
        bot.left(0.7)
    elif key == "d":
        bot.right(0.7)
    elif key == "q":
        break
    else:
        bot.stop()

bot.stop()`};

/* ============ widgets ============ */
// ---- bot anatomy
const ORGANS={
 brain:["The Brain","Raspberry Pi","--brain","Runs your Python code and decides what to do. It is smart but weak: its pins can only whisper tiny signals."],
 driver:["The Nerves-to-Muscle Translator","Motor driver chip (L293D)","--muscle","Listens to the brain's whispers and switches the big battery power to the motors. Without it, the brain would fry trying to lift."],
 motors:["The Muscles","Two DC motors","--muscle","Turn electricity into spinning. One per side, so the bot steers like a tank."],
 battery:["The Heart","Battery","--power","Pumps electricity around. No heart, no robot. Too much heart, exploding robot."],
 chassis:["The Skeleton","Chassis","--plumb","The frame everything bolts onto. To start with, we steal one from an old RC car."],
 armor:["The Skin","Metal armor and wedge","--gnd","Comes last. A sloped wedge at the front slides under enemies. Everything must fit in 1 pound (454 grams), so armor is a diet problem."],
 radio:["The Ears","Wireless link","--sense","How your commands reach the bot without a cable. For now our robot is on a leash. Wireless is a later quest."]
};
function anatomy(){return `<svg viewBox="0 0 440 380" role="img" aria-label="Top view of a battle bot with clickable parts">
 <g class="organ" data-o="armor"><path d="M70 60 L370 60 L400 110 L400 340 L40 340 L40 110 Z" fill="#3b3a4d" stroke="var(--gnd)" stroke-width="3"/><path d="M70 60 L370 60 L400 110 L40 110 Z" fill="#55546b" stroke="var(--gnd)" stroke-width="2"/><text x="220" y="92" text-anchor="middle" font-size="13">WEDGE (front)</text></g>
 <g class="organ" data-o="chassis"><rect x="80" y="125" width="280" height="200" rx="8" fill="#232036" stroke="var(--plumb)" stroke-width="3"/><text x="220" y="316" text-anchor="middle" font-size="11" style="fill:var(--plumb)">chassis</text></g>
 <g class="organ" data-o="motors"><rect x="52" y="180" width="64" height="90" rx="5" fill="#5a3413" stroke="var(--muscle)" stroke-width="3"/><rect x="324" y="180" width="64" height="90" rx="5" fill="#5a3413" stroke="var(--muscle)" stroke-width="3"/><rect x="18" y="165" width="30" height="120" rx="8" fill="#111" stroke="var(--muscle)" stroke-width="3"/><rect x="392" y="165" width="30" height="120" rx="8" fill="#111" stroke="var(--muscle)" stroke-width="3"/><text x="84" y="230" text-anchor="middle" font-size="11">motor</text><text x="356" y="230" text-anchor="middle" font-size="11">motor</text></g>
 <g class="organ" data-o="brain"><rect x="140" y="140" width="160" height="70" rx="4" fill="#33285c" stroke="var(--brain)" stroke-width="3"/><text x="220" y="180" text-anchor="middle" font-size="13">BRAIN (Pi)</text></g>
 <g class="organ" data-o="driver"><rect x="185" y="222" width="70" height="34" rx="3" fill="#111" stroke="var(--muscle)" stroke-width="3"/><text x="220" y="244" text-anchor="middle" font-size="11">driver</text></g>
 <g class="organ" data-o="battery"><rect x="150" y="268" width="140" height="34" rx="4" fill="#4d1c1c" stroke="var(--power)" stroke-width="3"/><text x="220" y="290" text-anchor="middle" font-size="12">HEART (battery)</text></g>
 <g class="organ" data-o="radio"><circle cx="322" cy="150" r="12" fill="#0f3a36" stroke="var(--sense)" stroke-width="3"/><path d="M336 136 q10 14 0 28 M344 128 q16 22 0 44" fill="none" stroke="var(--sense)" stroke-width="3"/></g>
 <g fill="none" stroke-width="2" stroke-dasharray="4 4"><path d="M220 210 V222" stroke="var(--brain)"/><path d="M185 240 H116 M255 240 H324" stroke="var(--muscle)"/><path d="M220 268 V256" stroke="var(--power)"/></g>
</svg>`}
function bindAnatomy(root){const out=$("#organInfo",root);const show=k=>{const o=ORGANS[k];$$(".organ",root).forEach(g=>g.classList.toggle("sel",g.dataset.o===k));
  out.innerHTML=`<span class="chip" style="--c:var(${o[2]})">${o[1]}</span><h3 style="color:var(${o[2]});margin-top:8px">${o[0]}</h3><p>${o[3]}</p>`};
  $$(".organ",root).forEach(g=>g.addEventListener("click",()=>show(g.dataset.o)));show("brain")}

// ---- circuit loop
function loopTool(){return `<div class="tool"><div class="cap">&gt; toy #1: the loop</div>
<svg viewBox="0 0 420 220" role="img" aria-label="A battery, a switch and a motor wired in a loop">
 <path id="lpWire" d="M70 60 H190 M240 60 H350 V160 H70 V60" fill="none" stroke="#555" stroke-width="6"/>
 <path id="lpFlow" class="flow" d="M70 110 V60 H350 V160 H70 V110" fill="none" stroke="var(--show)" stroke-width="4" opacity="0"/>
 <line id="lpSw" x1="190" y1="60" x2="236" y2="32" stroke="var(--ctrl)" stroke-width="6" stroke-linecap="round"/>
 <circle cx="190" cy="60" r="6" fill="var(--ctrl)"/><circle cx="240" cy="60" r="6" fill="var(--ctrl)"/>
 <rect x="42" y="85" width="56" height="50" rx="4" fill="#4d1c1c" stroke="var(--power)" stroke-width="3"/><text x="70" y="106" text-anchor="middle" font-size="12">+</text><text x="70" y="128" text-anchor="middle" font-size="12">−</text>
 <text x="70" y="152" text-anchor="middle" font-size="11" dy="28">battery</text>
 <circle cx="350" cy="110" r="30" fill="#5a3413" stroke="var(--muscle)" stroke-width="3"/>
 <g id="lpRotor" class="spin"><path d="M350 86 V134 M326 110 H374" stroke="#fff" stroke-width="4"/></g>
 <text x="350" y="160" text-anchor="middle" font-size="11" dy="28">motor</text><text x="214" y="22" text-anchor="middle" font-size="11">switch</text>
</svg>
<div class="row"><button class="btn" id="lpBtn">Close the switch</button><span id="lpMsg" class="dim">Loop is broken. Nothing flows.</span></div>
<label class="mono" style="font-size:.8rem;display:block;margin-top:10px">Battery push: <b id="lpV">5</b> volts<input type="range" id="lpRange" min="0" max="12" value="5"></label></div>`}
function bindLoop(r){let on=false;const up=()=>{const v=+$("#lpRange",r).value;$("#lpV",r).textContent=v;const run=on&&v>0;
  $("#lpSw",r).setAttribute("x2",on?240:236);$("#lpSw",r).setAttribute("y2",on?60:32);
  $("#lpFlow",r).style.opacity=run?1:0;$("#lpFlow",r).style.animationPlayState=run?"running":"paused";$("#lpFlow",r).style.animationDuration=(run?4/v:1)+"s";
  $("#lpRotor",r).style.animationPlayState=run?"running":"paused";$("#lpRotor",r).style.animationDuration=(run?5/v:1)+"s";
  $("#lpBtn",r).textContent=on?"Open the switch":"Close the switch";
  $("#lpMsg",r).textContent=!on?"Loop is broken. Nothing flows.":v==0?"Loop is closed, but zero push. Still nothing.":v>9?"Loop closed. That motor is screaming.":"Loop closed. Current flows, motor spins."};
  $("#lpBtn",r).onclick=()=>{on=!on;up()};$("#lpRange",r).oninput=up;up()}

// ---- pin map
const PINS=["3V3","5V","GPIO2","5V","GPIO3","GND","GPIO4","GPIO14","GND","GPIO15","GPIO17","GPIO18","GPIO27","GND","GPIO22","GPIO23","3V3","GPIO24","GPIO10","GND","GPIO9","GPIO25","GPIO11","GPIO8","GND","GPIO7","ID_SD","ID_SC","GPIO5","GND","GPIO6","GPIO12","GPIO13","GND","GPIO19","GPIO16","GPIO26","GPIO20","GND","GPIO21"];
const USED={GPIO17:"Motor A backward (and the LED in the Blink quest)",GPIO27:"Motor A forward",GPIO22:"Motor A enable",GPIO23:"Motor B forward",GPIO24:"Motor B backward",GPIO25:"Motor B enable"};
function pinTool(){let s=`<div class="tool"><div class="cap">&gt; pin map: the Pi's 40 pins. tap one.</div><div class="pinmap">`;
 for(let i=0;i<40;i+=2){for(const j of [i,i+1]){const n=PINS[j],col=n=="GND"?"--gnd":n=="5V"?"--power":n=="3V3"?"--muscle":USED[n]?"--ctrl":"--plumb";
   const nm=`<span class="nm ${j%2?'':'l'}" style="color:var(${col})">${n}</span>`,b=`<button class="pin ${USED[n]?'used':''}" style="--c:var(${col})" data-pin="${j}">${j+1}</button>`;s+=j%2?b+nm:nm+b}}
 return s+`</div><p id="pinMsg" style="margin-top:12px" class="dim">White-ringed pins are the ones this campaign uses.</p>
 <div class="legend" style="margin-top:10px"><span class="chip" style="--c:var(--ctrl)">we use these</span><span class="chip" style="--c:var(--plumb)">signal pin</span><span class="chip" style="--c:var(--gnd)">ground</span><span class="chip" style="--c:var(--power)">5V out</span><span class="chip" style="--c:var(--muscle)">3.3V out</span></div></div>`}
function bindPins(r){$$(".pin",r).forEach(b=>b.onclick=()=>{$$(".pin",r).forEach(o=>o.classList.remove("sel"));b.classList.add("sel");const n=PINS[b.dataset.pin],num=+b.dataset.pin+1;
 const t=n=="GND"?"Ground. All eight GND pins are the same thing. Use whichever is closest.":n=="5V"?"5 volts straight from the Pi's power plug. Do not feed motors from here, and never poke it into a GPIO pin.":n=="3V3"?"3.3 volts out. Leave it alone in this campaign.":n.startsWith("ID")?"Reserved for add-on boards. Do not touch.":USED[n]?"<b>We use this one:</b> "+USED[n]+".":"A free signal pin. Your code can turn it ON (3.3V) or OFF (0V).";
 $("#pinMsg",r).innerHTML=`<b>Physical pin ${num} is called ${n}.</b> ${t}`})}

// ---- PWM
function pwmTool(){return `<div class="tool"><div class="cap">&gt; toy #4: pwm. flick the power really fast.</div>
<svg viewBox="0 0 420 150" role="img" aria-label="PWM square wave"><line x1="10" y1="120" x2="330" y2="120" stroke="#444"/><text x="10" y="20" font-size="10" style="fill:var(--dim)">ON</text><text x="10" y="138" font-size="10" style="fill:var(--dim)">OFF</text>
<polyline id="pwWave" fill="none" stroke="var(--ctrl)" stroke-width="4" points=""/>
<circle cx="375" cy="75" r="32" fill="#5a3413" stroke="var(--muscle)" stroke-width="3"/><g id="pwRot" class="spin"><path d="M375 49 V101 M349 75 H401" stroke="#fff" stroke-width="4"/></g></svg>
<label class="mono" style="font-size:.8rem">ON for <b id="pwD">50</b>% of the time  →  code: <b style="color:var(--term)">motor.forward(<span id="pwC">0.5</span>)</b><input type="range" id="pwR" min="0" max="100" step="5" value="50"></label>
<p id="pwMsg" class="dim" style="margin-top:8px"></p></div>`}
function bindPwm(r){const up=()=>{const d=+$("#pwR",r).value;let pts="10,120";for(let k=0;k<4;k++){const x=10+k*80,w=80*d/100;if(d>0)pts+=` ${x},120 ${x},25 ${x+w},25 ${x+w},120`;pts+=` ${x+80},120`}
  $("#pwWave",r).setAttribute("points",pts);$("#pwD",r).textContent=d;$("#pwC",r).textContent=(d/100).toFixed(d%10?2:1);
  const rot=$("#pwRot",r);rot.style.animationPlayState=d>15?"running":"paused";rot.style.animationDuration=(d>15?40/d:1)+"s";
  $("#pwMsg",r).textContent=d==0?"Always off. A very calm motor.":d<=15?"Too weak. The motor hums but cannot get going. Real motors need a minimum kick to start.":d<100?"The motor is too heavy to follow each flick, so it just feels the average.":"Always on. Full send."};
 $("#pwR",r).oninput=up;up()}

