
window.addEventListener('DOMContentLoaded', (event) => {

    let menuBtn = document.getElementById("menuButton");
    menuBtn.style.visibility = "hidden"
    const souffle1 = document.getElementById("souffle1");
    const souffle2 = document.getElementById("souffle2");
    souffle1.style.visibility = "hidden";
    souffle2.style.visibility = "hidden";

    const startBouton = document.getElementById("startBouton");
    const boutonRestart = document.getElementById("boutonRestart");
    const timerDisplay = document.getElementById("timer");
    const riveCanvasVolcan = document.getElementById("riveCanvasVolcan");
    const visqueuseCanvas = document.getElementById("visqueuseCanvas");
    const volcanCircle = document.getElementById("volcanCircle");
    const volcanImage = document.getElementById("volcanImage");
    const soundRectangle = document.getElementById("soundRectangle");
    const titre = document.getElementById("titre");
    const explication = document.getElementById("explication");
    explication.style.visibility = "hidden";

    const annonce1 = document.getElementById("annonce1");
    annonce1.style.visibility = "hidden";
    const annonce2 = document.getElementById("annonce2");
    annonce2.style.visibility = "hidden";
    const annonce3 = document.getElementById("annonce3");
    annonce3.style.visibility = "hidden";
    const annonce4 = document.getElementById("annonce4");
    annonce4.style.visibility = "hidden";

    const texteEruption = document.getElementById("texteEruption");
    texteEruption.style.visibility = "hidden";
    const texteEruptionEffusive = document.getElementById("texteEruptionEffusive");
    texteEruptionEffusive.style.visibility = "hidden";
    const texteEruptionExplosive = document.getElementById("texteEruptionExplosive");
    texteEruptionExplosive.style.visibility = "hidden";
 
    const riveCanvasPlay = document.getElementById("riveCanvasPlay");
    riveCanvasPlay.style.visibility = "hidden";


    volcanCircle.style.visibility = "hidden";
    riveCanvasVolcan.style.visibility = "hidden";
    volcanImage.style.visibility = "hidden";
    soundRectangle.style.visibility = "hidden";
    boutonRestart.style.visibility = "hidden";
    var remplirTableau = false;
    var finTableau = false;

    const RectangleJaune = document.getElementById("RectangleJaune");
    RectangleJaune.style.visibility = "hidden";

    const RectangleJaune2 = document.getElementById("RectangleJaune2");
    RectangleJaune2.style.visibility = "hidden";
    const consignes2 = document.getElementById("consignes2");



    const RectangleBlanc = document.getElementById("RectangleBlanc");
    RectangleBlanc.style.visibility = "hidden";
    let activeColorChange = false;  // contrôle si la couleur doit changer en live

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


    let baseToEffu;
    let baseToExplo;
    let toBase;


    const r = new rive.Rive({
        src: "https://rinalduzzinathan.github.io/file-stash/rive/volcan_final.riv",
        canvas: document.getElementById("riveCanvasVolcan"),
        autoplay: true,
        stateMachines: "State Machine 1",
        onLoad: () => {
            r.resizeDrawingSurfaceToCanvas();
            // Récupère les inputs (dont les triggers)
            const inputs = r.stateMachineInputs('State Machine 1');
            baseToEffu = inputs.find(i => i.name === 'baseToEffu');
            baseToExplo = inputs.find(i => i.name === 'baseToExplo');
            toBase = inputs.find(i => i.name === 'toBase');



        },
    });



    r.on(rive.EventType.RiveEvent, (event) => {
        const data = event.data;
        if (data.type === rive.RiveEventType.General) {
            console.log("Event reçu : " + data.name);
            boutonRestart.style.visibility = "visible";
            if (toBase) toBase.fire();
            texteEruptionExplosive.style.visibility = "hidden";
            texteEruptionEffusive.style.visibility = "hidden";
        }
    });


    let baseToAnim;

    let visqueuseToBase;
    let slowFast;
    var artBoard;

    const rvisqueux = new rive.Rive({
        src: "https://rinalduzzinathan.github.io/file-stash/rive/visqueuseFix.riv",
        canvas: document.getElementById("visqueuseCanvas"),
        autoplay: true,
        stateMachines: "State Machine 1",
        onLoad: () => {
            rvisqueux.resizeDrawingSurfaceToCanvas();
            // Récupère les inputs (dont les triggers)
            console.log(rvisqueux);
            const inputs = rvisqueux.stateMachineInputs('State Machine 1');
            baseToAnim = inputs.find(i => i.name === 'baseToAnim');
            visqueuseToBase = inputs.find(i => i.name === 'visqueuseToBase');

            slowFast = inputs.find(i => i.name === 'slowFast');
            console.log(inputs);


        },
    });


    let toPlaymobiles, toEscape, toPhoto;


    const rPlay = new rive.Rive({
        src: "https://rinalduzzinathan.github.io/file-stash/rive/playmobil.riv",
        canvas: document.getElementById("riveCanvasPlay"),
        autoplay: true,
        stateMachines: "State Machine 1",
        onLoad: () => {
            rPlay.resizeDrawingSurfaceToCanvas();
            // Récupère les inputs (dont les triggers)
            const inputs = rPlay.stateMachineInputs('State Machine 1');
            toEscape = inputs.find(i => i.name === 'toEscape');
            toPlaymobiles = inputs.find(i => i.name === 'toPlaymobiles');
            toPhoto = inputs.find(i => i.name === 'toPhoto');

        },
    });





    const showAnimationButton = document.getElementById('showAnimationButton');
    showAnimationButton.style.visibility = "hidden"
    const showSouffleTest = document.getElementById('showSouffleTest');
    showSouffleTest.style.visibility = "hidden"
    const showRiveCircles = document.getElementById('showRiveCircles');
    showRiveCircles.style.visibility = "visible"
    visqueuseCanvas.style.visibility = "hidden";





    showRiveCircles.addEventListener('click', () => {

        document.getElementById("dragDropContainer").style.display = "block";
    
        RectangleJaune.style.animation = "none";
        RectangleJaune.offsetHeight; // trick pour forcer le reflow
        RectangleJaune.style.animation = null;

        RectangleJaune.style.visibility = "visible";
        RectangleBlanc.style.visibility = "visible";

        setTimeout(() => {
            RectangleBlanc.style.visibility = "hidden";
        }, 5000);


        showRiveCircles.style.visibility = "hidden";
        titre.style.visibility = "hidden";
        explication.style.visibility = "hidden";

        visqueuseCanvas.style.visibility = "visible";
        volcanImage.style.visibility = "hidden";
        soundRectangle.style.visibility = "hidden";
        volcanCircle.style.visibility = "hidden";
        showAnimationButton.style.visibility = "hidden"
    })

    showSouffleTest.addEventListener('click', () => {

        document.getElementById("dragDropContainer").style.display = "none"; // 👈 masquer les éléments


        showSouffleTest.style.visibility = "hidden";
        visqueuseCanvas.style.visibility = "hidden";

        showAnimationButton.style.visibility = "visible"
        souffle1.style.visibility = "visible";
        souffle2.style.visibility = "visible";

        RectangleJaune2.style.visibility = "visible";
        setTimeout(() => {
            document.getElementById('souffle1').classList.add('show');
        }, 1000); // 2000 ms = 2 secondes
        setTimeout(() => {
            document.getElementById('souffle2').classList.add('show');
        }, 1800); // 2000 ms = 2 secondes

        // Supprime et redémarre l'animation proprement
        consignes2.classList.remove("defilement");

        // Forcer le reflow : indispensable pour relancer proprement l'animation
        void consignes2.offsetWidth;

        // Puis on la relance
        consignes2.classList.add("defilement");

        activeColorChange = true;

    })

    showAnimationButton.addEventListener('click', () => {

        activeColorChange = false;
        document.body.style.backgroundColor = "white";
        RectangleJaune2.style.visibility = "hidden";
        volcanCircle.style.visibility = "visible";
        explication.style.visibility = "hidden";
        souffle1.style.visibility = "hidden";
        souffle2.style.visibility = "hidden";
        //texteEruption.style.visibility = "visible";
        // riveCanvasPlay.style.visibility = "visible";
        // if (toPlaymobiles) toPlaymobiles.fire();
        activeColorChange = false;

        setTimeout(() => {
            annonce1.style.visibility = "visible";
        }, 500);

        setTimeout(() => {
            annonce2.style.visibility = "visible";
        }, 1000);

        setTimeout(() => {
            annonce3.style.visibility = "visible";
        }, 1500);

        setTimeout(() => {
            annonce4.style.visibility = "visible";
        }, 2000);

        riveCanvasVolcan.style.visibility = "hidden";
        const volcanImage = document.getElementById('volcanImage');
        volcanImage.style.display = 'none';
        showAnimationButton.hidden = true;

        // Hide the sound rectangle
        const soundRectangle = document.getElementById('soundRectangle');
        soundRectangle.style.display = 'none';

        // Show the Start button
        const startBouton = document.getElementById('startBouton');
        startBouton.style.visibility = 'visible';


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

    menuBtn.addEventListener("click", () => {
        window.location.href = "../hub/hub.html";
    });



    startBouton.addEventListener("click", function () {
        menuBtn.style.visibility = "visible";
        console.log("startBouton clicked");
        riveCanvasVolcan.style.visibility = "visible";
        volcanCircle.style.visibility = "hidden";
        texteEruption.style.visibility = "hidden";

        if (toBase) toBase.fire();
        startTimer();
        startBouton.style.visibility = "hidden";

        annonce1.style.visibility = "hidden";
        annonce2.style.visibility = "hidden";
        annonce3.style.visibility = "hidden";
        annonce4.style.visibility = "hidden";

    });

    boutonRestart.addEventListener("click", function () {
        console.log("REstartBouton clicked");
        if (toBase) toBase.fire();
        //if (toPlaymobiles) toPlaymobiles.fire();
        startTimer();
        boutonRestart.style.visibility = "hidden";

    });

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
