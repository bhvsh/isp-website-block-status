async function fetchUrl() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        let domain = url.split('/')[2];
        document.getElementById("currentDomain").innerHTML=domain;
    });
}
fetchUrl();