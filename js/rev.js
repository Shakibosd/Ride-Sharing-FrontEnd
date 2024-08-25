document.addEventListener("DOMContentLoaded", function () {
    fetchReviews();
});

function fetchReviews() {
    fetch("http://127.0.0.1:8000/reviews/reviews/")
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            displayReviews(data);
        })
        .catch(error => {
            console.error("Error fetching reviews:", error);
        });
}

function displayReviews(reviews) {
    const container = document.getElementById("reviews-container");
    container.innerHTML = ""; 

    reviews.forEach(review => {
        const item = document.createElement("a");
        item.className = "list-group-item list-group-item-action";
        item.innerHTML = `
            <h5 class="mb-1">Review ID: ${review.id}</h5>
            <p class="mb-1"><strong>User:</strong> ${review.user}</p>
            <p class="mb-1"><strong>Ride:</strong> ${review.ride}</p>
            <p class="mb-1"><strong>Rating:</strong> ${review.rating}</p>
            <p class="mb-1"><strong>Comment:</strong> ${review.comment}</p>
            <small><strong>Created At:</strong> ${new Date(review.created_at).toLocaleString()}</small>
        `;

        container.appendChild(item);
    });
}
