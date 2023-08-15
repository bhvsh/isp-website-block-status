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
                if (text.includes(domain) || text.includes(domain.replace('www.',''))) {
                    document.getElementById("blockStatusACT").innerHTML="Blocked";
                    document.getElementById("blockStatusACT").className = "red";
                }
                else {
                    document.getElementById("blockStatusACT").innerHTML="Not Blocked";
                    document.getElementById("blockStatusACT").className = "green";
                }
            })
            .catch(err => {
                console.log('Error: ', err);
                document.getElementById("blockStatusACT").innerHTML="Could not load list";
                document.getElementById("blockStatusACT").className = "red";
                document.getElementById("repoBadgeACT").innerHTML = "Open list";
            });

        fetch('https://raw.githubusercontent.com/captn3m0/airtel-blocked-hosts/airtel-fiber/airtel-fiber-blocked-hosts.txt')
        .then(response => response.text())
        .then(text => text.split(/\r?\n/))
        .then(text => 
            {
                if (text.includes(domain) || text.includes(domain.replace('www.',''))) {
                    document.getElementById("blockStatusAirtel").innerHTML="Blocked";
                    document.getElementById("blockStatusAirtel").className = "red";
                }
                else {
                    document.getElementById("blockStatusAirtel").innerHTML="Not Blocked";
                    document.getElementById("blockStatusAirtel").className = "green";
                }
            })
        .catch(err => {
            console.log('Error: ', err);
            document.getElementById("blockStatusAirtel").innerHTML="Could not load list";
            document.getElementById("blockStatusAirtel").className = "red";
            document.getElementById("repoBadgeAirtel").innerHTML = "Open list";
        });

    });
}
fetchUrl();