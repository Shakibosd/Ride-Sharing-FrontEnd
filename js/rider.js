document.addEventListener("DOMContentLoaded", function () {
    fetchRides();
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
    const container = document.getElementById("rides-container");
    container.innerHTML = ""; 

    rides.forEach(ride => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-3";

        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Ride ID: ${ride.id}</h5>
                    <p class="card-text"><strong>Rider:</strong> ${ride.rider}</p>
                    <p class="card-text"><strong>Driver:</strong> ${ride.driver}</p>
                    <p class="card-text"><strong>Start Location:</strong> ${ride.start_location}</p>
                    <p class="card-text"><strong>End Location:</strong> ${ride.end_location}</p>
                    <p class="card-text"><strong>Status:</strong> ${ride.status}</p>
                    <p class="card-text"><strong>Created At:</strong> ${new Date(ride.created_at).toLocaleString()}</p>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}
