// creates a new group in the group model
function createGroup() {
    var userID;
    var groupID; 
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
    responseUserID = function (response, status) {
        if ('error' in response) {
          console.log("{0}: {1}".format(status, response.error.message));
        }
        else {
          userID = response.id; 
        }
    }
    responseGroupID = function (response, status) {
        if ('error' in response) {
          console.log("{0}: {1}".format(status, response.error.message));
        }
        else {
          groupID = response.id; 
        }
    }

    // Grab data index page
    var jsonObj = new Object();
    jsonObj.name = document.getElementById("groupName").value;

    // Connect to the API
    connectAPI("groups", "POST", responseStatus, jsonObj);
    connectAPI("users/{0}".format(getCookie("userId")), "GET", responseUserID);
    connectAPI("groups", "GET", responseGroupID);
    addUserToGroup(userID, groupID); 
}

function addUserToGroup(userID, groupID) {
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
    // Grab data index page
    var jsonObj = new Object();
    jsonObj.userID = userID;
    jsonObj.groupID = groupID;
    // Connect to the API
    connectAPI("groupMembers", "POST", responseStatus, jsonObj);

}