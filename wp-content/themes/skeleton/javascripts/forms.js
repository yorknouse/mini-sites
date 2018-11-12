function resizeIframe(iframe) {
    iframe.height = iframe.contentWindow.document.body.scrollHeight + "px";
}

function resizeFormMsg(event) {
    if (event.origin != window.location.origin) return;
    window.document.getElementById("nouseform").height = event.data + "px";
    window.document.getElementById("nouseform").style.display = "block";
    window.document.getElementById("formloader").style.display = "none";
}

window.addEventListener("message", resizeFormMsg, false);

jQuery(document).ready(function ($) {
    window.document.getElementById("nouseform").style.display = "none";
    
    if (window.location.href.indexOf("?") >= 0) {
        var headers = window.location.href.split("?")[1];
        window.document.getElementById("nouseform").src += "?" + headers;
    }
});