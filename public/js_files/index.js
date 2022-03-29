// grab the app data
// can connect to db later
globalAppData =  []

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        var apps = JSON.parse(xhr.responseText);

        globalAppData = apps["apps"]
        document.getElementById("searchBtn").click();
    }
}
xhr.open('GET', '/loadApps', true);
xhr.send(null);






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
    var strInput = document.getElementById("searchBar").value.trim().toLowerCase()

    // simulate clicking so it will return to home page
    var displayDiv = document.getElementById("homeNav")
    displayDiv.click()

    // super simple update which we will hook up to actual querying
    // document.getElementById("HomeDiv").innerText = strInput
    displayApps = []
    if (strInput != "") {
        // somefiltering here
        for (i = 0; i < globalAppData.length; i++) {
            // filter by name and category
            appName = globalAppData[i][0].toLowerCase()
            category = globalAppData[i][2].toLowerCase()

            if (appName.includes(strInput) || category.includes(strInput)) {
                displayApps.push(globalAppData[i])
            }
            
        }
    } else {
        displayApps = globalAppData
    }

    // inner html
    displayHTML = ""
    for (i = 0; i < displayApps.length; i++) {
        displayHTML += "<div class='displayApps'>"

        // name
        displayHTML += "<h3 class='left bottompadding'>" + displayApps[i][0] + "</h3>"

        // company name
        displayHTML += "<h4 class='left'>" + displayApps[i][1] + "</h4>"

        // Category
        displayHTML += "<h4 class='left bottompadding'>" + displayApps[i][2] + "</h4>"

        // description
        displayHTML += "<p class='left'>" + displayApps[i][3] + "</p>"

        displayHTML += "</div>"
    }

    // nothing to display
    if (displayHTML == "") {
        displayHTML = "<p>No search results, try different keywords</p>"
    }
    document.getElementById("HomeDiv").innerHTML = displayHTML
})


// Initialize the click
// document.getElementById("searchBtn").click();

