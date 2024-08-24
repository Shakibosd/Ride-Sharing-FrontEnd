//user profile and profile update
document.addEventListener("DOMContentLoaded", () => {
    const user_id = localStorage.getItem("user_id");
    const apiUrl = `http://127.0.0.1:8000/profiles/user_detail/${user_id}/`;
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
                alert("Profile updated successfully");
            })
            .catch((error) => console.error("Error updating profile:", error));
    });
});