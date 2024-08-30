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
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayRides(data);
        })
    // .catch(error => {
    //     console.error("Error fetching rides : ", error);
    // });
}

function displayRides(rides) {
    const ridesContainer = document.getElementById("rides-list");
    // ridesContainer.innerHTML = "";
    console.log(rides);
    rides.forEach(ride => {
        console.log(ride);
        const rideCard = document.createElement("div");
        rideCard.classList.add("card", "mb-3", "bg-dark", "text-white");
        rideCard.style.borderRadius = "10px";
        rideCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">Rider : ${ride.name}</h5>
                <p class="card-text">Start Location : ${ride.start_location}</p>
                <p class="card-text">End Location : ${ride.end_location}</p>
                <p class="card-text"><small class="text-muted">Created at:  ${ride.created_at}</small></p>
            </div>
        `;
        ridesContainer.appendChild(rideCard);
    });
}


function addRide() {
    const name = document.getElementById("rider-name").value;
    const startLocation = document.getElementById("start-location").value;
    const endLocation = document.getElementById("end-location").value;

    const token = localStorage.getItem("authToken");
    fetch("http://127.0.0.1:8000/rides/rides/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
        },
        body: JSON.stringify({
            name: name,
            start_location: startLocation,
            end_location: endLocation
        }),
    })
        .then(response => {
            console.log("Response status:", response.status);
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to add ride");
            }
        })
        .then(data => {
            console.log("Ride added:", data);
            fetchRides();
        })
        .catch(error => {
            console.error("Error adding ride:", error);
        });
}
fetchRides();