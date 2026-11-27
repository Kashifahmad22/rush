
// ======================================
// 1. APPLY THEME FUNCTION
// ======================================

function applyTheme(theme) {

    // Remove both dark and light classes
    document.body.classList.remove("dark", "light");

    // Add the selected theme class
    document.body.classList.add(theme);

    // Update the theme status on the UI
    document.getElementById("themeStatus").textContent =
        theme.toUpperCase() + " MODE";
}


// ======================================
// 2. GET SYSTEM THEME
// ======================================

function getSystemTheme() {

    // Check whether the operating system prefers dark mode
    return window.matchMedia("(prefers-color-scheme: dark)").matches

        // If true, return dark
        ? "dark"

        // Otherwise, return light
        : "light";
}


// ======================================
// 3. SET INITIAL THEME
// ======================================

function setInitialTheme() {

    // Get the previously saved theme from localStorage
    const savedTheme = localStorage.getItem("theme");

    // Apply saved theme if available
    // Otherwise, detect the operating system theme
    applyTheme(savedTheme || getSystemTheme());
}


// ======================================
// 4. SET INITIAL THEME
// ======================================

// Execute the initial theme function
setInitialTheme();


// ======================================
// 5. LISTEN TO SYSTEM THEME CHANGES
// ======================================

// Listen for changes in the operating system theme
window.matchMedia("(prefers-color-scheme: dark)")

    .addEventListener("change", () => {

        // Check whether the user has manually saved a theme
        if (!localStorage.getItem("theme")) {

            // If no saved preference exists,
            // apply the current system theme
            applyTheme(getSystemTheme());

        }

    });


// ======================================
// 6. THEME TOGGLE BUTTON
// ======================================

// Select the theme toggle button
document.querySelector("#themeToggle")

    .addEventListener("click", () => {

        // Check the currently applied theme
        const currentTheme =
            document.body.classList.contains("dark")
                ? "dark"
                : "light";

        // Switch to the opposite theme
        const newTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";

        // Apply the new theme
        applyTheme(newTheme);

        // Save the user's preference in localStorage
        localStorage.setItem("theme", newTheme);

    });


    //Why only strings works in localStorage
    // Because localStorage only stores data as strings.
    // If you try to store other types like objects or numbers,
    // they will be converted to strings automatically.

    //we can use JSON.stringify() to store objects as strings
    // and JSON.parse() to retrieve them back as objects.  

    // Example:
    // const user = { name: "John", age: 30 };
    // localStorage.setItem("user", JSON.stringify(user));
    // const retrievedUser = JSON.parse(localStorage.getItem("user"));