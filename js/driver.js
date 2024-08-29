function fetchDrivers() {
    const token = localStorage.getItem("authToken");
    fetch("http://127.0.0.1:8000/drivers/drivers/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const driverList = document.getElementById("driver-list");
            driverList.innerHTML = "";
            data.forEach(driver => {
                const listItem = document.createElement("li");
                listItem.className = "list-group-item bg-dark m-2 text-white hovers";
                listItem.style.borderRadius = "10px";
                listItem.style.lineBreak = "10px";
                listItem.innerHTML = `
                <h5>
                   <a onclick="fetchDriverDetails(${driver.id})">${driver.name}</a>
                </h5>
            `;
                driverList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error fetching drivers:", error));
}

function fetchDriverDetails(driverId) {
    const token = localStorage.getItem("authToken");
    fetch(`http://127.0.0.1:8000/drivers/drivers/${driverId}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(driver => {
            console.log("Driver Data",driver);
            console.log("Driver Image", driver.image);
            const driverDetails = document.getElementById("driver-details");
            driverDetails.innerHTML = `
            <div class="card-body d-flex">
                <div>
                    <h6 class="card-title">Phone : ${driver.phone_number} </h6> 
                    <h6 class="card-title">Email : ${driver.email} </h6> 
                    <h6 class="card-title">Driving Laicens : ${driver.driving_licence} </h6> 
                    <h6 class="card-title">Number Plate : ${driver.number_plate} </h6> 
                    <h6 class="card-title">Par Hours : ${driver.par_hours} ৳</h6>
                    <h6 class="card-title text-info">Where Ride : ${driver.where_ride_to_where_ride}</h6>
                    <h6 class="card-text">Availability : ${driver.is_available ? "Available" : "Not Available"}</h6>
                </div>
                <div style="padding-top: 10rem;">
                    <a class="btn btn-primary btn-sm">Rider Request</a>
                    <a class="btn btn-info btn-sm">Rider Review</a>
                    <a class="btn btn-secondary btn-sm">Payment</a>
                </div>
            </div>
        `;
        })
        .catch(error => console.error("Error fetching driver details:", error));
}
fetchDrivers();
fetchDriverDetails(driverId);



