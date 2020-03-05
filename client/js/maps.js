var map;
var currentPos;
var allMembersPos = new Array();
var currentMemberPos = new Object();   

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 12
  });
  getPos(); 
}

function getPos () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        currentPos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      saveLocation(); 
      var marker = new google.maps.Marker({position: currentPos, map: map});
      map.setCenter(currentPos);
    }, function() {
      handleLocationError(true, marker, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, marker, map.getCenter());
  }
} // getPos

function handleLocationError(browserHasGeolocation, marker, currentPos) {
  marker.setPosition(currentPos);
  marker.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  marker.open(map);
} // location Error

function saveLocation () {
    var lat = currentPos.lat; 
    var lng = currentPos.lng; 
    doesExist = function (user, status) {
        if ('error' in user) {
        // Inform User of Error
            console.log("{0}: {1}".format(status, user.error.message));
        }
        else {
            var jsonObj = new Object(); 
            jsonObj.userID = getCookie("userId");
            jsonObj.lat = lat; 
            jsonObj.lng = lng; 
            if (user[0] != undefined) {
                jsonObj.id = user[0].id;
            } 
            saveLoc = function (response, status) {
                if ('error' in response) {
                // Inform User of Error
                    console.log("{0}: {1}".format(status, response.error.message));
                }
                else {
                    console.log("location saved"); 
                }
            }
            // Connect to the API
            connectAPI("locations/", "PUT", saveLoc, jsonObj);
        } // else no error
    } // doesExist
    connectAPI('locations?filter={"where":{"userID":"' + getCookie("userId") + '"}}', "GET", doesExist);
} // saveLocation

function deleteLoc() {
    for (var i = 36; i <=39; i++) {
        responseStatus = function (response, status) {
            if ('error' in response) {
            // Inform User of Error
                console.log("{0}: {1}".format(status, response.error.message));
            }
            else {
                console.log("location deleted"); 
            }
        }
        connectAPI("locations/{0}".format(i), "DELETE", responseStatus);
    } // for
} // deleteLoc

function getMembersLocations(groupid) {
    allMembersPos.splice(0, allMembersPos.length); 
    getGroup = function (usersInGroup, status) {
        if ('error' in response) {
        // Inform User of Error
            console.log("{0}: {1}".format(status, usersInGroup.error.message));
        }
        else {
            for (var i = 0; i < usersInGroup.length; i++) {
                locOfUser = function(posit, status) {
                    if ('error' in posit) {
                        console.log("{0}: {1}".format(status, posit[0].error.message));
                    } else {
                        currentMemberPos = { 
                            lat: posit[0].lat, 
                            lng: posit[0].lng
                        }; 
                        allMembersPos.push(currentMemberPos);  
                    } // if error
                } // usersInGroup
                console.log(usersInGroup[i].userID); 
                connectAPI('locations?filter={"where":{"userID":"' + usersInGroup[i].userID + '"}}', "GET", locOfUser);
            } // for
        } // else no error
    } // getGroup
    connectAPI('groupMembers?filter={"where":{"groupID":"' + groupid + '"}}', "GET", getGroup);
} // getMembersLocations
