


document.getElementById("createAccBtn").addEventListener("click", ()=>{
    document.getElementById("createAccDiv").style.display = "block";
    document.getElementById("loginDiv").style.display = "none";
});

document.getElementById("loginBtn").addEventListener("click", ()=>{
    document.getElementById("createAccDiv").style.display = "none";
    document.getElementById("loginDiv").style.display = "block";
});

// 
// xhr.onreadystatechange = function() {
//     if (xhr.readyState == XMLHttpRequest.DONE) {
//         var message = JSON.parse(xhr.responseText);

//         globalAppData = message["apps"];
//         document.getElementById("searchBtn").click();
//     }
// }
// xhr.open('GET', '/loadApps', true);
// xhr.send(null);


var create = document.getElementById("submitcreate")
create.addEventListener("click", ()=>{
    console.log("raete new acc");
    if (!login.classList.contains("submitting")) {
        login.classList.add("submitting");

    }
});

var login = document.getElementById("submitlogin")
login.addEventListener("click", ()=>{

    if (!login.classList.contains("submitting")) {
        login.classList.add("submitting");

        var emaildata = document.getElementById("login_email").value
        var passworddata = document.getElementById("login_password").value

        // basic email ensure
        // if

        data = {"email": emaildata, "password": passworddata}

        var xhr = new window.XMLHttpRequest()
        xhr.open('POST', '/login', true)
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
        xhr.send(JSON.stringify(data))


        xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            var accdata = JSON.parse(xhr.responseText);

            if (accdata.length == 0) {
                alert("Incorrect Login")
            } else {
                console.log("Successfully Logged In")
                console.log(accdata)
            }

            login.classList.remove("submitting");
            }
        }
    }    
    
});

