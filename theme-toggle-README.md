# Dark / Light Theme Toggle with JavaScript

A practical guide to creating a theme toggle that detects the operating
system's colour scheme, saves a manual preference, and follows OS
changes only when no manual preference is stored.

## 1. Project structure

``` text
Theme-Toggle/
├── index.html
├── style.css
└── script.js
```

## 2. How it works

1.  Check `localStorage` for a saved theme (`dark` or `light`).
2.  If a valid saved theme exists, apply it.
3.  Otherwise, detect the operating system theme using `matchMedia()`.
4.  Listen for OS theme changes.
5.  Follow OS changes only when there is no saved manual preference.
6.  When the user toggles the theme, save the selected preference.

  Situation                           Expected behaviour
  ----------------------------------- ----------------------------------
  First visit, OS is Dark             Start in Dark mode
  First visit, OS is Light            Start in Light mode
  User clicks toggle                  Switch theme and save preference
  OS changes after manual selection   Keep saved preference
  User returns later                  Restore saved preference
  Saved preference is removed         Follow OS theme again

## 3. HTML --- `index.html`

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dark Light Theme Toggle</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="container">

        <header>
            <h1>Theme Toggle</h1>
            <button id="themeToggle">Toggle Theme</button>
        </header>

        <main>
            <div class="card">
                <h2>Welcome to My Website!</h2>
                <p>This is a demonstration of Dark and Light theme switching using JavaScript.</p>
                <p>Your theme preference will be saved in localStorage.</p>
            </div>

            <div class="card">
                <h2>How it works?</h2>
                <p>The website detects your system theme when no manual preference has been saved.</p>
            </div>

            <div class="theme-info">
                <h3>Current Theme:</h3>
                <p id="themeStatus">Loading...</p>
            </div>
        </main>

        <footer>
            <p>Built with HTML, CSS and JavaScript</p>
        </footer>

    </div>

    <script src="script.js"></script>
</body>
</html>
```

## 4. CSS --- `style.css`

CSS variables let us change multiple colours by applying one class to
the body.

``` css
/* Default Light Theme */
body.light {
    --bg-color: #f1f5f9;
    --card-color: #ffffff;
    --text-color: #1e293b;
    --secondary-text: #64748b;
    --button-bg: #2563eb;
    --button-text: #ffffff;
    --border-color: #e2e8f0;
}

/* Dark Theme */
body.dark {
    --bg-color: #0f172a;
    --card-color: #1e293b;
    --text-color: #f8fafc;
    --secondary-text: #cbd5e1;
    --button-bg: #3b82f6;
    --button-text: #ffffff;
    --border-color: #334155;
}

/* Universal styling */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Body */
body {
    font-family: Arial, sans-serif;
    background-color: var(--bg-color);
    color: var(--text-color);
    min-height: 100vh;

    transition:
        background-color 0.3s ease,
        color 0.3s ease;
}

/* Main container */
.container {
    max-width: 900px;
    margin: auto;
    padding: 30px;
}

/* Header */
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
}

h1 {
    font-size: 28px;
}

/* Toggle button */
button {
    background-color: var(--button-bg);
    color: var(--button-text);
    border: none;
    border-radius: 8px;
    padding: 12px 20px;
    font-size: 15px;
    cursor: pointer;
    transition: opacity 0.3s ease;
}

button:hover {
    opacity: 0.85;
}

/* Main content */
main {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

/* Cards */
.card {
    background-color: var(--card-color);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 25px;

    transition:
        background-color 0.3s ease,
        border-color 0.3s ease;
}

.card h2 {
    margin-bottom: 15px;
}

.card p {
    color: var(--secondary-text);
    line-height: 1.7;
    margin-bottom: 10px;
}

/* Theme information */
.theme-info {
    background-color: var(--card-color);
    padding: 20px;
    border-radius: 10px;
    border: 1px solid var(--border-color);
}

.theme-info h3 {
    margin-bottom: 10px;
}

.theme-info p {
    color: var(--secondary-text);
}

/* Footer */
footer {
    text-align: center;
    margin-top: 40px;
    color: var(--secondary-text);
}

/* Mobile responsive */
@media (max-width: 600px) {
    .container {
        padding: 20px;
    }

    header {
        flex-direction: column;
        gap: 20px;
    }
}
```

## 5. JavaScript --- `script.js`

``` javascript
// ======================================
// 1. APPLY THEME FUNCTION
// ======================================

function applyTheme(theme) {

    // Remove both dark and light classes from the body
    document.body.classList.remove("dark", "light");

    // Add the selected theme class
    document.body.classList.add(theme);

    // Update the theme status displayed in the UI
    document.getElementById("themeStatus").textContent =
        theme.toUpperCase() + " MODE";
}


// ======================================
// 2. GET SYSTEM THEME
// ======================================

function getSystemTheme() {

    // Check whether the OS prefers dark mode
    return window.matchMedia("(prefers-color-scheme: dark)").matches

        // If matches is true, return dark
        ? "dark"

        // Otherwise, return light
        : "light";
}


// ======================================
// 3. SET INITIAL THEME
// ======================================

function setInitialTheme() {

    // Retrieve the previously saved theme
    const savedTheme = localStorage.getItem("theme");

    // Accept only the values dark or light
    const validTheme =
        savedTheme === "dark" || savedTheme === "light";

    // Use the saved theme if valid; otherwise use the OS theme
    applyTheme(validTheme ? savedTheme : getSystemTheme());
}


// ======================================
// 4. APPLY INITIAL THEME
// ======================================

// Run the initial theme setup
setInitialTheme();


// ======================================
// 5. LISTEN TO SYSTEM THEME CHANGES
// ======================================

// Create a MediaQueryList for the OS colour preference
const systemThemeQuery =
    window.matchMedia("(prefers-color-scheme: dark)");

// Listen for changes in the OS theme
systemThemeQuery.addEventListener("change", () => {

    // Check whether a valid manual preference is saved
    const savedTheme = localStorage.getItem("theme");

    // Follow the OS only when no valid manual preference exists
    if (savedTheme !== "dark" && savedTheme !== "light") {

        // Apply the newly selected OS theme
        applyTheme(getSystemTheme());
    }
});


// ======================================
// 6. THEME TOGGLE BUTTON
// ======================================

// Select the theme toggle button
document.querySelector("#themeToggle")
    .addEventListener("click", () => {

        // Check which theme is currently applied
        const currentTheme =
            document.body.classList.contains("dark")
                ? "dark"
                : "light";

        // Choose the opposite theme
        const newTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";

        // Apply the newly selected theme
        applyTheme(newTheme);

        // Save the user's manual preference
        localStorage.setItem("theme", newTheme);
    });


// ======================================
// 7. FOLLOW SYSTEM THEME BUTTON (OPTIONAL)
// ======================================

// Add a button with id="systemTheme" to HTML to use this feature
const systemThemeButton = document.querySelector("#systemTheme");

if (systemThemeButton) {
    systemThemeButton.addEventListener("click", () => {

        // Remove the manual preference
        localStorage.removeItem("theme");

        // Immediately apply the current OS theme
        applyTheme(getSystemTheme());
    });
}
```

## 6. Understanding the important JavaScript concepts

### A. `classList.remove()` and `classList.add()`

``` javascript
document.body.classList.remove("dark", "light");
document.body.classList.add("dark");
```

-   `classList.remove()` removes classes from an HTML element.
-   `classList.add()` adds a class to an HTML element.
-   Both theme classes are removed first, then the selected theme is
    applied.

For example, the body becomes:

``` html
<body class="dark">
```

The CSS selector `body.dark` now applies the dark theme variables.

### B. `window.matchMedia()`

``` javascript
window.matchMedia("(prefers-color-scheme: dark)").matches;
```

Checks whether the operating system or browser environment prefers dark
mode.

  System preference   `.matches`
  ------------------- ------------
  Dark mode           `true`
  Light mode          `false`

`matchMedia()` returns a `MediaQueryList` object. Its `.matches`
property tells whether the query currently matches.

### C. `localStorage`

Save a preference:

``` javascript
localStorage.setItem("theme", "dark");
```

Retrieve a preference:

``` javascript
localStorage.getItem("theme");
```

Remove a saved preference:

``` javascript
localStorage.removeItem("theme");
```

Clear all local storage for the current website:

``` javascript
localStorage.clear();
```

**Important:** `localStorage` persists across page reloads and browser
restarts. It is scoped to the website's origin.

### D. Logical OR (`||`)

``` javascript
applyTheme(savedTheme || getSystemTheme());
```

This means: - If `savedTheme` is truthy, use it. - Otherwise, call
`getSystemTheme()`.

Equivalent `if-else`:

``` javascript
if (savedTheme) {
    applyTheme(savedTheme);
} else {
    applyTheme(getSystemTheme());
}
```

The complete implementation validates the saved value before applying
it, so an unexpected value does not become a theme class.

### E. `classList.contains()`

``` javascript
document.body.classList.contains("dark");
```

Checks whether the body currently has the `dark` class.

-   Returns `true` if the class exists.
-   Returns `false` if it does not exist.

### F. Ternary operator

``` javascript
const newTheme =
    currentTheme === "dark" ? "light" : "dark";
```

Equivalent to:

``` javascript
let newTheme;

if (currentTheme === "dark") {
    newTheme = "light";
} else {
    newTheme = "dark";
}
```

### G. `addEventListener("change")`

``` javascript
systemThemeQuery.addEventListener("change", () => {
    applyTheme(getSystemTheme());
});
```

-   Adds a listener to the media query.
-   The callback runs when the OS colour preference changes.
-   In the full implementation, localStorage is checked first so a
    manual theme is not overwritten.

## 7. Execution flow

``` text
Website opens
     |
     v
Check localStorage
     |
     v
Is a valid saved theme available?
     |
     |----------------------|
     |                      |
    YES                     NO
     |                      |
     v                      v
Apply saved theme      Detect OS theme
                            |
                            v
                      Apply OS theme
     |                      |
     |----------------------|
                |
                v
       Listen for OS changes
                |
                v
       Has user saved a theme?
                |
          |-----------|
          |           |
         YES          NO
          |           |
          v           v
    Keep saved     Follow OS
      theme         changes
```

## 8. Testing the implementation

  -----------------------------------------------------------------------
  Scenario                            Expected result
  ----------------------------------- -----------------------------------
  First visit, OS is Dark             Website starts in Dark mode

  First visit, OS is Light            Website starts in Light mode

  User clicks Toggle Theme            Theme changes and is saved

  User changes OS theme after manual  Website keeps the manually selected
  selection                           theme

  User closes and reopens the website Saved theme is restored

  User removes the saved preference   Website follows the OS theme again
  -----------------------------------------------------------------------

To reset the experiment, open the browser console and run:

``` javascript
localStorage.removeItem("theme");
location.reload();
```

The website will now follow the operating system theme.

## 9. Practice challenge: Follow System Theme button

Add this button inside the HTML body:

``` html
<button id="systemTheme">Follow System Theme</button>
```

The optional JavaScript handler is already included in `script.js`. It:

1.  Removes the manually saved preference.
2.  Applies the current operating system theme immediately.
3.  Allows future OS theme changes to update the website.

The user can now choose between: - **Manual mode:** The selected theme
is saved and OS changes are ignored. - **System mode:** The saved
preference is removed and the website follows OS changes.

## 10. Quick revision sheet

  Concept                       Purpose
  ----------------------------- ----------------------------------------------
  `classList.add()`             Add a CSS class
  `classList.remove()`          Remove CSS classes
  `classList.contains()`        Check whether a class exists
  `window.matchMedia()`         Check a media query
  `.matches`                    Check whether the media query matches
  `addEventListener()`          Listen for an event
  `localStorage.setItem()`      Save a preference
  `localStorage.getItem()`      Retrieve a preference
  `localStorage.removeItem()`   Remove a saved preference
  Ternary operator (`? :`)      Choose between two expressions
  Logical OR (`||`)             Use a fallback when the first value is falsy

## 11. Recommended practice order

1.  Build the HTML layout.
2.  Define CSS variables for Light and Dark themes.
3.  Write `applyTheme()` and test both classes manually.
4.  Use `matchMedia()` to detect the OS theme.
5.  Use `localStorage` to save and retrieve the preference.
6.  Add the OS theme change listener.
7.  Add the manual toggle button.
8.  Implement the Follow System Theme challenge.

**Key takeaway:** A saved user preference takes priority over the
operating system preference. When no valid saved preference exists, the
website follows the OS theme.
