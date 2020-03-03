var currentGroupId; 

// Add JS Here
function loadPage () {
    if (getCookie("userAuth")) {
        // User already logged in
       console.log("You are already logged in.");
        // Redirect User to Homepage
        var loginSignup = document.getElementById("loginSignup");
        loginSignup.style.display = "none"; 
    } else {
        var loginSignup = document.getElementById("loginSignup");
        loginSignup.style.display = "block"; 
    }
    showGroups(); 
}

