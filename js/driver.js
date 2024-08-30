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
                throw new Error("Failed to fetch drivers.");
            }
            return response.json();
        })
        .then(data => {
            const driverList = document.getElementById("driver-list");
            driverList.innerHTML = "";
            data.forEach(driver => {
                const listItem = document.createElement("li");
                listItem.className = "bg-dark m-2 text-white p-3 hovers";
                listItem.style.borderRadius = "10px";
                listItem.innerHTML = `
                <h5>
                   <a href="#" onclick="fetchDriverDetails(${driver.id})">${driver.name}</a>
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
                throw new Error("Failed to fetch driver details.");
            }
            return response.json();
        })
        .then(driver => {
            const driverDetails = document.getElementById("driver-details");
            driverDetails.innerHTML = `
            <div class="card-body d-flex">
                <div>
                    <h6 class="card-title">Phone : ${driver.phone_number}</h6> 
                    <h6 class="card-title">Email : ${driver.email}</h6> 
                    <h6 class="card-title">Driving Licence : ${driver.driving_licence}</h6> 
                    <h6 class="card-title">Number Plate : ${driver.number_plate}</h6> 
                    <h6 class="card-title">Par Hours : ${driver.par_hours} ৳</h6>
                    <h6 class="card-title text-info">Where Ride From : ${driver.where_ride_from}</h6>
                    <h6 class="card-title text-info">Where Ride To : ${driver.where_ride_to}</h6>
                    <h6 class="card-text">Availability : ${driver.is_available ? "Available" : "Not Available"}</h6>
                </div>
                <div style="padding-top: 11rem;">
                    <a class="btn btn-primary btn-sm">Rider Request</a>
                </div>
            </div>
        `;
        })
        .catch(error => console.error("Error fetching driver details : ", error));
}

// function acceptRiderRequest(riderId, button) {
//     const token = localStorage.getItem("authToken");

//     fetch(`http://127.0.0.1:8000/rides/accept-request/${riderId}/`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `token ${token}`,
//         },
//     })
//         .then(response => response.json())
//         .then(data => {
//             if (data.message) {
//                 console.log(data.message);
//                 button.textContent = "Completed";
//                 button.classList.remove("btn-primary");
//                 button.classList.add("btn-success");
//             }
//         })
//         .catch(error => {
//             console.error("Error accepting request:", error);
//             alert("Failed to accept request. Please try again.");
//         });
// }

fetchDrivers();
fetchDriverDetails(driverId);