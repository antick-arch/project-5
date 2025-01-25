document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector("nav button");
    menuButton.addEventListener("click", () => {
        alert("Menu button clicked!");
    });

    const text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, libero.";
    const textContainer = document.querySelector(".page2 .animated-text");
    text.split("").forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char;
        textContainer.appendChild(span);
    });
});
