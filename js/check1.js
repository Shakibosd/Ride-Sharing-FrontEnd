const checks1 = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
        window.location.href = "./profile.html";
    }
}
window.onload = checks1;



    