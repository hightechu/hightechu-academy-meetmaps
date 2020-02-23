    var userID;
    var groupID; 
// creates a new group in the group model
function createGroup() {

    // If the response has an error -> inform user
    // Else is successful -> inform user
    newGroup = function (response, status) {
        if ('error' in response) {
        // Inform User of Error
        console.log("{0}: {1}".format(status, response.error.message));
        }
        else {
        // Group created Successfully
        console.log("Group Created!");
        groupID = "{0}".format(response.id);
        console.log(userID + " - " + groupID);
        addUserToGroup(userID, groupID); 
        }
    }
    responseUserID = function (response, status) {
        if ('error' in response) {
          console.log("{0}: {1}".format(status, response.error.message));
        }
        else {
          userID = "{0}".format(response.id);
        }
    }

    // Grab data index page
    var jsonObj = new Object();
    jsonObj.name = document.getElementById("groupName").value;

    // Connect to the API
    connectAPI("groups", "POST", newGroup, jsonObj);
    connectAPI("users/{0}".format(getCookie("userId")), "GET", responseUserID); 
    
} // createGroup

function addUserToGroup(userAdd, groupAdd) {
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
    jsonObj.userID = userAdd;
    jsonObj.groupID = groupAdd;
    // Connect to the API
    console.log(userAdd); 
    console.log(groupAdd); 
    console.log(JSON.stringify(jsonObj)); 
    connectAPI("groupMembers", "POST", responseStatus, jsonObj);

} // addUserToGroup

function showGroups() {
    responseStatus = function (response, status) {
        if ('error' in response) {
            // Inform User of Error
            console.log("{0}: {1}".format(status, response.error.message));
        }
        else {
          console.log(response.id, response.userID, response.groupID); 
            // Group created Successfully
            /*
            var group = document.createElement("BUTTON");  //<button> element
            var t = document.createTextNode("Edit"); // Create a text node
            btn.appendChild(t);   
            btn.onclick = function(){inGroup(response.groupID)};
            btn.className = "groupButton";
            btn.setAttribute("id", "edit");
            groups.appendChild(btn);//to show on myView
            */
        }
    }
    // Connect to the API
    connectAPI("groupMembers", "GET", responseStatus);
}

function inGroup(groupID) {

}