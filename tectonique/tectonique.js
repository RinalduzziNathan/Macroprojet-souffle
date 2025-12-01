
//boutons
const menuBtn = document.getElementById("menuButton");
const showNext = document.getElementById('showNext');


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
const popupCanvas3 = document.getElementById("popupCanvas3");


//textes
const titre = document.getElementById("titre")
const texteMains = document.getElementById("texteMains");
const timerDisplay = document.getElementById("timerDisplay");



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


//video
const video = document.getElementById("video");

//boutons
menuBtn.style.visibility = "hidden";
showNext.style.visibility = "visible";


//textes
texteMains.style.visibility = "hidden";


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
popupCanvas3.style.visibility = "hidden";


//images
contidroite.style.visibility = "hidden";
contigauche.style.visibility = "hidden";
oceandroite.style.visibility = "hidden";
oceangauche.style.visibility = "hidden";

//objets dessinés



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
let popup3 = null;
function createpopup3() {
    popup3 = new rive.Rive({
        src: "https://rinalduzzinathan.github.io/file-stash/rive/popup_tecto_3.riv",
        canvas: document.getElementById("popupCanvas3"),
        autoplay: true,
        stateMachines: "State Machine 1",
        layout: new rive.Layout({
            fit: rive.Fit.Contain,
            alignment: rive.Alignment.Center,
        }),
        onLoad: () => {
            popup3.resizeDrawingSurfaceToCanvas();
            riveEventCheck(popup3);
        },
    });

}
let rConverge = null;
function createConverge() {
    rConverge = new rive.Rive({
        src: "https://rinalduzzinathan.github.io/file-stash/rive/demogeo_tectonique_convergence7.riv",
        canvas: document.getElementById("riveCanvasConverge"),
        autoplay: true,
        stateMachines: "State Machine 1",
        layout: new rive.Layout({
            fit: rive.Fit.Contain,
            alignment: rive.Alignment.Center,
        }),
        onLoad: () => {
            const inputs = rConverge.stateMachineInputs("State Machine 1");
            baseToCC = inputs.find(i => i.name === "baseToCC");
            baseToCO = inputs.find(i => i.name === "baseToCO");
            baseToOO = inputs.find(i => i.name === "baseToOO");
            baseToOC = inputs.find(i => i.name === "baseToOC");

            rConverge.resizeDrawingSurfaceToCanvas();
            riveEventCheck(rConverge);
        }
    });
}

let rDiverge = null;
function createDiverge() {
    rDiverge = new rive.Rive({
        src: "https://rinalduzzinathan.github.io/file-stash/rive/demogeo_tectonique_divergence4.riv",
        canvas: document.getElementById("riveCanvasDiverge"),
        autoplay: true,
        stateMachines: "State Machine 1",
        layout: new rive.Layout({
            fit: rive.Fit.Contain,
            alignment: rive.Alignment.Center,
        }),
        onLoad: () => {
            const inputs = rDiverge.stateMachineInputs("State Machine 1");
            console.log(inputs);
            DIVbaseToCC = inputs.find(i => i.name === "DIVbaseToCC");
            DIVbaseToCO = inputs.find(i => i.name === "DIVbaseToCO");
            DIVbaseToOO = inputs.find(i => i.name === "DIVbaseToOO");
            DIVbaseToOC = inputs.find(i => i.name === "DIVbaseToOC");

            rDiverge.resizeDrawingSurfaceToCanvas();
            riveEventCheck(rDiverge);
        }
    });
}



function rechargePage() {
    location.reload();
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
    popupCanvas3.width = window.innerWidth;
    popupCanvas3.height = window.innerHeight;
    if (popup3) {
        popup3.resizeDrawingSurfaceToCanvas();
    }
    riveCanvasConverge.width = window.innerWidth;
    riveCanvasConverge.height = window.innerHeight;
    if (rConverge) {
        rConverge.resizeDrawingSurfaceToCanvas();
    }
    riveCanvasDiverge.width = window.innerWidth;
    riveCanvasDiverge.height = window.innerHeight;
    if (rDiverge) {
        rDiverge.resizeDrawingSurfaceToCanvas();
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
                createpopup2();
                popupCanvas2.style.visibility = "visible";

                showNextClicked = false;
                titre.style.visibility = "hidden";
                showNext.style.visibility = "hidden"
                texteMains.style.visibility = "hidden";
                document.getElementById("contidroite").style.display = "none";
                document.getElementById("contigauche").style.display = "none";
                document.getElementById("oceandroite").style.display = "none";
                document.getElementById("oceangauche").style.display = "none";

                riveCanvasTectoFleches.style.visibility = "visible";
            }

            if (eventData.name == "closeB") {
                popupCanvas2.style.visibility = "hidden";
                createpopup3();
                popupCanvas3.style.visibility = "visible";
                riveCanvasTectoFleches.style.visibility = "hidden";
                texteMains.style.visibility = "hidden";
            }

            if (eventData.name == "close4") {
                createConverge();
                createDiverge();
                popupCanvas3.style.visibility = "hidden";
                document.body.style.backgroundColor = "#fcff32ff"
                menuBtn.style.visibility = "visible";
                
                texteMains.style.visibility = "hidden";
                riveCanvasConverge.style.visibility = "visible";
                riveCanvasDiverge.style.visibility = "visible";

            }
            if (eventData.name == "startTimer") {
                startBoutonAction();    
                DistanceIsCalculated = false;
                rightHandStates = []; // "open" or "fist"
                leftHandStates = [];
                rightHandStates = [];
                leftHandStates = [];
                distances = [];
            }

         
             



        }
    }
}

window.addEventListener("resize", resizeCanvasToViewport);



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


    await tf.setBackend("webgl");

    showNext.addEventListener('click', () => {
        createpopup1();
        showNext.style.visibility = "hidden";
        popupCanvas1.style.visibility = "visible";
        riveCanvasTecto.style.visibility = "visible";
        showNextClicked = true;
        titre.style.visibility = "hidden";
        canvas.style.visibility = "visible"
        texteMains.style.visibility = "visible";
        detectionActive = true;

    })


    menuBtn.addEventListener("click", () => {
        window.location.href = "../hub/hub.html";
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

                if (len < 4) {
                    
                    console.log("pas assez donnes"); // pas assez de données
                }
                const firstHalf = distances.slice(0, len / 2);
                const secondHalf = distances.slice(len / 2);
                distances = []; // reset distances for next calculation
                const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
                const startAvg = avg(firstHalf);
                const endAvg = avg(secondHalf);
                const postureKey = `${dominantLeft}_${dominantRight}`; // e.g. "open_fist"
                if (endAvg > startAvg + 0.01) {
                    // divergence
                    riveCanvasConverge.style.visibility = "hidden";
                    riveCanvasDiverge.style.visibility = "visible";
                    console.log(postureKey + " divergence");
                    switch (postureKey) {
                        case "fist_fist":
                            DIVbaseToCC.fire();
                            break;

                        case "fist_open":
                            DIVbaseToOC.fire();
                            break;
                        case "open_fist":
                            DIVbaseToCO.fire();
                            break;
                        case "open_open":
                            DIVbaseToOO.fire();
                            break;
                        default: console.log("Unknown posture key:", postureKey); break;
                    }
                } else if (endAvg < startAvg - 0.01) {
                    // convergence

                    console.log(postureKey + " convergence");
                    riveCanvasConverge.style.visibility = "visible";
                    riveCanvasDiverge.style.visibility = "hidden";
                    //riveCanvasConverge.style.visibility = "hidden";
                    switch (postureKey) {
                        case "fist_fist":
                            baseToCC.fire();
                            break;
                        case "fist_open":
                            baseToOC.fire();
                            break;
                        case "open_fist":
                            baseToCO.fire();
                            break;
                        case "open_open":
                            baseToOO.fire();
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

