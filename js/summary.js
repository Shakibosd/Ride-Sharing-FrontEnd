document.addEventListener("DOMContentLoaded", () => {
    const rideData = JSON.parse(sessionStorage.getItem("acceptedRideData"));
    if (rideData) {
        const summaryTableBody = document.getElementById("ride-summary");
        
        const row = `
            <tr>
                <td>${rideData.driver || "Not Assigned"}</td>
                <td>${rideData.where_ride_from}</td>
                <td>${rideData.where_ride_to}</td>
                <td>${rideData.status}</td>
            </tr>
        `;
        summaryTableBody.innerHTML = row;
    } else {
        const summaryTableBody = document.getElementById("ride-summary");
        summaryTableBody.innerHTML = `
            <tr>
                <td colspan="4" class="text-center">No ride data available.</td>
            </tr>
        `;
    }
});