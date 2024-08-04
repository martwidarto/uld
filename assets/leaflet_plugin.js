
// Control Layer Basemaps
map.addControl(L.control.basemaps({
	basemaps: [osm, street, satellite],
	tileX: 0, // tile X coordinate
	tileY: 0, // tile Y coordinate
	tileZ: 1 // tile zoom level
}));

var layers = [
	{
		label: ' <b>Disabilitas</b>',
		selectAllCheckbox: true,
		children: [
			{ label: ' Pasuruan', layer: disabilitas_pasuruan},
			{ label: ' Kota Kediri', layer: disabilitas_kedirikot},
			{ label: ' Kota Malang', layer: disabilitas_malangkot},
			{ label: ' Kabupaten Blitar', layer: disabilitas_blitarkab},
			{ label: ' Kabupaten Pacitan', layer: disabilitas_pacitan},
		]
	},
	{
		label: ' <b>Batas Kecamatan</b>',
		selectAllCheckbox: true,
		collapsed: true,
		children: [
			{ label: ' Pasuruan', layer: bataskecamatan_pasuruan },
			{ label: ' Kota Kediri', layer: bataskecamatan_kedirikot },
			{ label: ' Kota Malang', layer: bataskecamatan_malangkot },
			{ label: ' Kabupaten Blitar', layer: bataskecamatan_blitarkab },
			{ label: ' Kabupaten Pacitan', layer: bataskecamatan_pacitan },
		]
	},
	{
		label: ' <b>Batas Desa</b>',
		selectAllCheckbox: true,
		collapsed: true,
		children: [
			{ label: ' Pasuruan', layer: batasdesa_pasuruan },
			{ label: ' Kota Kediri', layer: batasdesa_kedirikot },
			{ label: ' Kota Malang', layer: batasdesa_malangkot },
			{ label: ' Kabupaten Blitar', layer: batasdesa_blitarkab },
			{ label: ' Kabupaten Pacitan', layer: batasdesa_pacitan },
		]
	},
	{
		label: ' <b>Bencana</b>',
		selectAllCheckbox: true,
		collapsed: true,
		children: [
			{ label: ' Multi Bahaya', layer: layer_MultiBahaya },
		]
	}
];

L.control.layers.tree(null, layers, {
	namedToggle: true,
	collapseAll: '<b><i class="fa-solid fa-folder-closed"></i> Tutup semua</b>',
	expandAll: '<b><i class="fa-solid fa-folder-open"></i> Buka semua</b>',
	collapsed: false,
}).addTo(map);


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

// Control legend
var legend = L.control({
	position: 'bottomleft'
});

legend.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'legend');
	this.update();
	return this._div;
};

legend.update = function () {
	this._div.innerHTML = `<div class='p-1 mb-1'><strong>Jumlah Disabilitas</strong><br><img src='assets/images/legend/lightgreenmarker.png' width='24'> 1 - 10<br><img src='assets/images/legend/orangemarker.png' width='24'> 11 - 20<br><img src='assets/images/legend/redmarker.png' width='24'> > 20</div><div class='p-1 mb-1'><strong>Batas Wilayah</strong><br><svg height="4" width="32"><line x1="0" y1="4" x2="32" y2="4" style="stroke:black;stroke-width:12" /></svg> Batas Kecamatan<br><svg height="3" width="32"><line x1="0" y1="3" x2="32" y2="3" style="stroke:gray;stroke-width:12" /></svg> Batas Desa</div><div class='p-1 mb-1'><strong>Multi Bahaya</strong><br><img src='assets/images/indeks_bahaya_kerentanan_risiko.png' width='100' height='15'><br><small>Rendah&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tinggi</small></div>`;
};

legend.addTo(map);