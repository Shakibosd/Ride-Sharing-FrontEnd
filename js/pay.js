document.addEventListener("DOMContentLoaded", function () {
    fetchPayments();
});

function fetchPayments() {
    fetch("http://127.0.0.1:8000/payments/payments/")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayPayments(data);
        })
        .catch(error => {
            console.error("Error fetching payments:", error);
        });
}

function displayPayments(payments) {
    const container = document.getElementById("payments-container");
    container.innerHTML = "";

    payments.forEach(payment => {
        const item = document.createElement("a");
        item.className = "list-group-item list-group-item-action container bg-dark text-white w-50 hovers";
        item.style.borderRadius = "20px";
        item.innerHTML = `
            <div>
                <h5 class="mb-1">Payment ID : ${payment.id}</h5>
                <p class="mb-1"><strong>Amount : </strong>${payment.amount} ৳</p>
                <small><strong>Timestamp : </strong> ${(payment.timestamp)}</small>
            </div>
        `;

        container.appendChild(item);
    });
}
