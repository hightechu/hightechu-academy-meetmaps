// creates a new group in the group model
function createGroup() {
    // If the response has an error -> inform user
    // Else is successful -> inform user
    responseStatus = function (response, status) {
        if ('error' in response) {
        // Inform User of Error
        console.log("{0}: {1}".format(status, response.error.message));
        }
        else {
        // Group created Successfully
        console.log("Group Created!");
        // Redirect User to Homepage
        window.location = "/";
        }
    }

    // Grab data index page
    var jsonObj = new Object();
    jsonObj.name = document.getElementById("groupName").value;
    jsonObj.defLocation = document.getElementById("defLocation").value;

    // Connect to the API
    connectAPI("groups", "POST", responseStatus, jsonObj);
    addUserToGroup(); 
}

function addUserToGroup() {
        // If the response has an error -> inform user
    // Else is successful -> inform user
    responseStatus = function (response, status) {
        if ('error' in response) {
        // Inform User of Error
        console.log("{0}: {1}".format(status, response.error.message));
        }
        else {
        // Group created Successfully
        console.log("Member added!");
        }
    }
    connectAPI("users/{0}".format(getCookie("userId")), "GET", responseStatus);
    // Grab data index page
    var jsonObj = new Object();
    jsonObj.user = response.email;
    // Connect to the API
    connectAPI("groups", "POST", responseStatus, jsonObj);

}