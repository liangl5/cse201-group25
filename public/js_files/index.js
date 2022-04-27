// basic initialization
globalAppData = []
globalCommentData = []


function loadApps() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            var message = JSON.parse(xhr.responseText);

            globalAppData = message["apps"];
            globalCommentData = message["comments"]
            console.log(globalCommentData)
            document.getElementById("searchBtn").click();
        }
    }

    xhr.open('GET', '/loadApps', true);
    xhr.send(null);
}
loadApps();



// notification setup
var notification = document.getElementsByClassName("hover_bkgr_fricc")[0]
var notificationText = document.getElementsByClassName("popupText")[0]
document.getElementsByClassName("popupCloseButton")[0].addEventListener("click", ()=>{
    notification.style.display = "none";
});

var notification_corr = document.getElementsByClassName("hover_bkgr_fricc")[1]
var notificationText_corr = document.getElementsByClassName("popupText")[1]
document.getElementsByClassName("popupCloseButton")[1].addEventListener("click", ()=>{
    notification_corr.style.display = "none";
});


// login and out function
document.getElementById("logout").addEventListener("click", ()=>{
    eraseCookie("user_name");
    eraseCookie("privilege");
    renderLogin(false);
    window.location.reload();
});


// check for login cookie
var test = getCookie("user_name");
if (test==null) {
    console.log("no login cookie");
    renderLogin(false, test);
} else {
    console.log("yes login cookie")
    var test2 = 

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

        
        // enlarge / shrink button
        displayHTML += "<button state='expand' class='sizeChange' value='" + displayApps[i]["AppID"] + "'>&#129141;</button>"

        // comments        
        displayHTML += "<div class='commentSection' id='commentSection" + displayApps[i]["AppID"] + "'>" + updateComments(displayApps[i]["AppID"]) + "</div>"

        displayHTML += "</div>"
    }

    // nothing to display
    if (displayHTML == "") {
        displayHTML = "<p>No search results, try different keywords</p>"
    }
    document.getElementById("HomeDiv").innerHTML = displayHTML

    

    // update value of display apps so we can know which display apps was clicked
    var appsDiv = document.getElementsByClassName("displayApps");
    var sizeBtn = document.getElementsByClassName("sizeChange");
    var commentSection = document.getElementsByClassName("commentSection");
    for (var i = 0; i < appsDiv.length; i++) {
        appsDiv[i].value = displayApps[i]["AppID"]
        sizeBtn[i].state = "expand"
        commentSection.value = displayApps[i]["AppID"]
    }

    addListenersToApps();
});

// creates the commentSection
function updateComments(appID) {

    displayHTML = "<h3>Comments</h3><div class='commentBorder'>"

    for (j = 0; j < globalCommentData.length; j++) {
        if (globalCommentData[j].AppID == appID) {
            displayHTML += "<div class='comment' id='comment" + globalCommentData[j].CommentID + "'>"
            displayHTML += "<div class='commentHeader'>" + globalCommentData[j].UserName + " - " + globalCommentData[j].CommentDate.split("T")[0] + "</div>";
            displayHTML += "<div class='commentDetails'>'" + globalCommentData[j].Details + "'</div>";
            displayHTML += '<button class="commentDelete fa fa-trash" value="' + globalCommentData[j].AppID + ":" + globalCommentData[j].CommentID + '"></button>'
            displayHTML += '</div>'
        }
    }

    displayHTML += '<textarea class="commentInput" id="commentInput' + appID + '" placeholder="Type your comment" rows="4" cols="50"></textarea>'
    displayHTML += '<button class="commentSubmit" value="' + appID + '">Submit</button>'
    displayHTML += '</div>'


    return displayHTML
}


// adds listeners 
function addListenersToApps() {

    // checks whether or not we should display the delete button
    var deleteBtns = document.getElementsByClassName('commentDelete')
    var tempswitch = "none";
    if (getCookie('privilege')>0) {
        tempswitch = "inline"
        
    } 
    for (i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].style.display = tempswitch;
        deleteBtns[i].addEventListener("click", (e)=>{
            // delete comment
            var proceed = confirm("Are you sure you want to proceed?");

            if (proceed) {

                var AppID = e.target.value.split(":")[0]
                var CommentID = e.target.value.split(":")[1]


                data = {"AppID": AppID, "CommentID":CommentID}

                var xhr = new window.XMLHttpRequest()
                xhr.open('POST', '/removeComment', true)
                xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
                xhr.send(JSON.stringify(data))


                xhr.onreadystatechange = function() {
                    if (xhr.readyState == XMLHttpRequest.DONE) {
                        var accdata = JSON.parse(xhr.responseText);
                        if (accdata.error == 0) {
                        
                            updateNewComments(AppID)
                        }
                    }
                }
            }
        });
    }


    // listeners to the expand and shrink buttons
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

    // listeners to submit comment buttons
    var commentBtns = document.getElementsByClassName("commentSubmit")
    for (i = 0; i < commentBtns.length; i++) {
        commentBtns[i].addEventListener("click", (e)=>{

            // check to make sure valid comment
            if (document.getElementById("commentInput" + e.target.value).value.replace(/\s/g, '') == "") {
                notificationText.innerHTML = "Invalid Comment"
                notification.style.display = "inline";
            } else {
                // first check if there is a login cookie, otherwise we can't comment
                var test = getCookie("user_name");
                if (test==null) {
                    notificationText.innerHTML = "Login to comment"
                    notification.style.display = "inline";
                } else {
                    // make request here
                    var comment = document.getElementById("commentInput" + e.target.value).value

                    data = {"appID": e.target.value, "userName":test, "comment":comment}

                    var xhr = new window.XMLHttpRequest()
                    xhr.open('POST', '/addComment', true)
                    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
                    xhr.send(JSON.stringify(data))


                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == XMLHttpRequest.DONE) {
                            var accdata = JSON.parse(xhr.responseText);
                            if (accdata.error == 0) {

                                updateNewComments(e.target.value)
                            }
                        }
                    }
                }
            }
        });
    }
}

// separate load comment data in the case of adding a new comment
function updateNewComments(appID) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            var message = JSON.parse(xhr.responseText);
            globalCommentData = message["comments"]

            document.getElementById("commentSection" + appID).innerHTML = updateComments(appID)

            addListenersToApps()
        }
    }

    xhr.open('GET', '/loadComments', true);
    xhr.send(null);
}

// expands the app entries for comments
function expand(target, enlarge) {

    var apps = document.getElementsByClassName("displayApps")
    var commentSection = document.getElementsByClassName("commentSection")
    for (i = 0; i < apps.length; i++) {
        if (apps[i].value == target) {
            if (enlarge) {
                apps[i].classList.add("expand");
                commentSection[i].style.display = "inline";
            } else {
                apps[i].classList.remove("expand");
                commentSection[i].style.display = "none";
            }

        }
    }
}


document.getElementById("submitSubmission").addEventListener("click", ()=>{

    var name = document.getElementById("AppName").value
    var company = document.getElementById("AppCompany").value
    var category = document.getElementById("AppCategory").value
    var description = document.getElementById("AppDescription").value
    var images = document.getElementById("submissionLogo").files

    if (name.replace(/\s/g, '') == "" || company.replace(/\s/g, '') == "" || category.replace(/\s/g, '') == "" || description.replace(/\s/g, '') == "" || images.length == 0) {
        notificationText.innerHTML = "Invalid Submission"
        notification.style.display = "inline";
    } else {

        

        notificationText_corr.innerHTML = "Sucessful Submission"
        notification_corr.style.display = "inline";
    }
});


