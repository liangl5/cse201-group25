document.getElementById("searchBtn").addEventListener("click", (evt)=>{
    console.log(evt)
})


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
            } else {
                element.classList.add("notactive")
                element.classList.remove("active")
            }
        }

        // can add some changing parts here that unhides data
    })
}