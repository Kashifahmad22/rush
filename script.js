let inp = document.querySelector("input")
let span = document.querySelector("span")

inp.addEventListener("input", function() {

    let left = 20 - inp.value.length;
    if (left < 0) {
       span.textContent = left; 
       span.style.color = "red";
    } else {
       span.textContent = left;
       span.style.color = "black";
    }

});

//diff btw capturing phase and bubbling phase
//capturing phase: event propagates from top level element to the target element
//bubbling phase: event propagates from target element to the top level element

//diff between event and event listener
//event: an occurrence in the DOM that can be detected and handled
//event listener: a function that waits for a specific event to occur and executes when it does     