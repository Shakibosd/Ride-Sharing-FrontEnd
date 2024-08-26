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
                listItem.className = "list-group-item bg-dark text-white hovers";
                listItem.style.borderRadius = "10px";
                listItem.innerHTML = `
                <h5>
                   <a onclick="fetchDriverDetails(${driver.id})">${driver.user} - ${driver.is_available ? "Available" : "Not Available"}</a>
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
        .then(data => {
            const driverDetails = document.getElementById("driver-details");
            driverDetails.innerHTML = `
            <div class="card-body">
                <h3 class="card-title">Id : ${data.id}</h3>
                <h4 class="card-title">Driver : ${data.user}</h4>
                <h6 class="card-text">Availability : ${data.is_available ? "Available" : "Not Available"}</h6>
            </div>
        `;
        })
        .catch(error => console.error("Error fetching driver details:", error));
}
fetchDrivers();
fetchDriverDetails(driverId);



