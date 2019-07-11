//const
let lat = null;
let lon = null;
let the_map = null;
let marker = null;
let latLon = null;
let iss_pos_url = "http://api.open-notify.org/iss-now.json";

function parse_the_data(json_data){//parsing data from the json to array of object
  lat_elem = document.getElementById("lat");
  lat_elem.innerHTML = json_data.iss_position.latitude;
  lat = json_data.iss_position.latitude;
  lon_elem = document.getElementById("lon");
  lon_elem.innerHTML = json_data.iss_position.longitude;
  lon = json_data.iss_position.longitude;
}

function get_data_and_init(){
  //getting data from the api
  fetch(iss_pos_url)
    .then(response => response.json())
    .then(data => parse_the_data(data))
    .then(function() {initMap()})
    .catch(err => console.error(err));
}

function update_view(){
  //getting data from the api
  fetch(iss_pos_url)
    .then(response => response.json())
    .then(data => parse_the_data(data))
    .then(function() {
        latLon.lat = lat;
        latLon.lon = lon;
        marker.setLatLng(latLon);
    })
    .catch(err => console.error(err));
}

// Fonction d'initialisation de la carte
function initMap() {
      var LeafIcon = L.Icon.extend({
        options: {
            shadowUrl: 'image/marker-icon.png'
        }
    });

    // Créer l'objet "the_map" et l'insèrer dans l'élément HTML qui a l'ID "world_map"
    the_map = L.map('world_map').setView([lat, lon], 5);
    // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        // Il est toujours bien de laisser le lien vers la source des données
        attribution: 'données © <a href="http://osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="http://openstreetmap.fr">OSM France</a>',
        minZoom: 2,
        maxZoom: 20
    }).addTo(the_map);
    let issIcon = new LeafIcon({iconUrl: 'image/marker-icon.png'});
    latLon = new L.LatLng(lat, lon);
    marker = L.marker([lat, lon], {icon: issIcon}).addTo(the_map);
    const clock = setInterval(update_view,1000);

}

window.onload = function(){
  // Fonction d'initialisation qui s'exécute lorsque le DOM est chargé
  get_data_and_init();
};
