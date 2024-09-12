const urlParams = new URLSearchParams(window.location.search);
const driverId = urlParams.get("id");

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
            const driverDetailsContent = document.getElementById(
                "driver-details-content"
            );
            driverDetailsContent.innerHTML = `
                <h4>Phone : ${driver.phone_number}</h4>
                <h4>Email : ${driver.email}</h4>
                <h4>Driving Licence : <span class="btn btn-secondary">${driver.driving_licence}</span></h4>
                <h4>Number Plate : ${driver.number_plate}</h4>
                <h4>Par Hours : ${driver.par_hours} ৳</h4>
                <h4>Availability : <span class="btn btn-secondary">${driver.is_available ? "Driver Available!" : "Not Available"
                }</span></h4>
                <br>
                <div class="d-flex gap-4">
                     <div>
                        <a class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" >Bill Pay</a>
                    </div>
                    <div>
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
                            <button class="btn btn-primary" onclick="submitPayment(${driver.id
                });">Submit</button>
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
                        <button type="submit" class="btn btn-primary" onclick="submitReview(event)">Submit</button>
                    </div>
                </div>
            </div>
        </div>
          <!--edit and delete review-->
            <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editModalLabel">Edit Review</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-dark">
                        <div class="mb-3">
                            <label for="edit-rating">Rate This</label>
                            <select id="edit-rating" name="rating" class="form-control" required>
                                <option value="" selected>Select a rating</option>
                                <option value="1">⭐</option>
                                <option value="2">⭐⭐</option>
                                <option value="3">⭐⭐⭐</option>
                                <option value="4">⭐⭐⭐⭐</option>
                                <option value="5">⭐⭐⭐⭐⭐</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="edit-comment">Comment</label>
                            <textarea class="form-control" id="edit-comment" placeholder="Please Enter Your Comment Here"></textarea>
                        </div>
                        <input type="hidden" id="edit-review-id">
                        <button type="button" class="btn btn-primary" onclick="updateReviewDetails()">Update</button>
                    </div>
                </div>
            </div>
        `;
        })
        .catch((error) => console.error("Error fetching driver details:", error));
}

if (driverId) {
    fetchDriverDetails(driverId);
}

//review rating
function submitReview(e) {
    e.preventDefault();
    const rating = document.getElementById("rating").value;
    const comment = document.getElementById("comment").value;

    const token = localStorage.getItem("authToken");
    const user_id = localStorage.getItem("user_id");

    const starRatingsMap = {
        1: "⭐",
        2: "⭐⭐",
        3: "⭐⭐⭐",
        4: "⭐⭐⭐⭐",
        5: "⭐⭐⭐⭐⭐",
    };
    const starRating = starRatingsMap[parseInt(rating)];
    if (!rating || !comment) {
        alert("Please provide both a rating and a comment.");
        return;
    }
    console.log({
        user: parseInt(user_id),
        rating: starRating,
        comment: comment,
    });
    if (!starRating) {
        alert("Invalid rating value.");
        return;
    }
    fetch(`http://127.0.0.1:8000/reviews/review_list_create/${driverId}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
        },
        body: JSON.stringify({
            user: parseInt(user_id),
            rating: starRating,
            comment: comment,
        }),
    })
        .then(async (response) => {
            if (response.ok) {
                return response.json();
            } else {
                const err = await response.json();
                console.error("Server response error:", err);
                alert(`Failed to submit review`);
                throw new Error("Failed to submit review");
            }
        })
        .then((data) => {
            console.log("Review submitted:", data);
            alert("Review submitted successfully!");
            updateReviewCards();
            bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
        });
}

function updateReviewCards() {
    const token = localStorage.getItem("authToken");

    fetch(`http://127.0.0.1:8000/reviews/reviews_detail_get/${driverId}/`, {
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
            const reviewCardsContainer = document.getElementById(
                "review-cards-container"
            );
            reviewCardsContainer.innerHTML = "";
            document.getElementById("reviewCounts").innerHTML = data.length;
            data.forEach((review) => {
                const card = document.createElement("div");
                card.classList.add("card", "mb-3", "bg-light", "text-dark", "hovers");
                card.style.borderRadius = "10px";
                card.innerHTML = `
                    <div class="card w-100 p-3">
                        <h5 class="card-title">Rating : ${review.rating}</h5>
                        <p class="card-text">Comment : ${review.comment}</p>
                        <p class="card-text"><small class="text-muted">Date : ${review.created_at}</small></p>
                        <div class="d-flex gap-5">
                            <div>
                               <a class="btn btn-success" data-bs-toggle="modal" data-bs-target="#editModal"
                                onclick="editReview(${review.id})">Edit</a>
                            </div>
                            <div>
                                <a class="btn btn-danger" onclick="deleteReview(${review.id})">Delete</a>
                            </div>
                        </div>
                    </div>
        `;
                reviewCardsContainer.appendChild(card);
            });
        })
        .catch((error) => console.error("Error fetching reviews:", error));
}

updateReviewCards();

function prepareEditModal(reviewId) {
    const token = localStorage.getItem("authToken");

    fetch(`http://127.0.0.1:8000/reviews/reviews_detail/${reviewId}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
        },
    })
        .then((response) => response.json())
        .then((review) => {
            document.getElementById("edit-rating").value = review.rating;
            document.getElementById("edit-comment").value = review.comment;
            document.getElementById("edit-review-id").value = reviewId;
        })
        .catch((error) => console.error("Error fetching review details:", error));
}

function updateReviewDetails() {
    const reviewId = document.getElementById("edit-review-id").value;
    const rating = document.getElementById("edit-rating").value;
    const comment = document.getElementById("edit-comment").value;

    const token = localStorage.getItem("authToken");

    const starRatingsMap = {
        1: "⭐",
        2: "⭐⭐",
        3: "⭐⭐⭐",
        4: "⭐⭐⭐⭐",
        5: "⭐⭐⭐⭐⭐",
    };
    const starRating = starRatingsMap[parseInt(rating)];

    if (!starRating || !comment) {
        alert("Please provide both a rating and a comment.");
        return;
    }

    fetch(`http://127.0.0.1:8000/reviews/reviews_detail/${reviewId}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
        },
        body: JSON.stringify({
            rating: starRating,
            comment: comment,
        }),
    }).then(async (response) => {
        if (response.ok) {
            alert("Review updated successfully!");
            updateReviewCards();
            return response.json();
        }
    });
}

function editReview(reviewId) {
    const token = localStorage.getItem("authToken");

    fetch(`http://127.0.0.1:8000/reviews/reviews_detail/${reviewId}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch review details.");
            }
            return response.json();
        })
        .then((review) => {
            document.getElementById("edit-rating").value = review.rating;
            document.getElementById("edit-comment").value = review.comment;
            document.getElementById("edit-review-id").value = review.id;
            new bootstrap.Modal(document.getElementById("editModal")).show();
        });
}

function deleteReview(reviewId) {
    const token = localStorage.getItem("authToken");

    if (confirm("Are you sure you want to delete this review?")) {
        fetch(`http://127.0.0.1:8000/reviews/reviews_detail/${reviewId}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `token ${token}`,
            },
        }).then((response) => {
            if (!response.ok) {
                throw new Error("Failed to delete review.");
            }
            updateReviewCards();
            alert("Review deleted successfully!");
            return response.json();
        });
    }
}
//rider request
document.addEventListener("DOMContentLoaded", fetchRides);//fetch reide function all load
function fetchRides() {
    const token = localStorage.getItem("authToken");
    fetch("http://127.0.0.1:8000/rides/rides/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            const rideRequests = document.getElementById("ride-requests");
            rideRequests.innerHTML = "";
            data.forEach((ride) => {
                const row = document.createElement("tr");
                const isAccepted = localStorage.getItem(`ride-${ride.id}-accepted`);

                row.innerHTML = `
                    <td>${ride.driver ? ride.driver : "Driver Not Accept Your Request"}</td>
                    <td>${ride.where_ride_from}</td>
                    <td>${ride.where_ride_to}</td>
                    <td>${ride.status || "Pending"}</td> 
                    <td>
                        <button class="btn btn-success btn-sm" id="accept-btn-${ride.id}" onclick="acceptRide(${ride.id})" ${isAccepted ? 'disabled' : ''}>
                            ${isAccepted ? 'Accepted' : 'Accept'}
                        </button>
                    </td>
                `;
                rideRequests.appendChild(row);
            });
        })
    
}
function acceptRide(rideId) {
    console.log(`Ride with ID ${rideId} accepted.`);
    const button = document.getElementById(`accept-btn-${rideId}`);
    button.textContent = 'Accepted';
    button.disabled = true;

    // Save the ride ID to localStorage
    localStorage.setItem(`ride-${rideId}-accepted`, 'true');


    const token = localStorage.getItem("authToken");
    fetch(`http://127.0.0.1:8000/rides/accept/${rideId}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
        },
    })
        .then(async (response) => {
            if (!response.ok) {
                const err = await response.json();
                console.error("Server response error:", err);
                throw new Error("Failed to accept ride");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            alert("Ride request accepted successfully!");
        })
        .catch((error) => {
            console.error("Error accepting ride:", error);
            alert("Failed to accept ride. Please try again.");
        });
}

