function parse_the_data(json_data){//parsing data from the json to array of object
  lat_elem = document.getElementById("lat");
  lat_elem.innerHTML = json_data.iss_position.latitude;
  lon_elem = document.getElementById("lon");
  lon_elem.innerHTML = json_data.iss_position.longitude;
}

function get_data(){
  //getting data from the api
  fetch('http://api.open-notify.org/iss-now.json')
    .then(response => response.json())
    .then(data => parse_the_data(data))
    .catch(err => console.error(err));
}

let the_map = L.map('world_map').setView([51.505, -0.09], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
}).addTo(the_map);
const clock = setInterval(get_data,1000);
