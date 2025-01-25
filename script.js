document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector("nav button");
    menuButton.addEventListener("click", () => {
        alert("Menu button clicked!");
    });

    const text = "Neutron Knights - Quantum Warriors, Navigators of the Unknown";
    const textContainer = document.querySelector(".page2 .animated-text");
    text.split("").forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char;
        textContainer.appendChild(span);
    });
});
