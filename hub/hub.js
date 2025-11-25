

const canvas = document.getElementById("canvasRive");
let riveInstance = null;

createRiveInstance();

function createRiveInstance() {
    riveInstance = new rive.Rive({
        src: "https://rinalduzzinathan.github.io/file-stash/rive/demogeo_accueil2.riv",
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




function riveEventCheck(riveInstance) {
    if (riveInstance) {
        riveInstance.on(rive.EventType.RiveEvent, onRiveEventReceived);
        function onRiveEventReceived(riveEvent) {
            const eventData = riveEvent.data;
            // console.log(riveInstance.stateMachineInputs("State Machine 1"));
            //  console.log("Rive Event received:", riveEvent.type, eventData.name);
            console.log("Event data:", eventData);
            if (eventData.name == "clicPangee") {

                window.open("../pangee/pangee.html", "_blank");
                rechargePage();
            }
            else if (eventData.name == "clicVolcan") {
                window.open("../volcan/volcan.html", "_blank");
                rechargePage();
            }
            else if (eventData.name == "clicTecto") {

                window.open("../tectonique/tectonique.html", "_blank");
                rechargePage();
            }
            else if (eventData.name == "clicSeisme") {

                window.open("../seisme/seisme.html", "_blank");
                rechargePage
            }
        }
    }
}
