/* reference link: https://www.w3schools.com/howto/howto_js_off-canvas.asp */

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
	//document.getElementById("mySidenav").style.height = "100%";
	document.getElementById("side_container").style.width = "0";
	document.getElementById("bottom_container").style.height = "100%";
	document.getElementById("oc_open_btn").style.display="none";
	document.getElementById("oc_open_btn").style.width="0";
	document.getElementById("oc_close_btn").style.display="block";
	document.getElementById("oc_search_block").style.width="350px";
	document.getElementById("oc_logo0").style.display="block";
	document.getElementById("search_icon").style.display="block";
	document.getElementById("search_icon_img").style.display = "block";
	$(".leaflet-control-layers").animate({right:"10px"},800);
	if (window.innerWidth>750){
		document.getElementById("layer_filter").style.marginLeft = "450px";
	}
	//document.getElementById("layer_filter").style.display = "block";
	//document.getElementById("filter_btn").style.display = "block";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
	//document.getElementById("mySidenav").style.height = "50px";
	document.getElementById("side_container").style.width = "180px";
	document.getElementById("bottom_container").style.height = "50px";
	document.getElementById("oc_search_block").style.width="30%";
	document.getElementById("oc_close_btn").style.display="none";
	document.getElementById("oc_open_btn").style.display="block";
	document.getElementById("oc_open_btn").style.width="70%";
	document.getElementById("oc_logo0").style.display="none";
	document.getElementById("search_icon").style.display="none";
	document.getElementById("search_icon_img").style.display = "none";	
	document.getElementById("layer_filter").style.marginLeft = "1%";
	$(".leaflet-control-layers").animate({right:"200px"},800);
	//document.getElementById("filter_btn").style.display = "none";
	//if (window.innerWidth>800){
		//document.getElementById("layer_filter").style.display = "none";
	//}
}

function openSearch(){
	document.getElementById("search_icon").style.width = "250px";
	document.getElementById("SearchText").style.display = "block";	
}