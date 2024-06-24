// load config
$(document).ready(function () {
	$.getJSON("assets/config.json", function (data) {
		$("#title").html(data.title);
		$("#navbar-title").html(data.navbar_title);
		$("#desc-info-modal").html(data.desc_info_modal);
	});
});

// Leaflet Map
var map = L.map('map').setView([-7.6510520, 112.9105138], 13);

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

// Titik Desa
var titikdesa = L.geoJson(null, {
	pointToLayer: function (feature, latlng) {
		if (feature.properties) {
			// Color Marker
			var color = function () {
				if (feature.properties.total <= 10) {
					return 'green-light';
				} else if (feature.properties.total > 10 && feature.properties.total <= 20) {
					return 'orange';
				} else {
					return 'red';
				}
			};

			// Marker
			var redMarker = L.ExtraMarkers.icon({
				icon: 'fa-number',
				number: feature.properties.total,
				markerColor: color(),
				shape: 'square',
				prefix: 'fa',
				tooltipAnchor: [15, -25]
			});
			return L.marker(latlng, {
				icon: redMarker,
				riseOnHover: true
			});
		}
	},
	onEachFeature: function (feature, layer) {
		if (feature.properties) {
			var title = "<strong>Desa " + feature.properties.WADMKD + ", Kec. " + feature.properties.WADMKC + "</strong>";
			var content = "<table class='table table-responsive-sm table-bordered table-striped m-0'>" +
				"<tr><th class='text-center'>Disabilitas</th><th class='text-center'>Jumlah</th></tr>" +
				"<tr><th>Daksa</th><td class='text-center'>" + nullValue(feature.properties.d) + "</td></tr>" +
				"<tr><th>Daksa Autis</th><td class='text-center'>" + nullValue(feature.properties.da) + "</td></tr>" +
				"<tr><th>Daksa Grahita</th><td class='text-center'>" + nullValue(feature.properties.dg) + "</td></tr>" +
				"<tr><th>Daksa Lambat Belajar</th><td class='text-center'>" + nullValue(feature.properties.dlb) + "</td></tr>" +
				"<tr><th>Daksa Lambat Belajar Down Syndrome Grahita</th><td class='text-center'>" + nullValue(feature.properties.dlbdsg) + "</td></tr>" +
				"<tr><th>Daksa Lambat Belajar Down Syndrome Wicara Grahita</th><td class='text-center'>" + nullValue(feature.properties.dlbdswg) + "</td></tr>" +
				"<tr><th>Daksa Lambat Belajar Wicara Grahita</th><td class='text-center'>" + nullValue(feature.properties.dlbwg) + "</td></tr>" +
				"<tr><th>Daksa Low Vision</th><td class='text-center'>" + nullValue(feature.properties.dlv) + "</td></tr>" +
				"<tr><th>Daksa Low Vision Down Syndrome Wicara Grahita</th><td class='text-center'>" + nullValue(feature.properties.dlvdswg) + "</td></tr>" +
				"<tr><th>Daksa Low Vision Grahita</th><td class='text-center'>" + nullValue(feature.properties.dlvg) + "</td></tr>" +
				"<tr><th>Daksa Mental</th><td class='text-center'>" + nullValue(feature.properties.dm) + "</td></tr>" +
				"<tr><th>Daksa Mental Autis Wicara</th><td class='text-center'>" + nullValue(feature.properties.dmaw) + "</td></tr>" +
				"<tr><th>Daksa Mental Autis Wicara Grahita</th><td class='text-center'>" + nullValue(feature.properties.dmawg) + "</td></tr>" +
				"<tr><th>Daksa Mental Down Syndrome Wicara Grahita</th><td class='text-center'>" + nullValue(feature.properties.dmdswg) + "</td></tr>" +
				"<tr><th>Daksa Mental Grahita</th><td class='text-center'>" + nullValue(feature.properties.dmg) + "</td></tr>" +
				"<tr><th>Daksa Mental Lambat Belajar</th><td class='text-center'>" + nullValue(feature.properties.dmlb) + "</td></tr>" +
				"<tr><th>Daksa Mental Lambat Belajar Wicara Grahita</th><td class='text-center'>" + nullValue(feature.properties.dmlbwg) + "</td></tr>" +
				"<tr><th>Daksa Mental Rungu Lambat Belajar Down Syndrome Wicara</th><td class='text-center'>" + nullValue(feature.properties.dmrlbdsw) + "</td></tr>" +
				"<tr><th>Daksa Mental Rungu Lambat Belajar Down Syndrome Wicara Grahita</th><td class='text-center'>" + nullValue(feature.properties.dmrlbdswg) + "</td></tr>" +
				"<tr><th>Daksa Mental Rungu Lambat Belajar Wicara</th><td class='text-center'>" + nullValue(feature.properties.dmrlbw) + "</td></tr>" +
				"<tr><th>Daksa Mental Rungu Lambat Belajar Wicara Grahita</th><td class='text-center'>" + nullValue(feature.properties.dmrlbwg) + "</td></tr>" +
				"<tr><th>Daksa Mental Rungu Wicara</th><td class='text-center'>" + nullValue(feature.properties.dmrw) + "</td></tr>" +
				"<tr><th>Daksa Mental Rungu Wicara Grahita</th><td class='text-center'>" + nullValue(feature.properties.dmrwg) + "</td></tr>" +
				"<tr><th>Daksa Mental Rungu Wicara Total Blind Grahita</th><td class='text-center'>" + nullValue(feature.properties.dmrwtbg) + "</td></tr>" +
				"<tr><th>Daksa Mental Wicara</th><td class='text-center'>" + nullValue(feature.properties.dmw) + "</td></tr>" +
				"<tr><th>Daksa Mental Wicara Grahita</th><td class='text-center'>" + nullValue(feature.properties.dmwg) + "</td></tr>" +
				"<tr><th>Daksa Mental Wicara Total Blind Grahita</th><td class='text-center'>" + nullValue(feature.properties.dmwtbg) + "</td></tr>" +
				"<tr><th>Daksa Rungu Grahita</th><td class='text-center'>" + nullValue(feature.properties.drg) + "</td></tr>" +
				"<tr><th>Daksa Rungu Lambat Belajar Wicara Grahita</th><td class='text-center'>" + nullValue(feature.properties.drlbwg) + "</td></tr>" +
				"<tr><th>Daksa Rungu Wicara</th><td class='text-center'>" + nullValue(feature.properties.drw) + "</td></tr>" +
				"<tr><th>Daksa Wicara</th><td class='text-center'>" + nullValue(feature.properties.dw) + "</td></tr>" +
				"<tr><th>Daksa Wicara Grahita</th><td class='text-center'>" + nullValue(feature.properties.dwg) + "</td></tr>" +
				"<tr><th>Down Syndrome</th><td class='text-center'>" + nullValue(feature.properties.ds) + "</td></tr>" +
				"<tr><th>Grahita</th><td class='text-center'>" + nullValue(feature.properties.g) + "</td></tr>" +
				"<tr><th>Lambat Belajar</th><td class='text-center'>" + nullValue(feature.properties.lb) + "</td></tr>" +
				"<tr><th>Lambat Belajar Down Syndrome</th><td class='text-center'>" + nullValue(feature.properties.lbds) + "</td></tr>" +
				"<tr><th>Lambat Belajar Down Syndrome Wicara</th><td class='text-center'>" + nullValue(feature.properties.lbdsw) + "</td></tr>" +
				"<tr><th>Low Vision</th><td class='text-center'>" + nullValue(feature.properties.lv) + "</td></tr>" +
				"<tr><th>Low Vision Autis Grahita</th><td class='text-center'>" + nullValue(feature.properties.lvag) + "</td></tr>" +
				"<tr><th>Mental</th><td class='text-center'>" + nullValue(feature.properties.m) + "</td></tr>" +
				"<tr><th>Mental Lambat Belajar Down Syndrome</th><td class='text-center'>" + nullValue(feature.properties.mlbds) + "</td></tr>" +
				"<tr><th>Mental Lambat Belajar Wicara</th><td class='text-center'>" + nullValue(feature.properties.mlbw) + "</td></tr>" +
				"<tr><th>Mental Rungu Lambat Belajar Down Syndrome</th><td class='text-center'>" + nullValue(feature.properties.mrlbds) + "</td></tr>" +
				"<tr><th>Mental Rungu Lambat Belajar Down Syndrome Wicara</th><td class='text-center'>" + nullValue(feature.properties.mrlbdsw) + "</td></tr>" +
				"<tr><th>Mental Rungu Wicara</th><td class='text-center'>" + nullValue(feature.properties.mrw) + "</td></tr>" +
				"<tr><th>Mental Rungu Wicara Grahita</th><td class='text-center'>" + nullValue(feature.properties.mrwg) + "</td></tr>" +
				"<tr><th>Mental Wicara</th><td class='text-center'>" + nullValue(feature.properties.mw) + "</td></tr>" +
				"<tr><th>Rungu</th><td class='text-center'>" + nullValue(feature.properties.r) + "</td></tr>" +
				"<tr><th>Rungu Down Syndrome Wicara</th><td class='text-center'>" + nullValue(feature.properties.rdsw) + "</td></tr>" +
				"<tr><th>Rungu Wicara</th><td class='text-center'>" + nullValue(feature.properties.rw) + "</td></tr>" +
				"<tr><th>Wicara</th><td class='text-center'>" + nullValue(feature.properties.w) + "</td></tr>" +
				"<tr><th>Wicara Grahita</th><td class='text-center'>" + nullValue(feature.properties.wg) + "</td></tr>" +
				"<tr><th>Tidak Teridentifikasi</th><td class='text-center'>" + nullValue(feature.properties.tt) + "</td></tr>" +
				"<tr><th>Total</th><td class='text-center'>" + nullValue(feature.properties.total) + "</td></tr>" +
				"</table>";
			layer.on({
				click: function (e) {
					$("#featureModalTitle").html(title);
					$("#featureModalBody").html(content);
					$("#featureModal").modal("show");
				},
				mouseover: function (e) {
					titikdesa.bindTooltip(feature.properties.WADMKD + ", " + feature.properties.WADMKC);
				}
			});
		}
	},
	// filter
	filter: function (feature, layer) {
		return feature.properties.total > 0;
	}
});
$.getJSON("data/disabilitas_desa_point.geojson", function (data) {
	titikdesa.addData(data);
	map.addLayer(titikdesa);
});

/* Batas Desa */
map.createPane('pane_batasdesa');
map.getPane('pane_batasdesa').style.zIndex = 401;
var batasdesa = L.geoJson(null, {
	pane: 'pane_batasdesa',
	/* Style polygon */
	style: function (feature) { //Fungsi style polygon
		return {
			fillColor: "white", //Warna tengah polygon
			fillOpacity: 0, //Transparansi tengah polygon
			color: "gray", //Warna garis tepi polygon
			weight: 1.5, //Tebal garis tepi polygon
			opacity: 1, //Transparansi garis tepi polygon
		};
	},
	/* Highlight & Popup */
	onEachFeature: function (feature, layer) {
		layer.on({
			mouseover: function (e) { //Fungsi ketika mouse berada di atas obyek
				var layer = e.target; //variabel layer
				layer.setStyle({ //Highlight style
					weight: 1.5, //Tebal garis tepi polygon
					color: "gray", //Warna garis tepi polygon
					opacity: 1, //Transparansi garis tepi polygon
					fillColor: "cyan", //Warna tengah polygon
					fillOpacity: 1, //Transparansi tengah polygon
				});
				batasdesa.bindTooltip(feature.properties.WADMKD + ", " + feature.properties.WADMKC); //Tooltip
			},
			mouseout: function (e) { //Fungsi ketika mouse keluar dari area obyek
				batasdesa.resetStyle(e.target); //Mengembalikan style polygon ke style awal
				map.closePopup(); //Menutup popup
			},
			click: function (e) { //Fungsi ketika obyek di-klik
				batasdesa.bindPopup("Desa " + feature.properties.WADMKD + ", Kec. " + feature.properties.WADMKC); //Popup
			}
		});
	}
});
/* memanggil data geojson polygon */
$.getJSON("data/batas_desa.geojson", function (data) {
	batasdesa.addData(data);
	map.addLayer(batasdesa); //batasdesa ditampilkan ketika halaman dipanggil
	map.fitBounds(batasdesa.getBounds());
});

/* Batas Kecamatan */
map.createPane('pane_bataskecamatan');
map.getPane('pane_bataskecamatan').style.zIndex = 402;
var bataskecamatan = L.geoJson(null, {
	pane: 'pane_bataskecamatan',
	/* Style polygon */
	style: function (feature) { //Fungsi style polygon
		return {
			fillColor: "white", //Warna tengah polygon
			fillOpacity: 0, //Transparansi tengah polygon
			color: "black", //Warna garis tepi polygon
			weight: 2, //Tebal garis tepi polygon
			opacity: 1, //Transparansi garis tepi polygon
		};
	},
	/* Highlight & Popup */
	onEachFeature: function (feature, layer) {
		layer.on({
			mouseover: function (e) { //Fungsi ketika mouse berada di atas obyek
				var layer = e.target; //variabel layer
				layer.setStyle({ //Highlight style
					weight: 2, //Tebal garis tepi polygon
					color: "black", //Warna garis tepi polygon
					opacity: 1, //Transparansi garis tepi polygon
					fillColor: "cyan", //Warna tengah polygon
					fillOpacity: 1, //Transparansi tengah polygon
				});
				bataskecamatan.bindTooltip(feature.properties.WADMKC); //Tooltip
			},
			mouseout: function (e) { //Fungsi ketika mouse keluar dari area obyek
				bataskecamatan.resetStyle(e.target); //Mengembalikan style polygon ke style awal
				map.closePopup(); //Menutup popup
			},
			click: function (e) { //Fungsi ketika obyek di-klik
				bataskecamatan.bindPopup("Kec. " + feature.properties.WADMKC); //Popup
			}
		});
	}
});
/* memanggil data geojson polygon */
$.getJSON("data/batas_kecamatan.geojson", function (data) {
	bataskecamatan.addData(data);
	// map.addLayer(bataskecamatan); //batas kecamatan ditampilkan ketika halaman dipanggil
});

// Multi Bahaya
map.createPane('pane_MultiBahaya');
map.getPane('pane_MultiBahaya').style.zIndex = 201;
var img_MultiBahaya = 'data/MultiBahaya.png';
var img_bounds_MultiBahaya = [[-8.780713848073898, 110.89465174832193], [-5.0424415276561305, 116.27106872377715]];
var layer_MultiBahaya = new L.imageOverlay(img_MultiBahaya, img_bounds_MultiBahaya, { pane: 'pane_MultiBahaya' });
map.addLayer(layer_MultiBahaya);

// Control Layer Basemaps
map.addControl(L.control.basemaps({
	basemaps: [osm, street, satellite],
	tileX: 0, // tile X coordinate
	tileY: 0, // tile Y coordinate
	tileZ: 1 // tile zoom level
}));

// Control Layer
var layers = {
	"Disabilitas<br>&nbsp;&nbsp;&nbsp;<img src='assets/images/legend/lightgreenmarker.png' width='24'> 1 - 10<br>&nbsp;&nbsp;&nbsp;<img src='assets/images/legend/orangemarker.png' width='24'> 11 - 20<br>&nbsp;&nbsp;&nbsp;<img src='assets/images/legend/redmarker.png' width='24'> > 20": titikdesa,
	"Batas Desa": batasdesa,
	"Batas Kecamatan": bataskecamatan,
	"Multi Bahaya": layer_MultiBahaya
};

L.control.layers(null, layers, { collapsed: false }).addTo(map);


// Scale Bar
L.control.scale({
	position: 'bottomleft',
	imperial: false
}).addTo(map);

// Logo
L.Control.Watermark = L.Control.extend({
	onAdd: function (map) {
		var img = L.DomUtil.create('img');
		img.src = 'assets/images/logo.png'; //Image URL
		img.style.width = '50px'; //Image Size
		return img;
	},
	onRemove: function (map) {
		// Nothing to do here
	}
});
L.control.watermark = function (opts) {
	return new L.Control.Watermark(opts);
}
L.control.watermark({ position: 'bottomleft' }).addTo(map);