

const canvas = document.getElementById("canvasRive");
let riveInstance = new rive.Rive({
    src: "https://rinalduzzinathan.github.io/file-stash/rive/d%C3%A9mog%C3%A9o_accueil.riv",
    canvas: canvas,
    autoplay: true,
    stateMachines: "State Machine 1",
    onLoad: () => {
        resizeCanvasToViewport();
    },
});

function resizeCanvasToViewport() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (riveInstance) {
        riveInstance.resizeDrawingSurfaceToCanvas();
    }
}

window.addEventListener("resize", resizeCanvasToViewport);
resizeCanvasToViewport();



riveEventCheck(riveInstance);

function riveEventCheck(riveInstance) {
    if (riveInstance) {
        riveInstance.on(rive.EventType.RiveEvent, onRiveEventReceived);
        function onRiveEventReceived(riveEvent) {
            const eventData = riveEvent.data;
            // console.log(riveInstance.stateMachineInputs("State Machine 1"));
            //  console.log("Rive Event received:", riveEvent.type, eventData.name);
            console.log("Event data:", eventData);
            if (eventData.name == "clicPangee") {

                window.open("../pangee/pangeenew.html", "_blank");

            }
            else if (eventData.name == "clicVolcan") {
                window.open("../volcan/volcannvx.html", "_blank");
            }

            else if (eventData.name == "clicTecto") {

                window.open("../tectonique/tectoniquenvx.html", "_blank");
            }

            else if (eventData.name == "clicSeisme") {

                window.open("../seismeNVX/seismenewtest.html", "_blank");

            }
        }
    }
}
