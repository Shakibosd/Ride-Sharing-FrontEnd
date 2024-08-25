document.addEventListener("DOMContentLoaded", function () {
    fetchLocations();
});

function fetchLocations() {
    fetch("http://127.0.0.1:8000/maps/maps/")
        .then(response => response.json())
        .then(data => {
            console.log(data); // Check the data structure
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
        card.className = "col-md-4 mb-3";

        card.innerHTML = `
            <div class="card">
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
