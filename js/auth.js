//register part
const handleRegister = (event) => {
  event.preventDefault();

  const form = document.getElementById("register-form");
  const formData = new FormData(form);
  console.log(formData);

  const registerData = {
    username: formData.get("username"),
    email: formData.get("email"),
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  console.log("Register Data", registerData);

  fetch("http://127.0.0.1:8000/users/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  }).then((res) => {
    alert("Register Successfull! Please Check Email For Confirmation Email.");
    window.location.href = "./login.html";
  });
};

//login part
const handleLogin = (event) => {
  event.preventDefault();
  const form = document.getElementById("login-form");
  const formData = new FormData(form);

  const loginData = {
    username: formData.get("username"),
    password: formData.get("password"),
  };
  fetch("http://127.0.0.1:8000/users/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then(async (res) => {
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Login failed");
      }
      return res.json();
    })
    .then((data) => {
      console.log("Auth token received:", data.token);
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user_id", data.user_id);
      window.location.href = "./profile.html";
      alert("Logding Successfully.");
    })
    .catch((err) => {
      console.log("Login error", err.message);
      alert("Login failed: " + err.message);
    });
};

//logout area
const handleLogout = () => {
  if (confirm("Are You Sure You Want To Logout!")) {
    const token = localStorage.getItem("authToken");
    const user_id = localStorage.getItem("user_id");

    fetch("http://127.0.0.1:8000/users/logout/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
        Authorization: `user_id ${user_id}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("user_id");
          window.location.href = "./login.html";
        } else {
          console.log("Logout Faield?");
        }
      })
      .catch((err) => console.log("Logout Error", err));
  }
};
document.getElementById("logoutButton").addEventListener("click", handleLogout);
