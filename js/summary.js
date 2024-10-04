document.addEventListener("DOMContentLoaded", () => {
  const rideDataArray = JSON.parse(localStorage.getItem("acceptedRides")); // Correct retrieval
  const summaryTableBody = document.getElementById("ride-summary");

  if (rideDataArray && rideDataArray.length > 0) {
    rideDataArray.forEach((rideData) => {
      const row = `
          <tr>
            <td>${rideData.driver || "Not Assigned"}</td>
            <td>${rideData.where_ride_from}</td>
            <td>${rideData.where_ride_to}</td>
            <td style="color: #00ffd5;">${rideData.status}</td>
          </tr>
        `;
      summaryTableBody.innerHTML += row;
    });
  } else {
    summaryTableBody.innerHTML = `
        <tr>
          <td colspan="4" class="text-center">No ride data available.</td>
        </tr>
      `;
  }
});