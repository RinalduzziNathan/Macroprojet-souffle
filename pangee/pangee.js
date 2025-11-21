//boutons

const menuBtn = document.getElementById("menuButton");
const showNext = document.getElementById('showNext');
const showNext2 = document.getElementById('showNext2');


//canvas
const canvasTimelapse = document.getElementById("canvasRive");
const riveCanvasMains = document.getElementById("riveCanvasMains");
const canvas = document.getElementById('monCanvas');
const ctx = canvas.getContext('2d');
const dpr = window.devicePixelRatio || 1;

// Définit la taille CSS du canvas si besoin
canvas.style.width = '1400px';
canvas.style.height = '800px';

// Définit la taille du canvas en pixels réels (multiplié par dpr)
canvas.width = 1400 * dpr;
canvas.height = 800 * dpr;

// Applique la mise à l’échelle
ctx.scale(dpr, dpr);

//textes
const resultMessage = document.getElementById('resultMessage');
const temps = document.getElementById('temps');
const titre = document.getElementById("titre")
const tempsValeur = document.getElementById('tempsValeur');

ctx.font = 'normal 200 30px "Bricolage Grotesque", sans-serif';
ctx.fillStyle = 'black';


//video
const videoElement = document.getElementById('video');

//boutons

menuBtn.style.visibility = "hidden"
showNext.style.visibility = "visible";
showNext2.style.visibility = "hidden";

//canvas
riveCanvasMains.style.visibility = "hidden";

//texte
resultMessage.style.visibility = "hidden";
temps.style.visibility = "hidden";
tempsValeur.style.visibility = "hidden";


let showNext2Clicked = false;
let showNext1Clicked = false;


let riveInstance = null;
let triggerBlink;

function createRiveInstance() {
    riveInstance = new rive.Rive({
        src: "https://rinalduzzinathan.github.io/file-stash/rive/demogeo_pangee.riv",
        canvas: canvasTimelapse,
        autoplay: true,
        stateMachines: "State Machine 1",
        layout: new rive.Layout({
            fit: rive.Fit.Contain,
            alignment: rive.Alignment.Center,
        }),
        onLoad: () => {
            const inputs = riveInstance.stateMachineInputs("State Machine 1");
            triggerBlink = inputs.find(i => i.name === "terre");
            resizeCanvasToViewport();
        },
    });
}
let yeux = null;

function createYeux() {
    yeux = new rive.Rive({
        src: "https://rinalduzzinathan.github.io/file-stash/rive/pangee_yeux2.riv",
        canvas: document.getElementById("riveCanvasMains"),
        autoplay: true,
        stateMachines: "State Machine 1",
        layout: new rive.Layout({
            fit: rive.Fit.Contain,
            alignment: rive.Alignment.Center,
        }),
        onLoad: () => {
           resizeCanvasToViewport();
        },
    });
}

function rechargePage() {
    location.reload();
}


function resizeCanvasToViewport() {
    canvasTimelapse.width = window.innerWidth;
    canvasTimelapse.height = window.innerHeight;
    if (riveInstance) {
        riveInstance.resizeDrawingSurfaceToCanvas();
    }
    riveCanvasMains.width = window.innerWidth;
    riveCanvasMains.height = window.innerHeight;
    if (yeux) {
        yeux.resizeDrawingSurfaceToCanvas();
    }
}


window.addEventListener("resize", resizeCanvasToViewport);



showNext.addEventListener('click', () => {
    createYeux();
    showNext1Clicked = true;
    showNext2Clicked = false;
    titre.style.visibility = "hidden";
    riveCanvasMains.style.visibility = "visible";
    showNext.style.visibility = "hidden"
    showNext2.style.visibility = "visible"
})
menuBtn.addEventListener("click", () => {
    window.location.href = "../hub/hub.html";
});

showNext2.addEventListener('click', () => {
    document.body.style.backgroundColor = "#fcff32ff"

    createRiveInstance();
    showNext1Clicked = false;
    menuBtn.style.visibility = "visible";
    showNext2Clicked = true;
    titre.style.visibility = "hidden";
    riveCanvasMains.style.visibility = "hidden";
    showNext.style.visibility = "hidden"
    showNext2.style.visibility = "hidden"

    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Efface tout le canvas



})


let blinkThreshold = 0.0035;
let previousEyeOpen = 1;

let currentImageIndex = 0;
let startYear = 250;




async function detectBlink() {
    const faceMesh = new FaceMesh({ locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}` });
    faceMesh.setOptions({ maxNumFaces: 1, refineLandmarks: true, minDetectionConfidence: 0.5, minTrackingConfidence: 0.5 });

    faceMesh.onResults((results) => {
        if (results.multiFaceLandmarks.length > 0) {
            const landmarks = results.multiFaceLandmarks[0];
            const eyeTop = landmarks[159];
            const eyeBottom = landmarks[145];
            const eyeOpen = Math.abs(eyeTop.y - eyeBottom.y);

            if (eyeOpen < blinkThreshold && previousEyeOpen >= blinkThreshold) {
                if (showNext2Clicked) {
                    if (currentImageIndex < 27) {
                        setTimeout(() => {
                            currentImageIndex++;
                            if (riveInstance) triggerBlink.fire();
                            //changeImageCrossfade(imageSequence[currentImageIndex]);
                        }, 300);}
                 }else if (showNext1Clicked) {
                        const text = 'Clignement détecté';
                        const textWidth = ctx.measureText(text).width;
                        const textHeight = 30; // taille font

                        // Taille visible CSS du canvas (doit correspondre au style)
                        const cssWidth = 1400;
                        const cssHeight = 800;

                        const x = Math.random() * (cssWidth - textWidth);
                        const y = Math.random() * (cssHeight - textHeight) + textHeight;

                        ctx.fillText(text, x, y);
                    }
                }


                previousEyeOpen = eyeOpen;
            }
        });

    const camera = new Camera(videoElement, {
        onFrame: async () => {
            await faceMesh.send({ image: videoElement });
        },
        width: 640,
        height: 480
    });
    camera.start();
}

detectBlink();
