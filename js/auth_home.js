function fetchDrivers() {
    const token = localStorage.getItem("authToken");

    fetch("http://127.0.0.1:8000/drivers/drivers/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch drivers.");
            }
            return response.json();
        })
        .then((data) => {
            const driverList = document.getElementById("driver-list");
            driverList.innerHTML = "";
            data.forEach((driver, index) => {
                const listItem = document.createElement("li");
                listItem.className = "bg-light m-2 p-3 hovers";
                listItem.style.listStyle = "none";
                listItem.style.borderRadius = "10px";
                listItem.innerHTML = `
                <h5>
                    <a style="text-decoration:none;" class="text-dark" onclick="fetchDriverDetails(${driver.id})">${driver.name}</a>
                </h5>
            `;
                driverList.appendChild(listItem);

                // auto show details for the driver list
                if (index === 0) {
                    fetchDriverDetails(driver.id);
                }
            });
        })
        .catch((error) => console.error("Error fetching drivers:", error));
}

function fetchDriverDetails(driverId) {
    const token = localStorage.getItem("authToken");
    fetch(`http://127.0.0.1:8000/drivers/drivers/${driverId}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch driver details.");
            }
            return response.json();
        })
        .then((driver) => {
            const driverDetails = document.getElementById("driver-details");
            driverDetails.innerHTML = `
            <div class="card-body d-flex">
                <div>
                    <h6 class="card-title">Phone : ${driver.phone_number}</h6> 
                    <h6 class="card-title">Driving Licence : ${driver.driving_licence}</h6> 
                    <h6 class="card-title">Number Plate : ${driver.number_plate}</h6> 
                    <h6 class="card-title">Par Hours : ${driver.par_hours} ৳</h6>
                    <h6 class="card-text">Availability : ${driver.is_available ? "Available" : "Not Available"}</h6>
                </div>
                <div style="padding-top: 7rem;">
                    <div class="d-flex gap-3">
                        <div>
                            <a class="btn btn-primary btn-sm" href="driver_details.html?id=${driverId}">Details</a>
                        </div>
                        <div>
                            <a class="btn btn-info btn-sm">Request</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        })
        .catch((error) => console.error("Error fetching driver details:", error));
}

// Call fetchDrivers on page load
window.onload = fetchDrivers;

// Rider JS
document.addEventListener("DOMContentLoaded", function () {
    fetchRides();

    const form = document.getElementById("ride-form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        addRide();
    });
});

function fetchRides() {
    fetch("http://127.0.0.1:8000/rides/rides/")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            displayRides(data);
        })
        .catch((error) => {
            console.error("Error fetching rides:", error);
        });
}

function displayRides(rides) {
    const ridesContainer = document.getElementById("rides-list");
    ridesContainer.innerHTML = "";
    rides.forEach((ride) => {
        const rideCard = document.createElement("div");
        rideCard.classList.add("card", "mb-3", "bg-light", "text-dark", "hovers");
        rideCard.style.borderRadius = "10px";
        rideCard.innerHTML = `
            <div class="card-body">
                <p class="card-text">Where Ride From : ${ride.where_ride_from}</p>
                <p class="card-text">Where Ride To : ${ride.where_ride_to}</p>
                <p class="card-text">Status : <span class="btn btn-secondary btn-sm">${ride.status}</span></p>
                <p class="card-text"><small class="text-muted">Created at: ${ride.created_at}</small></p>
            </div>
        `;
        ridesContainer.appendChild(rideCard);
    });
}

function addRide() {
    const where_ride_from = document.getElementById("where_ride_from").value;
    const where_ride_to = document.getElementById("where_ride_to").value;

    console.log("Form Data:", { where_ride_from, where_ride_to });

    const token = localStorage.getItem("authToken");
    fetch("http://127.0.0.1:8000/rides/rides/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`, // Ensure "Token" is capitalized
        },
        body: JSON.stringify({
            where_ride_from: where_ride_from,
            where_ride_to: where_ride_to,
        }),
    })
        .then(async (response) => {
            console.log("Response status:", response.status);
            if (response.ok) {
                return response.json();
            } else {
                const err = await response.json();
                console.error("Server response error:", err);
                throw new Error("Failed to add ride");
            }
        })
        .then((data) => {
            console.log("Ride added:", data);
            fetchRides();
        })
        .catch((error) => {
            console.error("Error adding ride:", error);
            alert("Failed to add ride. Please check your input and try again.");
        });
}

fetchDrivers();


// function requestRide(rideId) {
//     const token = localStorage.getItem("authToken");

//     fetch('http://127.0.0.1:8000/rides/requests/', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Token ${token}`
//         },
//         body: JSON.stringify({
//             ride_id: rideId
//         })
//     })
//         .then(response => response.json())
//         .then(data => {
//             alert('Ride request sent successfully!');
//         })
//         .catch(error => console.error('Error requesting ride:', error));
// }


// function acceptRideRequest(requestId) {
//     const token = localStorage.getItem("authToken");

//     fetch(`http://127.0.0.1:8000/rides/requests/${requestId}/accept/`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Token ${token}`
//         }
//     })
//         .then(response => response.json())
//         .then(data => {
//             alert('Ride request accepted!');
//             document.querySelector(`#request-status-${requestId}`).textContent = 'Accepted';
//         })
//         .catch(error => console.error('Error accepting ride request:', error));
// }
