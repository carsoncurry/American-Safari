// Firebase initialization code
var config = {
    apiKey: "AIzaSyDUabdQvO-s8kMblw1APXzvCIDwJ5A9Iyc",
    authDomain: "project1-c9ffe.firebaseapp.com",
    databaseURL: "https://project1-c9ffe.firebaseio.com",
    projectId: "project1-c9ffe",
    storageBucket: "project1-c9ffe.appspot.com",
    messagingSenderId: "1032611962994"
};
firebase.initializeApp(config);
var database = firebase.database();

// Very long array of Nation Parks and their IDs. 
// We would have liked to get this from an API, but the NPS api did not provide this. 
var destinationArr = [
    {
        parkID: "ACAD",
        name: "Acadia National Park"
    }, {
        parkID: "ARCH",
        name: "Arches National Park"
    }, {
        parkID: "BADL",
        name: "Badlands National Park"
    }, {
        parkID: "BIBE",
        name: "Big Bend National Park"
    }, {
        parkID: "BISC",
        name: "Biscayne National Park"
    }, {
        parkID: "BLCA",
        name: "Black Canyon Of The Gunnison National Park"
    }, {
        parkID: "BRCA",
        name: "Bryce Canyon National Park"
    }, {
        parkID: "CANY",
        name: "Canyonlands National Park"
    }, {
        parkID: "CARE",
        name: "Capitol Reef National Park"
    }, {
        parkID: "CAVE",
        name: "Carlsbad Caverns National Park"
    }, {
        parkID: "CHIS",
        name: "Channel Islands National Park"
    }, {
        parkID: "CONG",
        name: "Congaree National Park"
    }, {
        parkID: "CRLA",
        name: "Crater Lake National Park"
    }, {
        parkID: "CUVA",
        name: "Cyahoga Valley National Park"
    }, {
        parkID: "DENA",
        name: "Denali National Park and Preserve"
    }, {
        parkID: "DEVA",
        name: "Death Valley National Park"
    }, {
        parkID: "DRTO",
        name: "Dry Tortugas National Park"
    }, {
        parkID: "EVER",
        name: "Everglades National Park"
    }, {
        parkID: "GAAR",
        name: "Gates Of The Arctic National Park and Preserve"
    }, {
        parkID: "GLAC",
        name: "Glacier National Park"
    }, {
        parkID: "GLBA",
        name: "Glacier Bay National Park and Preserve"
    }, {
        parkID: "GRBA",
        name: "Great Basin National Park"
    }, {
        parkID: "GRCA",
        name: "Grand Canyon National Park"
    }, {
        parkID: "GRSA",
        name: "Great Sand Dunes National Park and Preserve"
    }, {
        parkID: "GRSM",
        name: "Great Smoky Mountain National Park"
    }, {
        parkID: "GRTE",
        name: "Grand Teton National Park"
    }, {
        parkID: "GUMO",
        name: "Guadalupe Mountains National Park"
    }, {
        parkID: "HALE",
        name: "Haleakala National Park"
    }, {
        parkID: "HAVO",
        name: "Hawaii Volcanoes National Park"
    }, {
        parkID: "HOSP",
        name: "Hot Springs National Park"
    }, {
        parkID: "ISRO",
        name: "Isle Royale National Park"
    }, {
        parkID: "JOTR",
        name: "Joshua Tree National Park"
    }, {
        parkID: "KATM",
        name: "Katmai National Park and Preserve"
    }, {
        parkID: "KEFJ",
        name: "Kenai Fjords National Park"
    }, {
        parkID: "KICA",
        name: "Kings Canyon National Park"
    }, {
        parkID: "KOVA",
        name: "Kobuk Valley National Park"
    }, {
        parkID: "LACL",
        name: "Lake Clark National Park and Preserve"
    }, {
        parkID: "LAVO",
        name: "Lassen Volcanic National Park"
    }, {
        parkID: "MACA",
        name: "Mammoth Cave National Park"
    }, {
        parkID: "MEVE",
        name: "Mesa Verde National Park"
    }, {
        parkID: "MORA",
        name: "Mount Rainier National Park"
    }, {
        parkID: "NOCA",
        name: "North Cascades National Park"
    }, {
        parkID: "NPSA",
        name: "National Park of American Samoa National Park"
    }, {
        parkID: "OLYM",
        name: "Olympic National Park"
    }, {
        parkID: "PEFO",
        name: "Petrified Forest National Park"
    }, {
        parkID: "REDW",
        name: "Redwood National Park"
    }, {
        parkID: "ROMO",
        name: "Rocky Mountain National Park"
    }, {
        parkID: "SAGU",
        name: "Saguaro National Park"
    }, {
        parkID: "SEKI",
        name: "Sequoia and Kings Canyon National Parks"
    }, {
        parkID: "SEQU",
        name: "Sequoia National Park"
    }, {
        parkID: "SHEN",
        name: "Shenandoah National Park"
    }, {
        parkID: "THRO",
        name: "Theodore Roosevelt National Park"
    }, {
        parkID: "VOYA",
        name: "Voyageurs National Park"
    }, {
        parkID: "WICA",
        name: "Wind Cave National Park"
    }, {
        parkID: "WRST",
        name: "Wrangell - St Elias National Park and Service"
    }, {
        parkID: "YELL",
        name: "Yellowstone National Park"
    }, {
        parkID: "YOSE",
        name: "Yosemite National Park"
    }, {
        parkID: "ZION",
        name: "Zion National Park"
    }
];

// An array for saving each trip's information
var trip = {
    tripName: "",
    startDate: "",
    endDate: "",
    destination: "",
    animalArray: [{}],
};

// The key function; It fills the dropdown menus and handles the on-click functions
$(document).ready(function () {
    fillDestinationDropDown(destinationArr);
    fillTripDropDown();

    $("#btn-submit").on("click", function (event) {
        $("#animal-list").empty();
        event.preventDefault();
        trip.tripName = $("#trip-name").val().trim();
        $("#trip-name").val("");
        iNatAPI(trip);
        database.ref("trip-list").push({
            tripName: trip.tripName,
        });
    });

    $(document).on("click", ".trip-item", function () {
        $("#animal-list").empty();
        var tripName = $(this).attr("trip-name");
        database.ref(tripName).on("value", function (snapshot) {
            var sv = snapshot.val();
            createParkInfoDiv(sv);
            mapReset(sv);
            populateAnimalList(sv);
        });
    });

    $(document).on("click", ".park-item", function () {
        trip.destination = $(this).attr("park-name");
        createParkInfoDiv(trip);
        leafletAPICall(trip);

    });
});

//I added a space so users can see their selection after they choose their destination; we can definately move/remove it
function createParkInfoDiv(obj) {
    $("#alert-div").empty();
    var selectedDestination = $("<div>");
    $(selectedDestination).text(obj.destination);
    $(selectedDestination).attr("class", "alert alert-success col-lg-6").attr("id", "destination-alert");
    $("#alert-div").append(selectedDestination);
}

function leafletAPICall(obj) {
    //I want the "selected destination" to be the input in the ajax call, but i can't get it to work yet, so currently "searchTerm" is set to equal "Yellowstone National Park"
    var searchTerm = obj.destination;

    var searchQueryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?inputtype=textquery&input=" + searchTerm + "&key=AIzaSyBqMbrp7nyyZwf4tnkr-c0DX00748BZFEk";
    console.log(searchQueryURL);
    $.ajax({
        url: searchQueryURL,
        method: "GET"
    }).then(function (response) {
        var placeID = response.candidates[0].place_id;
        var geocodeQueryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeID + "&key=AIzaSyBqMbrp7nyyZwf4tnkr-c0DX00748BZFEk"
        console.log(geocodeQueryURL);
        $.ajax({
            url: geocodeQueryURL,
            method: "GET"
        }).then(function (response) {
            var latitude = response.result.geometry.location.lat;
            var longitude = response.result.geometry.location.lng;
            var myMap = L.map('mapid').setView([latitude, longitude], 10);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(myMap);

            L.marker([latitude, longitude]).addTo(myMap);
        });
    });
}
// This function was added to help reset the map
function mapReset(a) {
    $("#mapid").remove();
    var newMap = $("<div>");
    newMap.attr("id", "mapid");
    $("#left-content").append(newMap);
    leafletAPICall(a);
}

function createParkInfoDiv(obj) {
    $("#alert-div").empty();
    var selectedDestination = $("<div>");
    $(selectedDestination).text(obj.destination);
    $(selectedDestination).attr("class", "alert alert-light col-lg-12").attr("id", "destination-alert");
    $("#alert-div").append(selectedDestination);
}

// This function handles the API call to Google Places API; this takes the saved obj.destination and hands it to the API twice in order to get coordinates. The coordinates are then put into a Leaflet.js map.
function leafletAPICall(obj) {
    var searchTerm = obj.destination;

    var searchQueryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?inputtype=textquery&input=" + searchTerm + "&key=AIzaSyBqMbrp7nyyZwf4tnkr-c0DX00748BZFEk";

    $.ajax({
        url: searchQueryURL,
        method: "GET"
    }).then(function (response) {
        var placeID = response.candidates[0].place_id;
        var geocodeQueryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeID + "&key=AIzaSyBqMbrp7nyyZwf4tnkr-c0DX00748BZFEk"
        $.ajax({
            url: geocodeQueryURL,
            method: "GET"
        }).then(function (response) {
            var latitude = response.result.geometry.location.lat;
            var longitude = response.result.geometry.location.lng;
            console.log(latitude);
            console.log(longitude);
            var myMap = L.map('mapid', {scrollWheelZoom: false}).setView([latitude, longitude], 10);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(myMap);

            L.marker([latitude, longitude]).addTo(myMap);
        });
    });
}

// This function was added to help reset the map
function mapReset(a) {
    $("#mapid").remove();
    var newMap = $("<div>");
    newMap.attr("id", "mapid");
    $("#left-content").append(newMap);
    leafletAPICall(a);
}

// jQuery plugin for the date range found here "http://www.daterangepicker.com/"
$(function () {
    $('input[name="daterange"').daterangepicker({
        opens: 'right'
    }, function (start, end) {
        trip.startDate = start.format('MM-DD-YYYY');
        trip.endDate = end.format('MM-DD-YYYY');
    });
});
// Fills in the destination dropdrown menu with the array above.
function fillDestinationDropDown(arr) {
    for (var i = 0; i < arr.length; i++) {
        var newAnchor = $("<a>");
        newAnchor.attr("parkID", arr[i].parkID).attr("park-name", arr[i].name).addClass("dropdown-item park-item").text(arr[i].name);
        $("#park-dropdown").append(newAnchor);
    }
}

// This will populate the trip drop down menu
function fillTripDropDown() {
    database.ref("trip-list").on("value", function (snapshot) {
        $("#trip-item").empty();
        var sv = snapshot.val();
        for (var tripID in sv) {
            var newAnchor = $("<a>");
            newAnchor.attr("trip-name", sv[tripID].tripName).addClass("trip-item dropdown-item").text(sv[tripID].tripName);
            $("#trip-item").append(newAnchor);
        }
    });
}
// Returns a list of days from the user's input. For iNat API
function returnDays(startD, endD) {
    var sDate = moment(startD);
    var eDate = moment(endD);
    var days = [];
    while (sDate <= eDate) {
        var day = moment(sDate).format("D");
        days.push(day);
        sDate = moment(sDate).add(1, "d");
    }
    return days.join('%2C');
}
// Returns a list of month from the user's input. For iNat API
function returnMonths(startM, endM) {
    var sMonth = moment(startM);
    var eMonth = moment(endM);
    var months = [];
    while (sMonth <= eMonth) {
        var month = moment(sMonth).format("M");
        months.push(month);
        sMonth = moment(sMonth).add(1, "M");
    }
    return months.join('%2C');
}
// Pushes list of Animals to the Database
function pushAnimalList(obj) {
    database.ref(obj.tripName).set({
        tripName: obj.tripName,
        startDate: obj.startDate,
        endDate: obj.endDate,
        destination: obj.destination,
        animalArray: obj.animalArray,
        dataAdded: firebase.database.ServerValue.TIMESTAMP
    });
}
// Populates animals list on the DOM.
function populateAnimalList(obj) {
    var animalObjAry = obj.animalArray;
    for (var i = 1; i <= animalObjAry.length; i++) {
        var newLi = $("<li>");
        var newImg = $("<img>");
        newImg.addClass("mr-3 thumbnail").attr("src", animalObjAry[i].imgURL).attr("alt", animalObjAry[i].name).attr("style", "min-width: 65px;");
        var newDiv = $("<div>");
        newDiv.addClass("media-body");
        var newH5 = $("<h5>");
        newH5.addClass("mt-0 mb-1").text(animalObjAry[i].name);
        var newAnchor = $("<a>");
        newAnchor.attr("href", animalObjAry[i].wikiLink).attr("target", "_blank").addClass("wiki-link").text(animalObjAry[i].wikiLink);
        newDiv.append(
            newH5,
            newAnchor
        );
        newLi.addClass("media").append(
            newImg,
            newDiv
        );
        $("#animal-list").append(newLi);
    }
}

function iNatAPI(trip) {
    var popular = true;
    var photos = true;
    var verifiable = true;
    var daysString = returnDays(trip.startDate, trip.endDate);
    var monthString = returnMonths(trip.startDate, trip.endDate);
    // added the .replace function to make sure the entire trip.destination string was included in the query.
    var local = trip.destination.replace(/\s+/g, '%20');
    var responNum = 10;
    var queryURL = `https://api.inaturalist.org/v1/observations/species_counts?photos=${photos}&popular=${popular}&verifiable=${verifiable}&day=${daysString}&month=${monthString}&local=${local}&per_page=${responNum}`
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var res = response.results;
        for (var i = 0; i < res.length; i++) {
            var animalObj = {
                name: res[i].taxon.preferred_common_name,
                taxonName: res[i].taxon.name,
                imgURL: res[i].taxon.default_photo.square_url,
                wikiLink: res[i].taxon.wikipedia_url,
            };
            // Adding the list of animals to the array of objects in the trip object
            trip.animalArray.push(animalObj);
        }
        // pushing animal list to firebase
        pushAnimalList(trip);
        populateAnimalList(trip);
    });
}

function populateDestinations(arr) {
    for (var i = 0; i < arr.length; i++) {
        var newAnchor = $("<a>");
        newAnchor.attr("parkID", arr[i].parkID).attr("park-name", arr[i].name).addClass("dropdown-item").text(arr[i].name);
        $("#park-dropdown").append(newAnchor);
    }
}

$("#btn-refresh").on("click", function() {
    window.location.reload();
});
