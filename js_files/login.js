


document.getElementById("createAccBtn").addEventListener("click", ()=>{
    document.getElementById("createAccDiv").style.display = "block";
    document.getElementById("loginDiv").style.display = "none";
})

document.getElementById("loginBtn").addEventListener("click", ()=>{
    document.getElementById("createAccDiv").style.display = "none";
    document.getElementById("loginDiv").style.display = "block";
})

