/* ==========================================
   ELEMENTS
========================================== */

const screens = document.querySelectorAll(".screen");

const passwordScreen = document.getElementById("passwordScreen");
const welcomeScreen = document.getElementById("welcomeScreen");
const animalScreen = document.getElementById("animalScreen");
const birthdayScreen = document.getElementById("birthdayScreen");
const cakeScreen = document.getElementById("cakeScreen");
const finalScreen = document.getElementById("finalScreen");

const passwordInput = document.getElementById("passwordInput");
const passwordButton = document.getElementById("passwordButton");
const passwordError = document.getElementById("passwordError");

const welcomeButton = document.getElementById("welcomeButton");
const continueButton = document.getElementById("continueButton");
const cakeButton = document.getElementById("cakeButton");

/* ==========================================
   SETTINGS
========================================== */

const PASSWORD = "bhondu";

let completedAnimals = 0;

let bearDone = false;
let frogDone = false;
let bunnyDone = false;

/* ==========================================
   SCREEN FUNCTIONS
========================================== */

function showScreen(screen){

    screens.forEach(s=>{

        s.classList.remove("active");

    });

    screen.classList.add("active");

}

/* ==========================================
   PASSWORD
========================================== */

passwordButton.addEventListener("click",checkPassword);

passwordInput.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        checkPassword();

    }

});

function checkPassword(){

    if(passwordInput.value.trim().toLowerCase()===PASSWORD){

        passwordError.textContent="";

        showScreen(welcomeScreen);

    }

    else{

        passwordError.textContent="Wrong password ❤️";

        document
            .querySelector(".loginBox")
            .classList.add("shake");

        setTimeout(()=>{

            document
                .querySelector(".loginBox")
                .classList.remove("shake");

        },450);

    }

}

/* ==========================================
   WELCOME BUTTON
========================================== */

welcomeButton.addEventListener("click",()=>{

    showScreen(animalScreen);

});

/* ==========================================
   CONTINUE BUTTON
========================================== */

continueButton.addEventListener("click",()=>{

    showScreen(birthdayScreen);

});

/* ==========================================
   BIRTHDAY BUTTON
========================================== */

cakeButton.addEventListener("click",()=>{

    showScreen(cakeScreen);

});
/* ==========================================
   ANIMAL ELEMENTS
========================================== */

const bear = document.getElementById("bear");
const frog = document.getElementById("frog");
const bunny = document.getElementById("bunny");

const letterPopup = document.getElementById("letterPopup");
const videoPopup1 = document.getElementById("videoPopup1");
const videoPopup2 = document.getElementById("videoPopup2");

const closeLetter = document.getElementById("closeLetter");
const closeVideo1 = document.getElementById("closeVideo1");
const closeVideo2 = document.getElementById("closeVideo2");

/* ==========================================
   POPUP HELPERS
========================================== */

function openPopup(popup){

    popup.style.display = "flex";

}

function closePopup(popup){

    popup.style.display = "none";

}

/* ==========================================
   PROGRESS
========================================== */

function updateProgress(){

    completedAnimals = 0;

    if(bearDone) completedAnimals++;
    if(frogDone) completedAnimals++;
    if(bunnyDone) completedAnimals++;

    if(completedAnimals === 3){

        continueButton.classList.remove("hidden");

        continueButton.animate(
            [
                {transform:"scale(1)"},
                {transform:"scale(1.1)"},
                {transform:"scale(1)"}
            ],
            {
                duration:700
            }
        );

    }

}

/* ==========================================
   BEAR
========================================== */

bear.addEventListener("click",()=>{

    openPopup(letterPopup);

    bearDone = true;

    updateProgress();

});

/* ==========================================
   FROG
========================================== */

frog.addEventListener("click",()=>{

    openPopup(videoPopup1);

    frogDone = true;

    updateProgress();

});

/* ==========================================
   BUNNY
========================================== */

bunny.addEventListener("click",()=>{

    openPopup(videoPopup2);

    bunnyDone = true;

    updateProgress();

});

/* ==========================================
   CLOSE BUTTONS
========================================== */

closeLetter.addEventListener("click",()=>{

    closePopup(letterPopup);

});

closeVideo1.addEventListener("click",()=>{

    closePopup(videoPopup1);

});

closeVideo2.addEventListener("click",()=>{

    closePopup(videoPopup2);

});

/* ==========================================
   CLOSE IF CLICKING OUTSIDE
========================================== */

window.addEventListener("click",(e)=>{

    if(e.target===letterPopup){

        closePopup(letterPopup);

    }

    if(e.target===videoPopup1){

        closePopup(videoPopup1);

    }

    if(e.target===videoPopup2){

        closePopup(videoPopup2);

    }

});

/* ==========================================
   ESC KEY CLOSE
========================================== */

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closePopup(letterPopup);
        closePopup(videoPopup1);
        closePopup(videoPopup2);

    }

});
/* ==========================================
   CAKE ELEMENTS
========================================== */

const blowButton = document.getElementById("blowButton");
const cutButton = document.getElementById("cutButton");
const eatButton = document.getElementById("eatButton");

const flames = document.querySelectorAll(".flame");
const cakeSlice = document.getElementById("cakeSlice");

/* ==========================================
   CAKE STATES
========================================== */

let candlesBlown = false;
let cakeCut = false;
let cakeEaten = false;

/* ==========================================
   BLOW OUT CANDLES
========================================== */

blowButton.addEventListener("click", () => {

    if (candlesBlown) return;

    candlesBlown = true;

    flames.forEach(flame => {

        flame.style.transition = "0.5s";
        flame.style.opacity = "0";
        flame.style.transform =
            "translateX(-50%) scale(0)";

    });

    blowButton.classList.add("hidden");

    setTimeout(() => {

        cutButton.classList.remove("hidden");

    }, 600);

});

/* ==========================================
   CUT CAKE
========================================== */

cutButton.addEventListener("click", () => {

    if (cakeCut) return;

    cakeCut = true;

    cakeSlice.style.opacity = "1";

    cakeSlice.animate(

        [
            {
                transform:
                    "translate(0,0)"
            },
            {
                transform:
                    "translate(70px,-25px)"
            }

        ],

        {
            duration:900,
            fill:"forwards"
        }

    );

    cutButton.classList.add("hidden");

    setTimeout(() => {

        eatButton.classList.remove("hidden");

    },700);

});

/* ==========================================
   EAT CAKE
========================================== */

eatButton.addEventListener("click", () => {

    if (cakeEaten) return;

    cakeEaten = true;

    cakeSlice.animate(

        [
            {
                opacity:1,
                transform:
                    "translate(70px,-25px) scale(1)"
            },
            {
                opacity:0,
                transform:
                    "translate(150px,-180px) scale(.2)"
            }

        ],

        {
            duration:900,
            fill:"forwards"
        }

    );

    eatButton.classList.add("hidden");

    setTimeout(() => {

        launchConfetti();

        showScreen(finalScreen);

        typeWriter();

    },1000);

});
/* ==========================================
   FINAL MESSAGE
========================================== */

const finalMessage = `Happy Birthday!!!

I hope you liked this cause this 
took a looong time. We love you very much.

(it may not seem like it but I do. 
Im just a big throuble.)

I hope you loved everything 
and that you have the best year ever.

Happy 20th meri dead chipkali.

Love you to the moon and back.

Have the happiest birthday ever.

❤️`;

const typewriterElement =
document.getElementById("typewriterText");

/* ==========================================
   TYPEWRITER EFFECT
========================================== */

let typing = false;

function typeWriter(){

    if(typing) return;

    typing = true;

    typewriterElement.textContent="";

    let i = 0;

    const speed = 45;

    function type(){

        if(i < finalMessage.length){

            typewriterElement.textContent +=
                finalMessage.charAt(i);

            i++;

            setTimeout(type,speed);

        }

    }

    type();

}

/* ==========================================
   MUSIC
========================================== */

const music =
document.getElementById("backgroundMusic");

const musicButton =
document.getElementById("musicButton");

let musicPlaying = false;

musicButton.addEventListener("click",()=>{

    if(musicPlaying){

        music.pause();

        musicPlaying=false;

        musicButton.textContent="🎵";

    }

    else{

        music.play();

        musicPlaying=true;

        musicButton.textContent="🔇";

    }

});

/* ==========================================
   REPLAY
========================================== */

const replayButton =
document.getElementById("replayButton");

replayButton.addEventListener("click",()=>{

    location.reload();

});

/* ==========================================
   AUTO START MUSIC
========================================== */

document.body.addEventListener("click",()=>{

    if(!musicPlaying){

        music.play()
        .then(()=>{

            musicPlaying=true;

            musicButton.textContent="🔇";

        })
        .catch(()=>{});

    }

},{once:true});
/* ==========================================
   PETALS
========================================== */

const petalContainer =
document.getElementById("petalContainer");

function createPetal(){

    const petal = document.createElement("div");

    petal.className = "petal";

    petal.style.left = Math.random()*100 + "vw";

    petal.style.animationDuration =
        (6 + Math.random()*5) + "s";

    petal.style.opacity =
        0.4 + Math.random()*0.6;

    petalContainer.appendChild(petal);

    setTimeout(()=>{

        petal.remove();

    },11000);

}

setInterval(createPetal,500);

/* ==========================================
   HEARTS
========================================== */

const heartContainer =
document.getElementById("heartContainer");

const heartList=[
"💖",
"💕",
"💗",
"💓",
"❤️"
];

function createHeart(){

    const heart =
    document.createElement("div");

    heart.className="heart";

    heart.innerHTML=
    heartList[
        Math.floor(
            Math.random()*heartList.length
        )
    ];

    heart.style.left=
        Math.random()*100+"vw";

    heart.style.bottom="-40px";

    heart.style.animationDuration=
        (4+Math.random()*3)+"s";

    heartContainer.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },7000);

}

setInterval(createHeart,2500);

/* ==========================================
   CONFETTI
========================================== */

const confettiContainer =
document.getElementById("confettiContainer");

const confettiColors=[

"#ff5aa5",
"#ffb3d9",
"#ffe066",
"#8be9fd",
"#7ee787",
"#c084fc"

];

function launchConfetti(){

    for(let i=0;i<180;i++){

        const piece=
        document.createElement("div");

        piece.className="confetti";

        piece.style.left=
            Math.random()*100+"vw";

        piece.style.top="-20px";

        piece.style.background=
            confettiColors[
                Math.floor(
                    Math.random()*confettiColors.length
                )
            ];

        piece.style.animationDuration=
            (3+Math.random()*3)+"s";

        piece.style.transform=
            `rotate(${Math.random()*360}deg)`;

        confettiContainer.appendChild(piece);

        setTimeout(()=>{

            piece.remove();

        },6500);

    }

}

/* ==========================================
   SPARKLES
========================================== */

const sparkleLayer =
document.getElementById("sparkleLayer");

function createSparkle(){

    const sparkle=
    document.createElement("div");

    sparkle.className="sparkle";

    sparkle.style.left=
        Math.random()*100+"vw";

    sparkle.style.top=
        Math.random()*100+"vh";

    sparkleLayer.appendChild(sparkle);

    setTimeout(()=>{

        sparkle.remove();

    },2500);

}

setInterval(createSparkle,700);

/* ==========================================
   FLOATING MESSAGES
========================================== */

const messages=[

"Cutiee!",

"Happy Birthday!",


];

const messageContainer=
document.getElementById("messageContainer");

function floatingMessage(){

    const msg=
    document.createElement("div");

    msg.className=
        "floatingMessage";

    msg.textContent=
        messages[
            Math.floor(
                Math.random()*messages.length
            )
        ];

    msg.style.left=
        (10+Math.random()*75)+"vw";

    msg.style.top=
        (20+Math.random()*55)+"vh";

    messageContainer.appendChild(msg);

    setTimeout(()=>{

        msg.remove();

    },4000);

}

setInterval(floatingMessage,4500);

/* ==========================================
   FINISHED
========================================== */

console.log(
"🎂 Birthday Website Loaded Successfully!"
);