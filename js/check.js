const checks = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
        window.location.href = "./login.html";
    }
}
window.onload = checks;