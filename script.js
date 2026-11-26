let sel = document.querySelector("select");
let device = document.getElementById("device"); 

sel.addEventListener("change", function(dets) {
    device.textContent = `${dets.target.value} Device Selected `;

});