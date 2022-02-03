///////////Creación variable mapa/////////// 
var map = L.map('map', {
		zoomControl: false,
		center: [40, -3],
		zoom: 6,
		minZoom: 3,
		maxZoom: 20,
		maxBounds: [
			[20, -50],
			[50, 50]
			],
	});




///////////Funcionalidades estructura del visor///////////
//Layers on top
map.createPane('límites');
// This pane is above markers but below popups
map.getPane('límites').style.zIndex = 650;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('límites').style.pointerEvents = 'none';
//Labels on top
map.createPane('labels');
// This pane is above markers but below popups
map.getPane('labels').style.zIndex = 800;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('labels').style.pointerEvents = 'none';
//bindTooltip on top
map.createPane('popups');
// el popup aparece al arrastar encima de todo pero debajo del popup que aparece al clicar
map.getPane('popups').style.zIndex = 1000;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups').style.pointerEvents = 'none';
//bindPopup on top
map.createPane('popups1');
// aparece por encima de todas las capas
map.getPane('popups1').style.zIndex = 1500;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups1').style.pointerEvents = 'none';
//Barra de interacción de capas	tantaas sildebar como grupos de capas
var sidebar = L.control.sidebar('sidebar', { closeButton:true, position: 'left' });
	map.addControl(sidebar);
	sidebar.hide();			
	sidebar.show();
	sidebar.toggle();
var visible = sidebar.isVisible();
var button = new L.Control.Button(L.DomUtil.get('helpbutton'), { toggleButton: 'active', position: 'topleft'});
	button.addTo(map);
	button.on('click', function () {
	 if (button.isToggled()) {
			sidebar.hide();
		} else {
			sidebar.show();
		}
	});
var sidebar2 = L.control.sidebar('sidebar2', { closeButton:true, position: 'right' });
	map.addControl(sidebar2);
	sidebar2.hide();			
	sidebar2.show();
	sidebar2.toggle();
var visible2 = sidebar.isVisible();

//Buscador
var geocoder = L.Control.geocoder({ position: 'topleft',
	//defaultMarkGeocode: false
	}).addTo(map);


///////////Diseño caracteriticas basicas del visor///////////
//Título
var title2 = L.control({position: 'topright'});
	title2.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info2');
	 div.innerHTML +=
	 'VISOR CARTOGRÁFICO<h2>Cambio climático - Temperatura<br>Proyecto CLIMVAC</h2>';
	 return div;
	};
	title2.addTo(map);
//Logo Matrix	
var title1 = L.control({position: 'bottomright'});
	title1.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info1');
	 div.innerHTML +=
	 '<a href="https://www.fundacionmatrix.es"><img src="images/matrix.png" width="75%" ></img></a>';
	 return div;
	};
	title1.addTo(map);
//Logo impactsig	
var title3 = L.control({position: 'bottomright'});
	title3.onAdd = function (map) {
var div = L.DomUtil.create('div','info3');
	 div.innerHTML +=
	 '<a><img src="images/Logo_CLIMVAC_2018.png" width="120px" height="63px" ></img></a>';
	 return div;
	};
	title3.addTo(map);  


///////////Cartografía de referencia///////////
var Mapa_fondo = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a>| Map data © 2019 <a href="https://www.fundacionmatrix.es"><strong>Fundación Matrix</strong></a>'
	}).addTo(map);		
//			var positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
//			attribution: '©OpenStreetMap, ©CartoDB'
//			}).addTo(map);
//			var positronLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
//			attribution: '©OpenStreetMap, ©CartoDB',
//			pane: 'labels'
//			}).addTo(map);
var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy'
	});
var osm1 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 18,
	opacity: 0,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});
var osm2 = new L.TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	minZoom: 0, 
	maxZoom: 13,
	});
var osm3 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a>| Map data © 2019 <a href="https://www.fundacionmatrix.es"><strong>Fundación Matrix</strong></a>'
	});
//Límites
var comunidades = L.geoJson(comunidades, {
	color: "#17202A", 
	weight: 1.3,
	opacity: 0.5,
	fillOpacity: 0,
	pane: 'límites', // layer goes on top.
	attribution: '| © <a href="http://www.ign.es">Instituto Geográfico Nacional |'			
	}).addTo(map);

//rasters overlay

var map_rast_1 = L.imageOverlay('images/Espana_dif_noch_trop.png',
  imageBounds = [
    [27.097, -18.83],
    [44.75660, 4.97]
  ]);

var map_rast_2 = L.imageOverlay('images/espana1.png',
  imageBounds = [
    [27.097, -18.83],
    [44.75660, 5.0]
  ]);



///////////Otras funcionalidades
//minimapa	
var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true, position:"bottomright", width:100,height:100,}).addTo(map); 					
//zoomHome
var zoomHome = L.Control.zoomHome({ position: 'topleft', homeCoordinates:[40, -5], zoomHomeTitle:'Posición inicial'}).addTo(map);
//fullscreen						
var fsControl = new L.Control.FullScreen();
	map.addControl(fsControl);
	map.on('enterFullscreen', function(){
	if(window.console) window.console.log('enterFullscreen');
	});
	map.on('exitFullscreen', function(){
	if(window.console) window.console.log('exitFullscreen');
	});
	L.control.scale().addTo(map);

///////////Estilo de las capas especificas del visor///////////

function getColor1(a) {
	return 
	a > 1.2 ? '#870C11' :
	a > 1 ? '#DC040F' :
	a > 0.8? '#F87F4A' :
	a > 0.6 ? '#FFD58D' :
	a > 0.4 ? '#F9EFB4' :
	a > 0.2 ? '#FFFFEB' :

	'#C2523C';
};
function style1(feature) {
	return {
		fillColor: getColor1(feature.properties.Comp),
		weight: 0,
		opacity: 0.60,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 0
	};

};
function popup1(feature, layer) {
	if (feature.properties && feature.properties.fid) {

layer.bindTooltip("<BR>Municipio: "+"<strong>"+feature.properties.NAMEUNIT.toLocaleString()+"</strong><BR>Diferencia frecuencia noches tropicales: "+ "<strong>"+ Math.round(feature.properties.dif)+
			" Días</strong>",{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'});
	};
};

//(feature.properties.dif? feature.properties.dif.toString().replace(".", ","):feature.properties.dif)
var geojson1 = L.geoJson(tabla_temp, {
	style: style1,
	onEachFeature: popup1
});




function getColor2(a) {
	return 
	a > 0 ? '#870C11' :
	a > 0.2 ? '#DC040F' :
	a > 0.6? '#F87F4A' :
	a > 0.8 ? '#FFD58D' :
	a > 1 ? '#F9EFB4' :
	a > 1.2 ? '#FFFFEB' :

	'#C2523C';
};
function style2(feature) {
	return {
		fillColor: getColor2(feature.properties.Comp),
		weight: 0,
		opacity: 0.60,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 0
	};

};
function popup2(feature, layer) {
	if (feature.properties && feature.properties.fid) {
		layer.bindTooltip("Municipio: <strong>"+feature.properties.NAMEUNIT.toLocaleString()+"</strong><BR>Diferencia de temperatura media anual entre los periodos: "+"<strong>"+(feature.properties.Comp? feature.properties.Comp.toString().replace(".", ","):feature.properties.Comp)+"°C </strong>",{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'});			
	};
};
var geojson2 = L.geoJson(tabla_temp, {
	style: style2,
	onEachFeature: popup2
});


var mapa1 = L.layerGroup([geojson1,map_rast_1]);
var mapa2 = L.layerGroup([geojson2,map_rast_2]).addTo(map);




var baseTree = [
	{ label: "<strong>Limpiar mapa", layer: osm3 },
	{
	label: '<strong>Mapas de cambios entre los periodos 1999-2018 y 1971-1990',
	children: [
	
		{ label: "Diferencia de temperatura media anual ",layer:mapa2},
	
		
		{ label: "Diferencia de frecuencia media anual de noches tropicales",layer: mapa1}
		 ]
	},
	];
	
	
var overlayTree = {
	label: 'Mapas de referencia',
	children: [
	
		{ label: "<b>Límites de Comunidades Autónomas", layer: comunidades},
		{ label: "OpenStreetMap", layer: osm},

	]
};	

//leyenda noches tropicales

var htmlLegend1 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Diferencia en la frecuencia anual de episodios con noches tropicales anual. Promedio entre los periodos 1999-2018 y 1971-1990'+"<\h3>",
			style: style1,
			layer: geojson1,
			elements: [{

				
				label:"<h5>"+  'Resolución espacial : 100 m<br>Método: Modelización estadística e interpolación espacial<br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h3>"+  'Unidades: días'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  ' 25 - 30'+"<\h4>",html: '',style: {'background-color': '#410068','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  ' 20 - 25'+"<\h4>",html: '',style: {'background-color': '#4D052A','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  ' 15 - 20'+"<\h4>",html: '',style: {'background-color': '#860D12','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  ' 10 - 15'+"<\h4>",html: '',style: {'background-color': '#D92524','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  '  5 - 10'+"<\h4>",html: '',style: {'background-color': '#F6583D','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
			    label:"<h4>"+  '  0 - 5'+"<\h4>",html: '',style: {'background-color': '#FBA17F','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  ' -5 - 0'+"<\h4>",html: '',style: {'background-color': '#FFE4D9','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '-10 - -5'+"<\h4>",html: '',style: {'background-color': '#F2FEFE','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  '-15 - -10'+"<\h4>",html: '',style: {'background-color': '#E1FFFF','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  '-20 - -15'+"<\h4>",html: '',style: {'background-color': '#CFFFFF','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia con datos de la Agencia Estatal de Meteorología (2019)<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend1);


	//leyenda anomalia temperaturas


	var htmlLegend2 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Diferencia de temperatura media anual entre los periodos 1999-2018 y 1971-1990'+"<\h3>",
			style: style2,
			layer: geojson2,
			elements: [{

                
                label:"<h5>"+  'Resolución espacial: 100 m<br>Método: Modelización estadística e interpolación espacial<br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h3>"+  '<strong>Temperatura (°C)'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				
				label:"<h4>"+  '1,2'+"<\h4>",html: '',style: {'background-color': '#870C11','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
			    label:"<h4>"+  ' 1'+"<\h4>",html: '',style: {'background-color': '#DC040F','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,8'+"<\h4>",html: '',style: {'background-color': '#F87F4A','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,6'+"<\h4>",html: '',style: {'background-color': '#FFD58D','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  '0,4'+"<\h4>",html: '',style: {'background-color': '#FFEFB2','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  '0,2'+"<\h4>",html: '',style: {'background-color': '#FFFFEB','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia con datos de la Agencia Estatal de Meteorología (2019)<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend2);

//Visualizar capas
// L.control.layers(baseLayers, overlays,{collapsed:true, position: 'topright',}).addTo(map);
L.control.layers.tree(baseTree, overlayTree).addTo(map);

//boton de informacion 
var button2 = new L.Control.Button(L.DomUtil.get('helpbutton2'), { toggleButton: 'active', position: 'topright'});
	button2.addTo(map);
	button2.on('click', function () {
	 if (button2.isToggled()) {
			sidebar2.hide();
		} else {
			sidebar2.show();
		}
	});