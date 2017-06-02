
// 1. User selects beer or wine
// 2. On click, arrow button shows for smooth scroll
// 3. Make ajax call to the LCBO API with query of organic and user's choice
// 4. Store returned results as objects in an array 
// 5. Filter for duplicates/incorrect results 
// 6. Store filtered results 
// 7. Take filtered results and display first 5 results append with info, append title, price, and data attribute(product id).
// 8. Append rest of results in second div, display none default. 
// 9. If user clicks display more button, display show rest of results. 
// 10. From results, user will select a single  beer or wine
// 11. Get the product id from user selection

// Get user location from browser - store the lat long in to two variables
// Initialize google map
// Send the user's variables to the stores endpoint api

// 12. Make ajax call to store endpoint to get a list of stores that carry product id from user selection

// 13. Get latitude/longitude  of each store results returned from the ajax call 

// 14. Display pins on map of returned results
        //for each store create a new pin on our google map 

// when user clicks on pin, get the longitude and latitude of that specific LCBO location

// Set origin location to user's geo location, set destination location to the clicked pin
// ask Google to get directions for origin and destination
// Print directions for user selection
// Google API key: AIzaSyDgkEVqAbyPj6dmtqjP_Djhp-wOLdGA6nw


// get products based on userChoice beer/wine/spirits
var lcboApp = {};

lcboApp.key = "MDplNzZkOGVjYy00NjFiLTExZTctYjY1MC1mNzdhM2JhOTg3OGQ6YUVVRDRXaGZGVmZaT0ZYNHdNRjYwNG8ybGxuSE5mTno2dldF";



lcboApp.initMap = function(posGeo){

    lcboApp.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: posGeo,
      styles: [
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e9e9e9"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 29
                    },
                    {
                        "weight": 0.2
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dedede"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": 36
                    },
                    {
                        "color": "#333333"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#fefefe"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#fefefe"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                ]
    }
]
    });

    var userPin = new google.maps.Marker({
        position: posGeo,
        map: lcboApp.map,
        icon:'../../assets/userMarker.svg',
    });

    lcboApp.directionsDisplay = new google.maps.DirectionsRenderer;
    lcboApp.directionsService = new google.maps.DirectionsService;
    lcboApp.directionsDisplay.setMap(lcboApp.map);
    lcboApp.directionsDisplay.setPanel(document.getElementById('right-panel'));
}

lcboApp.geoLocation = function(){
    // lcboApp.posGeo = {lat: 43.701, lng: -79.416};
    // lcboApp.initMap(lcboApp.posGeo);

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            
            lcboApp.posGeo = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            lcboApp.initMap(lcboApp.posGeo);
            lcboApp.map.setCenter(lcboApp.posGeo);
            console.log(lcboApp.posGeo);
            lcboApp.usrLat = lcboApp.posGeo.lat;
            lcboApp.usrLng = lcboApp.posGeo.lng;
        });
    }
}



lcboApp.getAlc = function(userChoiceBooze) {
     $.ajax({
        url: "http://lcboapi.com/products",
        method: "GET",
        dataType: "json",
        data: {
            access_key: lcboApp.key,
            q: `${userChoiceBooze}+organic`,
            per_page: 100, 
            page: 1
        }
    }).then(function(res){
        let testResults = res.result;
        // console.log(testResults)
        lcboApp.displayAlc(testResults);
    })
    };

    lcboApp.getUserLocation = function() {

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            console.log(pos);
            return pos;
        });
    }
}

//getting user input and sending it to the ajax call above
 lcboApp.getUserInput = function(){  
    $('.boozeChoiceButton').on('click', function(){
        var userChoiceBooze = $('input[name=alcohol]:checked').val();
        // console.log(userChoiceBooze);
        lcboApp.getAlc(userChoiceBooze);
    })
}

//filtering undesirables out of the results
lcboApp.displayAlc = function(item){
    $('.masterContainer').empty();
    var filteredAlc = item.filter(function(alc){
        return alc.image_thumb_url !== null && alc.tags !== "sake" && alc.id !== 84210 && alc.inventory_count > 0;
    });

    //printing filtered results to the browser
    filteredAlc.forEach(function(someObj){
        var alcName = $('<h1>').text(someObj.name);
        var alcImg = $('<img>').attr('src', someObj.image_thumb_url);
        var input = $('<input>').addClass('hide').attr({
            type: 'radio',
            id: someObj.id,
            name: 'options',
            value: someObj.id
        })
        var label = $('<label>').attr('for', someObj.id).append(alcName,alcImg);
        var alcContainer = $('<div>').addClass('alcContainer').append(input, label)
        //adding data identifier to the container so that the program identifies what we selected
        //.data('alcid', someObj.id);
        $('.masterContainer').append(alcContainer);
    })
}

lcboApp.getStoresById = function(clickedItem, lat, long){
        console.log(clickedItem);
        // let storeResults = [];
         $.ajax({
            url: "http://lcboapi.com/stores",
            method: "GET",
            dataType: "json",
            data: {
                access_key: lcboApp.key,
                product_id: clickedItem,
                per_page: 100, 
                page: 1,
                lat: lat,
                lon: long
            }
         }).then(function(res2){
            let storeResults = res2.result;
            console.log(storeResults)
            lcboApp.filteredStore(storeResults);
         })
}

lcboApp.filteredStore = function(store) {
    // console.log(lcboApp.map.clear);
    // map.removeOverlay(marker);
    lcboApp.initMap(lcboApp.posGeo);
    store.forEach(function(someObj) {
        var pos = {
            lat: someObj.latitude,
            lng: someObj.longitude
        }
        var lcboStore = new google.maps.Marker({
            position: pos,
            map: lcboApp.map,
            icon:'../../assets/LCBOMarker.svg',
        });

        lcboStore.addListener('click', function() {
            lcboApp.map.setZoom(17);
            lcboApp.map.setCenter(lcboStore.getPosition());
            var userClickedPos = lcboStore.position;
            console.log (userClickedPos);
            lcboApp.getGoogleDirections(userClickedPos);
        });
    });
}


lcboApp.getGoogleDirections = function (storePins){
    lcboApp.directionsService.route({
        origin: lcboApp.posGeo,
        destination: storePins,
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
            lcboApp.directionsDisplay.setDirections(response);
            console.log(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
};

//grabbing data (product id) and sending it to the stores endpont AJAX call 
lcboApp.events = function() {
    $('.masterContainer').on('click', 'input', function(){
        var clickedItem = $(this).val();
        lcboApp.getStoresById(clickedItem, lcboApp.usrLat, lcboApp.usrLng);
    });
};

    lcboApp.init = function(){
        lcboApp.getAlc();
        lcboApp.getUserInput();
        lcboApp.getStoresById();
        lcboApp.events();
    }


lcboApp.init = function(){
    lcboApp.getUserInput();
    lcboApp.events();
    lcboApp.geoLocation();
}



    $(function(){
        lcboApp.init();
    })

