var id = undefined;

function handleResponse() {
    if (this.status === 200) {
        document.getElementById("header").innerHTML = "Code Preview:"
        const el = document.getElementById("code-area");
        const response = JSON.parse(this.response);
        const VSCodeLink = `vscode://captain-coder.adventures-in-c--extension/load-shared-program?id=${id}`;
        el.innerHTML = Base64.decode(response.result.code);
        hljs.highlightElement(el);
        document.getElementById("code-block").style.display = "block";
        document.getElementById("link").href = VSCodeLink;

    } else {
        const error = JSON.parse(this.response);
        console.error(error);
        document.getElementById('header').innerHTML = `Could not load program: ${error.result}`;
    }
}

function loadURL() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    id = params.id;

    const Http = new XMLHttpRequest();
    Http.addEventListener("load", handleResponse);
    const url = `https://us-central1-introtocsharp-a5eeb.cloudfunctions.net/getLoadProgramURL?id=${id}`;
    Http.open("GET", url);
    Http.send();
}

window.addEventListener('load', loadURL);