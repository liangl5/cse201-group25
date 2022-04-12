// swapping between the two forms
document.getElementById("createAccBtn").addEventListener("click", ()=>{
    document.getElementById("createAccDiv").style.display = "block";
    document.getElementById("loginDiv").style.display = "none";
});

document.getElementById("loginBtn").addEventListener("click", ()=>{
    document.getElementById("createAccDiv").style.display = "none";
    document.getElementById("loginDiv").style.display = "block";
});

// red
var notification = document.getElementsByClassName("hover_bkgr_fricc")[0]
var notificationText = document.getElementsByClassName("popupText")[0]

// green
var notification_corr = document.getElementsByClassName("hover_bkgr_fricc")[1]
var notificationText_corr = document.getElementsByClassName("popupText")[1]
//notification_corr.style.backgroundColor = "rgb(118, 221, 131)";


document.getElementsByClassName("popupCloseButton")[0].addEventListener("click", ()=>{
    notification.style.display = "none";
});

document.getElementsByClassName("popupCloseButton")[1].addEventListener("click", ()=>{
    notification_corr.style.display = "none";
});


// create account
var create = document.getElementById("submitcreate")
create.addEventListener("click", ()=>{
    
    if (!create.classList.contains("submitting")) {
        create.classList.add("submitting");
        
        var username = document.getElementById("create_username").value
        var email = document.getElementById("create_email").value
        var password = document.getElementById("create_password").value

        // checks, too lazy to check spaces which could be an issue
        if (email=="" || password=="" || username=="" || !email.includes("@") || !email.includes(".")) {
            notificationText.innerHTML = "Invalid Email"
            notification_corr.style.display = "none";
            notification.style.display = "inline";
            create.classList.remove("submitting");
        } else {
        

            data = {"username": username, "email": email, "password": password}

            // post request, send data
            var xhr = new window.XMLHttpRequest()
            xhr.open('POST', '/createAccount', true)
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
            xhr.send(JSON.stringify(data))


            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    var accdata = JSON.parse(xhr.responseText);
                    console.log(accdata)

                    // throw error
                    if (accdata["error"]) {
                        notificationText.innerHTML =  accdata["message"]
                        notification_corr.style.display = "none";
                        notification.style.display = "inline";
                    } else {
                        notificationText_corr.innerHTML =  accdata["message"]
                        notification.style.display = "none";
                        notification_corr.style.display = "inline";
                    }

                    create.classList.remove("submitting");
                }
            }
        }
        
    }
});


// login to your account
var login = document.getElementById("submitlogin")
login.addEventListener("click", ()=>{

    if (!login.classList.contains("submitting")) {
        login.classList.add("submitting");

        var email = document.getElementById("login_email").value
        var password = document.getElementById("login_password").value

        // checks, too lazy to check spaces which could be an issue
        if (email=="" || password=="" || !email.includes("@") || !email.includes(".")) {
            notificationText.innerHTML = "Invalid Login Credentials"
            notification.style.display = "inline";
            login.classList.remove("submitting");

        } else {
            data = {"email": email, "password": password}

            var xhr = new window.XMLHttpRequest()
            xhr.open('POST', '/login', true)
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
            xhr.send(JSON.stringify(data))


            xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                var accdata = JSON.parse(xhr.responseText);

                // incorrect login
                if (accdata.length == 0) {
                    notificationText.innerHTML = "Incorrect Login"
                    notification.style.display = "inline";
                    notification_corr.style.display = "none";

                // correct login
                } else {
                    window.location = "/"; // need to add cookie / login functionality
                }

                login.classList.remove("submitting");
                }
            }
        }
    }    
    
});

