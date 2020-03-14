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
      console.log("Account created successfully!");
    }
  }
  login = function (response, status) {
    if ('error' in response) {
      // Inform User of Error
      console.log("{0}: {1}".format(status, response.error.message));
    }
    else {
      console.log("User Logged In successfully!");
      setCookie("userAuth", response.id);
      // Set userID in a cookie
      setCookie("userId", response.userId);

      saveNewUser = function (a, b) {
        if ('error' in a) {
          // Inform User of Error
          console.log("{0}: {1}".format(b, a.error.message));
        }
        else {
          console.log("User {0}: {1}".format(a.useridnty, a.name));

        }
      }
      var jsonNameObj = new Object(); 
      jsonNameObj.name = document.getElementById("usernameRegister").value;
      jsonNameObj.useridnty = "{0}".format(response.userId); 
      connectAPI("usernames", "POST", saveNewUser, jsonNameObj);
      
      
      window.location = "/";
    }
  } // login response fxn

  // Grab data from login-register page
  var jsonObj = new Object();
  jsonObj.email = document.getElementById("emailRegister").value;
  jsonObj.password = document.getElementById("passwordRegister").value;
  jsonObj.username = document.getElementById("usernameRegister").value;
  jsonObj.defaultAddress = document.getElementById("defaultAddress").value;

  connectAPI("users", "POST", responseStatus, jsonObj);

  var loginObj = new Object();
  loginObj.email = document.getElementById("emailRegister").value;
  loginObj.password = document.getElementById("passwordRegister").value;

  // Connect to the API
  connectAPI("users/login", "POST", login, loginObj);
/*
  var streetAddress = document.getElementById("defaultAddress").value;
  geocoder.geocode({'address': streetAddress}, function(results, status) {
    if (status === 'OK') {
        alert(results[0].geometry.location.lat); 
        var locObj = new Object(); 
        locObj.userID = getCookie("userId");
        locObj.lat = results[0].geometry.location.lat; 
        locObj.lng = results[0].geometry.location.lng; 
        saveDefLocation = function (a, b) {
          if ('error' in a) {
            // Inform User of Error
            alert("{0}: {1}".format(b, a.error.message));
          }
          else {
            alert("SAVED LOCATION"); 
          } // else
        } // saveDefLocation
        connectAPI("locations/", "POST", saveDefLocation, locObj);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    } // else geocode
  });
  */
} // create Account

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
      setCookie("userId", response.userId); 

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

function signOut() {
    document.cookie = "userAuth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location = "/index.html"; 
}
