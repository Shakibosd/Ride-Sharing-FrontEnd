document.addEventListener("DOMContentLoaded", function () {
    fetchDrivers();
});

function fetchDrivers() {
    fetch("http://127.0.0.1:8000/drivers/drivers/")
        .then(response => response.json())
        .then(data => {
            const driverList = document.getElementById("driver-list");
            driverList.innerHTML = "";
            data.forEach(driver => {
                const listItem = document.createElement("li");
                listItem.className = "list-group-item";
                listItem.innerHTML = `
                    <a href="#" onclick="fetchDriverDetails(${driver.id})">${driver.user} - ${driver.is_available ? "Available" : "Not Available"}</a>
                `;
                driverList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error fetching drivers:", error));
}

function fetchDriverDetails(driverId) {
    fetch(`http://127.0.0.1:8000/drivers/drivers/${driverId}/`)
        .then(response => response.json())
        .then(data => {
            const driverDetails = document.getElementById("driver-details");
            driverDetails.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">Driver: ${data.user}</h5>
                    <p class="card-text">Availability: ${data.is_available ? "Available" : "Not Available"}</p>
                </div>
            `;
        })
        .catch(error => console.error("Error fetching driver details:", error));
}
