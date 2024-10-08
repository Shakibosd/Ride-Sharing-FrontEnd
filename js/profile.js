//profile user data show
document.addEventListener("DOMContentLoaded", () => {
  const user_id = localStorage.getItem("user_id");
  const apiUrl = `https://ride-sharing-back-end.vercel.app/profiles/user_detail/${user_id}/`;
  const token = localStorage.getItem("token");

  fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("username").value = data.username;
      document.getElementById("first_name").value = data.first_name;
      document.getElementById("last_name").value = data.last_name;
      document.getElementById("email").value = data.email;
    })
    .catch((error) => console.error("Error fetching profile data:", error));

  const profileForm = document.getElementById("profile-form");
  profileForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = {
      username: document.getElementById("username").value,
      first_name: document.getElementById("first_name").value,
      last_name: document.getElementById("last_name").value,
      email: document.getElementById("email").value,
    };

    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Profile updated successfully");
      })
      .catch((error) => console.error("Error updating profile:", error));
  });
});

updatePaymentCards();

//submit payment
function submitPayment(driverId) {
  const amount = document.getElementById("amount").value;

  if (amount === "") {
    alert("Please enter a valid amount.");
    return;
  }

  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("authToken");

  console.log({
    user: user_id,
    amount: amount,
    driver: driverId,
  });

  fetch("https://ride-sharing-back-end.vercel.app/payments/payments/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    },
    body: JSON.stringify({
      user: parseInt(user_id),
      amount: parseFloat(amount),
      driver: driverId,
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
      alert("payment successfull!");
      window.location.href = "./profile.html";
      updatePaymentCards();
    })
    .catch((error) => {
      console.error("Error submitting payment:", error);
      alert("Failed to submit payment. Please try again.");
    });
}

//update payment
function updatePaymentCards() {
  const token = localStorage.getItem("authToken");

  fetch("https://ride-sharing-back-end.vercel.app/payments/payments_get/", {
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
        console.log(payment);
        row.innerHTML = `
            <td>${payment.user}</td>
            <td>${payment.driver}</td>
            <td>${payment.amount} ৳</td>
            <td>${payment.timestamp}</td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching payments:", error));
}
