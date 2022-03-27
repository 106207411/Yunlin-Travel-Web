<!DOCTYPE html>
<!--v2-->
<html lang="en">

<head>
	<title>YUNLIN TRAVEL| Spot Info</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!--CSS-->
	<link rel="stylesheet" href="https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="./css/bar_style.css">
	<link rel="stylesheet" href="./css/style.css" type="text/css">
	<link rel="stylesheet" href="./css/modal.css" type="text/css">
	<link rel="stylesheet" href="./css/main_p2.css" />

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
						<a class="nav-link active" aria-current="page" href="index2.php">主要畫面</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">景點介紹</a>
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
		<!--主要顯示畫面-->
		<div id="main_block">
			<div id="block1">
				<!--主視覺-->
				<div id="block1_cover"></div>
				<div id="block1_text1"><b>YUNLINYUNLINYUNLINYUNLINYUNLINYUNLINYUNLINYUNLIN</b></div>
				<img src="image/p2_main.jpg" class="img-responsive" id="block1_img">
			</div>

			<div id="block2">
				<div id="block2_main">
					<span>往下查看熱門十大景點</span><br>
					<span class="glyphicon glyphicon-arrow-down"></span>
				</div>
				<div style="width:100%;">
					<div style="width:100%;">
						<div class="block2_img">
							<div class="block2_img_cover"></div>
							<div class="top10_img">
								<!--放十大景點之圖片的地方-->
							</div>
						</div>
						<!--放十大景點文字的地方-->
						<div class="top10_text">
						</div>
					</div>
				</div>
			</div>

			<div id="block3">
				<!--放所有景點列的地方-->
				<!--bg-->
				<div id="block3_bg">
					<div id="block3_cover"></div>
					<img src="image/p2_spot_bg.jpg" id="block3_bg_img">
				</div>
				<!--content-->

				<div id="block3_content">
					<!--橫軸介紹：景點-->
					<div id="block3_title">
						景點介紹
					</div>
					<div class="block3_selector">
						<!--放主題分類的地方-->
						<div id="block3_selector_title" class="theme_spot">
							<span class="block3_selector_item" data-toggle="modal" data-target="#spot_topic" style="cursor: pointer;"> 主題快捷|</span>
						</div>
						<input id="spotSearchText" class="theme_serach theme_spot_serach" type="text" style="height:30px;width:150px;margin:1%;margin-left:-2%;border-radius:5px;border:0px;background-color:rgba(190, 190, 190,0.5);">
						<div id="return_spot" style="float:left; height:100%; display:none; margin-left:4px;margin-right:2%;font-size:17px;padding:5px;" onclick="return_theme_spot()"><span class="glyphicon glyphicon-chevron-left" style="cursor: pointer;"></span></div>
					</div>
					<div id="block_xroll_spot">
						<div id="xroll_spot_item_pare"></div>
					</div>

					<!--橫軸介紹：餐飲-->
					<div id="block3_title">
						餐飲介紹
					</div>
					<div class="block3_selector">
						<!--放主題分類的地方-->
						<div id="block3_selector_title" class="theme_restaurant">
							<span class="block3_selector_item" data-toggle="modal" data-target="#rest_topic" style="cursor: pointer;"> 主題快捷|</span>
						</div>
						<input id="restaurantSearchText" class="theme_serach theme_restaurant_serach" type="text" style="height:30px;width:150px;margin:1%;margin-left:-2%;border-radius:5px;border:0px;background-color:rgba(190, 190, 190,0.5);">
						<div id="return_rest" style="float:left; height:100%; display:none; margin-left:4px;margin-right:2%;font-size:17px;padding:5px;" onclick="return_theme_rest()"><span class="glyphicon glyphicon-chevron-left" style="cursor: pointer;"></span></div>
					</div>

					<!--橫軸介紹：餐飲-->
					<div id="block_xroll_restaurant">
						<div id="xroll_restaurant_item_pare"></div>
					</div>
				</div>
			</div>
			<div id="block4">
			</div>
		</div>
		<div id="side_container">
			<!--標頭側邊欄-->
			<div id="side_header">
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
						<a href="#">
							<pre>景點介紹   <span>- Introduction of Attractions</span></pre>
						</a>
					</div>
					<div class="side_item">
						<a href="deal.php">
							<pre>套裝行程   <span>- A Package Deal</span></pre>
						</a>
					</div>
				</div>
				<div id="side_info" data-toggle="modal" data-target="#modal_about" style="width:100%; height:20px; position:absolute; bottom:0; background-color:#b2881f;overflow:hidden;color:white;">
					=
				</div>
			</div>
		</div>

		<?php include 'modal/aboutus_modal.php'; ?>
		<!----------------->
	</div>

	<!-- 放modal的地方 -->
	<div id="spot-modals-live-here"></div>
	<div id="restaurant-modals-live-here"></div>

	<!-- 景點快捷的Modal -->
	<div class="modal fade" id="spot_topic" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog modal_for_theme" role="document">
			<div class="modal-content modal_for_theme">
				<div class="modal-body">
					<div class="container" style="width:100%;z-index:3;position:relative;">
						<button type="button" class="btn btn-outline-light" data-dismiss="modal" style="position:absolute;top:0;right:0;z-index:2"><span class="glyphicon glyphicon-remove"></span></button>
						<div>
							<b style="font-size:20px;">主題快捷</b>
						</div>
						<div class="checkbox-group">
							<div>
								<div class="checkbox_item"><input class="spot-class" value="文化類" type="checkbox">文化類</div>
								<div class="checkbox_item"><input class="spot-class" value="生態類" type="checkbox">生態類</div>
								<div class="checkbox_item"><input class="spot-class" value="古蹟類" type="checkbox">古蹟類</div>
								<div class="checkbox_item"><input class="spot-class" value="廟宇類" type="checkbox">廟宇類</div>
								<div class="checkbox_item"><input class="spot-class" value="藝術類" type="checkbox">藝術類</div>
								<div class="checkbox_item"><input class="spot-class" value="小吃/特產類" type="checkbox">小吃/特產類</div>
								<div class="checkbox_item"><input class="spot-class" value="國家公園類" type="checkbox">國家公園類</div>
								<div class="checkbox_item"><input class="spot-class" value="國家風景區類" type="checkbox">國家風景區類</div>
								<div class="checkbox_item"><input class="spot-class" value="休閒農業類" type="checkbox">休閒農業類</div>
								<div class="checkbox_item"><input class="spot-class" value="溫泉類" type="checkbox">溫泉類</div>
								<div class="checkbox_item"><input class="spot-class" value="自然風景類" type="checkbox">自然風景類</div>
								<div class="checkbox_item"><input class="spot-class" value="遊憩類" type="checkbox">遊憩類</div>
								<div class="checkbox_item"><input class="spot-class" value="體育健身類" type="checkbox">體育健身類</div>
								<div class="checkbox_item"><input class="spot-class" value="觀光工廠類" type="checkbox">觀光工廠類</div>
								<div class="checkbox_item"><input class="spot-class" value="都會公園類" type="checkbox">都會公園類</div>
								<div class="checkbox_item"><input class="spot-class" value="森林遊樂區類" type="checkbox">森林遊樂區類</div>
								<div class="checkbox_item"><input class="spot-class" value="林場類" type="checkbox">林場類</div>
								<div class="checkbox_item"><input class="spot-class" value="其他" type="checkbox">其他</div>
							</div>
						</div>
					</div>
					<div id="cell_filter_submit" style="display:inline-block;float:right;margin-right:5%;margin-top:3%;">
						<button id="cell_filter_btn_spot" class="btn btn-outline-light" data-dismiss="modal" style="border-radius:0;background-color:#2b4f38;color:#edede9;">查詢</button>
						<button class="btn btn-outline-light" id="filter_btn_spot" style="border-radius:0;background-color:#2b4f38;color:#edede9;">重置</input>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- 餐廳快捷的Modal -->
	<div class="modal fade" id="rest_topic" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog modal_for_theme" role="document">
			<div class="modal-content modal_for_theme">
				<div class="modal-body">
					<div class="container" style="width:100%;z-index:3;position:relative;">
						<button type="button" class="btn btn-outline-light" data-dismiss="modal" style="position:absolute;top:0;right:0;z-index:2"><span class="glyphicon glyphicon-remove"></span></button>
						<div>
							<b style="font-size:20px;">主題快捷</b>
						</div>
						<div class="checkbox-group">
							<div>
								<div class="checkbox_item"><input class="restaurant-class" value="異國料理" type="checkbox">異國料理</div>
								<div class="checkbox_item"><input class="restaurant-class" value="火烤料理" type="checkbox">火烤料理</div>
								<div class="checkbox_item"><input class="restaurant-class" value="中式美食" type="checkbox">中式美食</div>
								<div class="checkbox_item"><input class="restaurant-class" value="夜市小吃" type="checkbox">夜市小吃</div>
								<div class="checkbox_item"><input class="restaurant-class" value="甜點冰品" type="checkbox">甜點冰品</div>
								<div class="checkbox_item"><input class="restaurant-class" value="伴手禮" type="checkbox">伴手禮</div>
								<div class="checkbox_item"><input class="restaurant-class" value="地方特產" type="checkbox">地方特產</div>
								<div class="checkbox_item"><input class="restaurant-class" value="素食" type="checkbox">素食</div>
								<div class="checkbox_item"><input class="restaurant-class" value="其他" type="checkbox">其他</div>
							</div>
						</div>
					</div>
					<div id="cell_filter_submit" style="display:inline-block;float:right;margin-right:5%;margin-top:3%;">
						<button id="cell_filter_btn_restaurant" class="btn btn-outline-light" data-dismiss="modal" style="border-radius:0;background-color:#2b4f38;color:#edede9;">查詢</button>
						<button class="btn btn-outline-light" id="filter_btn_restaurant" style="border-radius:0;background-color:#2b4f38;color:#edede9;">重置</input>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!--動畫-->
	<script src="./js/animate.js"></script>

	<!--匯入景點的功能-->
	<script src="./js/utilsForWeb2.js"></script>

	<!--autocomplete-->
	<!-- <script>
		$.getJSON('./phpScript/getData.php', function (json) {
			let restall = json["restaurants"];
			let spotall = json["spots"];
			let autocomplete_list_rest = [];
			let autocomplete_list_spot = [];

			for (i = 0; i < restall.length; i++) {
				autocomplete_list_rest.push(restall[i].Name);
			};
			for (i = 0; i < spotall.length; i++) {
				autocomplete_list_spot.push(spotall[i].Name);
			};

			$("#restaurantSearchText").autocomplete({
				source: autocomplete_list_rest
			});
			$("#spotSearchText").autocomplete({
				source: autocomplete_list_spot
			});
		});
	</script> -->
</body>

</html>