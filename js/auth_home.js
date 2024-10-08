// Fetch driver details on page load
document.addEventListener("DOMContentLoaded", function () {
  fetchDrivers();
  fetchRides();
  const form = document.getElementById("ride-form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    addRide();
  });
});

// Fetch drivers
function fetchDrivers() {
  const token = localStorage.getItem("authToken");

  fetch("https://ride-sharing-back-end.vercel.app/drivers/drivers/", {
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
        listItem.className = "bg-dark m-1 p-3 hovers";
        listItem.style.listStyle = "none";
        listItem.style.borderRadius = "10px";
        listItem.innerHTML = `
            <h5>
                <a style="text-decoration:none;" class="text-white" onclick="fetchDriverDetails(${driver.id})">${driver.user}</a>
            </h5>
        `;
        driverList.appendChild(listItem);

        // Automatically show details for the first driver
        if (index === 0) {
          fetchDriverDetails(driver.id);
        }
      });
    })
    .catch((error) => console.error("Error fetching drivers:", error));
}

// Fetch specific driver details
function fetchDriverDetails(driverId) {
  const token = localStorage.getItem("authToken");
  fetch(`https://ride-sharing-back-end.vercel.app/drivers/drivers/${driverId}/`, {
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
                    <h6 class="card-title">Driving Licence : ${
                      driver.driving_licence
                    }</h6> 
                    <h6 class="card-title">Number Plate : ${
                      driver.number_plate
                    }</h6> 
                    <h6 class="card-title">Par Hours : ${
                      driver.par_hours
                    } ৳</h6>
                    <h6 class="card-text">Availability : ${
                      driver.is_available ? "Available" : "Not Available"
                    }</h6>
                </div>
                <div style="padding-top: 5rem;">
                    <div>
                        <a class="btn btn-primary btn-sm" href="driver_details.html?id=${driverId}">Details</a>
                    </div>
                </div>
            </div>
        `;
    })
    .catch((error) => console.error("Error fetching driver details:", error));
}

// Fetch rides
function fetchRides() {
  const token = localStorage.getItem("authToken");
  fetch("https://ride-sharing-back-end.vercel.app/rides/rides/", {
    method: "GET",
    headers: {
      Authorization: `token ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch rides.");
      }
      return response.json();
    })
    .then((data) => {
      displayRides(data);
    })
    .catch((error) => {
      console.error("Error fetching rides:", error);
    });
}

// Display rides in the UI
function displayRides(rides) {
  const ridesContainer = document.getElementById("rides-list");
  ridesContainer.innerHTML = "";
  rides.forEach((ride) => {
    const rideCard = document.createElement("div");
    rideCard.classList.add("card", "mb-3", "bg-dark", "hovers");
    rideCard.style.borderRadius = "10px";

    const driverInfo =
      ride.status === "Ride Completed" && ride.driver
        ? `Driver Username : ${ride.driver}`
        : "Driver Not Accept Your Request";

    rideCard.innerHTML = `
        <div class="card-body">
            <p class="card-text">Where Ride From : ${ride.where_ride_from}</p>
            <p class="card-text">Where Ride To : ${ride.where_ride_to}</p>
            <p class="card-text">${driverInfo}</p>
            <p class="card-text">Status : 
                <span id="request-status-${ride.id}" class="btn btn-secondary btn-sm">
                    ${ride.status === "Pending" ? "Pending" : ride.status}
                </span>
            </p>
            <p class="card-text">
                <small class="text-muted">Created at: ${ride.created_at}</small>
            </p>
        </div>
    `;
    ridesContainer.appendChild(rideCard);
  });
}

// Add a new ride
function addRide() {
  const where_ride_from = document.getElementById("where_ride_from").value;
  const where_ride_to = document.getElementById("where_ride_to").value;

  const token = localStorage.getItem("authToken");
  fetch("https://ride-sharing-back-end.vercel.app/rides/rides/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    },
    body: JSON.stringify({
      where_ride_from: where_ride_from,
      where_ride_to: where_ride_to,
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        const err = await response.json();
        console.error("Server response error:", err);
        throw new Error("Failed to add ride");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      alert("Ride Request Submitted!");
      alert("Please Check Driver Details");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error adding ride:", error);
      alert("Failed to add ride. Please check your input and try again.");
    });
}