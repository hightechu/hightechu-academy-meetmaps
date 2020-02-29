// creates a new group in the group model
function createGroup() {
    var userID;
    var groupID; 
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
        userID = getCookie("userId");
        groupID = "{0}".format(response.id);
        console.log(userID + " - " + groupID);
        addUserToGroup(userID, groupID); 
        }
    }

    // Grab data index page
    var jsonObj = new Object();
    jsonObj.name = document.getElementById("groupName").value;

    // Connect to the API
    connectAPI("groups", "POST", newGroup, jsonObj);
    
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
    var currentUser = getCookie("userId");
    response = function(response, status) {
        if ('error' in response) {
            console.log("{0}: {1}".format(status, response.error.message));
        } else {
            for (var i = 1; i <= response.length; i++) {
                var group = document.createElement("BUTTON");  //<button> element
                var t = document.createTextNode(response[i-1].groupID); // Create a text node
                group.appendChild(t); 
                //group.onclick = function(){inGroup(response[i].groupID)};
                group.addEventListener('click', function(){ inGroup(this.id)});
                group.className = "groupButton";
                group.setAttribute("id", "groupName" + i);
                groups.appendChild(group);//to show on myView 
            } //for each group
        } // no error with group
    } // response
    connectAPI("groupMembers?filter[userID]={0}".format(currentUser), "GET", response); 
    // Connect to the API
}

function inGroup(id) {
    id = id.substring(9, id.length+1); 
    response = function(response, status) {
        if ('error' in response) {
            console.log("{0}: {1}".format(status, response.error.message));
        } else {
            showUsers = function(users, status) {
                if ('error' in users) {
                    console.log("{0}: {1}".format(status, users.error.message));
                } else {
                    for (var i = 0; i < users.length; i++) {
                        console.log(users[i].userID); 
                    }
                }
            } // showUsers
            console.log("Group: " + response.groupID); // 30
            connectAPI("groupMembers?filter[groupID]={0}".format(response.groupID), "GET", showUsers); 
        } // no error with group
    } // response
    //console.log(id); 
    connectAPI("groupMembers/{0}".format(id), "GET", response); 
} // inGroup