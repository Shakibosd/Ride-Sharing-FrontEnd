document.addEventListener("DOMContentLoaded", function () {
    fetchLocations();
});

function fetchLocations() {
    fetch("http://127.0.0.1:8000/maps/maps/")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayLocations(data);
        })
        .catch(error => {
            console.error("Error fetching locations:", error);
        });
}

function displayLocations(locations) {
    const container = document.getElementById("locations-container");
    container.innerHTML = "";

    locations.forEach(location => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-3 container";

        card.innerHTML = `
            <div class="card bg-dark text-white hovers" style="border-radius: 20px;">
                <div class="card-body">
                    <h5 class="card-title">${location.name}</h5>
                    <p class="card-text"><strong>Latitude:</strong> ${location.latitude}</p>
                    <p class="card-text"><strong>Longitude:</strong> ${location.longitude}</p>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}
