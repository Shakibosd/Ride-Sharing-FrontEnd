fetch("navbar.html")
    .then((res => res.text()))
    .then((data) => {
        document.getElementById("navbar").innerHTML = data;

        //assign auth element
        const navElement = document.getElementById("nav-element");

        const token = localStorage.getItem("authToken");

        console.log(token);

        if (token) {
            navElement.innerHTML += `
            <!--<a class="btn btn-info btn-sm" href="./auth_home.html">Home</a>-->
            <a class="btn btn-success btn-sm" href="./profile.html">Profile</a>
            <a class="btn btn-secondary btn-sm" href="./pass_change.html">Password Change</a>
            <a class="btn btn-primary btn-sm" href="./driver.html">Driver</a>
            <a class="btn btn-warning btn-sm " href="./rider.html">Rider</a>
            <a class="btn btn-dark btn-sm" href="./maps.html">Maps</a>
            <!--<a class="btn btn-sm text-white" href="./notifi.html" style="background-color: darkcyan;">Notifications</a>-->
            <a class="btn btn-sm" href="./pay.html" style="background-color: wheat">Payments</a>
            <a class="btn btn-sm" href="./rev.html" style="background-color: hotpink;">Reviews</a>
            <a class="btn btn-danger btn-sm" onclick="handleLogout()">Logout</a>
            `;
        }
        else {
            navElement.innerHTML += `
            <a class="btn btn-primary" href="./index.html">Home</a>
            <a class="btn btn-info" href="./register.html">Signup</a>
            <a class="btn btn-success" href="./contact.html">Contact Me</a>
            <a class="btn btn-secondary " href="./login.html">Login</a>
            `;
        }
    });

