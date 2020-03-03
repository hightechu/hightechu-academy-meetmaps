function searchUser() {
    var searchTerm = document.getElementById("searchUser").value; 
    showUserInvite = function(users, status) {
        if ('error' in users) {
            console.log("{0}: {1}".format(status, users.error.message));
        } else {
                for (var i = 1; i <= users.length; i++) {
                    var user = document.createElement("BUTTON");
                    var t = document.createTextNode("Click to add " + users[i-1].name); 
                    user.appendChild(t); 
                    user.addEventListener('click', function(){ addUserToGroup(this.id.substring(4, this.id.length+1), currentGroupId)});
                    user.setAttribute("id", "user" + users[i-1].useridnty); 
                    userFind.appendChild(user); 
            } // for
        } // else 
    } // showUsers

    connectAPI('usernames?filter={"where":{"name":"' + searchTerm + '"}}', "GET", showUserInvite);
} // searchUser
