
window.addEventListener('DOMContentLoaded', (event) => {

    //boutons
    const startBouton = document.getElementById("startBouton");
    const boutonRestart = document.getElementById("boutonRestart");
    const menuBtn = document.getElementById("menuButton");
    const showSouffleTest = document.getElementById('showSouffleTest');
    const showRiveCircles = document.getElementById('showRiveCircles');

    //canvas
    const riveCanvasPlay = document.getElementById("riveCanvasPlay");
    const riveCanvasVolcan = document.getElementById("riveCanvasVolcan");
    const visqueuseCanvas = document.getElementById("visqueuseCanvas");
    const popupCanvas1 = document.getElementById("popupCanvas1");
    const popupCanvas2 = document.getElementById("popupCanvas2");

    //images
    const volcanCircle = document.getElementById("volcanCircle");
    const volcanImage = document.getElementById("volcanImage");

    //objets
    const soundRectangle = document.getElementById("soundRectangle");

    //textes
    const titre = document.getElementById("titre");
    const timerDisplay = document.getElementById("timer");
    const texteEruptionEffusive = document.getElementById("texteEruptionEffusive");
    const texteEruptionExplosive = document.getElementById("texteEruptionExplosive");


    //boutons
    menuBtn.style.visibility = "hidden";
    boutonRestart.style.visibility = "hidden";
    showRiveCircles.style.visibility = "visible";
    showSouffleTest.style.visibility = "hidden";


    //canvas
    riveCanvasPlay.style.visibility = "hidden";
    popupCanvas1.style.visibility = "hidden";
    popupCanvas2.style.visibility = "hidden";
    riveCanvasVolcan.style.visibility = "hidden";
    visqueuseCanvas.style.visibility = "hidden";


    //Images
    volcanCircle.style.visibility = "hidden";
    volcanImage.style.visibility = "hidden";

    //objets
    soundRectangle.style.visibility = "hidden";
    //textes
    texteEruptionEffusive.style.visibility = "hidden";
    texteEruptionExplosive.style.visibility = "hidden";



    var remplirTableau = false;
    var finTableau = false;
    let activeColorChange = false;  // contrôle si la couleur doit changer en live
    let colorJaune = false;


    function changerCouleurSelonIntensite(intensity) {
        if (intensity < 20) {
            document.body.style.backgroundColor = "white";
        } else if (intensity < 30) {
            document.body.style.backgroundColor = "yellow";
        } else if (intensity < 50) {
            document.body.style.backgroundColor = "orange";
        } else {
            document.body.style.backgroundColor = "red";
        }
    }



    let popup1 = null;

    function createpopup1() {
        popup1 = new rive.Rive({
            src: "https://rinalduzzinathan.github.io/file-stash/rive/popup_volcan_1.riv",
            canvas: document.getElementById("popupCanvas1"),
            autoplay: true,
            stateMachines: "State Machine 1",
            layout: new rive.Layout({
                fit: rive.Fit.Contain,
                alignment: rive.Alignment.Center,
            }),
            onLoad: () => {
                popup1.resizeDrawingSurfaceToCanvas();
                riveEventCheck(popup1); // ✅ déplacer ici
            },
        });

    }

    let popup2 = null;

    function createpopup2() {
        popup2 = new rive.Rive({
            src: "https://rinalduzzinathan.github.io/file-stash/rive/popup_volcan_2.riv",
            canvas: document.getElementById("popupCanvas2"),
            autoplay: true,
            stateMachines: "State Machine 1",
            layout: new rive.Layout({
                fit: rive.Fit.Contain,
                alignment: rive.Alignment.Center,
            }),
            onLoad: () => {
                popup2.resizeDrawingSurfaceToCanvas();
                riveEventCheck(popup2); // ✅ déplacer ici
            },
        });

    }

    let baseToAnim;
    let visqueuseToBase;
    let slowFast;
    var artBoard;
    let rvisqueux = null;

    function createvisqueux() {

        rvisqueux = new rive.Rive({
            src: "https://rinalduzzinathan.github.io/file-stash/rive/demo_geo_fluide_visqueuse3.riv",
            canvas: document.getElementById("visqueuseCanvas"),
            autoplay: true,
            stateMachines: "State Machine 1",
            layout: new rive.Layout({
                fit: rive.Fit.Contain,
                alignment: rive.Alignment.Center,
            }),
            onLoad: () => {
                rvisqueux.resizeDrawingSurfaceToCanvas();
                // Récupère les inputs (dont les triggers)
                console.log(rvisqueux);
                const inputs = rvisqueux.stateMachineInputs('State Machine 1');
                baseToAnim = inputs.find(i => i.name === 'baseToAnim');
                visqueuseToBase = inputs.find(i => i.name === 'visqueuseToBase');
                slowFast = inputs.find(i => i.name === 'slowFast');

                riveEventCheck(rvisqueux); // ✅ déplacer ici


            },
        });
    }


    window.addEventListener("resize", resizeCanvasToViewport);
    let baseToEffu;
    let baseToExplo;
    let toBase;

    let volcan = null;

    function createvolcan() {


        volcan = new rive.Rive({
            src: "https://rinalduzzinathan.github.io/file-stash/rive/demogeo_volcan.riv",
            canvas: document.getElementById("riveCanvasVolcan"),
            autoplay: true,
            stateMachines: "State Machine 1",
            onLoad: () => {
                volcan.resizeDrawingSurfaceToCanvas();
                // Récupère les inputs (dont les triggers)
                const inputs = volcan.stateMachineInputs('State Machine 1');
                baseToEffu = inputs.find(i => i.name === 'baseToEffu');
                baseToExplo = inputs.find(i => i.name === 'baseToExplo');
                toBase = inputs.find(i => i.name === 'toBase');
                riveEventCheck(volcan); // ✅ déplacer ici

            },
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
        visqueuseCanvas.width = window.innerWidth;
        visqueuseCanvas.height = window.innerHeight;
        if (rvisqueux) {
            rvisqueux.resizeDrawingSurfaceToCanvas();
        }
        riveCanvasVolcan.width = window.innerWidth;
        riveCanvasVolcan.height = window.innerHeight;
        if (volcan) {
            volcan.resizeDrawingSurfaceToCanvas();
        }
    }


    function riveEventCheck(riveInstance) {
        if (riveInstance) {
            riveInstance.on(rive.EventType.RiveEvent, onRiveEventReceived);
            function onRiveEventReceived(riveEvent) {
                const eventData = riveEvent.data;
                console.log("Event data:", eventData);
                if (eventData.name == "startCircles") {
                    popupCanvas1.style.visibility = "hidden";

                }

                if (eventData.name == "close1") {
                    visqueuseCanvas.style.visibility = "visible";
                    document.getElementById("dragDropContainer").style.display = "block";
                    createvisqueux()
                }

                if (eventData.name == "close2") {

                    popupCanvas1.style.visibility = "hidden";
                    //colorJaune= true;
                    document.body.style.backgroundColor = "white";
                    volcanCircle.style.visibility = "visible";
                    activeColorChange = false;
                    riveCanvasVolcan.style.visibility = "hidden";
                    volcanImage.style.visibility = 'visible';
                    soundRectangle.style.visibility = 'visible';
                    startBouton.style.visibility = 'visible';
                }

                if (eventData.name == "EndAnim") {

                    boutonRestart.style.visibility = "visible";
                    if (toBase) toBase.fire();
                    texteEruptionExplosive.style.visibility = "hidden";
                    texteEruptionEffusive.style.visibility = "hidden";
                }

            }
        }
    }

    //boutons

    showRiveCircles.addEventListener('click', () => {
        popupCanvas1.style.visibility = "visible";
        createpopup1();
        showRiveCircles.style.visibility = "hidden";
        titre.style.visibility = "hidden";
        volcanImage.style.visibility = "hidden";
        soundRectangle.style.visibility = "hidden";
        volcanCircle.style.visibility = "hidden";
    })


    showSouffleTest.addEventListener('click', () => {
        popupCanvas2.style.visibility = "visible";
        createpopup2();
        document.getElementById("dragDropContainer").style.display = "none"; // 👈 masquer les éléments
        showSouffleTest.style.visibility = "hidden";
        visqueuseCanvas.style.visibility = "hidden";
        activeColorChange = true;

    })


    startBouton.addEventListener("click", function () {
        createvolcan();
        volcanImage.style.visibility = 'hidden';
        soundRectangle.style.visibility = 'hidden';
        menuBtn.style.visibility = "visible";
        riveCanvasVolcan.style.visibility = "visible";
        volcanCircle.style.visibility = "hidden";
        if (toBase) toBase.fire();


        startTimer();
        startBouton.style.visibility = "hidden";

    });

    boutonRestart.addEventListener("click", function () {
        createvolcan();
        console.log("REstartBouton clicked");
        if (toBase) toBase.fire();
        //if (toPlaymobiles) toPlaymobiles.fire();
        startTimer();
        boutonRestart.style.visibility = "hidden";

    });

    menuBtn.addEventListener("click", () => {
        window.location.href = "../hub/hub.html";
    });



    function intensite(intensity) {
        //console.log(intensity)
        if (intensity > 10) {
            if (baseToAnim) baseToAnim.fire();
            if (slowFast) slowFast.value = false;
            if (intensity > 30) {

                if (slowFast) slowFast.value = true;
            }
        } else {
            if (visqueuseToBase) visqueuseToBase.fire();
            if (slowFast) slowFast.value = false;
        }
    }


    function startTimer() {
        let timeLeft = 5000; // 5 secondes en millisecondes
        remplirTableau = true;

        const intervalId = setInterval(() => {
            let seconds = Math.floor(timeLeft / 1000);
            let milliseconds = Math.floor((timeLeft % 1000) / 10); // centièmes de seconde (MSMS)

            // Formater les valeurs avec deux chiffres
            seconds = String(seconds).padStart(2, '0');
            milliseconds = String(milliseconds).padStart(2, '0');

            timerDisplay.textContent = `${seconds}.${milliseconds}`;

            timeLeft -= 100;

            if (timeLeft < 0) {
                timerDisplay.textContent = "";
                clearInterval(intervalId);
                remplirTableau = false;
                finTableau = true;
            }
        }, 100); // mise à jour toutes les 100 ms
    }


    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const audioContext = new AudioContext();
            const analyser = audioContext.createAnalyser();
            const mic = audioContext.createMediaStreamSource(stream);
            mic.connect(analyser);
            analyser.fftSize = 256;
            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            var intensityArray = []

            // Get the rectangle element
            // Get the rectangle element
            const soundRectangle = document.getElementById("soundRectangle");

            // Check if soundRectangle exists
            if (!soundRectangle) {
                console.error("soundRectangle element not found.");
                return;
            }

            // Get initial top position from CSS
            const initialTop = parseInt(window.getComputedStyle(soundRectangle).top, 10);

            function draw() {
                requestAnimationFrame(draw);

                analyser.getByteFrequencyData(dataArray);
                let volume = dataArray.reduce((a, b) => a + b) / dataArray.length;
                let intensity = Math.min(volume / 2, 100); // Normalize volume

                let rCurrent = 255, gCurrent = 255, bCurrent = 255; // couleur initiale = blanc

                function lerp(a, b, t) {
                    return a + (b - a) * t;
                }

                function intensityToRGB(intensity) {
                    intensity = Math.min(Math.max(intensity, 0), 100); // Clamp

                    let r = 255, g = 255, b = 255;

                    if (intensity < 33) {
                        // Blanc (#FFFFFF) → Jaune (#FFFF00)
                        const t = intensity / 33;
                        b = Math.round(255 * (1 - t)); // 255 → 0
                    } else if (intensity < 66) {
                        // Jaune (#FFFF00) → Orange (#FFA500)
                        const t = (intensity - 33) / 33;
                        g = Math.round(255 - t * 105); // 255 → 150
                        b = 0;
                    } else {
                        // Orange (#FFA500) → Rouge (#FF0000)
                        const t = (intensity - 66) / 34;
                        g = Math.round(150 * (1 - t)); // 150 → 0
                        b = 0;
                    }

                    return { r, g, b };
                }

                if (colorJaune) {
                    document.body.style.backgroundColor = "#FDFF60";
                }


                // Dans ta fonction draw() quand activeColorChange === true
                if (activeColorChange) {
                    const targetColor = intensityToRGB(intensity);

                    rCurrent = lerp(rCurrent, targetColor.r, 0.7);
                    gCurrent = lerp(gCurrent, targetColor.g, 0.7);
                    bCurrent = lerp(bCurrent, targetColor.b, 0.7);

                    document.body.style.backgroundColor = `rgb(${Math.round(rCurrent)}, ${Math.round(gCurrent)}, ${Math.round(bCurrent)})`;
                }

                if (intensity !== null && intensity !== undefined && !isNaN(intensity)) {
                    let newHeight = 100 + intensity * 4;
                    soundRectangle.style.height = `${newHeight}px`;

                    let newTop = initialTop - intensity; // Use dynamic initialTop
                    soundRectangle.style.top = `${newTop}px`;
                } else {
                    console.error("Invalid intensity value:", intensity);
                    soundRectangle.style.height = '100px';
                    soundRectangle.style.top = `${initialTop}px`;
                }

                if (remplirTableau == true) {
                    let addIntensity = intensityArray.push(intensity)
                }
                if (intensity != null && !isNaN(intensity)) {
                    intensite(intensity);
                }

                //intensityText.textContent = intensity.toFixed(2);
                //ctx.clearRect(0, 0, canvas.width, canvas.height);
                if (finTableau == true) {
                    var finalArray = intensityArray;
                    intensityArray = []


                    console.log(finalArray + "c final array de taille" + finalArray.length)

                    //console.log(finalArray)
                    function movingAverage(array, windowSize) {
                        let smoothedArray = [];
                        for (let i = 0; i < array.length; i++) {
                            let start = Math.max(0, i - Math.floor(windowSize / 2));
                            let end = Math.min(array.length, i + Math.floor(windowSize / 2) + 1);
                            let sum = 0;
                            for (let j = start; j < end; j++) {
                                sum += array[j];
                            }
                            smoothedArray.push(sum / (end - start));
                        }
                        return smoothedArray;
                    }

                    function linearRegressionTrend(array) {
                        let n = array.length;
                        let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;

                        for (let i = 0; i < n; i++) {
                            sumX += i;
                            sumY += array[i];
                            sumXY += i * array[i];
                            sumXX += i * i;
                        }

                        let slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
                        return slope; // Si > 0, tendance à la hausse
                    }



                    // Utilisation :
                    let windowSize = 10; // Ajuste la taille du lissage selon ton besoin
                    let smoothedArray = movingAverage(finalArray, windowSize);
                    let trend = linearRegressionTrend(smoothedArray);

                    console.log("Tendance (pente de régression) :", trend);
                    console.log(trend > 0.09 ? "L'intensité augmente globalement." : "Pas d'augmentation claire.");

                    if (trend > 0.09) {
                        if (baseToExplo) baseToExplo.fire();
                        //if (toEscape) toEscape.fire();
                        texteEruptionExplosive.style.visibility = "visible";
                    }
                    if (trend < 0.09 && trend > -0.09) {
                        if (baseToEffu) baseToEffu.fire();
                        texteEruptionEffusive.style.visibility = "visible";
                        //if (toPhoto) toPhoto.fire();

                    }


                    finTableau = false;


                }
            }





            draw(); // Start drawing

        })
        .catch(err => console.error("Microphone access error: ", err));




});

function shakeCanvas() {
    const canvas = document.getElementById('visqueuseCanvas');
    if (canvas) {
        canvas.classList.remove('shake'); // Supprime la classe si déjà là
        void canvas.offsetWidth;          // Force le reflow
        canvas.classList.add('shake');    // Ajoute la classe pour l’animation
        setTimeout(() => {
            canvas.classList.remove('shake'); // Nettoie après l’anim
        }, 300);
    }
}

function bouncePage() {
    const canvas = document.getElementById('visqueuseCanvas');
    if (canvas) {
        canvas.classList.add('bounce');
        setTimeout(() => {
            canvas.classList.remove('bounce');
        }, 600); // Durée de l'animation
    }
}

const draggables = document.querySelectorAll(".draggable");
const dropTargets = document.querySelectorAll(".dropTarget");
const resultMessage = document.getElementById("resultMessage");

draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", draggable.dataset.target);
        draggable.classList.add("dragging");
    });

    draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging");
    });
});

dropTargets.forEach(target => {
    target.addEventListener("dragover", (e) => {
        e.preventDefault();
        target.classList.add("drag-over");
    });

    target.addEventListener("dragleave", () => {
        target.classList.remove("drag-over");
    });


    target.addEventListener("drop", (e) => {
        e.preventDefault();
        target.classList.remove("drag-over");

        const draggedTarget = e.dataTransfer.getData("text/plain");

        if (target.id === draggedTarget) {
            resultMessage.textContent = "Vrai !";
            resultMessage.style.color = "black";
            bouncePage()
            showSouffleTest.style.visibility = "visible";

        } else {
            resultMessage.textContent = "Faux.";
            resultMessage.style.color = "black";
            shakeCanvas();

        }

        // Optionnel : reset message après quelques secondes
        setTimeout(() => resultMessage.textContent = "", 2000);
    });

});
