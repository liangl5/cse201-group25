


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



document.getElementById("searchBtn").addEventListener("click", (evt)=>{
    var strInput = document.getElementById("searchBar").value

    // simple check to make sure that not just the input string
    if (strInput != "") { 
        // simulate clicking so it will return to home page
        var displayDiv = document.getElementById("homeNav")
        displayDiv.click()

        // super simple update which we will hook up to actual querying
        document.getElementById("HomeDiv").innerText = strInput
    }
})