
// Select the email input field
let email = document.querySelector("#email");

// Select the password input field
let password = document.querySelector("#password");

// Select the form element
let form = document.querySelector("form");


// Add an event listener that runs when the form is submitted
form.addEventListener("submit", function (event) {

    // Prevent the form from refreshing/reloading the page
    event.preventDefault();


    // Clear previous email error messages
    document.querySelector("#emailError").textContent = "";

    // Clear previous password error messages
    document.querySelector("#passwordError").textContent = "";


    // Regular expression for validating email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    // Regular expression for validating password
    // (?=.*[a-z])       At least one lowercase letter
    // (?=.*[A-Z])       At least one uppercase letter
    // (?=.*\d)          At least one digit
    // (?=.*[@$!%*?&#^]) At least one special character
    // [A-Za-z\d@$!%*?&#^]{8,} Minimum 8 allowed characters

    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/;


    // Check whether the email matches the email regex
    let emailans = emailRegex.test(email.value);

    // Check whether the password matches the password regex
    let passwordans = passwordRegex.test(password.value);


    // Assume the form is valid initially
    let isValid = true;


    // If email validation fails
    if (!emailans) {

        // Display email error message
        document.querySelector("#emailError").textContent =
            "Email is incorrect";

        // Make the error message visible
        document.querySelector("#emailError").style.display = "initial";

        // Mark the entire form as invalid
        isValid = false;
    }


    // If password validation fails
    if (!passwordans) {

        // Display password error message
        document.querySelector("#passwordError").textContent =
            "Password is incorrect";

        // Make the error message visible
        document.querySelector("#passwordError").style.display = "initial";

        // Mark the entire form as invalid
        isValid = false;
    }


    // If both email and password are valid
    if (isValid) {

        // Display success message
        document.querySelector("#resultMessage").textContent =
            "Everything is correct";
    }

});
    