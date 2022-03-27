<!DOCTYPE html>
<!--v2-->
<html lang="en">

<head>
	<title>YUNLIN TRAVEL| main</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<!-- include leaflet-->
	<!-- https://ithelp.ithome.com.tw/articles/10229982 -->
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin="" />
	<script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js" integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew==" crossorigin="">
	</script>

	<!-- include Leaflet MarkerCluster -->
	<link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css" />
	<link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css" />
	<script src="https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js"></script>

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

	<!--Bootstrap-->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
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
						<a class="nav-link active" aria-current="page" href="index.php">主要畫面</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="spot_info.php">景點介紹</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="deal.php">套裝行程</a>
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
						<a href="index.php"><pre>主要畫面   <span>- Main Page<span></pre></a>
					</div>
					<div class="side_item">
						<a href="spot_info.php"><pre>景點介紹   <span>- Introduction of Attractions</span></pre></a>
					</div>
					<div class="side_item">
						<a href="deal.php"><pre>套裝行程   <span>- A Package Deal</span></pre></a>
					</div>
				</div>
				<div id="side_info" data-toggle="modal" data-target="#modal_about" style="width:100%; height:20px; position:absolute; bottom:0; background-color:#2b4f38;overflow:hidden;color:#FCFCFC;">
					=
				</div>
			</div>
		</div>

		<!-- 篩選列的Modal -->
		<div class="modal fade" id="modal_filter" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-body">
						<div class="container" style="width:100%;z-index:3;position:relative;">
							<button type="button" class="btn btn-outline-light" data-dismiss="modal" style="position:absolute;top:0;right:0;z-index:2"><span class="glyphicon glyphicon-remove"></span></button>
							<div>
								<b style="font-size:20px;">篩選器</b>
							</div>
							<div class="map-district">
								<div style="letter-spacing:3px;">行政區域</div>
								<div>
									<div class="checkbox_item"><input class="district-class" value="麥寮鄉" type="checkbox">麥寮鄉</div>
									<div class="checkbox_item"><input class="district-class" value="崙背鄉" type="checkbox">崙背鄉</div>
									<div class="checkbox_item"><input class="district-class" value="二崙鄉" type="checkbox">二崙鄉</div>
									<div class="checkbox_item"><input class="district-class" value="西螺鎮" type="checkbox">西螺鎮</div>
									<div class="checkbox_item"><input class="district-class" value="莿桐鄉" type="checkbox">莿桐鄉</div>
									<div class="checkbox_item"><input class="district-class" value="林內鄉" type="checkbox">林內鄉</div>
									<div class="checkbox_item"><input class="district-class" value="臺西鄉" type="checkbox">臺西鄉</div>
									<div class="checkbox_item"><input class="district-class" value="東勢鄉" type="checkbox">東勢鄉</div>
									<div class="checkbox_item"><input class="district-class" value="褒忠鄉" type="checkbox">褒忠鄉</div>
									<div class="checkbox_item"><input class="district-class" value="元長鄉" type="checkbox">元長鄉</div>
									<div class="checkbox_item"><input class="district-class" value="土庫鎮" type="checkbox">土庫鎮</div>
									<div class="checkbox_item"><input class="district-class" value="大埤鄉" type="checkbox">大埤鄉</div>
									<div class="checkbox_item"><input class="district-class" value="虎尾鎮" type="checkbox">虎尾鎮</div>
									<div class="checkbox_item"><input class="district-class" value="斗六市" type="checkbox">斗六市</div>
									<div class="checkbox_item"><input class="district-class" value="斗南鎮" type="checkbox">斗南鎮</div>
									<div class="checkbox_item"><input class="district-class" value="古坑鄉" type="checkbox">古坑鄉</div>
									<div class="checkbox_item"><input class="district-class" value="四湖鄉" type="checkbox">四湖鄉</div>
									<div class="checkbox_item"><input class="district-class" value="口湖鄉" type="checkbox">口湖鄉</div>
									<div class="checkbox_item"><input class="district-class" value="水林鄉" type="checkbox">水林鄉</div>
									<div class="checkbox_item"><input class="district-class" value="北港鎮" type="checkbox">北港鎮</div>
								</div>
							</div>
						</div>
						<div id="cell_filter_submit" style="width:100%;z-index:3;position:relative;">
							<button id="cell_filter_btn" class="btn btn-outline-light" data-dismiss="modal">查詢</button>
							<button id="cell_reset_btn" class="btn btn-outline-light">重置</input>
						</div>
						<div style="text-aling:center;">
							<div class="select_modal_img_cover"></div>
							<img src="image/district.jpg" class="select_modal_img">
						</div>
					</div>
				</div>
			</div>
		</div>

		<!--景點資訊介紹的Offcanvas-->
		<!--botton and offcanvas-->
		<div id="bottom_container">
			<div style="width:400px;height:50px;background-color:#FFFFFF;">
				<div id="oc_search_block">景點資訊<div id="search_icon" onclick="openSearch()"><input id="SearchText" type="text"/></div><img id="search_icon_img" src="./image/search_icon.png" class="img-responsive"></div>
				<div id="oc_open_btn" onclick="openNav()">查看更多<span style="float:right;font-size:30px;margin-top:-2%;">^</span></div>
				<div id="oc_close_btn"><span class="closebtn" onclick="closeNav()">&times;</span></div>
			</div>

			<div id="oc_showinfo_block">
			</div>
		</div>
		<div id="oc_logo0" class="oc_logo" style="display:none;">
			<img src="./image/logo.png" class="oc_logo" style="position:absolute; top:3%; right:1%;z-index:2;width:10%;">
		</div>

		<!--篩選器-->
		<div id="layer_filter">
			<!--上方橫列-->
			<div class="layer_button button_toggle" id="spot_button"><span class="glyphicon glyphicon-sunglasses"></span>觀光景點</div>
			<div class="layer_button button_toggle" id="rest_button"><span class="glyphicon glyphicon-ice-lolly-tasted"></span>餐廳景點</div>
			<div class="layer_button layer_button_active" data-toggle="modal" data-target="#modal_filter">...</div>
		</div>
		
		<!--地圖-->
		<div id="map">
		</div>
	</div>
	
	<?php include 'modal/aboutus_modal.php';?>
	
	<!-- include map.js here because it must appear after <div id="map"> -->
	<script src="./js/mapForWeb1.js"></script> 
	<script src="./js/main.js"></script>
	
	<!--offcanvas-->
	<script src="./js/offcanva_forindex2.js"></script>
</body>

</html>