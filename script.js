const UI = {
    dialogue: document.getElementById("dialogue"),
    choices: document.getElementById("choices"),
    floating: document.getElementById("floatingMessage"),
    chapter: document.querySelector(".chapter-tag"),
    face: document.getElementById("bunFace"),
    music: document.getElementById("bgMusic"),
    achievement: document.getElementById("achievement"),
    confetti: document.getElementById("confettiContainer"),
    startScreen: document.getElementById("startScreen")
};

const state = {
    typing: false,
    introIndex: 0,
    chapter: 0,
    frogs: 0,
    frogUnlocked: false,
    musicStarted: false
};

function typeText(text, callback) {

    if (state.typing) return;
    state.typing = true;

    UI.dialogue.innerHTML = "";

    let i = 0;

    const interval = setInterval(() => {

        UI.dialogue.innerHTML +=
            text[i] === "\n" ? "<br>" : text[i];

        i++;

        if (i >= text.length) {
            clearInterval(interval);
            state.typing = false;
            callback?.();
        }

    }, 22);
}

function setFace(face) {
    UI.face.textContent = face;
}

function bunbunThought(text) {
    UI.floating.innerHTML = text;
}

function showAchievement(text) {
    UI.achievement.innerHTML = text;
    UI.achievement.classList.add("show");

    setTimeout(() => {
        UI.achievement.classList.remove("show");
    }, 2500);
}

function createConfetti() {

    for (let i = 0; i < 30; i++) {

        const c = document.createElement("div");
        c.className = "confetti";

        c.style.left = Math.random() * 100 + "vw";
        c.style.top = "-20px";

        c.style.background =
            ["#ffd7ef","#ffe8a3","#d6c4ff","#ffb7b7"][Math.floor(Math.random()*4)];

        UI.confetti.appendChild(c);

        setTimeout(() => c.remove(), 3000);
    }
}

function startGame() {

    UI.startScreen.style.display = "none";

    state.introIndex = 0;
    UI.chapter.innerHTML = "Prologue";

    runIntro();
}

function runIntro() {

    const line = intro[state.introIndex];

    setFace(line.face);
    typeText(line.text);

    state.introIndex++;

    UI.choices.innerHTML = `
        <button onclick="nextIntro()">✨ Continue</button>
    `;
}

function nextIntro() {

    if (state.typing) return;

    if (state.introIndex < intro.length) {
        runIntro();
    } else {
        UI.choices.innerHTML = `
            <button onclick="startAdventure()">🚀 Start Adventure</button>
        `;
    }
}

function startAdventure() {

    if (!state.musicStarted) {
        UI.music.volume = 0.2;
        UI.music.play().catch(() => {});
        state.musicStarted = true;
    }

    showAchievement("🏆 Passenger Princess");
    bunbunThought("🪄 The carpet is waking up...");

    typeText("The adventure begins now.", () => {
        go(1);
    });
}

function go(n) {
    state.chapter = n;
    chapters[n]();
}

const chapters = {

1() {
    UI.chapter.innerHTML = "Chapter 1";
    setFace("˵•̀ ᴗ •́ ˵");

    bunbunThought("🪄 Carpet is inspecting you...");

    typeText("What is your current mood?", () => {

        UI.choices.innerHTML = `
            <button onclick="go(2)">Continue Investigation</button>
        `;
    });
},

2() {
    UI.chapter.innerHTML = "Chapter 2";
    setFace("╭ರ_•́");

    bunbunThought("🕵️ Something is missing...");

    typeText("The birthday appears to be missing.", () => {

        UI.choices.innerHTML = `
            <button onclick="go(3)">Search Clues</button>
        `;
    });
},

3() {
    UI.chapter.innerHTML = "Chapter 3";
    setFace("•̀ - •");

    typeText("Suspicious gift boxes detected.", () => {

        UI.choices.innerHTML = `
            <button onclick="go(4)">Open Box</button>
        `;
    });
},

4() {
    UI.chapter.innerHTML = "Chapter 4";
    setFace("◉_◉");

    bunbunThought("🎂 baking questionable cake...");

    typeText("Time to bake something dangerous.", () => {

        UI.choices.innerHTML = `
            <button onclick="go(5)">Continue</button>
        `;
    });
}

};

function findFrog(location) {

    state.frogs++;

    showAchievement(`🐸 Frog Found (${state.frogs}/5)`);

    const comments = [
        "Interesting frog.",
        "Second frog detected.",
        "Pattern forming.",
        "Concern rising.",
        "Frog Council aware."
    ];

    bunbunThought(
        `🐸 Found in ${location}. ${comments[state.frogs - 1] || "Too many frogs."}`
    );

    if (state.frogs >= 5 && !state.frogUnlocked) {
        unlockFrogCouncil();
    }
}

function unlockFrogCouncil() {

    state.frogUnlocked = true;

    setTimeout(() => {

        UI.choices.innerHTML += `
            <button onclick="frogCouncil()">🐸 Frog Council</button>
        `;
    }, 800);
}

