// ======================================
// 1. SELECT HTML ELEMENTS
// ======================================

// Select hamburger button
const menuBtn = document.querySelector("#menuBtn");

// Select navigation links
const navLinks = document.querySelector("#navLinks");

// Select cart counter
const cartCount = document.querySelector("#cartCount");

// Select all Add to Cart buttons
const addCartButtons = document.querySelectorAll(".add-cart");


// ======================================
// 2. HAMBURGER MENU
// ======================================

menuBtn.addEventListener("click", function() {

    // Toggle active class on navigation
    navLinks.classList.toggle("active");

});


// ======================================
// 3. ADD TO CART
// ======================================

// Initialize cart count
let count = 0;

// Add event listener to every cart button
addCartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Increase cart count
        count++;

        // Update cart counter in HTML
        cartCount.textContent = count;

        // Show confirmation
        alert("Product added to cart!");

    });

});


// ======================================
// 4. SEARCH PRODUCTS
// ======================================

// Select search input and button
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");

// Select all product cards
const products = document.querySelectorAll(".product-card");

// Select no-results message
const noResults = document.querySelector("#noResults");


// Create search function
function searchProducts() {

    // Get entered search text
    const searchValue = searchInput.value.toLowerCase().trim();

    // Track whether any product matches
    let found = false;

    // Loop through all products
    products.forEach(function(product) {

        // Get product name
        const productName = product.dataset.name.toLowerCase();

        // Check if product name matches search
        if (productName.includes(searchValue)) {

            // Show matching product
            product.style.display = "block";

            found = true;

        } else {

            // Hide non-matching product
            product.style.display = "none";

        }

    });

    // Show message if no products match
    noResults.style.display = found ? "block" : "none";

}


// Run search when button is clicked
searchBtn.addEventListener("click", searchProducts);


// Also search when Enter is pressed
searchInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        searchProducts();

    }

});


// ======================================
// 5. CLOSE MOBILE MENU AFTER CLICK
// ======================================

navLinks.addEventListener("click", function(event) {

    // Check whether a navigation link was clicked
    if (event.target.tagName === "A") {

        // Close mobile menu
        navLinks.classList.remove("active");

    }

});
