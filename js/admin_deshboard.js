// API Fetch
async function fetchDrivers() {
  try {
    const response = await fetch("http://127.0.0.1:8000/drivers/drivers/");
    const drivers = await response.json();
    displayDrivers(drivers);
  } catch (error) {
    console.error("Error fetching drivers:", error);
  }
}

// Display Drivers in Cards
function displayDrivers(drivers) {
  const driversList = document.getElementById("drivers-list");
  driversList.innerHTML = "";

  drivers.forEach((driver) => {
    const card = document.createElement("div");

    card.innerHTML = `
                <div class="card bg-dark w-75 container mb-5 p-5" style="border-radius:20px;">
              
                        <h5>ID -> ${driver.id}</h5>
                        <h5>Username -> ${driver.user}</h5>
                        <h5>Name -> ${driver.name}</h5>
                        <h5>Phone Number -> ${driver.phone_number}</h5>
                        <h5>Email -> ${driver.email}</h5>
                        <h5>Driver Licence -> ${driver.driving_licence}</h5>
                        <h5>Number Plate -> ${driver.number_plate}</h5>
                        <h5>Where From Ride -> ${driver.where_ride_from}</h5>
                        <h5>Par/Hours${driver.par_hours}</h5>
                        <h5>Where To Ride${driver.where_ride_to}</h5>
                        <h5>Available -> ${
                          driver.is_available ? "Available" : "Not Available"
                        }</h5>
                        <div class="d-flex gap-5">
                            <div>
                                <a class="btn btn-success">Edit</a>
                            </div>
                            <div>
                                <a class="btn btn-danger">Delete</a>
                            </div>
                        </div>
                </div>
            `;
    driversList.appendChild(card);
  });
}

fetchDrivers();

// Fetch user list
function fetchUsers() {
  const token = localStorage.getItem("authToken");
  fetch("http://127.0.0.1:8000/rides/user_list/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let userList = document.getElementById("user-list");
      userList.innerHTML = "";

      data.forEach((user) => {
        let userCard = `
                    <div class="card bg-dark w-75 mx-auto p-5" style="border-radius:20px;">
                            <h3 class="card-title">ID: ${user.id}</h3>
                            <h3 class="card-title">Username: ${user.username}</h3>
                            <p>First Name: ${user.first_name}</p>
                            <p>Last Name: ${user.last_name}</p>
                            <p>Email: ${user.email}</p>
                    </div>
            `;
        userList.innerHTML += userCard;
      });
    })
    .catch((error) => console.error("Error fetching users:", error));
}

// Call the fetchUsers function on page load
fetchUsers();
