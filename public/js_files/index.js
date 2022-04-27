
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
    renderLogin(false, test);
} else {
    console.log("yes login cookie")
    renderLogin(true, test);
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


function renderLogin(isLoggedIn, name) {
    if (isLoggedIn) {
        document.getElementById("logout").style.display="inline";
        document.getElementById("loginBtn").style.display="none";

        document.getElementById("formNav").style.display="inline";
        document.getElementById("displayIGN").style.display="inline";
        document.getElementById("displayIGN").innerText = name;
    } else {
        document.getElementById("logout").style.display="none";
        document.getElementById("loginBtn").style.display="inline";

        document.getElementById("formNav").style.display="none";
        document.getElementById("displayIGN").style.display="none";
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
        var converted =  displayApps[i]["AppName"].toLowerCase().replace(/ /g,"_");

        displayHTML += "<div class='displayApps'>"

        // name
        displayHTML += "<h3 class='middle bottompadding'>" + displayApps[i]["AppName"] + "</h3>"

        // img
        displayHTML += '<img class="appImage" src="./imgs/' + converted + '.png" alt="' + converted + '">'

        // company name
        displayHTML += "<h4 class='left'>" + displayApps[i]["CompanyName"] + "</h4>"

        // Category
        displayHTML += "<h4 class='left bottompadding'>" + displayApps[i]["Category"] + "</h4>"

        // description
        displayHTML += "<p class='left'>" + displayApps[i]["AppDescription"] + "</p>"

        
        // englarge / shrink button
        displayHTML += "<button state='expand' class='sizeChange' value='" + converted + "'>&#129141;</button>"
        displayHTML += "</div>"
    }

    // nothing to display
    if (displayHTML == "") {
        displayHTML = "<p>No search results, try different keywords</p>"
    }
    document.getElementById("HomeDiv").innerHTML = displayHTML

    var appsDiv = document.getElementsByClassName("displayApps");
    var sizeBtn = document.getElementsByClassName("sizeChange");
    for (var i = 0; i < appsDiv.length; i++) {
        appsDiv[i].value = displayApps[i]["AppName"].toLowerCase().replace(/ /g,"_");
        sizeBtn[i].state = "expand"
    }

    addListenersToApps();
});


// allows for the shrink and expansion of app entries
function addListenersToApps() {
    var apps = document.getElementsByClassName("sizeChange")
    for (i = 0; i < apps.length; i++) {
        apps[i].addEventListener("click", (e)=>{
            console.log("click", e.target.state)
            // expand
            if (e.target.state == "expand") {
                e.target.innerHTML = "&#129143;";
                e.target.state = "shrink"
                expand(e.target.value, true);
                
            } else {
                e.target.innerHTML = "&#129141;";
                e.target.state = "expand"
                expand(e.target.value, false);
            }
            
        })
    }
}

// expands the app entries for comments
function expand(target, enlarge) {

    var apps = document.getElementsByClassName("displayApps")
    var commentSection = document.getElementsByClassName("commentSections")
    for (i = 0; i < apps.length; i++) {
        if (apps[i].value == target) {
            
            if (enlarge) {
                apps[i].classList.add("expand");
                commentSection[i].style.display = "inline";
            } else {
                apps[i].classList.remove("expand");
                commentSection[i].style.display = "hidden";
            }

        }
    }
}


// greyout div functionality

// function addListenersToApps() {
//     var images = document.getElementsByClassName("appImage")
//     for (i = 0; i < images.length; i++) {
//         images[i].addEventListener("click", (e)=>{
//             renderClickableEntries(e.target.alt);
//         })
//     }
// }

// function renderClickableEntries(app) {

//     var div = document.getElementById("greyoutDiv")
//     div.style.display = "inline";
    
//     document.getElementById("imageDiv").innerHTML = '<img id="emphasizedImage" src="./imgs/' + app + '.png">'

//     //document.getElementById("commentDiv").innerHTML = '<form action="/html/tags/html_form_tag_action.cfm" method="post"><div><textarea name="comments" id="comments" style="font-family:sans-serif;font-size:1.2em;">Hey... say something!</textarea></div><input type="submit" value="Submit"></form>'


// }
// // Initialize the click
// // document.getElementById("searchBtn").click();

// document.getElementById("exitZoom").addEventListener("click", ()=>{
//     document.getElementById("greyoutDiv").style.display = "none";
// });
