/* reference link: https://www.w3schools.com/howto/howto_js_off-canvas.asp */

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
	//document.getElementById("mySidenav").style.height = "100%";
	document.getElementById("side_container").style.width = "0";
	document.getElementById("bottom_container").style.height = "100%";
	document.getElementById("oc_open_btn").style.display="none";
	document.getElementById("oc_open_btn").style.width="0";
	document.getElementById("oc_close_btn").style.display="block";
	document.getElementById("oc_logo0").style.display="block";
	document.getElementById("oc_search_block").style.width="350px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
	document.getElementById("side_container").style.width = "180px";
	document.getElementById("bottom_container").style.height = "50px";
	document.getElementById("oc_close_btn").style.display="none";
	document.getElementById("oc_open_btn").style.display="block";
	document.getElementById("oc_open_btn").style.width="70%";
	document.getElementById("oc_logo0").style.display="none";
	document.getElementById("oc_search_block").style.width="30%";
}
