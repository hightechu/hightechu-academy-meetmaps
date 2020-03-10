
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
    window.location = "/";
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
    window.location = "/";
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
                group.className += "btn ";
                group.className += "btn-light";
                group.className += " groupbtn";
                //group.onclick = function(){inGroup(response[i].groupID)};
                group.addEventListener('click', function(){ inGroup(this.id)});
                group.setAttribute("id", "groupName" + response[i-1].groupID);
                groups.appendChild(group);//to show on myView 
            } //for each group
        } // no error with group
    } // response
    connectAPI('groupMembers?filter={"where":{"userID":"' + "{0}".format(currentUser) + '"}}', "GET", response); 
}

function inGroup(id) {
    showUsers = function(users, status) {
        if ('error' in users) {
            console.log("{0}: {1}".format(status, users.error.message));
        } else {
            groupName = function(group, status) {
                if ('error' in group) {
                    console.log("{0}: {1}".format(status, group.error.message));
                } else {
                    console.log(group.name); 
                    if (document.getElementById("groupTitle")) {
                        document.getElementById("groupTitle").innerHTML = group.name; 
                    } else {
                        var gHeader = document.createElement("h2");
                        var t = document.createTextNode(group.name); 
                        gHeader.appendChild(t); 
                        gHeader.setAttribute("id", "groupTitle");
                        groups.appendChild(gHeader); 
                        gHeader.className += "gHeader";
                    } // if element exists
                } // if error
            } // groupName
            connectAPI("groups/{0}".format(id), "GET", groupName);
            if (document.getElementsByClassName("groupUsers")) {
                $('.groupUsers').remove();
            }
            for (var i = 0; i < users.length; i++) {
                usersInGroup = function(uname, status) {
                    if ('error' in uname) {
                        console.log("{0}: {1}".format(status, uname[0].error.message));
                    } else {
                        console.log(uname[0].name); 
                        var gHeader = document.createElement("h4");
                        var t = document.createTextNode("- " + uname[0].name); 
                        gHeader.appendChild(t); 
                        gHeader.className = "groupUsers";
                        gHeader.setAttribute("id", "userTitle" + i);
                        groups.appendChild(gHeader); 
                    } // if error
                } // usersInGroup
                console.log(users[i].userID); 
                connectAPI('usernames?filter={"where":{"useridnty":"' + users[i].userID + '"}}', "GET", usersInGroup);
            } // for
        } // else - no error
    } // showUsers
    id = id.substring(9, id.length+1); 
    console.log("Group: " + id); 
    currentGroupId = id; 
    connectAPI('groupMembers?filter={"where":{"groupID":"' + id + '"}}', "GET", showUsers);
    document.getElementById("invite").style.display = "block";  
    getMembersLocations(id); 
} // inGroup