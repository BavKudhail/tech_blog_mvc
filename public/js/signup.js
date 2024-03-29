const signupFormHandler = async (event) => {
  event.preventDefault();

  //   Collect values from the sign up form
  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  console.log(`Signing up ${username}`);

  //   Send a POST request to the API endpoint
  const response = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    console.log("SIGNED UP");
    // If successful, redirect the browser to the dashboard
    document.location.replace("/dashboard");
  } else {
    alert("Failed to sign up");
  }
};

// Sign Up form event listnener
document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
