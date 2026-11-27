# JavaScript Timer Functions & UI Refresh

These notes cover `setTimeout()`, `clearTimeout()`, `setInterval()`,
`clearInterval()`, delayed UI actions, and page/UI refresh.

## 1. Why do we use timer functions?

JavaScript timer functions control **when code runs**. They are useful
for:

-   Showing success or error messages temporarily.
-   Delaying UI actions.
-   Creating countdowns and stopwatches.
-   Updating clocks and dashboards.
-   Running repeated tasks.
-   Refreshing a webpage or selected UI elements.

## 2. The four timer functions

### `setTimeout()`

Runs a function **once**, after a specified delay.

``` javascript
setTimeout(function () {
    console.log("Hello after 2 seconds");
}, 2000);
```

-   The first argument is the function to execute.
-   The second argument is the delay in milliseconds.
-   `2000` milliseconds is approximately 2 seconds.
-   It returns a timer ID, which can be stored to cancel the timeout.

Arrow-function version:

``` javascript
setTimeout(() => {
    console.log("Hello after 2 seconds");
}, 2000);
```

### `clearTimeout()`

Cancels a pending timeout before its callback executes.

``` javascript
let timer = setTimeout(() => {
    console.log("This may be cancelled");
}, 5000);

clearTimeout(timer);
```

-   Store the ID returned by `setTimeout()`.
-   Pass that ID to `clearTimeout()`.
-   If the timeout has already executed, clearing it has no effect.

### `setInterval()`

Runs a function repeatedly, with a specified delay between scheduled
executions.

``` javascript
let interval = setInterval(() => {
    console.log("Runs repeatedly");
}, 2000);
```

-   The callback is scheduled repeatedly.
-   `2000` means approximately every 2 seconds.
-   It returns an interval ID.
-   Use `clearInterval()` to stop it.

### `clearInterval()`

Stops a running interval.

``` javascript
let interval = setInterval(() => {
    console.log("Running...");
}, 1000);

// Stop the interval
clearInterval(interval);
```

## 3. Milliseconds reference

JavaScript timer delays are specified in milliseconds.

  Duration       Milliseconds
  ------------ --------------
  1 second              1,000
  2 seconds             2,000
  3 seconds             3,000
  5 seconds             5,000
  10 seconds           10,000
  1 minute             60,000

**Note:** Timers schedule callbacks; they do not guarantee execution at
an exact time. The callback may run later if the browser or JavaScript
thread is busy.

## 4. Difference between the four functions

  -----------------------------------------------------------------------
  Function                Purpose                 Execution
  ----------------------- ----------------------- -----------------------
  `setTimeout()`          Schedule a delayed      Once
                          function                

  `clearTimeout()`        Cancel a pending        Cancels scheduled
                          timeout                 execution

  `setInterval()`         Schedule repeated       Repeatedly
                          execution               

  `clearInterval()`       Stop a running interval Cancels future
                                                  repetitions
  -----------------------------------------------------------------------

## 5. Complete practice project

Create a folder with these three files:

``` text
timer-practice/
├── index.html
├── style.css
└── script.js
```

The project demonstrates:

1.  A message delayed by 3 seconds.
2.  Cancelling the delayed message.
3.  Starting and stopping a counter.
4.  Automatically updating a UI timestamp.
5.  Manually refreshing the webpage.

### `index.html`

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Timer Practice</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div class="container">

        <h1>JavaScript Timer Demo</h1>
        <p class="subtitle">Practice JavaScript timing functions</p>

        <!-- Section 1: setTimeout and clearTimeout -->
        <div class="section">
            <h3>1. Delayed UI Action</h3>

            <p id="message">Click the button to see a message.</p>

            <button onclick="showMessage()">
                Show Message After 3 Seconds
            </button>

            <button class="cancel" onclick="cancelMessage()">
                Cancel Timeout
            </button>
        </div>

        <!-- Section 2: setInterval and clearInterval -->
        <div class="section">
            <h3>2. Counter Using setInterval</h3>

            <h2 id="counter">0</h2>

            <button onclick="startCounter()">Start Counter</button>
            <button class="cancel" onclick="stopCounter()">Stop Counter</button>
        </div>

        <!-- Section 3: Automatic UI refresh -->
        <div class="section">
            <h3>3. Auto Refresh UI</h3>

            <p id="lastUpdated">Not updated yet</p>

            <button onclick="startAutoRefresh()">Start Auto Refresh</button>
            <button class="cancel" onclick="stopAutoRefresh()">Stop Auto Refresh</button>
        </div>

        <!-- Section 4: Manual page refresh -->
        <div class="section">
            <h3>4. Page Refresh</h3>
            <button onclick="refreshPage()">Refresh Page</button>
        </div>

    </div>

    <script src="script.js"></script>
</body>

</html>
```

### `style.css`

``` css
/* Reset default CSS */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Body styling */
body {
    font-family: Arial, sans-serif;
    background: #f1f5f9;

    display: flex;
    justify-content: center;
    align-items: center;

    min-height: 100vh;
    padding: 20px;
}

/* Main container */
.container {
    background: white;
    width: 500px;
    max-width: 100%;
    padding: 30px;
    border-radius: 12px;

    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

/* Main heading */
h1 {
    text-align: center;
    color: #1e293b;
    margin-bottom: 10px;
}

.subtitle {
    text-align: center;
    color: #64748b;
    margin-bottom: 25px;
}

/* Individual sections */
.section {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 18px;
    margin-bottom: 18px;
}

/* Section headings */
h3 {
    color: #334155;
    margin-bottom: 15px;
}

/* Paragraphs */
p {
    margin-bottom: 12px;
    color: #475569;
}

/* Counter */
#counter {
    font-size: 35px;
    color: #2563eb;
    margin-bottom: 15px;
}

/* Buttons */
button {
    background: #2563eb;
    color: white;
    border: none;
    padding: 10px 14px;
    border-radius: 5px;
    cursor: pointer;
    margin: 4px 2px;
}

/* Hover effect */
button:hover {
    background: #1d4ed8;
}

/* Cancel and stop buttons */
.cancel {
    background: #dc2626;
}

.cancel:hover {
    background: #b91c1c;
}
```

### `script.js`

``` javascript
// ======================================
// 1. SETTIMEOUT AND CLEARTIMEOUT
// ======================================

// Store the timeout ID
let messageTimer;

// Function to display a delayed message
function showMessage() {

    // Clear any previously scheduled timeout
    clearTimeout(messageTimer);

    // Display a waiting message immediately
    document.getElementById("message").textContent =
        "Please wait...";

    // Execute this function after 3 seconds
    messageTimer = setTimeout(function () {

        // Change the UI message after 3 seconds
        document.getElementById("message").textContent =
            "Hello! Message displayed after 3 seconds.";

    }, 3000);
}

// Function to cancel the timeout
function cancelMessage() {

    // Cancel the pending timeout
    clearTimeout(messageTimer);

    // Update the UI
    document.getElementById("message").textContent =
        "Timeout cancelled!";
}


// ======================================
// 2. SETINTERVAL AND CLEARINTERVAL
// ======================================

// Counter variable
let count = 0;

// Store interval ID
let counterInterval;

// Function to start the counter
function startCounter() {

    // Prevent multiple intervals from starting
    if (counterInterval !== undefined) {
        return;
    }

    // Execute this function every 1 second
    counterInterval = setInterval(function () {

        // Increase counter by 1
        count++;

        // Update counter in UI
        document.getElementById("counter").textContent = count;

    }, 1000);
}

// Function to stop the counter
function stopCounter() {

    // Stop the running interval
    clearInterval(counterInterval);

    // Reset interval ID
    counterInterval = undefined;
}


// ======================================
// 3. AUTOMATIC UI REFRESH
// ======================================

// Store auto refresh interval ID
let autoRefreshInterval;

// Function to update UI data
function updateUI() {

    // Get the current date and time
    let currentTime = new Date();

    // Display the latest update time
    document.getElementById("lastUpdated").textContent =
        "Last updated: " + currentTime.toLocaleTimeString();
}

// Function to start automatic UI refresh
function startAutoRefresh() {

    // Prevent multiple intervals
    if (autoRefreshInterval !== undefined) {
        return;
    }

    // Update UI immediately
    updateUI();

    // Update UI every 5 seconds
    autoRefreshInterval = setInterval(function () {
        updateUI();
    }, 5000);
}

// Function to stop automatic UI refresh
function stopAutoRefresh() {

    // Stop automatic UI updates
    clearInterval(autoRefreshInterval);

    // Reset interval ID
    autoRefreshInterval = undefined;
}


// ======================================
// 4. PAGE REFRESH FUNCTION
// ======================================

// Function to reload the entire webpage
function refreshPage() {

    // Reload the current webpage
    location.reload();
}
```

## 6. Line-by-line concept explanations

### A. `setTimeout()`

``` javascript
let timer = setTimeout(function () {
    console.log("Hello");
}, 3000);
```

1.  `setTimeout()` schedules a callback function.
2.  The callback contains the code that should execute later.
3.  `3000` specifies a delay of approximately 3 seconds.
4.  The returned timer ID is stored in `timer`.
5.  The callback becomes eligible to execute after the delay, when the
    JavaScript event loop can run it.

**Important:** `setTimeout()` does not pause JavaScript execution.

### B. `clearTimeout()`

``` javascript
let timer = setTimeout(function () {
    alert("Hello");
}, 5000);

clearTimeout(timer);
```

1.  A timeout is scheduled for approximately 5 seconds later.
2.  Its ID is stored in `timer`.
3.  `clearTimeout(timer)` cancels the pending timeout.
4.  The alert will not appear if the timeout was successfully cancelled
    before execution.

### C. `setInterval()`

``` javascript
let count = 0;

let interval = setInterval(function () {
    count++;
    console.log(count);
}, 1000);
```

-   `count` stores the current counter value.
-   `setInterval()` schedules the callback repeatedly.
-   `count++` increases the value by one.
-   `console.log()` prints the updated value.
-   `1000` specifies an interval of approximately one second.

### D. `clearInterval()`

``` javascript
let interval = setInterval(function () {
    console.log("Running");
}, 1000);

setTimeout(function () {
    clearInterval(interval);
}, 5000);
```

-   The interval starts repeating.
-   A separate timeout schedules the stopping action.
-   After approximately 5 seconds, `clearInterval()` stops future
    interval callbacks.

## 7. Page refresh vs UI refresh

These are two different operations.

### Page refresh

``` javascript
function refreshPage() {
    location.reload();
}
```

-   Reloads the entire webpage.
-   Reprocesses the HTML, CSS and JavaScript.
-   Can discard unsaved form data and temporary UI state.
-   Similar to pressing F5 in the browser.

### UI refresh

``` javascript
function updateUI() {
    document.getElementById("message").textContent = "Updated!";
}
```

-   Changes only the selected HTML element.
-   Does not reload the webpage.
-   Other elements remain unchanged.
-   Useful for counters, dashboards and live status displays.

## 8. Automatically refreshing the webpage

To reload the complete page every 30 seconds:

``` javascript
// Automatically reload the webpage every 30 seconds
let autoRefresh = setInterval(function () {
    location.reload();
}, 30000);

// Stop automatic refresh
clearInterval(autoRefresh);
```

**Caution:** Full-page reloads can interrupt user interactions and
discard unsaved work. For dashboards, prefer updating only the required
UI elements.

## 9. Useful additional JavaScript concepts

  -----------------------------------------------------------------------
  Concept                             Purpose
  ----------------------------------- -----------------------------------
  `new Date()`                        Get current date and time

  `toLocaleTimeString()`              Convert time into a readable format

  `location.reload()`                 Reload the current webpage

  `document.getElementById()`         Select an HTML element

  `.textContent`                      Read or change an element's text

  `count++`                           Increase a number by one

  `return`                            Exit a function

  `undefined`                         Indicates that a variable has not
                                      been assigned a value
  -----------------------------------------------------------------------

## 10. Practice exercises

Try implementing these yourself without looking at the solution.

-   [ ] **Delayed welcome message:** Display "Welcome" after 5 seconds
    using `setTimeout()`.
-   [ ] **Cancel welcome message:** Add a button that cancels the
    pending timeout using `clearTimeout()`.
-   [ ] **Countdown timer:** Create a countdown from 10 to 0 using
    `setInterval()`.
-   [ ] **Stopwatch:** Create Start, Stop and Reset buttons.
-   [ ] **Auto clock:** Display the current time and update it every
    second.
-   [ ] **Auto dashboard refresh:** Update a dashboard timestamp every 5
    seconds without reloading the page.
-   [ ] **Delayed button:** Disable a button for 3 seconds after
    clicking it, then enable it again.
-   [ ] **Automatic page refresh:** Reload the page after 60 seconds,
    with an option to cancel.

## 11. Quick revision sheet

  Function         Syntax                   Common use case
  ---------------- ------------------------ -------------------------
  Timeout          `setTimeout(fn, ms)`     Delayed message
  Clear timeout    `clearTimeout(id)`       Cancel scheduled action
  Interval         `setInterval(fn, ms)`    Digital clock
  Clear interval   `clearInterval(id)`      Stop digital clock
  Page refresh     `location.reload()`      Reload webpage
  Current time     `new Date()`             Get current date/time
  Format time      `toLocaleTimeString()`   Display readable time

## Recommended practice order

1.  Understand `setTimeout()` and `clearTimeout()`.
2.  Build a delayed message with a cancel button.
3.  Understand `setInterval()` and `clearInterval()`.
4.  Build a countdown timer and stopwatch.
5.  Build an auto-updating clock.
6.  Practise updating selected UI elements without reloading the page.

**Key takeaway:** Use `setTimeout()` for one-time delayed actions,
`setInterval()` for repeated actions, and their corresponding clear
functions to cancel scheduled work.
