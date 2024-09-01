// Driver JS
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
            data.forEach((driver) => {
                const listItem = document.createElement("li");
                listItem.className = "bg-dark m-2 text-white p-3 hovers";
                listItem.style.borderRadius = "10px";
                listItem.innerHTML = `
                <h5>
                    <a style="text-decoration:none;" class="text-white" onclick="fetchDriverDetails(${driver.id})">${driver.name}</a>
                </h5>
            `;
                driverList.appendChild(listItem);
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
                    <h6 class="card-title">Email : ${driver.email}</h6> 
                    <h6 class="card-title">Driving Licence : ${driver.driving_licence}</h6> 
                    <h6 class="card-title">Number Plate : ${driver.number_plate}</h6> 
                    <h6 class="card-title">Par Hours : ${driver.par_hours} ৳</h6>
                    <h6 class="card-title text-info">Where Ride From : ${driver.where_ride_from}</h6>
                    <h6 class="card-title text-info">Where Ride To : ${driver.where_ride_to}</h6>
                    <h6 class="card-text">Availability : ${driver.is_available ? "Available" : "Not Available"}</h6>
                </div>
                <div style="padding-top: 12rem;">
                    <a class="btn btn-info btn-sm" onclick="showRequestButton(${driver.id})">Request</a>
                    <a class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="preparePaymentModal(${driver.id})">Bill Pay</a>
                    <a class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal2">Review</a>
                </div>
            </div>
            <!-- Modal 1 -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Payment</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body text-dark">
                             <div class="mb-3">
                                <label for="amount" class="form-label">Amount</label>
                                <input type="number" class="form-control" id="amount" placeholder="Please Driver Amount Pay" required>
                            </div>
                            <button class="btn btn-primary" onclick="submitPayment(${driver.id})">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Modal 2 -->
            <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Review</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-dark">
                        <div class="mb-3">
                            <label for="rating">Rate This</label>
                            <select id="rating" name="rating" class="form-control" required>
                                <option value="" selected>Select a rating</option>
                                <option value="1">⭐</option>
                                <option value="2">⭐⭐</option>
                                <option value="3">⭐⭐⭐</option>
                                <option value="4">⭐⭐⭐⭐</option>
                                <option value="5">⭐⭐⭐⭐⭐</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="comment">Comment</label>
                            <textarea class="form-control" id="comment" placeholder="Please Enter Your Comment Here"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary" onclick="submitReview(${driver.id})">Submit</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        })
        .catch((error) => console.error("Error fetching driver details:", error));
}

//review rating

//function call
updateReviewCards();

function submitReview(driverId) {
    const rating = document.getElementById("rating").value;
    const comment = document.getElementById("comment").value;
    const token = localStorage.getItem("authToken");

    fetch("http://127.0.0.1:8000/reviews/reviews/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
        },
        body: JSON.stringify({
            driver: driverId,
            rating: rating,
            comment: comment,
        }),
    })
        .then(async (response) => {
            if (response.ok) {
                return response.json();
            } else {
                const err = await response.json();
                console.error("Server response error:", err);
                alert(`Failed to submit review: ${err.detail || "Unknown error"}`);
                throw new Error("Failed to submit review");
            }
        })
        .then((data) => {
            console.log("Review submitted:", data);
            alert("Review submitted successfully!");
            updateReviewCards();
        })
        .catch((error) => {
            console.error("Error submitting review:", error);
            alert("Failed to submit review. Please try again.");
        });
}


function updateReviewCards() {
    const token = localStorage.getItem("authToken");

    fetch("http://127.0.0.1:8000/reviews/reviews/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch reviews.");
            }
            return response.json();
        })
        .then((data) => {
            const reviewCardsContainer = document.getElementById("review-cards-container");
            reviewCardsContainer.innerHTML = "";
            data.forEach((review) => {
                const card = document.createElement("div");
                card.classList.add("card", "mb-3", "bg-light", "text-dark");
                card.style.borderRadius = "10px";
                card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">Rating: ${'⭐'.repeat(review.rating)}</h5>
                    <p class="card-text">${review.comment || "No comment"}</p>
                    <p class="card-text"><small class="text-muted">Date: ${review.timestamp}</small></p>
                </div>
            `;
                reviewCardsContainer.appendChild(card);
            });
        })
        .catch((error) => console.error("Error fetching reviews:", error));
}


//call function
updatePaymentCards();

//submit payment
function submitPayment(driverId) {
    const amount = document.getElementById("amount").value;
    const token = localStorage.getItem("authToken");

    fetch("http://127.0.0.1:8000/payments/payments/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
        },
        body: JSON.stringify({
            driver: driverId,
            amount: amount,
        }),
    })
        .then(async (response) => {
            if (response.ok) {
                return response.json();
            } else {
                const err = await response.json();
                console.error("Server response error:", err);
                throw new Error("Failed to submit payment");
            }
        })
        .then((data) => {
            console.log("Payment submitted:", data);
            alert("Payment successful!");
            window.location.href = "./profile.html";
            updatePaymentCards();
        })
        .catch((error) => {
            console.error("Error submitting payment:", error);
            alert("Failed to submit payment. Please try again.");
        });
}
function updatePaymentCards() {
    const token = localStorage.getItem("authToken");

    fetch("http://127.0.0.1:8000/payments/payments/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch payments.");
            }
            return response.json();
        })
        .then((data) => {
            const tableBody = document.getElementById("payment-table-body");
            tableBody.innerHTML = "";

            data.forEach((payment) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                <td>${payment.driver || "N/A"}</td>
                <td>${payment.amount} ৳</td>
                <td>${payment.timestamp}</td>
            `;
                tableBody.appendChild(row);
            });
        })
        .catch((error) => console.error("Error fetching payments:", error));
}

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
        rideCard.classList.add("card", "mb-3", "bg-dark", "text-white", "hovers");
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
submitPayment();