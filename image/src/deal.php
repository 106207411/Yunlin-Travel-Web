<!DOCTYPE html>
<!--v2-->
<html lang="en">

<head>
	<title>YUNLIN TRAVEL| route</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<meta charset="utf-8">

	<!-- include leaflet-->
	<!-- https://ithelp.ithome.com.tw/articles/10229982 -->
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin="" />
	<script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js" integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew==" crossorigin="">
	</script>

	<!--CSS-->
	<link rel="stylesheet" href="https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="./css/bar_style.css">
	<link rel="stylesheet" href="./css/style.css" type="text/css">
	<link rel="stylesheet" href="./css/modal.css" type="text/css">
	<link rel="stylesheet" href="./css/offcanva.css" type="text/css">
	<link rel="stylesheet" href="./css/main.css" />

	<!--JQuery-->
	<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
	<script src="https://code.jquery.com/ui/1.11.4/jquery-ui.js"></script>

	<!--select2-->
	<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
	<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />

	<!--Bootstrap-->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">

	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />

	<style>
		#btnSubmit {
			background-color: transparent;
			border: 1px solid #b2881f;
			color: #b2881f;
			margin-top: 10px;
			border-radius: 3px;
			padding: 5px;
		}

		#btnSubmit:hover {
			background-color: #b2881f;
			border: 1px solid #b2881f;
			color: white;
			transition: 0.5s;
		}

		#exportJSON {
			color: #2b4f38;
			font-size: 15px;
			margin-top: 3px;
		}

		#op_block {
			margin: auto;
			width: 500px;
			height: 500px;
			position: absolute;
			left: 0;
			bottom: 30%;
			text-align: center;
		}

		.p3_opimg {
			position: absolute;
		}
	</style>

</head>

<body>
	<!--Navbar: Small screen-->
	<nav class="nav navbar-dark navbar-expand-lg shadow-5-strong" style="background-color:#ffffff;">
		<div class="container-fluid">
			<a class="navbar-brand" style="width:150px;">
				<img src="./image/logo.png" class="img-responsive" style="position:relative; margin-top:-4%;">
			</a>
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#collapse_navbar">
				<span class="icon-bar">≡</span>
			</button>
			<div class="collapse navbar-collapse" id="collapse_navbar">
				<ul class="nav navbar-nav">
					<li class="nav-item">
						<a class="nav-link active" aria-current="page" href="index2.php">主要畫面</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="spot_info.php">景點介紹</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">套裝行程</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
	<div class="collapse" id="navbarToggleExternalContent">
		<div class="bg-dark p-4">
			<h5 class="text-white h4">Collapsed content</h5>
			<span class="text-muted">Toggleable via the navbar brand.</span>
		</div>
	</div>

	<!--主要畫面-->
	<div id="container">
		<!--Navbar: Big screen-->
		<div id="side_container">
			<div id="side_header">
				<!--標頭側邊欄-->
				<div>
					<img src="image/logo2.png" class="img-responsive" style="width:70%;display:block;margin:auto;">
				</div>
				<div style="width:100%;text-aling:center;margin-top:10%;margin-left:6%;">
					<div class="side_item">
						<a href="index2.php">
							<pre>主要畫面   <span>- Main Page<span></pre>
						</a>
					</div>
					<div class="side_item">
						<a href="spot_info.php">
							<pre>景點介紹   <span>- Introduction of Attractions</span></pre>
						</a>
					</div>
					<div class="side_item">
						<a href="#">
							<pre>套裝行程   <span>- A Package Deal</span></pre>
						</a>
					</div>
				</div>
				<div id="side_info" data-toggle="modal" data-target="#modal_about" style="width:100%; height:20px; position:absolute; bottom:0; background-color:#2b4f38;overflow:hidden;color:#FCFCFC;">
					=
				</div>
			</div>
		</div>

		<!--景點資訊介紹的Offcanvas-->
		<!--botton and offcanvas-->
		<div id="bottom_container">
			<div style="width:400px;height:50px;background-color:#FFFFFF;">
				<!--<div id="filter_btn" onclick="change_filter()">←篩選器</div>-->
				<div id="oc_search_block"><span class="glyphicon glyphicon-road" style="margin-right:3px;"></span>路徑查詢<div id="search_icon" onclick="openSearch()"><input id="SearchText" type="text" onblur="this.focus()" autofocus /></div><img id="search_icon_img" src="./image/search_icon.png" class="img-responsive"></div>
				<div id="oc_open_btn" onclick="openNav()">試試看<span style="float:right;font-size:30px;margin-top:-2%;">^</span></div>
				<div id="oc_close_btn"><span class="closebtn" onclick="closeNav()">&times;</span></div>
			</div>

			<div id="oc_showinfo_block_for_web3">
				<form id="forms">
					<div style="margin:5px;">選擇交通方式</div>
					<select id="profile" name="profile" style="width:300px;">
						<option value="0">Select travel mode</option>
						<option value="driving-car">driving-car</option>
						<option value="driving-hgv">driving-hgv</option>
						<option value="cycling-regular">cycling-regular</option>
						<option value="cycling-road">cycling-road</option>
						<option value="cycling-mountain">cycling-mountain</option>
						<option value="cycling-electric">cycling-electric</option>
						<option value="foot-walking">foot-walking</option>
						<option value="foot-hiking">foot-hiking</option>
						<option value="wheelchair">wheelchair</option>
					</select>
					<br>

					<div style="margin:5px;">選擇起點</div>
					<select id="coord1" name="coord1" style="width:300px;margin-top:10%;">
						<option value="All">Select starting point</option>
						<option></option>
					</select>
					<br>
					<div style="margin:5px;">選擇終點</div>
					<select id="coord2" name="coord2" style="width:300px;">
						<option value="All">Select destination</option>
						<option></option>
					</select>
					<br>
					<button id="btnSubmit" type="submit">Get Directions</button>
				</form>
				<a id="exportJSON" onclick="">Export route json</a>
			</div>
		</div>

		<div id="oc_logo0" class="oc_logo" style="display:none;">
			<img src="./image/logo.png" class="oc_logo" style="position:absolute; top:3%; right:1%;z-index:2;width:10%;">
		</div>

		<!--地圖-->
		<!--地圖-->
		<div id="map_cover_web3" style="position:absolute;height:100%;width:100%;z-index:3;background-color:rgba(0,0,0,0.3);overflow:hidden;">
			<div id="op_block">
				<img src="image/p3_op1.png" id="p3_op1" class="img-responsive p3_opimg">
				<img src="image/p3_op2.png" id="p3_op2" class="img-responsive p3_opimg">
				<img src="image/p3_op3.png" id="p3_op3" class="img-responsive p3_opimg">
			</div>
		</div>
		<div id="map">
		</div>
	</div>

	<?php include 'modal/aboutus_modal.php'; ?>

	<!-- include map.js here because it must appear after <div id="map"> -->
	<!--<script src="./js/map2.js"></script> -->
	<script src="./js/main.js"></script>
	<!--動畫-->
	<script src="./js/animate.js"></script>
	<!--offcanvas-->
	<script src="./js/web3_offcanva.js"></script>

	<!--路徑規劃-->
	<!--<script src="https://unpkg.com/leaflet@1.0.1/dist/leaflet.js"></script>-->
	<script src="./js/leaflet.ajax.js"></script>
	<!--<script src="./js/leaflet-sidebar.js"></script>-->

	<script>
		const map = L.map('map', {
			center: [23.7079432, 120.3665456],
			zoom: 10
		});

		$('.leaflet-control-container').hide();
		// load mapBox
		let streetsUrl = 'https://api.mapbox.com/styles/v1/andylee408/ckyn5g7dd00sy14qvp5zp8zdf/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYW5keWxlZTQwOCIsImEiOiJja3ltempieHAycnRjMndtbDRzNnE1OWJzIn0.cduVN-fIS9jZ3dBE8TKVPg';
		L.tileLayer(streetsUrl, {
			attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
			maxZoom: 18
		}).addTo(map);

		let restaurantLayer;
		// reset everything in the map
		function resetLayer() {
			if (restaurantLayer !== undefined) {
				map.removeLayer(restaurantLayer);
				console.log("Sucess");
			}
		}

		//https://github.com/pointhi/leaflet-color-markers
		var redIcon = new L.Icon({
			iconUrl: 'image/marker-icon-red.png',
			shadowUrl: 'image/marker-shadow.png',
			iconSize: [25, 41],
			iconAnchor: [12, 41],
			popupAnchor: [1, -34],
			shadowSize: [41, 41]
		});

		//get data from database and update the map and sidebar by ajax

		$.getJSON('./phpScript/getData.php', function(json) {
			let locations = json["all"];
			locations = locations.map(function(obj) {
				return {
					id: parseInt(obj.tid),
					text: obj.Name
				};
			});
			//console.log(locations);

			//下拉式選單的data
			$("#coord1").select2({
				data: locations
			});

			$("#coord2").select2({
				data: locations
			});
		});


		$("#btnSubmit").click(function() {
			var myForm = document.getElementById('forms');
			//console.log("myForm=",{profile: $('#profile').val(),coord1: $('#coord1').val(),coord2: $('#coord2').val()});
			myForm.addEventListener('submit', function(event) {
				event.preventDefault();
				$.ajax({
					type: 'POST',
					url: 'phpScript/routing_morelocations.php',
					data: {
						profile: $('#profile').val(),
						coord1: $('#coord1').val(),
						coord2: $('#coord2').val()
					},
					dataType: 'json',
					success: function(output) {
						resetLayer();
						var route = L.geoJSON(JSON.parse(output.geojson)); //Add route to map
						var start = L.circleMarker([parseFloat(output.coord1[1]), parseFloat(output.coord1[0])], {
								radius: 5,
								fillColor: 'white',
								fillOpacity: 1,
								title: $("#coord1 :selected").text()
							})
							.bindPopup(`<b style ="font-weight:bold;">${$("#coord1 :selected").text()}</b>`).openPopup();
						var end = L.marker([parseFloat(output.coord2[1]), parseFloat(output.coord2[0])], {
							icon: redIcon,
							title: $("#coord2 :selected").text()
							}).bindPopup(`<b style ="font-weight:bold;">${$("#coord2 :selected").text()}</b>`).openPopup();
						var mid = L.marker([(parseFloat(output.coord1[1]) + parseFloat(output.coord2[1])) / 2, (parseFloat(output.coord1[0]) + parseFloat(output.coord2[0])) / 2]);
						restaurantLayer = L.layerGroup([start, end, route]).addTo(map);

						map.flyTo(mid.getLatLng(), 11, {
							animate: false
						});

						//create route json downloadable link
						var json = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(JSON.parse(output.geojson)));
						exportJSON.setAttribute("href", "data:" + json);
						exportJSON.setAttribute("download", "route.json");
						//document.getElementById('instruction').innerHTML=JSON.stringify(output["features"][0]["properties"]["segments"][0],null,2);
						//console.log(restaurantLayer);
					}
				});
			});
		});

		$(function() {
			$("#profile").select2();
		});
		//var start = L.circleMarker([23.709181, 120.433484],{radius: 5,fillColor: 'white',fillOpacity: 1}).addTo(map);
		//var end = L.marker([23.554889, 120.149438], {icon: redIcon}).addTo(map);
		//var sidebar = L.control.sidebar('sidebar').addTo(map);

		//Add local geojson to map
		//var geojsonLayer = new L.GeoJSON.AJAX("ors__v2_directions.geojson");       
		//geojsonLayer.addTo(map);
	</script>
</body>

</html>