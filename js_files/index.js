// grab the app data
// can connect to db later
globalAppData =  [
            ['Uber', 'Uber Technologies', 'Travel', 'Peer-to-peer ridesharing and food delivery platform'], 
            ['Trivago', 'Trivago Inc', 'Travel', 'Hotel: Trivago'],
            ['Raid Shadow Legends', 'Gamers International', 'Games', 'Bet you never saw one of our ads'],
            ['Minecraft', 'Mojang', 'Games', 'The best mining game']
        ]


// This part initally sets up event listeners to the nav bar and will correctly change color
// when clicked
var navBtns = document.getElementsByClassName("nav")
for (const element of navBtns) {
    element.addEventListener("click", (evt)=>{
        //console.log(evt.target.innerText)

        // change the class labels when clicked
        for(const element of navBtns) {
            if (element.innerText == evt.target.innerText) {
                element.classList.add("active")
                element.classList.remove("notactive")

                //console.log(element.innerText + "Div")
                document.getElementById(element.innerText + "Div").style.display = "block"

            } else {
                element.classList.add("notactive")
                element.classList.remove("active")

                //console.log(element.innerText + "Div")
                document.getElementById(element.innerText + "Div").style.display = "none"
            }
        }

    })
}


// the search functionality
document.getElementById("searchBtn").addEventListener("click", (evt)=>{
    var strInput = document.getElementById("searchBar").value

    // simulate clicking so it will return to home page
    var displayDiv = document.getElementById("homeNav")
    displayDiv.click()

    // super simple update which we will hook up to actual querying
    // document.getElementById("HomeDiv").innerText = strInput
    displayApps = globalAppData
    if (strInput != "") {
        // somefiltering here
        console.log("filter here")
    }

    // inner html
    displayHTML = ""
    for (i = 0; i < displayApps.length; i++) {
        displayHTML += "<div class='displayApps'>"
        displayHTML += displayApps[i][0]

        displayHTML += "</div>"
    }

    document.getElementById("HomeDiv").innerHTML = displayHTML
})


// Initialize the click
document.getElementById("searchBtn").click();

