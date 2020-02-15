// createAccount
function createAccount() {
  // If the response has an error -> inform user
  // Else is successful -> inform user
  responseStatus = function (response, status) {
    if ('error' in response) {
      // Inform User of Error
      console.log("{0}: {1}".format(status, response.error.message));
    }
    else {
      // Account Created Successfully
      console.log("Account created successfully!");
      // Redirect User to Homepage
      window.location = "/";
    }
  }

  // Grab data from login-register page
  var jsonObj = new Object();
  jsonObj.email = document.getElementById("emailRegister").value;
  jsonObj.password = document.getElementById("passwordRegister").value;

  // Connect to the API
  connectAPI("users", "POST", responseStatus, jsonObj);
}

// login
function login() {
  // If the response has an error -> inform user
  // Else is successful -> inform user
  responseStatus = function (response, status) {
    if ('error' in response) {
      // Inform User of Error
     console.log("{0}: {1}".format(status, response.error.message));
    }
    else {
      // Login Successful
      console.log("Login successful!");
      // Set userAuth in a cookie
      setCookie("userAuth", response.id);
      // Set userID in a cookie
      setCookie("userId", response.userId)

      // Redirect User to Homepage
      window.location = "/";
    }
  }

  // Grab data from login-register page
  var jsonObj = new Object();
  jsonObj.email = document.getElementById("emailLogin").value;
  jsonObj.password = document.getElementById("passwordLogin").value;

  // Connect to the API
  connectAPI("users/login", "POST", responseStatus, jsonObj);
}

// Check if user is already logged in
if (getCookie("userAuth")) {
  // User already logged in
 console.log("You are already logged in.");
  // Redirect User to Homepage
  window.location = "/";
}