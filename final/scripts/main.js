document.getElementById("year").textContent = new Date().getFullYear();

const greeting = document.getElementById("greeting");
if (greeting) {
    const hour = new Date().getHours();
    greeting.textContent =
        hour < 12 ? "Good morning!" :
        hour < 18 ? "Good afternoon!" :
        "Good evening!";
}