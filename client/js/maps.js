var map;
var currentPos;
var allMarkers = new Array();
var allMeetMarkers = new Array(); 
var allPositions = new Array();
var pos = new Array();
var currentMemberPos = new Object();
var middlePos = new Object();   
var directionsService = new google.maps.DirectionsService();
var directionsRenderer = new google.maps.DirectionsRenderer();

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
        midMarker = new google.maps.Marker({
            position: currentPos,
            labelContent: "Center",
            icon: {                             
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            }
        }); // new marker
        midMarker.setMap(null); 
        saveLocation(); 
         //allMarkers[0] = new google.maps.Marker({position: currentPos, map: map});
         map.setCenter(currentPos);
    }, function() {
      handleLocationError(true, marker, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, marker, map.getCenter());
  }
} // getPos

function plotMember (memberLoc) {
        allMarkers.push(new google.maps.Marker({position: memberLoc, map: map}));
} // plotMember

function getMembersPositions() {
    for (var i = 0; i < allMarkers.length; i++) {
        allPositions[i] = {
            lat: allMarkers[i].getPosition().lat(), 
            lng: allMarkers[i].getPosition().lng()
        }; 
        console.log(allPositions[i]);  
    } // for
    getAndPlotCenter(); 
} // getMemberLocations

function getAndPlotCenter() {
    pos = center(allPositions); 
    var middlePos = averagePoint(pos);
    midMarker.setPosition(middlePos);  
    midMarker.setMap(map);
    plotMeetSpots(); 
} // getAndPlotCenter

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
    allMarkers.splice(0, allMarkers.length); 
    getGroup = function (usersInGroup, status) {
        if ('error' in response) {
        // Inform User of Error
            console.log("{0}: {1}".format(status, usersInGroup.error.message));
        }
        else {
            var a = 0; 
            for (var i = 0; i < usersInGroup.length; i++) {
                locOfUser = function(posit, status) {
                    if ('error' in posit) {
                        console.log("{0}: {1}".format(status, posit[0].error.message));
                    } else {
                        currentMemberPos = { 
                            lat: posit[0].lat, 
                            lng: posit[0].lng
                        }; 
                        plotMember(currentMemberPos); 
                        a++; 
                        if (a == usersInGroup.length) {
                            getMembersPositions(); 
                        } 
                    } // if error
                } // usersInGroup
                console.log(usersInGroup[i].userID); 
                connectAPI('locations?filter={"where":{"userID":"' + usersInGroup[i].userID + '"}}', "GET", locOfUser);  
            } // for
        } // else no error
    } // getGroup
    connectAPI('groupMembers?filter={"where":{"groupID":"' + groupid + '"}}', "GET", getGroup); 

} // getMembersLocations

function center (point) {
    var newPoint = new Array();

    var averagePointLength = 0.0; 
    for (i = 0; i < point.length; i++) {
        if (point.length == 1) {
            return point; 
        } else {
            if (i+1 == point.length) {
                averagePointLength += Math.sqrt(Math.pow(point[point.length-i].lat - point[i].lat, 2) + Math.pow(point[point.length-i].lng - point[i].lng, 2));
            } else {
                averagePointLength += Math.sqrt(Math.pow(point[i+1].lat - point[i].lat, 2) + Math.pow(point[i+1].lng - point[i].lng, 2));
            } // if/else
        } // if/else
    } // for
    averagePointLength = averagePointLength/point.length; 
    for (i = 0; i < point.length; i++) {
        if (point.length == 2) {
            newPoint[i] = {
                lat: (point[i].lat + point[i+1].lat) / 2, 
                lng: (point[i].lng + point[i+1].lng) / 2
            };
            return newPoint;
        } else if (averagePointLength < 0.00001) {
            return point;
        } else {
            if (i+1 == point.length) {
                newPoint[i] = {
                    lat: (point[i].lat + point[point.length-i].lat) / 2, 
                    lng: (point[i].lng + point[point.length-i].lng) / 2 
                };
            } else {
                newPoint[i] = {
                    lat: (point[i].lat + point[i+1].lat) / 2, 
                    lng: (point[i].lng + point[i+1].lng) / 2
                }; 
            } // if/else
        } // if/elseif/else
    } // for
    /*
    for (var i = 0; i < newPoint.length; i++) {
        console.log(newPoint[i].x + ", " + newPoint[i].y); 
    } */
    return center(newPoint); 
} // center

function averagePoint (point) {
    var pointsAverageX = 0.0; 
    var pointsAverageY = 0.0; 
    for (var i = 0; i < point.length; i++) {
        pointsAverageX += point[i].lng; 
        pointsAverageY += point[i].lat; 
    }
    pointsAverageX = pointsAverageX / point.length; 
    pointsAverageY = pointsAverageY / point.length;
    var newPoint = new Object(); 
    newPoint = {
        lat: pointsAverageY,
        lng: pointsAverageX
    }; 
    return newPoint; 
} // averagePoint 

function plotMeetSpots () {
    for (var i = 0; i < allMeetMarkers.length; i++) {
        allMeetMarkers[i].setMap(null); 
    }
    var LatLng = {
        lat: midMarker.getPosition().lat(), 
        lng: midMarker.getPosition().lng() 
    };
    var request = {
        location: LatLng,
        radius: '1000',
        type: ['restaurant']
      };

    callback = function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            results.sort(function(a, b){
                return b.rating-a.rating;
            });
            if (document.getElementsByClassName("meetButton")) {
                $('.meetButton').remove();
            }
            for (var i = 0; i < 3; i++) {
                //console.log(i + ": " + results[i].rating); 
                allMeetMarkers.push(new google.maps.Marker({
                    position: results[i].geometry.location,
                    map: map, 
                    icon: {                             
                        url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                    }
                })); 
                var meet = document.createElement("BUTTON");  //<button> element
                var t = document.createTextNode(results[i].name); // Create a text node
                meet.appendChild(t);
                meet.setAttribute("id", "meet" + i); 
                meet.addEventListener('click', function(){ directions(this.id)});
                meet.className = "meetButton";
                meetup.appendChild(meet);//to show on myView 
            } // for
        }
    } // callback
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
} // plotMeetSpots


function directions(end) { 
    end = end.substring(4, end.length+1);
    end = allMeetMarkers[end].getPosition(); 
    var request = {
        origin: currentPos,
        destination: end,
        travelMode: 'DRIVING'
    };

    directionsService.route(request, function(response, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
    directionsRenderer.setMap(map);
}

