


const canvasTimelapse = document.getElementById("canvasRive");
let riveInstance = null;
let triggerBlink;

function createRiveInstance() {
    riveInstance = new rive.Rive({
        src: "https://rinalduzzinathan.github.io/file-stash/rive/d%C3%A9mog%C3%A9o_pangee.riv",
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
            riveEventCheck(riveInstance); // ✅ déplacer ici
        },
    });
}

function rechargePage() {
    location.reload();
}


function resizeCanvasToViewport() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (riveInstance) {
        riveInstance.resizeDrawingSurfaceToCanvas();
    }
}

window.addEventListener("resize", resizeCanvasToViewport);

let menuBtn = document.getElementById("menuButton");
menuBtn.style.visibility = "hidden"
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

// Définit la police et couleur (une fois)
ctx.font = 'normal 200 30px "Bricolage Grotesque", sans-serif';
ctx.fillStyle = 'black';

const riveCanvasEvenement = document.getElementById("riveCanvasEvenement")
riveCanvasEvenement.style.visibility = "hidden";

const titre = document.getElementById("titre")
const videoElement = document.getElementById('video');
const resultMessage = document.getElementById('resultMessage');
resultMessage.style.visibility = "hidden";
const temps = document.getElementById('temps');
temps.style.visibility = "hidden";
const tempsValeur = document.getElementById('tempsValeur');
tempsValeur.style.visibility = "hidden";

const showNext = document.getElementById('showNext');
showNext.style.visibility = "visible";
const showNext2 = document.getElementById('showNext2');
showNext2.style.visibility = "hidden";
const riveCanvasMains = document.getElementById("riveCanvasMains");
riveCanvasMains.style.visibility = "hidden";
const riveCanvasPangee = document.getElementById("riveCanvasPangee");
riveCanvasPangee.style.visibility = "hidden";
const riveCanvasDino = document.getElementById("riveCanvasDino");
riveCanvasDino.style.visibility = "hidden";
const riveCanvasMontagne = document.getElementById("riveCanvasMontagne");
riveCanvasMontagne.style.visibility = "hidden";
const riveCanvasOcean = document.getElementById("riveCanvasOcean");
riveCanvasOcean.style.visibility = "hidden";
const riveCanvasVolcan = document.getElementById("riveCanvasVolcan");
riveCanvasVolcan.style.visibility = "hidden";

const evenementPangée = document.getElementById("evenementPangée");
evenementPangée.style.visibility = "hidden";
const evenementDino = document.getElementById("evenementDino");
evenementDino.style.visibility = "hidden";
const evenementOcean = document.getElementById("evenementOcean");
evenementOcean.style.visibility = "hidden";
const evenementFinDino = document.getElementById("evenementFinDino");
evenementFinDino.style.visibility = "hidden";
const evenementMontagnes = document.getElementById("evenementMontagnes");
evenementMontagnes.style.visibility = "hidden";


let showNext2Clicked = false;
let showNext1Clicked = false;

let toFermes;

const r = new rive.Rive({
    src: "https://rinalduzzinathan.github.io/file-stash/rive/yeuxfermes1.riv",
    canvas: document.getElementById("riveCanvasPangee"),
    autoplay: true,
    stateMachines: "State Machine 1",
    onLoad: () => {
        const inputs = r.stateMachineInputs("State Machine 1");
        toFermes = inputs.find(i => i.name === "toFermes");

        r.resizeDrawingSurfaceToCanvas();
    }


});

let baseToCC;

const rMontagne = new rive.Rive({
    src: "https://rinalduzzinathan.github.io/file-stash/rive/tectonique_convergence.riv",
    canvas: document.getElementById("riveCanvasMontagne"),
    autoplay: true,
    stateMachines: "State Machine 1",
    onLoad: () => {
        const inputs = rMontagne.stateMachineInputs("State Machine 1");
        baseToCC = inputs.find(i => i.name === "baseToCC");

        rMontagne.resizeDrawingSurfaceToCanvas();
    }


});

rMontagne.pause();

rMontagne.on(rive.EventType.RiveEvent, (event) => {
    const data = event.data;
    if (data.type === rive.RiveEventType.General) {
        riveCanvasMontagne.style.visibility = "hidden";

    }
});


let DIVbaseToCC;

const rOcean = new rive.Rive({
    src: "https://rinalduzzinathan.github.io/file-stash/rive/tectonique_divergence.riv",
    canvas: document.getElementById("riveCanvasOcean"),
    autoplay: true,
    stateMachines: "State Machine 1",
    onLoad: () => {
        const inputs = rOcean.stateMachineInputs("State Machine 1");
        DIVbaseToCC = inputs.find(i => i.name === "DIVbaseToCC");

        rOcean.resizeDrawingSurfaceToCanvas();
    }


});

rOcean.pause();


rOcean.on(rive.EventType.RiveEvent, (event) => {
    const data = event.data;
    if (data.type === rive.RiveEventType.General) {
        riveCanvasOcean.style.visibility = "hidden";

    }
});


let toMorts, toDino;


const rDino = new rive.Rive({
    src: "https://rinalduzzinathan.github.io/file-stash/rive/dinosaures.riv",
    canvas: document.getElementById("riveCanvasDino"),
    autoplay: true,
    stateMachines: "State Machine 1",
    onLoad: () => {
        const inputs = rDino.stateMachineInputs("State Machine 1");
        toMorts = inputs.find(i => i.name === "toMorts");
        toDino = inputs.find(i => i.name === "toDino");

        rDino.resizeDrawingSurfaceToCanvas();
    }


});

rDino.pause();


let toDinosaure, toWater, toDinoEnd, toMontagne, toFin;


const rEvenement = new rive.Rive({
    src: "https://rinalduzzinathan.github.io/file-stash/rive/evenementpangee.riv",
    canvas: document.getElementById("riveCanvasEvenement"),
    autoplay: true,
    stateMachines: "State Machine 1",
    onLoad: () => {
        const inputs = rEvenement.stateMachineInputs("State Machine 1");
        toDinosaure = inputs.find(i => i.name === "toDinosaure");
        toWater = inputs.find(i => i.name === "toWater");
        toDinoEnd = inputs.find(i => i.name === "toDinoEnd");
        toMontagne = inputs.find(i => i.name === "toMontagne");
        toFin = inputs.find(i => i.name === "toFin");

        rEvenement.resizeDrawingSurfaceToCanvas();
    }


});


let toYeux;

const rYeux = new rive.Rive({
    src: "https://rinalduzzinathan.github.io/file-stash/rive/pangeeyeux.riv",
    canvas: document.getElementById("riveCanvasMains"),
    autoplay: true,
    stateMachines: "State Machine 1",
    onLoad: () => {
        const inputs = rYeux.stateMachineInputs("State Machine 1");
        toYeux = inputs.find(i => i.name === "toYeux");
        rYeux.resizeDrawingSurfaceToCanvas();
    }


});

showNext.addEventListener('click', () => {
    showNext1Clicked = true;
    showNext2Clicked = false;
    titre.style.visibility = "hidden";
    riveCanvasMains.style.visibility = "visible";
    if (toYeux) toYeux.fire();
    showNext.style.visibility = "hidden"
    showNext2.style.visibility = "visible"
})
menuBtn.addEventListener("click", () => {
    window.location.href = "../hub/hub.html";
});

showNext2.addEventListener('click', () => {

    createRiveInstance();
    showNext1Clicked = false;
    menuBtn.style.visibility = "visible";
    showNext2Clicked = true;
    titre.style.visibility = "hidden";
    riveCanvasMains.style.visibility = "hidden";
    showNext.style.visibility = "hidden"
    showNext2.style.visibility = "hidden"

    tempsValeur.style.visibility = "visible";
    temps.style.visibility = "visible";
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Efface tout le canvas
    evenementPangée.style.visibility = "visible";



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

                            if (tempsValeur.textContent == "250") {
                                // riveCanvasDino.style.visibility = "visible";
                                //rDino.play();
                                // if (toDino) toDino.fire();
                                riveCanvasEvenement.style.visibility = "visible";
                                evenementPangée.style.visibility = "hidden";
                                evenementDino.style.visibility = "visible";
                                if (toDinosaure) toDinosaure.fire();
                            }
                            if (tempsValeur.textContent == "240") {

                                evenementDino.style.visibility = "hidden";

                            }


                            if (tempsValeur.textContent == "50") {
                                evenementMontagnes.style.visibility = "visible";

                                riveCanvasMontagne.style.visibility = "visible";
                                rMontagne.play();
                                if (baseToCC) baseToCC.fire();
                                if (toMontagne) toMontagne.fire();

                                const pastille2 = document.createElement('div');
                                pastille2.classList.add('pastille-rebond2'); // on applique une classe CSS animée

                                document.body.appendChild(pastille2);

                                // La pastille disparaît après 3 secondes
                                setTimeout(() => {
                                    pastille2.remove();
                                }, 3000);


                                const pastille3 = document.createElement('div');
                                pastille3.classList.add('pastille-rebond3'); // on applique une classe CSS animée

                                document.body.appendChild(pastille3);

                                // La pastille disparaît après 3 secondes
                                setTimeout(() => {
                                    pastille3.remove();
                                }, 3000);

                            }

                            if (tempsValeur.textContent == "40") {
                                evenementMontagnes.style.visibility = "hidden";
                            }

                            if (tempsValeur.textContent == "190") {
                                riveCanvasOcean.style.visibility = "visible";
                                evenementOcean.style.visibility = "visible";
                                rOcean.play();
                                if (DIVbaseToCC) DIVbaseToCC.fire();
                                if (toWater) toWater.fire();

                                const pastille = document.createElement('div');
                                pastille.classList.add('pastille-rebond'); // on applique une classe CSS animée

                                document.body.appendChild(pastille);

                                // La pastille disparaît après 3 secondes
                                setTimeout(() => {
                                    pastille.remove();
                                }, 3000);
                            }

                            if (tempsValeur.textContent == "180") {
                                evenementOcean.style.visibility = "hidden";
                            }

                            if (tempsValeur.textContent == "80") {
                                //riveCanvasDino.style.visibility = "visible";
                                //if (toMorts) toMorts.fire();
                                evenementFinDino.style.visibility = "visible";

                                if (toDinoEnd) toDinoEnd.fire();
                            }

                            if (tempsValeur.textContent == "70") {
                                //riveCanvasDino.style.visibility = "visible";
                                //if (toMorts) toMorts.fire();
                                evenementFinDino.style.visibility = "hidden";
                            }

                            if (currentImageIndex === 25) {
                                tempsValeur.textContent = startYear - (currentImageIndex - 1) * 10 - 5;

                            } else {
                                tempsValeur.textContent = startYear - currentImageIndex * 10;
                            }

                        }, 300);
                    }
                } else if (showNext1Clicked) {
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
