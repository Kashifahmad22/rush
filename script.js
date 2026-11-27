
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

    }, 1000);

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
