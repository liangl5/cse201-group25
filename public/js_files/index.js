
// basic initialization
globalAppData =  []

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        var message = JSON.parse(xhr.responseText);

        globalAppData = message["apps"];
        document.getElementById("searchBtn").click();
    }
}
xhr.open('GET', '/loadApps', true);
xhr.send(null);


// login and out function
document.getElementById("logout").addEventListener("click", ()=>{
    eraseCookie("user_name");
    renderLogin(false);
    window.location.reload();
});


var test = getCookie("user_name");
if (test==null) {
    console.log("no login cookie");
    renderLogin(false);
} else {
    console.log("yes login cookie")
    renderLogin(true);
}




// how to deal with cookies
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}


function renderLogin(isLoggedIn) {
    if (isLoggedIn) {
        document.getElementById("logout").style.display="inline";
        document.getElementById("loginBtn").style.display="none";
    } else {
        document.getElementById("logout").style.display="none";
        document.getElementById("loginBtn").style.display="inline";
    }
}


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
            appName = globalAppData[i]["AppName"].toLowerCase()
            category = globalAppData[i]["Category"].toLowerCase()

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
        displayHTML += "<h3 class='middle bottompadding'>" + displayApps[i]["AppName"] + "</h3>"

        // img
        var converted =  displayApps[i]["AppName"].toLowerCase().replace(/ /g,"_");
        displayHTML += '<img class="appImage" src="./imgs/' + converted + '.png" alt="' + converted + '">'

        // company name
        displayHTML += "<h4 class='left'>" + displayApps[i]["CompanyName"] + "</h4>"

        // Category
        displayHTML += "<h4 class='left bottompadding'>" + displayApps[i]["Category"] + "</h4>"

        // description
        displayHTML += "<p class='left'>" + displayApps[i]["AppDescription"] + "</p>"

        displayHTML += "</div>"
    }

    // nothing to display
    if (displayHTML == "") {
        displayHTML = "<p>No search results, try different keywords</p>"
    }
    document.getElementById("HomeDiv").innerHTML = displayHTML

    addListenersToApps();
})


function addListenersToApps() {
    var images = document.getElementsByClassName("appImage")
    for (i = 0; i < images.length; i++) {
        images[i].addEventListener("click", (e)=>{
            renderClickableEntries(e.target.alt);
        })
    }
}

function renderClickableEntries(app) {

    var div = document.getElementById("greyoutDiv")
    div.style.display = "inline";
    
    displayHTML = '<img id="emphasizedImage" src="./imgs/' + app + '.png">'



    div.innerHTML = displayHTML;
}
// Initialize the click
// document.getElementById("searchBtn").click();

document.getElementById("greyoutDiv").addEventListener("click", ()=>{
    document.getElementById("greyoutDiv").style.display = "none";
});
