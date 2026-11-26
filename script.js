const form = document.querySelector("form");
const main = document.querySelector("#main");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const inputs = form.querySelectorAll('input[type="text"]');
    const [imageUrl, name, designation, description] = Array.from(inputs, function (input) {
        return input.value.trim();
    });

    const card = document.createElement("div");
    card.classList.add("card");

    const profile = document.createElement("div");
    profile.classList.add("profile");

    if (imageUrl) {
        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = name || "Profile";
        profile.appendChild(img);
    }

    const heading = document.createElement("h3");
    heading.textContent = name;

    const title = document.createElement("h5");
    title.textContent = designation;

    const details = document.createElement("p");
    details.textContent = description;

    card.append(profile, heading, title, details);
    main.appendChild(card);
    form.reset();
});
