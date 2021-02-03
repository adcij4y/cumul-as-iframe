
function onMessage(event) {
    if (document.URL !== event.origin) {
        console.log("Message Received from external domain", { thisDomain: document.URL, eventOrigin: event.origin });
    }
    console.log("Message Received", { event, messageData: event.data });
}

function emmitMessage(message) {
    if (window.parent) {
        window.parent.postMessage(message, "*");
    }
}

function postMessageToIframes(message) {
    if (window.frames.length) {
        console.log("-- Posting message to iFrame from Parent --")
        window.frames[0].window.postMessage(message, "*");
    }
}

function onDragover(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
}

function onDrop(ev) {
    console.log("🎯 Drop Handled", { ev, URL: document.URL });
    emmitMessage("Posted message: drop 🎯 occurred");
    ev.target.style.background = "";
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text/plain");
}

function onDragEnter(ev) {
    // highlight potential drop target when the draggable element enters it
    if (ev.target.className == "dropzone") {
        ev.target.style.background = "yellow";
    }
}

function onDragLeave(ev) {
    document.body.style.background = "#fff";
    // reset background of potential drop target when the draggable element leaves it
    if (ev.target.className == "dropzone") {
        ev.target.style.ackground = "";
    }
}

function onDragEnd(ev) {
    document.body.style.background = "#fff";
    // reset background of potential drop target when the draggable element leaves it
    if (ev.target.className == "dropzone") {
        ev.target.style.ackground = "";
    }
}

function onDragStart(ev) {
    console.clear();
    console.log("drag start", { ev, URL: document.URL });
    emmitMessage("Posted message: drag started");
    postMessageToIframes(`Parent received message. Sharing to iFrame: ${ev.data}`);
    ev.dataTransfer.setData("text/plain", `Dragging ${ev.target.id} ${ev.target.innerText}`);
    ev.dataTransfer.setData("text/html", ev.target.outerHTML);
    ev.dataTransfer.setData("text/uri-list", ev.target.ownerDocument.location.href);
}

function getDdTarget() {
    const ddTarget = document.createElement("p");
    ddTarget.id = "target";
    ddTarget.className = "dropzone";
    ddTarget.ondrop = onDrop;
    ddTarget.ondragover = onDragover;
    ddTarget.innerHTML = `DD Target`;
    return ddTarget;
}

function getDraggable() {
    const draggble = document.createElement("button");
    draggble.id = "draggble";
    draggble.draggable = "true";
    draggble.innerHTML = "Draggable";
    return draggble;
}

function getUrlDisplay() {
    const urlDisplay = document.createElement("p");
    urlDisplay.innerHTML = `URL: ${document.URL}`;
    return urlDisplay;
}

window.addEventListener("DOMContentLoaded", () => {
    const ddTarget = getDdTarget();
    const draggble = getDraggable();
    const urlDisplay = getUrlDisplay();

    document.body.append(urlDisplay);
    document.body.append(draggble);
    document.body.append(ddTarget);

    draggble.addEventListener("dragstart", onDragStart);
    document.addEventListener("dragenter", onDragEnter);
    document.addEventListener("dragleave", onDragLeave);
    document.addEventListener("dragend", onDragEnd);
    window.addEventListener("message", onMessage, false);

    /* events fired on the drop targets */
document.addEventListener("dragover", function(ev) {
    // prevent default to allow drop
    ev.preventDefault();
    document.body.style.background = "lightblue";
  }, false);
});
