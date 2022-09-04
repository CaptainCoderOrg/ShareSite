function handleResponse() {
    if (this.status === 200) {
        location.href = `vscode://captain-coder.adventures-in-c--extension/load-shared-program?program.cs=${this.responseText}`;
    }
    else
    {
        console.error(this.responseText);
        document.getElementById('header').innerHTML=`Could not load program: ${this.responseText}`;
    }
}

function loadURL() {
    // http://127.0.0.1:3000/index.html?id=9b34ddbd-a316-431d-b73f-5e7f7b33e2fe
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    let value = params.id; // "some_value"

    const Http = new XMLHttpRequest();
    Http.addEventListener("load", handleResponse);
    const url=`https://us-central1-introtocsharp-a5eeb.cloudfunctions.net/getLoadProgramURL?id=${value}`;
    Http.open("GET", url);
    Http.send();
}

window.addEventListener('load', loadURL);