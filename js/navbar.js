document.addEventListener("DOMContentLoaded", function () {
  fetch("navbar.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;

      const token = localStorage.getItem("authToken");
      if (token) {
        fetch("http://127.0.0.1:8000/rides/is_admin/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            const navElement = document.getElementById("nav-element");

            if (data.is_admin) {
              navElement.innerHTML += `
                    <a class="btn btn-info btn-sm" href="./auth_home.html">Home</a>
                    <a class="btn btn-success btn-sm" href="./profile.html">Profile</a>
                    <a class="btn btn-secondary btn-sm" href="./pass_change.html">Password Change</a>
                    <a class="btn btn-warning btn-sm" href="./summary.html">Driver Accept</a>
                    <a class="btn btn-primary btn-sm" href="./admin_deshboard.html">Admin Deshboard</a>
                    <a class="btn btn-danger btn-sm" onclick="handleLogout()">Logout</a>
              `;
            } else {
              navElement.innerHTML += `
                    <a class="btn btn-info btn-sm" href="./auth_home.html">Home</a>
                    <a class="btn btn-success btn-sm" href="./profile.html">Profile</a>
                    <a class="btn btn-secondary btn-sm" href="./pass_change.html">Password Change</a>
                    <a class="btn btn-danger btn-sm" onclick="handleLogout()">Logout</a>
              `;
            }
          })
          .catch((error) => {
            console.error("Error fetching admin status:", error);
          });
      } else {
        const navElement = document.getElementById("nav-element");
        navElement.innerHTML += `
            <a class="btn btn-primary" href="./index.html">Home</a>
            <a class="btn btn-info" href="./register.html">Signup</a>
            <a class="btn btn-success" href="./contact.html">Contact Me</a>
            <a class="btn btn-secondary" href="./login.html">Login</a>
        `;
      }
    });
});
