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
        card.className = "col-md-4 mb-3 container";

        card.innerHTML = `
            <div class="card bg-dark text-white w-100 hovers" style="border-radius: 20px; ">
                <div class="card-body">
                    <h5 class="card-title"><b>Ride ID : </b> ${ride.id}</h5>
                    <p class="card-text"><b>Rider : </b> ${ride.rider}</p>
                    <p class="card-text"><b>Driver : </b> ${ride.driver}</p>
                    <p class="card-text"><b>Start Location : </b> ${ride.start_location}</p>
                    <p class="card-text"><b>End Location : </b> ${ride.end_location}</p>
                    <p class="card-text"><b>Status : <span class="btn btn-secondary">${ride.status}</span></b></p>
                    <p class="card-text"><b>Created At : </b> ${(ride.created_at)}</p>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}
