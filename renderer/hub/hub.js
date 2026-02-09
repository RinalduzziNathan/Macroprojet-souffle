

const canvas = document.getElementById("canvasRive");
let riveInstance = null;

async function checkMicAndCamera() {
  const result = {
    microphone: { granted: false, error: null },
    camera:    { granted: false, error: null }
  };

  try {
    const streamMic = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    result.microphone.granted = true;
    streamMic.getTracks().forEach(track => track.stop()); // libère immédiatement
  } catch (err) {
    result.microphone.error = err.name; // ex: NotAllowedError, NotFoundError, etc.
    if (err.name === 'NotAllowedError') {
      // Permission refusée ou non demandée
    } else if (err.name === 'NotFoundError') {
      // Pas de micro détecté
    }
  }

  try {
    const streamCam = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
    result.camera.granted = true;
    streamCam.getTracks().forEach(track => track.stop());
  } catch (err) {
    result.camera.error = err.name;
  }

  return result;
}

checkMicAndCamera().then(status => {
  console.log('Micro :', status.microphone.granted ? 'OK' : 'Problème → ' + status.microphone.error);
  console.log('Caméra :', status.camera.granted ? 'OK' : 'Problème → ' + status.camera.error);

  // Affiche un message UI
  if (!status.microphone.granted) {
    alert("Le micro n'est pas autorisé. Va dans les paramètres système.");
  }
   if (!status.camera.granted) {
    alert("Le caméra n'est pas autorisé. Va dans les paramètres système.");
  }

});

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
