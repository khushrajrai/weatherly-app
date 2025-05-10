// Check initial theme on load
const themeSwitch = document.getElementById("theme-switch");

const enableLightmode = () => {
    document.body.classList.add("lightmode");
    localStorage.setItem("lightmode", "active");
};

const disableLightmode = () => {
    document.body.classList.remove("lightmode");
    localStorage.removeItem("lightmode"); // Better than setting to null
};

// Initialize theme on page load
function savedTheme() {
    const lightmode = localStorage.getItem("lightmode");
    if (lightmode === "active") {
        document.body.classList.add("lightmode");
    } else {
        document.body.classList.remove("lightmode");
    }
}

// Set up theme toggle
themeSwitch.addEventListener("click", () => {
    const lightMode = localStorage.getItem("lightmode");
    
    if (lightMode !== "active") {
        enableLightmode();
    } else {
        disableLightmode();
    }
});

// Initialize when page loads
savedTheme();