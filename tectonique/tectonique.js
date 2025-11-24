
//boutons
let menuBtn = document.getElementById("menuButton");
const startBouton = document.getElementById("startBouton");
const showAnimationButton = document.getElementById('showAnimationButton');
const showNext = document.getElementById('showNext');
const showNext2 = document.getElementById('showNext2');
const boutonRestart = document.getElementById("boutonRestart")


//canvas
const handCanvas = document.getElementById("handCanvas");
const riveCanvasTecto = document.getElementById("riveCanvasTecto");
const riveCanvasTectoFleches = document.getElementById("riveCanvasTectoFleches");
const riveCanvasDiverge = document.getElementById("riveCanvasDiverge");
const riveCanvasConverge = document.getElementById("riveCanvasConverge");
const riveCanvas = document.getElementById("riveCanvas");
const canvas = document.getElementById("output_canvas");
const popupCanvas1 = document.getElementById("popupCanvas1");
const popupCanvas2 = document.getElementById("popupCanvas2");


//textes
const titre = document.getElementById("titre")
const annonce1 = document.getElementById("annonce1");
const annonce2 = document.getElementById("annonce2");
const annonce3 = document.getElementById("annonce3");
const annonce4 = document.getElementById("annonce4");

const texteMains = document.getElementById("texteMains");
const texteConvOO = document.getElementById("texteConvOO");
const texteConvTT = document.getElementById("texteConvTT");
const texteConvTO = document.getElementById("texteConvTO");
const texteDivOO = document.getElementById("texteDivOO");
const texteDivTT = document.getElementById("texteDivTT");
const texteDivTO = document.getElementById("texteDivTO");

const timerDisplay = document.getElementById("timerDisplay");

const textLithoConti = document.getElementById('textLithoConti')
const textLithoOce = document.getElementById('textLithoOce')
const textAstheno = document.getElementById('textAstheno')
const textVolcanEff = document.getElementById('textVolcanEff')
const textVolcanExp = document.getElementById('textVolcanExp')


//images
const contidroite = document.getElementById('contidroite');
const contigauche = document.getElementById('contigauche');
const oceandroite = document.getElementById('oceandroite');
const oceangauche = document.getElementById('oceangauche');
const bigcontidroite = document.getElementById('bigcontidroite');
const bigcontigauche = document.getElementById('bigcontigauche');
const bigoceandroite = document.getElementById('bigoceandroite');
const bigoceangauche = document.getElementById('bigoceangauche');
//autre
const ctx = canvas.getContext("2d");

//objets dessines
const tectoRectangle = document.getElementById('tectoRectangle');

const legendeLithoConti = document.getElementById('legendeLithoConti')
const legendeLithoOce = document.getElementById('legendeLithoOce')
const legendeAstheno = document.getElementById('legendeAstheno')
const legendeVolcan = document.getElementById('legendeVolcan')

//video
const video = document.getElementById("video");




//boutons
menuBtn.style.visibility = "hidden"
showNext.style.visibility = "visible"
showNext2.style.visibility = "hidden"
showAnimationButton.style.visibility = "hidden"

//textes
texteMains.style.visibility = "hidden";
texteConvOO.style.visibility = "hidden";
texteConvTT.style.visibility = "hidden";
texteConvTO.style.visibility = "hidden";
texteDivOO.style.visibility = "hidden";
texteDivTT.style.visibility = "hidden";
texteDivTO.style.visibility = "hidden";
annonce1.style.visibility = "hidden";
annonce2.style.visibility = "hidden";
annonce3.style.visibility = "hidden";
annonce4.style.visibility = "hidden";
textLithoConti.style.visibility = "hidden";
textLithoOce.style.visibility = "hidden";
textAstheno.style.visibility = "hidden";
textVolcanEff.style.visibility = "hidden";
textVolcanExp.style.visibility = "hidden";

//autre

//canvas
riveCanvasTecto.style.visibility = "hidden";
riveCanvasTectoFleches.style.visibility = "hidden";
canvas.style.visibility = "hidden"
riveCanvas.style.visibility = "hidden";
riveCanvasConverge.style.visibility = "hidden";
riveCanvasDiverge.style.visibility = "hidden";
popupCanvas1.style.visibility = "hidden";
popupCanvas2.style.visibility = "hidden";

//images
contidroite.style.visibility = "hidden";
contigauche.style.visibility = "hidden";
oceandroite.style.visibility = "hidden";
oceangauche.style.visibility = "hidden";

//objets dessinés
tectoRectangle.style.visibility = "hidden";

legendeLithoConti.style.visibility = "hidden";
legendeLithoOce.style.visibility = "hidden";
legendeAstheno.style.visibility = "hidden";
legendeVolcan.style.visibility = "hidden";



let showNextClicked = false;
let previousDistance = null;
let TimerStarted = false;
let TimerOver = false;
let TimerIsRunning = false;
let DistanceIsCalculated = false;
let detectionActive = false;
var showNext2Clicked = false;
let distances = [];
let rightHandStates = []; // "open" or "fist"
let leftHandStates = [];
rightHandStates = [];
leftHandStates = [];
distances = [];
DistanceIsCalculated = false;

let popup1 = null;

function createpopup1() {
    popup1 = new rive.Rive({
        src: "https://rinalduzzinathan.github.io/file-stash/rive/popup_tecto_1.riv",
        canvas: document.getElementById("popupCanvas1"),
        autoplay: true,
        stateMachines: "State Machine 1",
        layout: new rive.Layout({
            fit: rive.Fit.Contain,
            alignment: rive.Alignment.Center,
        }),
        onLoad: () => {
            popup1.resizeDrawingSurfaceToCanvas();
            riveEventCheck(popup1);
        },
    });

}

let popup2 = null;

function createpopup2() {
    popup2 = new rive.Rive({
        src: "https://rinalduzzinathan.github.io/file-stash/rive/popup_tecto_2.riv",
        canvas: document.getElementById("popupCanvas2"),
        autoplay: true,
        stateMachines: "State Machine 1",
        layout: new rive.Layout({
            fit: rive.Fit.Contain,
            alignment: rive.Alignment.Center,
        }),
        onLoad: () => {
            popup2.resizeDrawingSurfaceToCanvas();
            riveEventCheck(popup2);
        },
    });

}



function resizeCanvasToViewport() {
    popupCanvas1.width = window.innerWidth;
    popupCanvas1.height = window.innerHeight;
    if (popup1) {
        popup1.resizeDrawingSurfaceToCanvas();
    }
    popupCanvas2.width = window.innerWidth;
    popupCanvas2.height = window.innerHeight;
    if (popup2) {
        popup2.resizeDrawingSurfaceToCanvas();
    }
}


function riveEventCheck(riveInstance) {
    if (riveInstance) {
        riveInstance.on(rive.EventType.RiveEvent, onRiveEventReceived);
        function onRiveEventReceived(riveEvent) {
            const eventData = riveEvent.data;
            console.log("Event data:", eventData);
            if (eventData.name == "closeA") {
                popupCanvas1.style.visibility = "hidden";
                riveCanvasTecto.style.visibility = "hidden";
            }

            if (eventData.name == "closeB") {
                popupCanvas2.style.visibility = "hidden";
            }

        }
    }
}

 window.addEventListener("resize", resizeCanvasToViewport);


let rConverge = new rive.Rive({
    src: "https://rinalduzzinathan.github.io/file-stash/rive/tectonique_convergence.riv",
    canvas: document.getElementById("riveCanvasConverge"),
    autoplay: true,
    stateMachines: "State Machine 1",
    onLoad: () => {
        const inputs = rConverge.stateMachineInputs("State Machine 1");
        baseToCC = inputs.find(i => i.name === "baseToCC");
        baseToCO = inputs.find(i => i.name === "baseToCO");
        baseToOO = inputs.find(i => i.name === "baseToOO");
        baseToOC = inputs.find(i => i.name === "baseToOC");

        rConverge.resizeDrawingSurfaceToCanvas();
    }
});

// Load divergence Rive
let rDiverge = new rive.Rive({
    src: "https://rinalduzzinathan.github.io/file-stash/rive/tectonique_divergence.riv",
    canvas: document.getElementById("riveCanvasDiverge"),
    autoplay: true,
    stateMachines: "State Machine 1",
    onLoad: () => {
        const inputs = rDiverge.stateMachineInputs("State Machine 1");
        DIVbaseToCC = inputs.find(i => i.name === "DIVbaseToCC");
        DIVbaseToCO = inputs.find(i => i.name === "DIVbaseToCO");
        DIVbaseToOO = inputs.find(i => i.name === "DIVbaseToOO");
        DIVbaseToOC = inputs.find(i => i.name === "DIVbaseToOC");

        rDiverge.resizeDrawingSurfaceToCanvas();
    }
});

rConverge.on(rive.EventType.RiveEvent, (event) => {
    const data = event.data;
    if (data.type === rive.RiveEventType.General) {
        boutonRestart.style.visibility = "visible";
        texteConvOO.style.visibility = "hidden";
        texteConvTT.style.visibility = "hidden";
        texteConvTO.style.visibility = "hidden";
        texteDivOO.style.visibility = "hidden";
        texteDivTT.style.visibility = "hidden";
        texteDivTO.style.visibility = "hidden";
        textVolcanEff.style.visibility = "hidden";
        textVolcanExp.style.visibility = "hidden";
        legendeVolcan.style.visibility = "hidden";


    }
});

rDiverge.on(rive.EventType.RiveEvent, (event) => {
    const data = event.data;
    if (data.type === rive.RiveEventType.General) {
        boutonRestart.style.visibility = "visible";
        texteConvOO.style.visibility = "hidden";
        texteConvTT.style.visibility = "hidden";
        texteConvTO.style.visibility = "hidden";

        texteDivOO.style.visibility = "hidden";
        texteDivTT.style.visibility = "hidden";
        texteDivTO.style.visibility = "hidden";

        textVolcanEff.style.visibility = "hidden";
        textVolcanExp.style.visibility = "hidden";
        legendeVolcan.style.visibility = "hidden";

    }
});

function cleanRiveAnimation() {
    if (rDiverge && rConverge) {


        riveCanvasDiverge.style.visibility = "hidden";
        riveCanvasConverge.style.visibility = "hidden";
        console.log("Cleaning up Rive instances");
        // Détruit l'ancienne instance
        rDiverge.cleanup();
        rConverge.cleanup();

        rConverge = new rive.Rive({
            src: "https://rinalduzzinathan.github.io/file-stash/rive/tectonique_convergence.riv",
            canvas: document.getElementById("riveCanvasConverge"),
            autoplay: true,
            stateMachines: "State Machine 1",
            onLoad: () => {
                const inputs = rConverge.stateMachineInputs("State Machine 1");
                baseToCC = inputs.find(i => i.name === "baseToCC");
                baseToCO = inputs.find(i => i.name === "baseToCO");
                baseToOO = inputs.find(i => i.name === "baseToOO");
                baseToOC = inputs.find(i => i.name === "baseToOC");


            }

        });
        rDiverge = new rive.Rive({
            src: "https://rinalduzzinathan.github.io/file-stash/rive/tectonique_divergence.riv",
            canvas: document.getElementById("riveCanvasDiverge"),
            autoplay: true,
            stateMachines: "State Machine 1",
            onLoad: () => {
                const inputs = rDiverge.stateMachineInputs("State Machine 1");
                DIVbaseToCC = inputs.find(i => i.name === "DIVbaseToCC");
                DIVbaseToCO = inputs.find(i => i.name === "DIVbaseToCO");
                DIVbaseToOO = inputs.find(i => i.name === "DIVbaseToOO");
                DIVbaseToOC = inputs.find(i => i.name === "DIVbaseToOC");



            }
        });
        rConverge.on(rive.EventType.RiveEvent, (event) => {
            const data = event.data;
            if (data.type === rive.RiveEventType.General) {
                boutonRestart.style.visibility = "visible";
                texteConvOO.style.visibility = "hidden";
                texteConvTT.style.visibility = "hidden";
                texteConvTO.style.visibility = "hidden";

                texteDivOO.style.visibility = "hidden";
                texteDivTT.style.visibility = "hidden";
                texteDivTO.style.visibility = "hidden";

            }
        });

        rDiverge.on(rive.EventType.RiveEvent, (event) => {
            const data = event.data;
            if (data.type === rive.RiveEventType.General) {
                boutonRestart.style.visibility = "visible";
                texteConvOO.style.visibility = "hidden";
                texteConvTT.style.visibility = "hidden";
                texteConvTO.style.visibility = "hidden";

                texteDivOO.style.visibility = "hidden";
                texteDivTT.style.visibility = "hidden";
                texteDivTO.style.visibility = "hidden";

            }
        });


    }

}


let poingsMains;

const rMains = new rive.Rive({
    src: "https://rinalduzzinathan.github.io/file-stash/rive/schema_tecto_1.riv",
    canvas: document.getElementById("riveCanvasTecto"),
    autoplay: true,
    stateMachines: "State Machine 1",
    onLoad: () => {
        const inputs = rMains.stateMachineInputs("State Machine 1");
        rMains.resizeDrawingSurfaceToCanvas();
    }


});

let toFleches;

const rFleches = new rive.Rive({
    src: "https://rinalduzzinathan.github.io/file-stash/rive/schema_tecto_2.riv",
    canvas: document.getElementById("riveCanvasTectoFleches"),
    autoplay: true,
    stateMachines: "State Machine 1",
    onLoad: () => {
        const inputs = rFleches.stateMachineInputs("State Machine 1");
        rFleches.resizeDrawingSurfaceToCanvas();
    }


});


async function startGestureRecognition() {

    // Get both canvases
    //const canvasConverge = document.getElementById("riveCanvasConverge");

    // const canvasDiverge = document.getElementById("riveCanvasDiverge");

    // Load convergence Rive


    // Set canvas size to match video size exactly
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    video.addEventListener("loadedmetadata", () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
    });

    boutonRestart.style.visibility = "hidden";


    await tf.setBackend("webgl");

    showNext.addEventListener('click', () => {
        createpopup1();
        showNext.style.visibility = "hidden";
        popupCanvas1.style.visibility = "visible";
        riveCanvasTecto.style.visibility = "visible";
        showNextClicked = true;
        titre.style.visibility = "hidden";
        showNext2.style.visibility = "visible"
        canvas.style.visibility = "visible"
        texteMains.style.visibility = "visible";
        detectionActive = true;

    })

    showNext2.addEventListener('click', () => {
        createpopup2();
        popupCanvas1.style.visibility = "hidden";
        showNext2Clicked = true;
        riveCanvasTecto.style.visibility = "hidden"
        popupCanvas2.style.visibility = "visible";

        showNextClicked = false;
        tectoRectangle.style.visibility = "hidden";
        titre.style.visibility = "hidden";
        showNext.style.visibility = "hidden"
        showNext2.style.visibility = "hidden"
        riveCanvasTecto.style.visibility = "hidden";
        showAnimationButton.style.visibility = "visible";
        texteMains.style.visibility = "hidden";
        document.getElementById("contidroite").style.display = "none";
        document.getElementById("contigauche").style.display = "none";
        document.getElementById("oceandroite").style.display = "none";
        document.getElementById("oceangauche").style.display = "none";

        riveCanvasTectoFleches.style.visibility = "visible";
    })


    showAnimationButton.addEventListener("click", () => {
        tectoRectangle.style.visibility = "visible";




        showAnimationButton.style.visibility = "hidden";

        document.getElementById("startBouton").style.visibility = "visible";
        riveCanvasTectoFleches.style.visibility = "hidden";

        setTimeout(() => {
            if (!TimerIsRunning) {
                annonce1.style.visibility = "visible";
            }
        }, 500);

        setTimeout(() => {
            if (!TimerIsRunning) {
                annonce2.style.visibility = "visible";
            }
        }, 1000);

        setTimeout(() => {
            if (!TimerIsRunning) {
                annonce3.style.visibility = "visible";
            }

        }, 1500);

        setTimeout(() => {
            if (!TimerIsRunning) {
                annonce4.style.visibility = "visible";
            }

        }, 2000);


    });



    menuBtn.addEventListener("click", () => {
        window.location.href = "../hub/hub.html";
    });
    startBouton.addEventListener("click", () => {
        menuBtn.style.visibility = "visible";
        startBoutonAction();
        annonce1.style.visibility = "hidden";
        annonce2.style.visibility = "hidden";
        annonce3.style.visibility = "hidden";
        annonce4.style.visibility = "hidden";
    });

    boutonRestart.addEventListener("click", () => {
        console.log("Restarting...");
        document.getElementById("bigcontidroite").style.display = "none";
        document.getElementById("bigoceandroite").style.display = "none";
        document.getElementById("bigcontigauche").style.display = "none";
        document.getElementById("bigoceangauche").style.display = "none";
        //resetAnim();
        cleanRiveAnimation();
        DistanceIsCalculated = false;
        rightHandStates = []; // "open" or "fist"
        leftHandStates = [];
        rightHandStates = [];
        leftHandStates = [];
        distances = [];
        //cleanRiveAnimation();

        boutonRestart.style.visibility = "hidden";
        timerDisplay.classList.remove("hidden");
        startBoutonAction();


    });


    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    video.onloadedmetadata = () => {
        video.play();
        //handCanvas.width = video.videoWidth;
        //handCanvas.height = video.videoHeight;
        detectHands();
    };

    const hands = new Hands({ locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}` });
    hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.9,
        minTrackingConfidence: 0.9
    });

    hands.onResults((results) => {
        ctx.clearRect(0, 0, handCanvas.width, handCanvas.height);
        handCanvas.width = video.videoWidth;
        handCanvas.height = video.videoHeight;


        //let color = "white";
        let messages = [];

        if (results.multiHandLandmarks.length > 0 && detectionActive) {

            if (contidroite.style.visibility !== "hidden") contidroite.style.visibility = "hidden";
            if (contigauche.style.visibility !== "hidden") contigauche.style.visibility = "hidden";
            if (oceandroite.style.visibility !== "hidden") oceandroite.style.visibility = "hidden";
            if (oceangauche.style.visibility !== "hidden") oceangauche.style.visibility = "hidden";

            results.multiHandLandmarks.forEach((handLandmarks, i) => {
                drawHand(handLandmarks);

                const isFistPose = isFist(handLandmarks);
                const handedness = results.multiHandedness[i].label; // "Left" ou "Right"

                if (handedness === "Right" && isFistPose) {
                    messages.push("Main droite : poing fermé");
                    if (contigauche.style.visibility !== "visible") {
                        //triggerBounce("oceangauche");
                        contigauche.style.visibility = "visible";
                    }
                } else if (handedness === "Right" && !isFistPose) {

                    messages.push("Main droite : main ouverte");
                    if (oceangauche.style.visibility !== "visible") {
                        //triggerBounce("contigauche");

                        oceangauche.style.visibility = "visible";
                    }

                } else if (handedness === "Left" && isFistPose) {
                    //color = "blue";
                    messages.push("Main gauche : poing fermé");
                    if (contidroite.style.visibility !== "visible") {
                        //triggerBounce("oceandroite");
                        contidroite.style.visibility = "visible";

                    }
                } if (handedness === "Left" && !isFistPose) {
                    messages.push("Main gauche : main ouverte");
                    if (oceandroite.style.visibility !== "visible") {
                        //triggerBounce("contidroite");
                        oceandroite.style.visibility = "visible";
                    }
                }
            })
        } else {
            contidroite.style.visibility = "hidden";
            contigauche.style.visibility = "hidden";
            oceandroite.style.visibility = "hidden";
            oceangauche.style.visibility = "hidden";
            messages.push("Aucune main détectée");
        }
        texteMains.innerText = messages.join("\n");

        document.getElementById("bigcontidroite").style.display = "none";
        document.getElementById("bigoceandroite").style.display = "none";
        document.getElementById("bigcontigauche").style.display = "none";
        document.getElementById("bigoceangauche").style.display = "none";


        if (results.multiHandLandmarks.length > 0) {
            results.multiHandLandmarks.forEach((handLandmarks, i) => {
                drawHand(handLandmarks);

                const isFistPose = isFist(handLandmarks);
                const handedness = results.multiHandedness[i].label;
                ;
                if (TimerIsRunning) {
                    if (handedness === "Right" && !isFistPose) {
                        document.getElementById("bigoceangauche").style.display = "block";
                    } else if (handedness === "Left" && isFistPose) {
                        document.getElementById("bigcontidroite").style.display = "block";
                    } else if (handedness === "Left" && !isFistPose) {
                        document.getElementById("bigoceandroite").style.display = "block";
                    } else if (handedness === "Right" && isFistPose) {
                        document.getElementById("bigcontigauche").style.display = "block";
                    }
                }
            });
        }

        //document.body.style.background = color;

        function triggerBounce(id) {
            const el = document.getElementById(id);
            if (!el) return;
            el.classList.remove("bounce"); // reset in case it's still animating
            void el.offsetWidth;           // force reflow
            el.classList.add("bounce");
        }


        if (TimerIsRunning) {

            legendeLithoConti.style.visibility = "visible";
            legendeLithoOce.style.visibility = "visible";
            legendeAstheno.style.visibility = "visible";
            textLithoConti.style.visibility = "visible";
            textLithoOce.style.visibility = "visible";
            textAstheno.style.visibility = "visible";


            function onHandsDetected(hand1, hand2) {
                const dist = Math.sqrt(
                    Math.pow(hand1.x - hand2.x, 2)
                );
                distances.push(dist);
            }

            results.multiHandLandmarks.forEach((landmarks, i) => {
                const isFistPose = isFist(landmarks);
                const handedness = results.multiHandedness[i].label;

                if (handedness === "Right") {
                    rightHandStates.push(isFistPose ? "fist" : "open");
                } else if (handedness === "Left") {
                    leftHandStates.push(isFistPose ? "fist" : "open");
                }
            });






            if (results.multiHandLandmarks.length >= 2) {

                const hand1 = results.multiHandLandmarks[0][8]; // Index finger
                const hand2 = results.multiHandLandmarks[1][8];
                onHandsDetected(hand1, hand2);





                //   previousDistance = dist;
            }
        }



        if (TimerOver && !DistanceIsCalculated) {
            DistanceIsCalculated = true;
            console.log(distances.length);
            const dominantRight = mostFrequentState(rightHandStates);
            const dominantLeft = mostFrequentState(leftHandStates);



            analyzeDistanceChange();



            function mostFrequentState(arr) {
                const counts = { fist: 0, open: 0 };
                arr.forEach(state => counts[state]++);
                return counts.fist > counts.open ? "fist" : "open";
            }


            function analyzeDistanceChange() {
                const len = distances.length;

                if (len < 4) console.log("pas assez donnes"); // pas assez de données

                const firstHalf = distances.slice(0, len / 2);
                const secondHalf = distances.slice(len / 2);
                distances = []; // reset distances for next calculation
                const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
                const startAvg = avg(firstHalf);
                const endAvg = avg(secondHalf);
                const postureKey = `${dominantLeft}_${dominantRight}`; // e.g. "open_fist"
                if (endAvg > startAvg + 0.01) {
                    // divergence
                    riveCanvasDiverge.style.visibility = "visible";
                    console.log(postureKey + " divergence");
                    switch (postureKey) {
                        case "fist_fist":
                            DIVbaseToCC.fire();
                            texteDivTT.style.visibility = "visible";
                            break;

                        case "fist_open":
                            DIVbaseToOC.fire();
                            texteDivTO.style.visibility = "visible";
                            break;
                        case "open_fist":
                            DIVbaseToCO.fire();
                            texteDivTO.style.visibility = "visible";
                            break;
                        case "open_open":
                            DIVbaseToOO.fire();
                            texteDivOO.style.visibility = "visible";
                            textVolcanEff.style.visibility = "visible";
                            legendeVolcan.style.visibility = "visible";
                            break;
                        default: console.log("Unknown posture key:", postureKey); break;
                    }
                } else if (endAvg < startAvg - 0.01) {
                    // convergence

                    console.log(postureKey + " convergence");
                    riveCanvasConverge.style.visibility = "visible";
                    switch (postureKey) {
                        case "fist_fist":
                            baseToCC.fire();
                            texteConvTT.style.visibility = "visible";
                            break;
                        case "fist_open":
                            baseToOC.fire();
                            texteConvTO.style.visibility = "visible";
                            textVolcanExp.style.visibility = "visible";
                            legendeVolcan.style.visibility = "visible";
                            break;
                        case "open_fist":
                            baseToCO.fire();
                            texteConvTO.style.visibility = "visible";
                            textVolcanExp.style.visibility = "visible";
                            legendeVolcan.style.visibility = "visible";
                            break;
                        case "open_open":
                            baseToOO.fire();
                            texteConvOO.style.visibility = "visible";
                            textVolcanExp.style.visibility = "visible";
                            legendeVolcan.style.visibility = "visible";
                            break;
                        default: console.log("Unknown posture key:", postureKey); break;
                    }
                }

            }
        }
        ;
    });

    async function detectHands() {
        await hands.send({ image: video });
        requestAnimationFrame(detectHands);
    }

    function drawHand(landmarks) {
        ctx.fillStyle = "#00FF00"; // Set fill color to red
        for (let i = 0; i < landmarks.length; i++) {
            const { x, y } = landmarks[i];
            ctx.beginPath();
            ctx.arc(x * canvas.width, y * canvas.height, 5, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    function isFist(landmarks) {
        return [8, 12, 16, 20].every(tipIndex => {
            const pipIndex = tipIndex - 2;
            return landmarks[tipIndex].y > landmarks[pipIndex].y;
        });
    }


}
function hideAllPlaques() {

    document.getElementById("bigcontidroite").style.display = "none";
    document.getElementById("bigoceandroite").style.display = "none";
    document.getElementById("bigcontigauche").style.display = "none";
    document.getElementById("bigoceangauche").style.display = "none";
}

startGestureRecognition();



function startBoutonAction() {
    startBouton.style.visibility = "hidden";
    timerDisplay.classList.remove("hidden");
    riveCanvasTectoFleches.style.visibility = "hidden";


    let startTime = Date.now();

    TimerStarted = true;
    TimerOver = false;
    TimerIsRunning = true;
    const interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        timerDisplay.innerText = `${elapsed.toFixed(1)}s`;

        if (elapsed >= 5) {
            TimerIsRunning = false;
            TimerOver = true;
            clearInterval(interval);
            timerDisplay.classList.add("hidden");
            hideAllPlaques(); // Optionally hide plaques after timer
        }
    }, 100);
}

