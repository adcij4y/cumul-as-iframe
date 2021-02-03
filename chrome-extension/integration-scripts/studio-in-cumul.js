console.log("studio-in-cumul.js -- Hello!");

window.parent.postMessage("Hello from " + document.URL, "*");

window.addEventListener("message", (ev) => {
    window.parent.postMessage({ info: "Got message from postMessage", evData: ev.data, evOrigin: ev.origin}, "*");
});

document.addEventListener('click', (ev) => {
    window.parent.postMessage(ev.type + " Event from " + document.URL, "*");
});
document.addEventListener('mousemove', (ev) => {
    window.parent.postMessage(ev.type + " Event from " + document.URL, "*");
});
