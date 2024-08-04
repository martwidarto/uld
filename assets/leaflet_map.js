// load config
$(document).ready(function () {
	$.getJSON("assets/config.json", function (data) {
		$("#title").html(data.title);
		$("#navbar-title").html(data.navbar_title);
		$("#desc-info-modal").html(data.desc_info_modal);
	});
});

// Leaflet Map
var map = L.map('map').setView([-7.7326606,112.9312134], 9);

// Basemap Layers
var street = L.tileLayer('https://mt0.google.com/vt/lyrs=r&hl=en&x={x}&y={y}&z={z}', {
	maxZoom: 20,
	minZoom: 0,
	attribution: 'Google Street',
	label: 'Google Street'
});

var satellite = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
	maxZoom: 20,
	minZoom: 0,
	subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
	attribution: 'Google Satellite',
	label: 'Google Satellite'
});

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 20,
	minZoom: 0,
	attribution: 'OpenStreetMap',
	label: 'OSM'
});

// if null value
function nullValue(value) {
	if (value == null) {
		return 0;
	} else {
		return value;
	}
}

// Multi Bahaya
map.createPane('pane_MultiBahaya');
map.getPane('pane_MultiBahaya').style.zIndex = 201;
var img_MultiBahaya = 'data/MultiBahaya.png';
var img_bounds_MultiBahaya = [[-8.780713848073898, 110.89465174832193], [-5.0424415276561305, 116.27106872377715]];
var layer_MultiBahaya = new L.imageOverlay(img_MultiBahaya, img_bounds_MultiBahaya, { pane: 'pane_MultiBahaya' });
map.addLayer(layer_MultiBahaya);
