
// Control Layer Basemaps
map.addControl(L.control.basemaps({
	basemaps: [osm, street, satellite],
	tileX: 0, // tile X coordinate
	tileY: 0, // tile Y coordinate
	tileZ: 1 // tile zoom level
}));

// Control Layer
var layers = {
	"Disabilitas Pasuruan<br>&nbsp;&nbsp;&nbsp;<img src='assets/images/legend/lightgreenmarker.png' width='24'> 1 - 10<br>&nbsp;&nbsp;&nbsp;<img src='assets/images/legend/orangemarker.png' width='24'> 11 - 20<br>&nbsp;&nbsp;&nbsp;<img src='assets/images/legend/redmarker.png' width='24'> > 20": disabilitas_pasuruan,
	"Disabilitas Kota Kediri<br>&nbsp;&nbsp;&nbsp;<img src='assets/images/legend/lightgreenmarker.png' width='24'> 1 - 10<br>&nbsp;&nbsp;&nbsp;<img src='assets/images/legend/orangemarker.png' width='24'> 11 - 20<br>&nbsp;&nbsp;&nbsp;<img src='assets/images/legend/redmarker.png' width='24'> > 20": disabilitas_kedirikot,
	"Disabilitas Kabupaten Blitar<br>&nbsp;&nbsp;&nbsp;<img src='assets/images/legend/lightgreenmarker.png' width='24'> 1 - 10<br>&nbsp;&nbsp;&nbsp;<img src='assets/images/legend/orangemarker.png' width='24'> 11 - 20<br>&nbsp;&nbsp;&nbsp;<img src='assets/images/legend/redmarker.png' width='24'> > 20": disabilitas_blitarkab,
	"Batas Desa Pasuruan": batasdesa_pasuruan,
	"Batas Kecamatan Pasuruan": bataskecamatan_pasuruan,
	"Batas Desa Kota Kediri": batasdesa_kedirikot,
	"Batas Kecamatan Kota Kediri": bataskecamatan_kedirikot,
	"Batas Desa Kabupaten Blitar": batasdesa_blitarkab,
	"Batas Kecamatan Kabupaten Blitar": bataskecamatan_blitarkab,
	"Multi Bahaya<br>&nbsp;&nbsp;&nbsp;&nbsp;<img src='assets/images/indeks_bahaya_kerentanan_risiko.png' width='85' height='15'><br>&nbsp;&nbsp;&nbsp;&nbsp;<small>Rendah&nbsp;&nbsp;&nbsp;&nbsp;Tinggi</small>": layer_MultiBahaya
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