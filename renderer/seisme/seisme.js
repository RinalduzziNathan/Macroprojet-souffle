
async function startGestureRecognition() {


    //boutons
    const menuBtn = document.getElementById("menuButton");
    const menuBtnLeft = document.getElementById("menuButtonLeft");
    const boutonRestart = document.getElementById("boutonRestart")
    const showNext = document.getElementById('showNext');

    //canvas
    const handCanvas = document.getElementById("handCanvas");
    const canvas = document.getElementById("output_canvas");
    const riveCanvas = document.getElementById("riveCanvas");
    const riveCanvasCube = document.getElementById("riveCanvasCube");
    const popupCanvas1 = document.getElementById("popupCanvas1");
    const popupCanvas2 = document.getElementById("popupCanvas2");

    //textes
    const titre = document.getElementById("titre")


    //video

    //autre
    const video = document.getElementById("video");


    //boutons
    menuBtn.style.visibility = "hidden"
    menuBtnLeft.style.visibility = "visible"
    showNext.style.visibility = "visible"
    boutonRestart.style.visibility = "hidden";

    //canvas
    riveCanvas.style.visibility = "hidden";
    riveCanvasCube.style.visibility = "hidden";
    popupCanvas1.style.visibility = "hidden";
    popupCanvas2.style.visibility = "hidden";

    //autre
    const ctx = canvas.getContext("2d");




    let touchDistance = 0;
    let proximityDistance = 0;
    let showNextClicked = false;
    let isTouching = false;
    let TimerStarted = false;
    let TimerOver = false;
    let TimerIsRunning = false;
    let DistanceIsCalculated = false;
    let animationEnCours = false;
    let lastLeftHand = null;
    let lastRightHand = null;
    let lastDetectionTime = Date.now();
    let ordreMains = []; // contiendra "gauche", "droite", ou "croise"
    let couleurFond = false;
    let startBoutonClicked = false;

    let popup1 = null;
    let exit1;
    let exit2;

    function createpopup1() {
        popup1 = new rive.Rive({
            src: "../rive/popup_seisme_1.riv",
            canvas: document.getElementById("popupCanvas1"),
            autoplay: true,
            stateMachines: "State Machine 1",
            layout: new rive.Layout({
                fit: rive.Fit.Contain,
                alignment: rive.Alignment.Center,
            }),
            onLoad: () => {
                const inputs = popup1.stateMachineInputs("State Machine 1");
                exit1 = inputs.find(i => i.name === 'exit');
                popup1.resizeDrawingSurfaceToCanvas();
                riveEventCheck(popup1); // ✅ déplacer ici
            },
        });

    }
    let popup2 = null;

    function createpopup2() {
        popup2 = new rive.Rive({
            src: "../rive/popup_seisme_2.riv",
            canvas: document.getElementById("popupCanvas2"),
            autoplay: true,
            stateMachines: "State Machine 1",
            layout: new rive.Layout({
                fit: rive.Fit.Contain,
                alignment: rive.Alignment.Center,
            }),
            onLoad: () => {
                const inputs = popup2.stateMachineInputs("State Machine 1");
                exit2 = inputs.find(i => i.name === 'exit');
                popup2.resizeDrawingSurfaceToCanvas();
                riveEventCheck(popup2); // ✅ déplacer ici
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
    function rechargePage() {
        location.reload();
    }


    function riveEventCheck(riveInstance) {
        if (riveInstance) {
            riveInstance.on(rive.EventType.RiveEvent, onRiveEventReceived);
            function onRiveEventReceived(riveEvent) {
                const eventData = riveEvent.data;
                console.log("Event data:", eventData);
                if (eventData.name == "close3") {
                    popupCanvas1.style.visibility = "hidden";
                    popupCanvas2.style.visibility = "visible";
                    if (exit1) exit1.fire();
                    menuBtn.style.visibility = "visible";
                    menuBtnLeft.style.visibility = "hidden";
                    createpopup2();

                    document.body.style.backgroundColor = "#FDFF60";
                    riveCanvas.style.visibility = "visible";
                    if (toFond) toFond.fire();


                }
                if (eventData.name == "closeC") {
                    popupCanvas2.style.visibility = "hidden";
                    
                    if (exit2) exit2.fire();
                    startBoutonAction();
                    if (toBase) toBase.fire();

                    startBoutonClicked = true;


                }

            }
        }
    }
    window.addEventListener("resize", resizeCanvasToViewport);



    let toSecousse, toBloc;

    const rCube = new rive.Rive({
        src: "../rive/blocs.riv",
        canvas: document.getElementById("riveCanvasCube"),
        autoplay: true,
        stateMachines: "State Machine 1",
        onLoad: () => {
            const inputs = rCube.stateMachineInputs("State Machine 1");
            toSecousse = inputs.find(i => i.name === "toSecousse");
            toBloc = inputs.find(i => i.name === "toBloc");
            rCube.resizeDrawingSurfaceToCanvas();
        }


    });

    let baseToDecalage, toBase, baseToInverse, baseToNormale, baseToDonnes, toFond;


    const r = new rive.Rive({
        src: "../rive/demogeo_seisme2.riv",
        canvas: document.getElementById("riveCanvas"),
        autoplay: true,
        stateMachines: "State Machine 1",
        onLoad: () => {
            const inputs = r.stateMachineInputs("State Machine 1");

            baseToNormale = inputs.find(i => i.name === "baseToNormale");
            baseToInverse = inputs.find(i => i.name === "baseToInverse");
            baseToDecalage = inputs.find(i => i.name === "baseToDecalage");
            baseToDonnes = inputs.find(i => i.name === "baseToDonnes");
            toBase = inputs.find(i => i.name === "toBase");
            toFond = inputs.find(i => i.name === "toFond");


            r.resizeDrawingSurfaceToCanvas();
            r.onStateChange = (event) => {
                const { stateMachineName, data } = event;
                console.log(`StateMachine "${stateMachineName}" est passé à l'état :`, data);


            };
        }


    });



    r.on(rive.EventType.RiveEvent, (event) => {
        const data = event.data;
        if (data.type === rive.RiveEventType.General) {
            boutonRestart.style.visibility = "visible";
        }
        animationEnCours = false;
    });



    r.on(rive.EventType.RiveEvent, (event) => {
        const data = event.data;
        if (data.type === rive.RiveEventType.General) {
            console.log("Event reçu : " + data.name);
            boutonRestart.style.visibility = "visible";


        }
    });

    showNext.addEventListener('click', () => {
        createpopup1();
        popupCanvas1.style.visibility = "visible";
        showNextClicked = true;
        titre.style.visibility = "hidden";
        riveCanvas.style.visibility = "hidden";
        showNext.style.visibility = "hidden"
    })



    function detecterCroisementDepuisOrdre() {
        if (ordreMains.length < 2) return false;
        let precedent = ordreMains[0];
        for (let i = 1; i < ordreMains.length; i++) {
            if (ordreMains[i] !== precedent) {
                return true;
            }
            precedent = ordreMains[i];
        }
        return false;
    }

    function analyzeDistanceChange() {

        const len = distances.length;
        if (len < 4) {
            console.log("Pas assez de données");
            if (toBase) toBase.fire();
            setTimeout(() => {
                baseToDonnes.fire();
            }, 50);

        }

        const firstHalf = distances.slice(0, len / 2);
        const secondHalf = distances.slice(len / 2);
        const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
        const startAvg = avg(firstHalf);
        const endAvg = avg(secondHalf);



        if (endAvg > startAvg + 0.01 && !detecterCroisementDepuisOrdre()) {

            if (toBase) toBase.fire();
            setTimeout(() => {
                baseToNormale.fire();
            }, 50);
        } else if (endAvg < startAvg - 0.01 && !detecterCroisementDepuisOrdre()) {

            if (toBase) toBase.fire();
            setTimeout(() => {
                baseToInverse.fire();
            }, 50);
        }
        if (detecterCroisementDepuisOrdre()) {


            if (toBase) toBase.fire();
            setTimeout(() => {
                baseToDecalage.fire();
            }, 50);

        }
    }


    await tf.setBackend("webgl");
    console.log("Backend actif :", tf.getBackend());

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    video.onloadedmetadata = () => {
        video.play();
        handCanvas.width = video.videoWidth;
        handCanvas.height = video.videoHeight;
        detectHands();
    };

    const hands = new Hands({ locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}` });
    hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.9,
        minTrackingConfidence: 0.9
    });

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

    let distances = [];
    let lastDistance = null;

    hands.onResults((results) => {
        ctx.clearRect(0, 0, handCanvas.width, handCanvas.height);
        handCanvas.width = video.videoWidth;
        handCanvas.height = video.videoHeight;

        if ((!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) && !animationEnCours && startBoutonClicked) {
            console.log("passe peut")
            //if (toBase) toBase.fire();
            animationEnCours = false;
            return;

        }



        if (results.multiHandLandmarks.length === 2) {

            const hand1 = results.multiHandLandmarks[0];
            const hand2 = results.multiHandLandmarks[1];

            // Comparer la position horizontale (x) des index (ou poignet)
            // Ici, j’utilise le landmark 0 (poignet), tu peux aussi utiliser 8 (index)
            if (hand1[8].x < hand2[8].x) {
                ordreMains.push("gauche-droite");
            } else {
                ordreMains.push("droite-gauche");
            }

            //console.log("ordre mains actuel :", ordreMains[ordreMains.length - 1]);

            drawHand(hand1);
            drawHand(hand2);

            let close = areHandsClose(hand1, hand2);
            let touching = areHandsTouching(hand1, hand2);
            lastLeftHand = hand1[8];
            lastRightHand = hand2[8];

            // Partie 2 : pendant le timer, enregistrer les distances
            if (TimerIsRunning) {
                console.log("enregistrement")

                onHandsDetected(hand1[8], hand2[8]);
                couleurFond = true;
                animationEnCours = false;

                if (couleurFond === true) {
                    changerCouleurFond();
                } else {
                    document.body.style.backgroundColor = "white";
                }
            }
        }
    });

    async function detectHands() {
        await hands.send({ image: video });
        requestAnimationFrame(detectHands);
    }

    function drawHand(landmarks) {
        ctx.strokeStyle = "#00FF00";
        ctx.fillStyle = "#00FF00";
        ctx.lineWidth = 2;
        for (let i = 0; i < landmarks.length; i++) {
            const { x, y } = landmarks[i];
            ctx.beginPath();
            ctx.arc(x * handCanvas.width, y * handCanvas.height, 5, 0, 2 * Math.PI);
            ctx.fill();
        }
    }


    let timer = 0;
    let timerInterval;
    let timerRunning = false;

    let previousDistance = null;
    let crossedDetected = false;
    let movementTrend = null; // "rapprochement", "eloignement"
    let rightHandStates = []; // "open" or "fist"
    let leftHandStates = [];
    rightHandStates = [];
    leftHandStates = [];
    distances = [];
    DistanceIsCalculated = false;

    function startBoutonAction() {
        setTimeout(() => {
            timerCompute();
            console.log("timer 1");
        }, 700);
        console.log("timer 2");
    }

    function timerCompute() {

        riveCanvas.style.visibility = "visible";

        let startTime = Date.now();
        

        TimerStarted = true;
        TimerOver = false;
        TimerIsRunning = true;
        distances = [];
        ordreMains = [];

       

        // Arrête le timer après 5 secondes
        const interval = setInterval(() => {
            const elapsed = (Date.now() - startTime) / 1000;
            timerDisplay.innerText = `${elapsed.toFixed(1)}s`;
             timerDisplay.classList.remove("hidden");

            if (elapsed >= 5) {
                TimerIsRunning = false;
                TimerOver = true;
                clearInterval(interval);
                timerDisplay.classList.add("hidden");
                // Fin du timer

                if (TimerOver && !DistanceIsCalculated) {

                    analyzeDistanceChange();

                    function detecterCroisementDepuisOrdre() {
                        if (ordreMains.length < 2) return false;
                        let precedent = ordreMains[0];
                        for (let i = 1; i < ordreMains.length; i++) {
                            if (ordreMains[i] !== precedent) {
                                return true;
                            }
                            precedent = ordreMains[i];
                        }
                        return false;
                    }

                    detecterCroisementDepuisOrdre();
                    DistanceIsCalculated = true;
                    animationEnCours = true;

                }
            }
        }, 100);
    }

    function changerCouleurFond() {
        // Étape 1 : Blanc → Orange (2.5s)
        document.body.style.transition = "background-color 2.5s linear";
        document.body.style.backgroundColor = "orange";

        // Étape 2 : Orange → Rouge (2.5s plus tard)
        setTimeout(() => {
            document.body.style.backgroundColor = "red";
        }, 2000);

        // Étape 3 : Rouge → Blanc (5s plus tard au total)
        setTimeout(() => {
            document.body.style.backgroundColor = "#FDFF60";

        }, 5000);
    }

    menuBtn.addEventListener("click", () => {
        window.location.href = "../hub/hub.html";
    });

    menuBtnLeft.addEventListener("click", () => {
        window.location.href = "../hub/hub.html";
    });


    boutonRestart.addEventListener("click", function () {

        DistanceIsCalculated = false;
        rightHandStates = []; // "open" or "fist"
        leftHandStates = [];
        rightHandStates = [];
        leftHandStates = [];
        distances = [];
        lastLeftHand = null;
        lastRightHand = null;

        boutonRestart.style.visibility = "hidden";
        timerDisplay.classList.remove("hidden");
        startBoutonAction();
        if (toBase) toBase.fire();
    });




    function onHandsDetected(hand1, hand2) {
        const dist = Math.sqrt(
            Math.pow(hand1.x - hand2.x, 2) +
            Math.pow(hand1.y - hand2.y, 2)
        );
        distances.push(dist);

        // Détection du croisement basé sur la position X
        if (hand1.x < hand2.x) {
            ordreMains.push("gauche-droite");
        } else {
            ordreMains.push("droite-gauche");
        }
    }






    function areHandsTouching(hand1, hand2) {
        const index1 = hand1[8];
        const index2 = hand2[8];
        touchDistance = Math.sqrt(
            Math.pow((index1.x - index2.x) * handCanvas.width, 2) +
            Math.pow((index1.y - index2.y) * handCanvas.height, 2)
        );

        if (touchDistance < 20 && timerRunning) {
            return touchDistance < 20;
        }
    }


    function areHandsClose(hand1, hand2) {
        const index1 = hand1[8];
        const index2 = hand2[8];
        proximityDistance = Math.sqrt(
            Math.pow((index1.x - index2.x) * handCanvas.width, 2) +
            Math.pow((index1.y - index2.y) * handCanvas.height, 2)
        );

        return proximityDistance < 130;
    }




}

startGestureRecognition();

