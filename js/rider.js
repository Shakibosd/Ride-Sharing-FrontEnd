document.addEventListener("DOMContentLoaded", function () {
    fetchRides();

    const form = document.getElementById("ride-form");
    form.addEventListener("submit", function () {
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
        .catch(error => {
            console.error("Error fetching rides:", error);
        });
}

function displayRides(rides) {
    const ridesContainer = document.getElementById("rides-list");
    ridesContainer.innerHTML = "";
    rides.forEach(ride => {
        const rideCard = document.createElement("div");
        rideCard.classList.add("card", "mb-3", "bg-dark", "text-white");
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
            Authorization: `token ${token}`,
        },
        body: JSON.stringify({
            where_ride_from: where_ride_from,
            where_ride_to: where_ride_to
        }),
    })
        .then(async response => {
            console.log("Response status:", response.status);
            if (response.ok) {
                return response.json();
            } else {
                const err = await response.json();
                console.error("Server response error:", err);
                throw new Error("Failed to add ride");
            }
        })
        .then(data => {
            console.log("Ride added:", data);
            fetchRides();
        })
        .catch(error => {
            console.error("Error adding ride:", error);
            alert("Failed to add ride. Please check your input and try again.");
        });
}

