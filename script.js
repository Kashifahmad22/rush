let btn = document.querySelector("#btn");        
 //yaha pe document.getelemetbyId tha jisse ham element ko select kar rahe the, 
 // ab querySelector se select kar rahe hain.getElementById ki jagah querySelector use kar rahe hain kyuki querySelector zyada flexible hai aur CSS selectors ka use kar sakte hain. jabki getelementbyId sirf id ke liye kaam karta hai.
let fileinp = document.querySelector("#fileinp");

btn.addEventListener("click", function () {
    fileinp.click();
}); 

fileinp.addEventListener("change", function (dets) {
    //console.log(dets); // yaha pe change event ke details ko console me print kar rahe hain. dets me file ke baare me information hoti hai.

   // console.log(fileinp.files); // yaha pe selected file ke details ko console me print kar rahe hain. fileinp.files me selected file ke baare me information hoti hai. 

   // btn.textContent = dets.target?.files[0].name; // yaha pe selected file ka naam button ke text me set kar rahe hain. dets.target.files[0] me selected file ka pehla element hota hai aur uska name property file ka naam deta hai.

    




});