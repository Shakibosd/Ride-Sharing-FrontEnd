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
        item.className = "list-group-item list-group-item-action container bg-dark text-white w-50 hovers";
        item.style.borderRadius = "20px";
        item.innerHTML = `
            <div>
                <h5 class="mb-1"><b>Review ID : </b> ${review.id}</h5>
                <p class="mb-1"><b>User : </b> ${review.user}</p>
                <p class="mb-1"><strong>Ride : </strong> ${review.ride}</p>
                <p class="mb-1"><strong>Rating : </strong> ${review.rating}</p>
                <p class="mb-1"><strong>Comment : </strong> ${review.comment}</p>
                <small><strong>Created At : </strong> ${(review.created_at)}</small>
            </div>
        `;

        container.appendChild(item);
    });
}
