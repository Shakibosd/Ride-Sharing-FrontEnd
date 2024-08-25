document.addEventListener("DOMContentLoaded", function () {
    fetchNotifications();
});

function fetchNotifications() {
    fetch("http://127.0.0.1:8000/notifications/notifications/")
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            displayNotifications(data);
        })
        .catch(error => {
            console.error("Error fetching notifications:", error);
        });
}

function displayNotifications(notifications) {
    const container = document.getElementById("notifications-container");
    container.innerHTML = "";

    notifications.forEach(notification => {
        const item = document.createElement("a");
        item.className = "list-group-item list-group-item-action";
        item.innerHTML = `
            <h5 class="mb-1">Notification ID: ${notification.id}</h5>
            <p class="mb-1"><strong>User:</strong> ${notification.user}</p>
            <p class="mb-1"><strong>Message:</strong> ${notification.message}</p>
            <small><strong>Timestamp:</strong> ${new Date(notification.timestamp).toLocaleString()}</small>
        `;

        container.appendChild(item);
    });
}
