

const canvas = document.getElementById("canvasRive");
let riveInstance = null;

createRiveInstance();

function createRiveInstance() {
    riveInstance = new rive.Rive({
        src: "../rive/demogeo_accueil.riv",
        canvas: canvas,
        autoplay: true,
        stateMachines: "State Machine 1",
        layout: new rive.Layout({
            fit: rive.Fit.Contain,
            alignment: rive.Alignment.Center,
        }),
        onLoad: () => {
            riveInstance.resizeDrawingSurfaceToCanvas();
            riveEventCheck(riveInstance); // ✅ déplacer ici
        },
    });
}

// removed: rechargePage() -- not required; navigation now uses window.location


function resizeCanvasToViewport() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (riveInstance) {
        riveInstance.resizeDrawingSurfaceToCanvas();
    }
}

window.addEventListener("resize", resizeCanvasToViewport);




function riveEventCheck(riveInstance) {
    if (riveInstance) {
        riveInstance.on(rive.EventType.RiveEvent, onRiveEventReceived);
        function onRiveEventReceived(riveEvent) {
            const eventData = riveEvent.data;
            // console.log(riveInstance.stateMachineInputs("State Machine 1"));
            //  console.log("Rive Event received:", riveEvent.type, eventData.name);
            console.log("Event data:", eventData);
            if (eventData.name == "clicPangee") {
                // Open target in the same page
                window.location.href = "../pangee/pangee.html";
            }
            else if (eventData.name == "clicVolcan") {
                // Open target in the same page
                window.location.href = "../volcan/volcan.html";
            }
            else if (eventData.name == "clicTecto") {
                // Open target in the same page
                window.location.href = "../tectonique/tectonique.html";
            }
            else if (eventData.name == "clicSeisme") {
                // Open target in the same page
                window.location.href = "../seisme/seisme.html";
            }

            else if (eventData.name == "clicCredits") {
                // Open target in the same page
                window.location.href = "credits.html";
            }

            
        }
    }
}
