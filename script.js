const dialogue = document.getElementById("dialogue");
const choices = document.getElementById("choices");
const floatingMessage = document.getElementById("floatingMessage");
const chapterTag = document.querySelector(".chapter-tag");
const bgMusic = document.getElementById("bgMusic");
let bgMusicStarted = false;

let typing = false;
let frogsCollected = 0;
let frogUnlocked = false;

const frogLocations = [
"Gift Valley",
"Cake Disaster",
"Mirror of Truth",
"Jar of Tiny Good Things",
"Secret Files"
];

const bunFace = document.getElementById("bunFace");
function setFace(face){
bunFace.textContent = face;
}

const intro = [

{
text: "Hellooooooooo.",
face: "˶◕‿◕˵"
},

{
text: "I have been informed that today is your birthday.",
face: "˶ᵔ ᵕ ᵔ˶"
},

{
text: "I have also been informed that you don't feel like celebrating.",
face: "╥﹏╥"
},

{
text: "Which is a bold thing to say while opening a birthday website made specifically for you.",
face: "ಠᴗಠ"
},

{
text: "That's like walking into a bakery and saying you're not thinking about cake.",
face: "•᷄⌓•᷅ "
},

{
text: "Suspicious behavior.",
face: "¬_¬"
},

{
text: "Very suspicious behavior.",
face: "ಠ_ಠ"
},

{
text: "So after careful consideration...",
face: "˵•̀ ᴗ •́ ˵"
},

{
text: "I have decided to ignore that information.",
face: "~⩊~"
},

{
text: "Welcome to your birthday.",
face: "✦‿✦"
},

{
text: "Please remain calm during the ride.",
face: "◕ᴗ◕"
},

{
text: "Or don't.",
face: " ◔_◔ "
},

{
text: "Either way, we're doing this.",
face: " ✧⩊✧ "
},

{
text: "Brace yourself...",
face: "◉_◉"
},

{
text: "Because our magic carpet is waiting.",
face: "˃̵ᴗ˂"
}

];

let introIndex = 0;


let typingInterval = null;

function typeText(text, callback){

    if (typing) return;

    typing = true;
    dialogue.innerHTML = "";

    let i = 0;

    if (typingInterval) {
        clearInterval(typingInterval);
        typingInterval = null;
    }

    typingInterval = setInterval(() => {

        if (text.charAt(i) === "\n") {
            dialogue.innerHTML += "<br>";
        } else {
            dialogue.innerHTML += text.charAt(i);
        }

        i++;

        if (i >= text.length) {

            clearInterval(typingInterval);
            typingInterval = null;

            typing = false;

            if (callback) callback();
        }

    }, 25);
}


function bunbunThought(text){

floatingMessage.innerHTML = text;
}


function nextDialogue(){

if(typing) return;

if(introIndex < intro.length){

setFace(intro[introIndex].face);

typeText(intro[introIndex].text);

introIndex++;
}
else{

choices.innerHTML = `
       <button onclick="startAdventure()">
       ✨ CLIMB ABOARD THE MAGIC CARPET
       </button>
       `;
}
}

function showAchievement(text){

const achievement =
document.getElementById("achievement");

achievement.innerHTML = text;

achievement.classList.add("show");

setTimeout(()=>{

achievement.classList.remove("show");

},3000);
}

function createConfetti(){

const container =
document.getElementById(
"confettiContainer"
);

for(let i=0;i<30;i++){

const piece =
document.createElement("div");

piece.classList.add(
"confetti"
);

piece.style.left =
Math.random()*100 + "vw";

piece.style.top =
"-20px";

piece.style.background =
["#ffd7ef","#ffe8a3","#d6c4ff","#ffb7b7"][Math.floor(Math.random()*4)];

container.appendChild(piece);

setTimeout(()=>{

piece.remove();

},3000);
}
}

function startAdventure(){

if(!bgMusicStarted){
bgMusic.volume = 0.2;
bgMusic.play().catch((err) => {
console.log("Music blocked:", err);
});
bgMusicStarted = true;
}

showAchievement(
"🏆  Passenger Princess "
);

bunbunThought(
"🪄 The carpet is warming up..."
);

typeText(
"Excellent.The carpet appears to be functioning.This is surprising.",
()=>{

choices.innerHTML = `
       <button onclick="chapter1()">
       Continue
       </button>
       `;

});

}

function chapter1(){

chapterTag.innerHTML =
"Chapter 1";
setFace("˵•̀ ᴗ •́ ˵"); 

bunbunThought(
"🪄 Passenger inspection in progress..."
);

typeText(
"Before we continue, the carpet requires a quick passenger check. What's your current mood? "
);

choices.innerHTML = `

   <button onclick="chooseMood('🫠 Just existing')">
   🫠 Existing
   </button>

   <button onclick="chooseMood('😴 Sleepy')">
   😴 Sleepy
   </button>

   <button onclick="chooseMood('🍕 Hungry')">
   🍕 Hungry
   </button>

   <button onclick="chooseMood('✨ Running on vibes')">
   ✨ Running on vibes
   </button>

   <button onclick="chooseMood('🌙 Mysterious')">
   🌙 Mysterious
   </button>

   `;
}

function chooseMood(mood){

showAchievement(
"🏆 Passenger Alive"
);

typeText(

`Current status detected:

${mood}

Wonderful.

You have successfully met the minimum requirements for today's adventure.

Which, surprisingly, were very low.`

);

choices.innerHTML = `
   <button onclick="chapter2()">
   Continue
   </button>
   `;
}


function chapter2(){

chapterTag.innerHTML =
"Chapter 2";

setFace(" ╭ರ_•́ ");

cluesFound = 0;

bunbunThought(
"🕵️ Investigation mode activated."
);

typeText(

`Uh oh.

I have received reports that your birthday has gone missing.

This is deeply concerning.

We must investigate immediately.`

);

choices.innerHTML = `

  <button onclick="collectClue('Multiple witnesses claim today is somehow important.')">
✨ Clue 1
</button>

<button onclick="collectClue('Several birthday-related messages have been spotted in the area.')">
✨ Clue 2
</button>

<button onclick="collectClue('A mysterious individual appears to have prepared something special.')">
✨ Clue 3
</button>

<button onclick="collectClue('The suspect is currently participating in a birthday-themed adventure.')">
✨ Clue 4
</button>

   `;
}

let clueSet = new Set();
cluesFound = 0;

function collectClue(text){
    if (clueSet.has(text)) return;

    clueSet.add(text);
    cluesFound++;

    typeText(text);

    if (cluesFound >= 4){
        choices.innerHTML = `
            <button onclick="solveMystery()">
            🕵️ Review Evidence
            </button>
        `;
    }
}

function solveMystery(){

showAchievement(
"🏆 Birthday Investigator "
);

typeText(

` Hmm.

Let's review the evidence.

Multiple witnesses remembered today.

Birthday wishes have been spotted everywhere.

Someone may or may not have spent an alarming amount of time creating an entire birthday adventure.

The suspect is currently standing in the middle of said adventure.

And yet...

You continue to insist that today is just another ordinary day.

A fascinating argument.

Unfortunately...

The evidence is stacking up.

After a very serious investigation...

And several completely unnecessary meetings...

The Birthday Investigation Team has reached a conclusion.

The birthday was never actually missing.

It was simply buried.

Under responsibilities. Overthinking. Tired days.

And all the little things life threw at you lately.

But despite all that...

It was still here.

Waiting for someone to notice it.
It was still here. Waiting for someone to notice it.

Case status:

Birthday located.

Suspect identified.

Celebration recommended.

Case closed. `

);

choices.innerHTML = `
   <button onclick="chapter3()">
   Continue Journey
   </button>
   `;
}

function chapter3(){

chapterTag.innerHTML =
"Chapter 3";

setFace(" •̀ - •"); 
bunbunThought(
"🎁 These boxes look suspicious."
);

typeText(

`Welcome to the Valley of Suspicious Gift Boxes.

Please choose wisely.

Or don't.

They all seem suspicious.`

);

choices.innerHTML = `

<button onclick="openGift()">
🎁 Box A
</button>

<button onclick="openGift()">
🎁 Box B
</button>

<button onclick="openGift()">
🎁 Box C
</button>

<button onclick="giftFrog()">
🐸 Suspicious Frog
</button>

`;
}


function giftFrog(){

findFrog(
"Gift Valley"
);

typeText(

`You found a frog hiding behind one of the gift boxes.

It claims it was helping organize presents.

The evidence is... inconclusive.

The frog seems very proud of itself regardless.`

);

choices.innerHTML = `

   <button onclick="chapter4()">
   Continue Journey
   </button>

   `;
}

function openGift(){

const gifts = [

        "🎂 Virtual Cake",
        "🧸 Pocket-Sized Comfort Bun",
        "🌸 Tiny Bouquet",
        "🧠 Bunbun's Last Braincell",
       "🍟 One Stolen French Fry",
       "🍪 Half-Eaten Cookie From Bunbun"

];

const reward =
gifts[
Math.floor(Math.random()*gifts.length)
];

typeText(

`Congratulations.

You received:

${reward}

Please use it responsibly.

Or irresponsibly.

I am not your supervisor.`

);

choices.innerHTML = `
   <button onclick="chapter4()">
   Continue
   </button>
   `;
}

function chapter4(){

chapterTag.innerHTML =
"Chapter 4";

bunbunThought(
"🎂 This can only go well."
);

typeText(

`To celebrate the successful recovery of your birthday...
I decided to bake you a cake.
Unfortunately, I have never baked a cake before.
Or seen a cake being baked.
Or read a cake recipe.
This was probably a mistake.
But we're committed now.
Please choose a cake.
Together, we shall make questionable decisions.`
);

choices.innerHTML = `

   <button onclick="finishCake()">
    ☁️ Cloudberry Cake
   </button>

   <button onclick="finishCake()">
   🍫 Triple Chocolate Catastrophe
   </button>

   <button onclick="finishCake()">
   🌙 Moonlight Vanilla Cake
   </button>

   <button onclick="cakeFrog()">
🐸 Ask The Frog
</button>

   `;
}

function cakeFrog(){

findFrog(
"Cake Disaster"
);

typeText(
`You have chosen to consult the frog.

An interesting decision.

This raises several questions.
The frog stared into the distance for several seconds.
Then he offered exactly one piece of advice:

"ribbit."

...

Thank you, frog.

That was completely unhelpful.

Bunbun has decided to interpret this as approval.`

);

choices.innerHTML = `

   <button onclick="finishCake()">
    Continue Cake Construction
    🐸 Follow The Frog's Wisdom
   </button>

   `;
}

function finishCake(){

showAchievement(
"🏆 Chaos Baker"
);

createConfetti();

typeText(

`The cake is finished.
Technically.
It leans slightly to the left.
One layer appears to be floating.
Nobody knows where the glitter came from.
The frosting has achieved sentience.
Also...
I may have eaten half of the frosting during construction.
In my defense,
quality control is important.

But...
it was made especially for you.
So despite several structural concerns...
and at least three violations of basic baking principles...
I think it's perfect.
After all, birthdays aren't about perfect cakes.
They're about celebrating wonderful people.
Now hurry and blow out the candles before the frosting starts doing anything suspicious. 🐰✨`

);

  choices.innerHTML = `
        <button onclick="chapter5()">🪞 Continue Journey</button>
    `;
}

// =========================
// CHAPTER 5
// MIRROR OF TRUTH
// =========================

function chapter5(){

chapterTag.innerHTML =
"Chapter 5";

bunbunThought(
"🪞 Mirrors are weird."
);

typeText(

`We have arrived at the Mirror of Truth.

Don't worry.
A very rare magical artifact.

Most mirrors show your reflection.

This one only reveals nice things.
This one shows the things that make you special.

Which is considerably more useful.

Probably.

Anyway.

Let's see what it has to say.`

);

choices.innerHTML = `
   <button onclick="useMirror()">
   🪞 Look Into Mirror
   </button>

<button onclick="mirrorFrog()">
🐸 Mirror Frog
</button>
   `;
}

function mirrorFrog(){

findFrog(
"Mirror of Truth"
);

typeText(

`You found a frog staring into the Mirror of Truth.
The mirror displayed:
"Absolutely magnificent."
The frog nodded.
The mirror nodded.
This feels suspiciously biased.
But nobody seems interested in my opinion.`

);

choices.innerHTML = `

   <button onclick="useMirror()">
   Continue
   </button>

   `;
}

function useMirror(){

const truths = [
"You turn ordinary moments into stories worth remembering.",
"You care deeply, even when you pretend not to.",
"You make conversations more fun.",
"You are stronger than most people realize.",
"You deserve kindness too.",
"You make people feel seen and heard.",
"You have survived 100% of your bad days so far.",
"You bring your own kind of magic wherever you go.",
"The world is brighter because you're in it.",
"There are people whose days are better because you exist."
];

const truth = truths[Math.floor(Math.random()*truths.length)];

typeText(
`The Mirror of Truth says:

...

...

...

Loading...

Please wait.

...

*Bunbun squints suspiciously.*

*Bunbun taps the mirror.*

Nothing.

*Bunbun taps it harder.*

Nothing.

*Bunbun smacks it.*

🪞💥

The mirror flickers to life.

Bunbun nods.

"Yep. That usually works."

The mirror says:

"${truth}"`
, () => {

choices.innerHTML = `
   <button onclick="chapter6()">
    Continue ✨
   </button>
`;
});
}

// =========================
// CHAPTER 6
// WHEEL OF CHAOS
// =========================

function chapter6(){

chapterTag.innerHTML =
"Chapter 6";

bunbunThought(
    "🎡 This feels... legally unstable."
);

typeText(

`Welcome to the Wheel of Chaos.

I have absolutely no idea what happens next.
Important notice:
This system is not certified, tested, or emotionally stable.

If anything goes wrong,
please pretend it was intentional.

Good luck.`

);

choices.innerHTML = `
   <button onclick="spinWheel()">
    🎡 SPIN (bad idea)
   </button>
   `;
}

function spinWheel(){

    const outcomes = [
        "🎂 Cake That Slightly Moves When Unwatched",
        "✨ Borrowed Luck (expires in 24 hours)",
        "🌙 Moonlight Shortcut (skips one bad moment)",
        "🪞 Mirror Echo (it repeats your last thought... loudly)",
        "🎡 Wheel Speed Upgrade (this is a mistake)",
        "📜 Unwritten Plot Twist (you’ll find out later)",
        "🌈 Reality Gets a Minor Color Correction",
        "🕰️ Perfect Timing (once, never again)",
        "🎭 Temporary Main Character Energy",
        "🧠 Bunbun's Last Braincell"
    ];

    const reward = outcomes[Math.floor(Math.random() * outcomes.length)];

    if (reward.includes("Braincell")) {
        showAchievement("🧠 Braincell Owner ");
    }

    typeText(
`Bunbun approaches the Wheel of Chaos.

He reads the warning label.

He ignores it.

He spins it anyway. 🎡`,
    () => {

        typeText(
`The wheel stops.

You received:
👉 ${reward}

Bunbun squints at it.

"...I don't remember agreeing to this result."

Please do not ask me how this works.
I barely understand it myself.

Bunbun is now pretending this was intentional.`,
        () => {

            choices.innerHTML = `
                <button onclick="chapter7()">
                    Continue
                </button>
            `;
        });

    });

}

// =========================
// CHAPTER 7
// JAR OF TINY GOOD THINGS
// =========================

function chapter7(){

chapterTag.innerHTML =
"Chapter 7";

bunbunThought(
    "🫙 Tiny things are suspiciously powerful."
);

typeText(

`Sometimes a whole happy day feels difficult.

So let's aim smaller.

Welcome to the Jar of Tiny Good Things.`

);

choices.innerHTML = `
   <button onclick="openJar()">
   🫙 Open Jar
   </button>

    <button onclick="jarFrog()">
    🐸 Jar Frog
    </button>
   `;
}

function jarFrog(){

findFrog(
"Jar of Tiny Good Things"
);

typeText(
`You found a frog inside the jar.

It appears to have been living there comfortably.

How it got in there remains unknown.
The frog refuses to explain rent situation.

The frog refuses further comment.
Instead, it stares at you.

Judgmentally.`
);

choices.innerHTML = `

   <button onclick="openJar()">
    Proceed anyway
   </button>

   `;
}
    

function openJar(){

const notes = [
        "Your favourite snack exists somewhere in the world.",

    "Blankets are still real, still warm, still available.",

    "Someone, somewhere, is smiling because of you.",

    "The sky has been beautiful before—and will be again.",

    "Tomorrow hasn’t arrived yet. It’s still being written.",

    "You are allowed to rest. No permission needed.",
    "Cake still exists. This is scientifically reassuring.",

    "You have already survived your hardest unknown day.",

    "Small joys are waiting for you quietly.",

    "You are not behind. You are just arriving in your own time."
];

const note =
    notes[
    Math.floor(Math.random()*notes.length)
    ];

    typeText(

`You try to open the jar.

It refuses.

It simply vibrates slightly.

Bunbun stares at it.

"...this is personal now."

He taps it gently.

Nothing happens.

He taps it again.

Still nothing.

He pauses.

He very respectfully smashes the jar. 🫙💥

A tiny note falls out.`
    );

const btn = document.createElement("button");
btn.textContent = "📜 Read Note";
btn.onclick = () => readNote(note);

choices.innerHTML = "";
choices.appendChild(btn);

function readNote(note){

typeText(

`You unfold the tiny note.

It is soft. Slightly wrinkled. Like it survived something.

It says:

"${note}"

...

The jar has now accepted defeat.`
);

choices.innerHTML = `
   <button onclick="chapter8()">
   Continue
   </button>
   `;
}

function chapter8(){

chapterTag.innerHTML = "Chapter 8";

bunbunThought("📁 No. Don’t open that.");

typeText(

`You have discovered the Secret Files.

Bunbun is standing very still.

That is never a good sign.

"...don’t open it."

"...actually, no. I’m serious. Don’t open it."

"...why is it even here?"

Bunbun takes a step closer.

The air feels heavier.

"I am not emotionally prepared for what is inside that file."

"...and I definitely did NOT approve its placement here."

He pauses.

Slowly turns his head.

"...I am going to have a very serious conversation with the carpet after this."

"...no. Not a conversation. An argument."`

);

choices.innerHTML = `
   <button onclick="openSecretFile()">
   📁 Open it anyway
   </button>

   <button onclick="fileFrog()">
   🐸 Ask the frog
   </button>
`;

}


function fileFrog(){

findFrog("Secret Files");

typeText(

`You ask the frog if you should open the file.

The frog examines the Secret File carefully.

It does not blink.

This is unsettling.

After a long silence...
the frog shrugs.`

);

choices.innerHTML = `
   <button onclick="openSecretFile()">
  📁 Take that as permission
   </button>
`;

}


function openSecretFile(){

typeText(

`Bunbun suddenly appears in front of the file.

"Wait."

"No."

"No no no no."

He points at it like it personally offended him.

"...why is this still here?"

He pauses.

Looks at you.

"I know what you're going to do."

"You’re going to ignore me."

He sighs.

"...fine."

He steps aside very dramatically.

Like this is your fault.`

);

choices.innerHTML = "";

setTimeout(() => {
    revealLetter();
}, 1200);

}
function revealLetter(){

setFace("neutral");

typeText(

`You open the file.

Bunbun is not watching.

He is absolutely watching.

He just doesn’t want to admit it.

...

It says:

"Hey."

So you opened it.

I’m not even surprised.

Honestly, I think I would’ve been more concerned if you *didn’t* open it.

That would’ve been suspicious behaviour.

...

Anyway.

I’m not very good at writing serious letters.

So if this starts sounding weird, that’s normal.

It’s me trying my best.

Which is… already a problem.

...

This whole thing we’ve been doing?

The chaos.

The choices.

The frogs that keep showing up where they absolutely should not be.

Yeah.

That wasn’t accidental.

Okay, some of it was accidental.

A *concerning amount* of it was accidental.

But still. It became something.

...

I think I built all of this thinking it would just be fun.

And it was.

But somewhere in between all the wheels and jars and questionable decisions…

it turned into something else too.

Not big. Not dramatic. Just… something that exists now. Because you went through it.

...

And I guess that’s the part I didn’t plan for.

That you would actually be here. 
Reading this.

Not skipping it. Not closing it.
Just… here.

...

So yeah.

I’m not going to make this emotional.

That’s not really my style.

But I will say this properly.

Once.

...

I’m glad you came this far.

That’s it.
Just that.
Also… I guess I’m glad I got “appointed” for this task.

I’m never doing this again.

I only did it because… you’re special. Don’t make me regret saying that.

...

Okay.

Now please stop opening classified things.

I am running out of files.

— Bunbun 🐰`

);

choices.innerHTML = `
   <button onclick="chapter9()">
   Continue
   </button>
`;

}

// =========================
// CHAPTER 9
// BIG RED BUTTON
// =========================

function chapter9(){

chapterTag.innerHTML =
"Chapter 9";

bunbunThought(
    "🔴 Do not press it. (This will not go well)"
);

typeText(

` This is the Big Red Button.

Please do not press it.
It has been labeled very clearly.

In large letters.

With emotional emphasis.

Seriously.
"PLEASE DO NOT PRESS IT."

...

Bunbun is watching.
This is important.

Do not press it.`

);

choices.innerHTML = `
   <button onclick="pressButton()">
    🔴 PRESS THE BUTTON
   </button>
   `;
}

function pressButton(){

showAchievement("🏆 Self-Control? Never Heard Of It ");
createConfetti();

typeText(
`...

You pressed it.

Of course you did.

Bunbun is staring at you in silence.

This is worse than shouting.

"...why."

"I specifically said NOT to do that."

"I even used capital letters."

IT LITERALLY SAID NOT TO.

He pauses.

"I EVEN ASKED NICELY."

Takes a breath.

Unbelievable.

"... you know what?"

"No."

"No more buttons for you."`
);

choices.innerHTML = `
   <button onclick="chapter10()">
   Continue
   </button>
`;
}

// =========================
// FINAL CHAPTER
// =========================

function chapter10(){

chapterTag.innerHTML =
"Final Chapter";

bunbunThought(
    "🪄 The carpet is… landing? This is your fault, isn’t it."
);

createConfetti();

typeText(

`
I know you didn’t think this would turn into anything like this.

But then you pressed the red button.
And because of that… the carpet has finally landed. 
So I guess… this is where it ends.

And honestly…
I think that’s okay.

Somewhere along the way, things stopped being just buttons and choices.

The carpet showed up like it had something to say.
The investigation kept insisting on answers nobody asked for.
The gift boxes appeared even when they weren’t invited.
And the frogs… well, they were just there. As always.

Somehow, all of it happened anyway.

But before we go, there's just one last thing.

Birthdays can feel strange sometimes.

Some years they're loud and exciting. Some years they're quiet.

Some years arrive while you're busy thinking about a hundred other things.

Not because it has to be perfect.

Not because every birthday needs balloons, cake, and a grand celebration.

The people who care about you know it.

The people who remembered today know it.

The person who made this website definitely knows it.

And after spending this entire adventure with you...

I think Bun Bun knows it too.

So whether today was amazing...

Or messy...

Or ordinary...

Or somewhere in between...

I hope you found at least one thing that made you smile.

One thing that made the day feel a little lighter.

One tiny reminder that even on the busiest days, you deserve moments of happiness too.

So here's your final achievement:

🏆 Birthday Successfully Recovered

Congratulations.

You did it.

You completed the adventure.

The carpet can finally retire.

The frogs can return to their mysterious frog business.

And Bun Bun can finally take a nap.

So whether you celebrated a lot, a little, or accidentally got dragged into a magical carpet adventure...

I hope today reminded you that you're appreciated more than you know.

Happy Birthday, Shreya.

Thank you for coming on this very serious, extremely professional, and definitely not ridiculous adventure.

Now go enjoy the rest of your day.

Go eat some cake.

Or at least think about cake.

— BunBun 🐰`

);

choices.innerHTML = `
   <button onclick="location.reload()">
   🌙 Start Adventure Again
   </button>
   `;
}

function findFrog(location){

frogsCollected++;

showAchievement(
`🐸 Frog Found (${frogsCollected}/5)`
);

let frogComment = "";

if(frogsCollected === 1)
frogComment = "Interesting. A frog.";

if(frogsCollected === 2)
frogComment = "There appears to be a second frog.";

if(frogsCollected === 3)
frogComment = "This is becoming a pattern.";

if(frogsCollected === 4)
frogComment = "I am becoming concerned.";

if(frogsCollected === 5)
frogComment = "The Frog Council knows.";

bunbunThought(
`🐸 Frog discovered in ${location}. ${frogComment}`
);

if(frogsCollected >= 5){

unlockFrogCouncil();
}
}

function unlockFrogCouncil(){

if(frogUnlocked) return;

frogUnlocked = true;

showAchievement(
"🐸 Frog Royalty "
);

setTimeout(()=>{

choices.innerHTML += `

       <button onclick="frogCouncil()">
       🐸 Visit Frog Council
       </button>

       `;

},1000);
}

function frogCouncil(){

chapterTag.innerHTML =
"Secret Chapter";

    createConfetti();
      typeText(

`Bunbun is staring at the screen.

"...why is this happening again."

A group of frogs appears.

Not loudly.

Not dramatically.

Just… present.

They are holding something.

It looks like a message.

Bunbun leans closer.

"...I did NOT approve frog delivery services."

The frogs ignore him.

They begin the message anyway.`
    );

  setTimeout(() => {

        frogMessage();

    }, 1200);
}

function frogMessage(){

typeText(

`🐸 OFFICIAL FROG MESSAGE:

Ribbit.

We have arrived.

Ribbit ribbit.

We are watching your journey from a respectful distance.

(One frog is too close. Please ignore him.)

The Frog Council has been observing you.
---

Quietly.
Summary of observations:

From various locations.
• You walked. Ribbit.  
• You paused for dramatic effect. Ribbit ribbit.  
• You made questionable decisions (we support this).  
• One frog tried to press a button. We stopped him. Barely.  
• Another frog is currently eating the report.  

Mostly ponds.
Ribbit.

After careful consideration...
---

The council has reached a decision.
We are proud.
Not because everything made sense.
But because you did it anyway.
Ribbit ribbit.
This is important frog philosophy.
We learned it yesterday.

You are officially Frog Approved.
---

This is considered a great honor.
IMPORTANT ANNOUNCEMENTS:

Please do not let it go to your head.
Do not trust shiny objects.
Do not trust frogs who say “trust me”.
Do not trust Bunbun when he says “this is normal”.
He is lying.
Ribbit.

FINAL NOTE:

If confusion increases, remain calm.
Frogs are handling it.
(We are not handling it.)
Ribbit ribbit ribbit.

— The Frogs 🐸`
);

choices.innerHTML = `
    <button onclick="bunbunReact()">
    🐰 Ask Bunbun why frogs are like this
    </button>
    `;
}

function bunbunReact(){


    typeText(

`Bunbun is staring at the message.

"...what did I just read."

He scrolls back.

"...why is there ribbiting in official documents."

Pause.

Long pause.

"...who allowed this council to function unsupervised?"

He looks around like the frogs might still be listening.

They probably are.

"...I need a different job."`
    );

    choices.innerHTML = `
   <button onclick="returnFromCouncil()">
    🐰 Continue
   </button>

   `;
}


function returnFromCouncil(){

typeText(

`The council nods in agreement.
One frog immediately falls off the table.
This is considered a formal conclusion.

---

A tiny frog approaches you.
It hands you a sticker.
It is slightly damp.
No one explains why.

It simply says:
---

"Certified Cool Human."

The ink is questionable.
It may or may not still be moving.

---

The meeting has officially concluded.
A frog whispers something about snacks.
The council ignores him.

As usual.`
);

choices.innerHTML = `
   <button onclick="chapter10()">
   Continue Adventure
   </button>
   `;
}

choices.innerHTML = `
<button onclick="nextDialogue()">
Continue
</button>
`;
