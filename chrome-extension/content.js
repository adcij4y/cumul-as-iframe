
console.log("Content script loaded in " + document.URL);

function monitor(element) {
    var log = function(e) { console.log(e);};
    var events = [];
  
    for(var i in element) {
      if(i.startsWith("on")) events.push(i.substr(2));
    }
    events.forEach(function(eventName) {
      element.addEventListener(eventName, log);
    });
  }

let doc = document;
let domTarget = doc.querySelector("head");
        
if (domTarget.contentDocument) {
    doc  = domTarget.contentDocument;
    // move the dom target to the iframe head
    domTarget = domTarget.contentDocument.head;
}
console.log({doc});

(() => {
    let checkCount = 0;
    let scriptReady = false;
    let readyInterval = setInterval(() => {
        checkCount++;
        if (checkCount > 10) {
            window.clearInterval(readyInterval);
        }
        if (document.readyState === 'complete' && !scriptReady) {
            scriptReady = true;
            window.clearInterval(readyInterval);
            let studioScriptTag = doc.createElement("script");
            studioScriptTag.setAttribute("src", chrome.extension.getURL("integration-scripts/studio-in-cumul.js"));
            studioScriptTag.setAttribute("type", "text/javascript");
            studioScriptTag.setAttribute("id", "studio-in-cumul");
            domTarget.appendChild(studioScriptTag);  
        }
    }, 250);
     
})();
