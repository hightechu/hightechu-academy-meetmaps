// get UserData
function getUserData() {
  // If user is not logged in -> send to login/register page
  // Else inform user of their data
  responseStatus = function (response, status) {
    if ('error' in response) {
      console.log("{0}: {1}".format(status, response.error.message));
      let message = "<a href='/login-register.html'>Login/Register</a>";
      document.getElementById("loginRegister").innerHTML = message;
    }
    else {
      document.getElementById("dataFromAPI").innerHTML = "Logged in as User {0} - {1}".format(response.id, response.email);
    }
  }

  // Connect to the API
  connectAPI("users/{0}".format(getCookie("userId")), "GET", responseStatus);
}
