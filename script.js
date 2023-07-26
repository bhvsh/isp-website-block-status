async function fetchUrl() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        let domain = url.split('/')[2];
        document.getElementById("currentDomain").innerHTML=domain;

        fetch('https://raw.githubusercontent.com/qurbat/blocked-hosts/main/compiled_block_list.txt')
        .then(response => response.text())
        .then(text => text.split(/\r?\n/))
        .then(text => 
            {
                if (text.includes(domain)) {
                    document.getElementById("blockStatus").innerHTML="Blocked";
                }
                else {
                    document.getElementById("blockStatus").innerHTML="Not Blocked";
                }
            })
        .catch(err => console.log('Error: ', err));

    });
}
fetchUrl();