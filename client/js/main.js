var currentGroupId; 

// Add JS Here
function loadPage () {
    var group = document.getElementById("g");
    var loginSignup = document.getElementById("loginSignup");
    var button1 = document.getElementById("btn1"); 
    var button2 = document.getElementById("btn2"); 
    if (getCookie("userAuth")) {
        loginSignup.style.display = "none";
        group.style.display = "block"; 
        button1.style.display = "inline-block"; 
        button2.style.display = "inline-block"; 
    } else {
        loginSignup.style.display = "block";
        group.style.display = "none";
        button1.style.display = "none"; 
        button2.style.display = "none"; 
    } 
    //deleteLoc(); 
    showGroups();
    initMap();  
}

