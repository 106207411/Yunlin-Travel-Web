// load mapBox (streets-v11 is the default map style)
// https://gis.stackexchange.com/questions/232763/specify-language-for-mapbox-tiles-in-leaflet/232877#232877
// https://ithelp.ithome.com.tw/questions/10198598?sc=pt
let outdoorsUrl = 'https://api.mapbox.com/styles/v1/andylee408/ckyn2a6f22j9z16qs3ij6jizp/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYW5keWxlZTQwOCIsImEiOiJja3ltempieHAycnRjMndtbDRzNnE1OWJzIn0.cduVN-fIS9jZ3dBE8TKVPg',
  streetsUrl = 'https://api.mapbox.com/styles/v1/andylee408/ckyn5g7dd00sy14qvp5zp8zdf/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYW5keWxlZTQwOCIsImEiOiJja3ltempieHAycnRjMndtbDRzNnE1OWJzIn0.cduVN-fIS9jZ3dBE8TKVPg',
  basicUrl = 'https://api.mapbox.com/styles/v1/andylee408/ckyn5jw9i2px514potsbvfpoa/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYW5keWxlZTQwOCIsImEiOiJja3ltempieHAycnRjMndtbDRzNnE1OWJzIn0.cduVN-fIS9jZ3dBE8TKVPg';
let outdoors = L.tileLayer(outdoorsUrl, { maxZoom: 18 }),
  streets = L.tileLayer(streetsUrl, { maxZoom: 18 }),
  basic = L.tileLayer(basicUrl, { maxZoom: 18 });

// load Google Map
// m = standard roadmap
// r = somehow altered roadmap
let google_r = L.tileLayer('https://{s}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', { maxZoom: 18, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] }),
  google_m = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', { maxZoom: 18, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] });

//map setting
let map = L.map('map', {
  center: [23.7079432, 120.3665456],
  zoom: 10,
  layers: [outdoors],

});

// baseMaps setting
let baseMaps = {
  "google_r": google_r,
  "google_m": google_m,
  "basic": basic,
  "streets": streets,
  "outdoors": outdoors
};
let overlayMaps;

// icons for markers (隨便設的)
let markerIcon = L.Icon.extend({
  options: {
    iconSize: [30, 35],
    iconAnchor: [15, 35],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }
});

// markerCluster
var siteMarkerCluster = L.markerClusterGroup();
var restaurantMarkerCluster = L.markerClusterGroup();

// hide the control box
//$('.leaflet-control-container').hide();

// declare global variable
let globalJson = null;
let autocompleteList = [];
let layerController;
let restaurantLayer;
let siteLayer;
let restaurantIcon1 = new markerIcon({ iconUrl: './image/restaurant1.png' });
let restaurantIcon2 = new markerIcon({ iconUrl: './image/restaurant2.png' });
let siteIcon1 = new markerIcon({ iconUrl: './image/location-pin1.png' });
let siteIcon2 = new markerIcon({ iconUrl: './image/location-pin2.png' });

//get data from database and update the map and sidebar by ajax
function loadData() {
  $.getJSON('./phpScript/getData.php', function (json) {
    globalJson = json;
    updateSidebarAndMap(json);
  });
}


// make sure globalJson is assigned successfully
function assignJsonToGlobal() {
  if (globalJson != null) {

    // Do something after the globalJson is assigned
    monitorSearchText();
    clickLayerButton();
    clickFilter();
    reset_input();
    clickCellInfo();
  } else {
    setTimeout(function () {
      assignJsonToGlobal();
    }, 100);
  }
}

function updateSidebarAndMap(locationJson) {
  // filter by town and searchText
  let restaurants = locationJson["restaurants"].filter(filterByTownAndSearchText);
  let spots = locationJson["spots"].filter(filterByTownAndSearchText);
  let locations = locationJson["all"].filter(filterByTownAndSearchText);
  autocompleteList = locations.map(function (item) { return item.Name });
  autocompleteSearch(autocompleteList);
  addToMap(restaurants, spots);
  addToShowInfo(locations);
}

function filterByTownAndSearchText(item) {
  // get all the district value if the checkbox is checked
  let townArray = [];
  $(".district-class:checkbox:checked").each(function () {
    var district = (this.checked ? $(this).val() : "");
    townArray.push(district);
  });
  let searchText = $("#SearchText").val();

  // https://stackoverflow.com/questions/5582574/how-to-check-if-a-string-contains-text-from-an-array-of-substrings-in-javascript
  let boolTown = (!townArray.length) ? true : (townArray.some(function (town) { return item.Add.includes(town) }));
  let boolSearchText = (searchText == "") ? true : (item.Name.includes(searchText));
  return (boolTown && boolSearchText);
}


// reset everything in the map
function resetLayer() {
  if (layerController !== undefined) {
    layerController.remove();
    siteMarkerCluster.clearLayers();
    restaurantMarkerCluster.clearLayers();
    map.removeLayer(siteMarkerCluster);
    map.removeLayer(restaurantMarkerCluster);
  }
}

function addToMap(restaurants, spots) {
  resetLayer();
  restaurants = restaurants.map(function (item) {
    var marker = L.marker([item.Lat, item.Lng], { icon: restaurantIcon1, title: item.Name, alt: "restaurant," + item.tid }).bindPopup(`
    <b style ="color: inherit; font-weight:bold;">${item.Name}</b>
    <br>
    ${item.Add}`).on("click", onClick);
    return marker;
  });

  spots = spots.map(function (item) {
    var marker = L.marker([item.Lat, item.Lng], { icon: siteIcon1, title: item.Name, alt: "site," + item.tid }).bindPopup(`
    <b style ="color: inherit; font-weight:bold;">${item.Name}</b>
    <br>
    ${item.Add}`).on("click", onClick);
    return marker;
  });

  restaurantLayer = L.layerGroup(restaurants)
  siteLayer = L.layerGroup(spots)
  restaurantMarkerCluster.addLayer(restaurantLayer);
  siteMarkerCluster.addLayer(siteLayer);
  overlayMaps = {
    "Restaurants": restaurantMarkerCluster,
    "Sites": siteMarkerCluster
  };
  // overlayMaps = {
  //   "Restaurants": restaurantLayer,
  //   "Sites": siteLayer
  // };

  layerController = L.control.layers(baseMaps, overlayMaps, { position: 'bottomright' }).addTo(map);

  // layer toggling according to the #spot_button and #rest_button color
  // yellow means to click the button so we need to show the layer
  $('#rest_button').css('background-color') == "rgb(178, 136, 31)" ? $(".leaflet-control-layers-overlays input").get(0).click() : 0;
  $('#spot_button').css('background-color') == "rgb(178, 136, 31)" ? $(".leaflet-control-layers-overlays input").get(1).click() : 0;

}


// update the sidebar content of spots and restaurants
function addToShowInfo(locations) {
  let domElements = locations.map(location => {
    let tid = location.tid;
    let name = location.Name;
    let address = location.Add;
    let openTime = location.Opentime;
    let like = location.LIKE;
    let authorName = location.Author_Name;
    let comment = location.Comment;
    let review = location.VIEW;

    return `
		<div class="cell_showinfo" onclick="location.href='#';" style="cursor: pointer;">
      <div class="cell_showinfo_photo_block"><img src="./image/getTour_img/${tid}.jpg" class="cell_showinfo_photo"></div>
			<div class="cell_showinfo_title" id = ${tid}><b class="oneinrow">${name}</b></div>
			<div style="width:100%;height:20px;">
				<div class="cell_for_para">
					<div class="cell_showinfo_rating"><span class="oneinrow"><span class="glyphicon glyphicon-star"></span>${like}</span></div>
				</div>
				<div class="cell_for_para">
					<div class="cell_showinfo_nrating">(${review})</div>
				</div>
			</div>
			<div class="cell_showinfo_shorttext">
				<div class="cell_showinfo_optime"><span class="oneinrow"><span class="glyphicon glyphicon-time" style="margin-right:2px;"></span>${openTime}</span></div>
				<div class="cell_showinfo_location"><span class="oneinrow"><span class="glyphicon glyphicon-map-marker" style="margin-right:2px;"></span>${address}</span></div>
			</div>
			<div class="cell_showinfo_comment">${authorName}: ${comment}</div>
		</div>`
    //};
  });
  $('#oc_showinfo_block').html(domElements);
  $(".cell_showinfo_comment").each(function () { //查找所有class=cell_showinfo_comment
    $(this).hover(function () {
      $(this).css("height", "auto").css("white-space", "normal");
      $(".cell_showinfo").css("display", "inline-block");
    }, function () {
      $(this).css("height", "20px").css("white-space", "nowrap");;
      $(".cell_showinfo").css("display", "block");
    });
  });
}

// change marker icon 
// the sidebar will scroll to the content of the corresponding marker 
// when the marker is clicked
function onClick(e) {
  marker = e.target;
  updateMarkerIcon(marker);

  // get marker tid from the marker options alt
  let tid = marker.options.alt.split(",")[1];

  // scroll to the div content of oc_showinfo_block corresponding to the marker name
  // problem: when click on the marker again, it will scroll to the top of the #oc_showinfo_block div intead of the div content
  // problem fixed
  var scrolled_val = $("#oc_showinfo_block").scrollTop().valueOf();
  let target_val = $("#" + tid).parent().offset().top - $('#oc_search_block').height() - 30;
  $("#oc_showinfo_block").stop().scrollTop(scrolled_val + target_val);

  console.log("scrolled_val:", scrolled_val);
  console.log($("#" + tid).parent().offset().top);
  console.log($('#oc_search_block').height());
  console.log("target_val:", target_val);
}

// stored the previous clicked marker (used to change the icon back)
let previousMarker;

function updateMarkerIcon(marker) {

  // reset the previous clicked marker 
  if (previousMarker !== undefined) {
    previousMarker.setIcon(previousMarker.options.alt.includes("restaurant") ? restaurantIcon1 : siteIcon1);
  }

  // https://leafletjs.com/reference-1.6.0.html#marker-geticon
  // update the marker icon according to restaurant or site
  if (marker.options.alt.includes("restaurant")) {
    marker.setIcon(marker.getIcon() == restaurantIcon1 ? restaurantIcon2 : restaurantIcon1);
  } else {
    marker.setIcon(marker.getIcon() == siteIcon1 ? siteIcon2 : siteIcon1);
  }

  previousMarker = marker;
}


// map layer and button toggle settings
// https://stackoverflow.com/questions/33759578/how-to-change-base-layer-using-js-and-leaflet-layers-control
function clickLayerButton() {
  $('.button_toggle').click(function () {
    //button color toggle
    $(this).toggleClass("layer_button_active");
    // console.log("button toggle class");
    //layer toggle
    let layerName = $(this).text();
    if (layerName == "餐廳景點") {
      $(".leaflet-control-layers-overlays input").get(0).click();
    }
    if (layerName == "觀光景點") {
      $(".leaflet-control-layers-overlays input").get(1).click();
    }
  });
}

// autocomplete
function autocompleteSearch(autocompleteList) {
  $("#SearchText").autocomplete({
    source: autocompleteList,
  });
}

// update the map and sidebar whenever the user type in the search bar
function monitorSearchText() {
  $("#SearchText").keydown(function () {
    setTimeout(function () {
      updateSidebarAndMap(globalJson);
    }, 200);
  });
}

// remove all selected checkboxes and update the map and sidebar
function reset_input() {
  $("#cell_reset_btn").click(function () {
    $('.district-class').removeAttr('checked');
    updateSidebarAndMap(globalJson);
  });
}

// update the map and sidebar whenever the user use filter button
function clickFilter() {
  $("#cell_filter_btn").click(function () {
    updateSidebarAndMap(globalJson);
  });
}


// click on sidebar item and fly to the marker and change the marker icon
function clickCellInfo() {
  $(document).on('click', '.cell_showinfo', function () {

    // try to loop each marker and find the marker with the same name
    let name = $(this).find(".cell_showinfo_title").text();
    let tid = parseInt($(this).find(".cell_showinfo_title").attr("id"));

    // find marker of site
    if (tid < 168) {
      siteMarkerCluster.eachLayer(function (marker) {
        if (marker.options.title == name) {
          console.log(marker.options.title);
          map.flyTo(marker.getLatLng(), 15, {
            animate: false
          });
          marker.openPopup();
          updateMarkerIcon(marker);
        }
      })
    }

    // find marker of restaurant
    else {
      restaurantMarkerCluster.eachLayer(function (marker) {
        if (marker.options.title == name) {
          console.log(marker.options.title);
          map.flyTo(marker.getLatLng(), 15, {
            animate: false
          });
          marker.openPopup();
          updateMarkerIcon(marker);
        }
      })
    }
  });
}

$(function () {
  loadData();
  assignJsonToGlobal();
});