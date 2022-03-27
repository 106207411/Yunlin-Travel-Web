// declare global variable
let spotClassClickedByUser = "";
let restaurantClassClickedByUser = "";
let globalJson = null;
let spotAutocompleteList = [];
let restaurantAutocompleteList = [];


function loadData() {
  $.getJSON('./phpScript/getSpotAndReview.php', function (json) {
    globalJson = json;
    
    // load top-10 spots 
    let spots = json["spots"]
    for (let i = 0; i < 10; i++) {
      let spot = spots[i];
      let tid = spot.tid;
      let spotName = spot.Name;
      let description = spot.Description;
      $(".top10_img").append(`<img id="top${i+1}_img" src="./image/getTour_img/${tid}.jpg" class="img_style">`);
      $(".top10_text").append(`
      <div id="top${i}_text" class="block2_text">
      <div class="block2_text_title">${spotName}</div>
      <div class="block2_logo"><img src="image/spot_logo.png" class="img-responsive block2_logo_img"></div>
      <div class="block2_text_descr">${description}</div>
    </div>`);
    }

    updateSpotsBlockContent(json);
    updateRestaurantsBlockContent(json);
  });
}

//make sure globalJson is assigned successfully
function assignJsonToGlobal(){
  if(globalJson!=null){
    console.log('globalJson',globalJson);
    console.log('globalJson is assigned');
    monitorSearchText();
    commentBtnClick();
    cellClassBtnClick();
    clickFilter();
    resetFilter();
  } else {
    setTimeout(function(){
      assignJsonToGlobal();
    },1000);
  }
}

//get spot data from database and update the block content
function updateSpotsBlockContent(locationJson) {
  // https://amandeepkochhar.medium.com/javascript-check-if-a-variable-is-a-type-of-an-object-or-array-9a590c152f8f
  // filter by town and searchText
  // array of objects
  let spotSearchText = $("#spotSearchText").val();
  let spots = locationJson["spots"].filter(filterByClassAndSearchText(spotSearchText, "spot"));
  let googleReviews = locationJson["reviews"];

  spotAutocompleteList = spots.map(function(item){return item.Name;});
  autocompleteSearch();

  // update the sidebar content of spots
  let spotDomElements = spots.map(spot => {
    let tid = spot.tid;
    let name = spot.Name;
    let description = spot.Description;
    let like = spot.LIKE;
    let classChi = spot.ClassChi;
    return `
    <div class="xroll_spot_item">
      <a data-toggle="modal" data-target="#spot_modal_${tid}" style="cursor: pointer;">
        <div style="overflow:hidden;height:150px;width:100%;">
          <img src="./image/getTour_img/${tid}.jpg" alt=${name} style="width:100%;" class="th_img">
        </div>
      </a>
      <div class="cell_name"><b>${name}</b></div>
      <div class="cell_descr">${description}</div>
      <div class="cell_class">
        <div class="cell_class_btn spot_cell_class" style="cursor: pointer;">${classChi}</div>
      </div>
      <a data-toggle="modal" data-target="#spot_modal_${tid}">
        <div class="caption">
          <p style="cursor: pointer;">了解更多→</p>
        </div>
      </a>
    </div>`
  });
  let spotModalDomElements = spots.map(spot => {
    let tid = spot.tid;
    let name = spot.Name;
    let description = spot.Description;
    let address = spot.Add;
    let openTime = spot.Opentime;
    let tel = spot.Tel;
    let lat = spot.Lat;
    let lng = spot.Lng;
    let travelInfo = spot.Travellinginfo;
    let reviewsArray = googleReviews.filter(function (review) { return (review.tid == tid) }).map(obj => obj.Comment);
    let like = spot.LIKE;
    let classChi = spot.ClassChi;

    return `
    <!--側邊欄之Modal-->
      <div class="modal fade modal_spot" id="spot_modal_${tid}" tabindex="-1" role="dialog" aria-labelledby="spot_modal" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
            <!--主要內容-->
            <div class="modal-body">
              <button type="button" class="btn btn-outline-light" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span></button>
              <!--一個景點單元-->
              <div class="spot_modal_name"> <!--地點名稱-->
                <h1><b>${name}</b><br><span class="glyphicon glyphicon-option-vertical"></span></h1>
                <div class="spot_modal_img_cover"></div>
                <img src="./image/getTour_img/${tid}.jpg" class="spot_modal_img">
              </div>
              <h3>景點資訊</h3>
              <div class="spot_modal_maininfo"> <!--地點主要資訊：電話、地址、營業時間、坐標-->
                <span>地址</span><div class="spot_modal_maininfo_item">${address}</div><br>
                <span>營業時間</span><div class="spot_modal_maininfo_item">${openTime}</div><br>
                <span>電話</span><div class="spot_modal_maininfo_item">${tel}</div><br>
                <span>經緯度</span><div class="spot_modal_maininfo_item">(${lng},${lat})</div><br>
                <span>交通</span><div class="spot_modal_maininfo_item">${travelInfo}</div>
              
              </div>
              <div class="spot_modal_class"><span>#${classChi}</span></div>
          
              <h3>景點介紹</h3>
              <div class="spot_modal_div">
                <div class="spot_modal_descr"> <!--地點敘述-->
                  ${description}
                </div>
                <!--評論區-->
                <div class="spot_modal_comment">
                  <div class="comment_title">最新評論</div>
                  <div class="prefive_comment_block" id="prefive_comment_block_${tid}">
                    <div class="prefive_comment">"${reviewsArray[0]}"</div>
                    <div class="prefive_comment">"${reviewsArray[1]}"</div>
                    <div class="prefive_comment">"${reviewsArray[2]}"</div>
                    <div class="prefive_comment">"${reviewsArray[3]}"</div>
                    <div class="prefive_comment">"${reviewsArray[4]}"</div>
                  </div>
                  <div class="comment_form">
                    <div>發表評論</div>
                    <form name="CommentForm">
                      <textarea id="CommentText-${tid}" class="CommentText" name="CommentText" rows="5" cols="33" style="resize:none;"></textarea>
                      <input id="CommentBtn-${tid}" type="button" class="CommentBtn" value="送出">
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!------------>
        </div>
      </div>`
  });
  $("#spot-modals-live-here").html(spotModalDomElements);
  $('#xroll_spot_item_pare').html(spotDomElements);
}

//get the restaurants data from database and update the block content
function updateRestaurantsBlockContent(locationJson) {
  let restaurantSearchText = $("#restaurantSearchText").val();
  let restaurants = locationJson["restaurants"].filter(filterByClassAndSearchText(restaurantSearchText, "restaurant"));
  let googleReviews = locationJson["reviews"];

  restaurantAutocompleteList = restaurants.map(function(item){return item.Name;});
  autocompleteSearch();

  // update the sidebar content of restaurants
  let restaurantDomElements = restaurants.map(restaurant => {
    let tid = restaurant.tid;
    let name = restaurant.Name;
    let description = restaurant.Description;
    let like = restaurant.LIKE;
    let classChi = restaurant.ClassChi;
    return `
  <div class="xroll_restaurant_item">
    <a data-toggle="modal" data-target="#spot_modal_${tid}" style="cursor: pointer;">
      <div style="overflow:hidden;height:150px;width:100%;">
        <img src="./image/getTour_img/${tid}.jpg" alt=${name} style="width:100%;" class="th_img">
      </div>
    </a>
    <div class="cell_name"><b>${name}</b></div>
    <div class="cell_descr">${description}</div>
    <div class="cell_class">
      <div class="cell_class_btn restaurant_cell_class" style="cursor: pointer;">${classChi}</div>
    </div>
    <a data-toggle="modal" data-target="#spot_modal_${tid}">
      <div class="caption">
        <p style="cursor: pointer;">了解更多→</p>
      </div>
    </a>
  </div>`
  });
  let restaurantModalDomElements = restaurants.map(restaurant => {
    let tid = restaurant.tid;
    let name = restaurant.Name;
    let description = restaurant.Description;
    let address = restaurant.Add;
    let openTime = restaurant.Opentime;
    let tel = restaurant.Tel;
    let lat = restaurant.Lat;
    let lng = restaurant.Lng;
    let reviewsArray = googleReviews.filter(function (review) { return (review.tid == tid) }).map(obj => obj.Comment);
    let like = restaurant.LIKE;
    let classChi = restaurant.ClassChi;
    return `
    <!--側邊欄之Modal-->
      <div class="modal fade modal_spot" id="spot_modal_${tid}" tabindex="-1" role="dialog" aria-labelledby="spot_modal" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
            <!--主要內容-->
            <div class="modal-body">
              <button type="button" class="btn btn-outline-light" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span></button>
              <!--一個景點單元-->
              <div class="spot_modal_name"> <!--地點名稱-->
                <h1><b>${name}</b><br><span class="glyphicon glyphicon-option-vertical"></span></h1>
                <div class="spot_modal_img_cover"></div>
                <img src="./image/getTour_img/${tid}.jpg" class="spot_modal_img">
              </div>
              <h3>景點資訊</h3>
              <div class="spot_modal_maininfo"> <!--地點主要資訊：電話、地址、營業時間、坐標-->
                <span>地址</span><div class="spot_modal_maininfo_item">${address}</div><br>
                <span>營業時間</span><div class="spot_modal_maininfo_item">${openTime}</div><br>
                <span>電話</span><div class="spot_modal_maininfo_item">${tel}</div><br>
                <span>經緯度</span><div class="spot_modal_maininfo_item">(${lng},${lat})</div><br>
              </div>
              <div class="spot_modal_class"><span>#${classChi}</span></div>
          
              <h3>景點介紹</h3>
              <div class="spot_modal_div">
                <div class="spot_modal_descr"> <!--地點敘述-->
                  ${description}
                </div>
                <!--評論區-->
                <div class="spot_modal_comment">
                  <div class="comment_title">最新評論</div>
                  <div class="prefive_comment_block" id="prefive_comment_block_${tid}">
                    <div class="prefive_comment">"${reviewsArray[0]}"</div>
                    <div class="prefive_comment">"${reviewsArray[1]}"</div>
                    <div class="prefive_comment">"${reviewsArray[2]}"</div>
                    <div class="prefive_comment">"${reviewsArray[3]}"</div>
                    <div class="prefive_comment">"${reviewsArray[4]}"</div>
                  </div>
                  <div class="comment_form">
                    <div>發表評論</div>
                    <form name="CommentForm">
                      <textarea id="CommentText-${tid}" class="CommentText" name="CommentText" rows="5" cols="33" style="resize:none;"></textarea>
                      <input id="CommentBtn-${tid}" type="button" class="CommentBtn" value="送出">
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!------------>
        </div>
      </div>`
  });
  $("#restaurant-modals-live-here").html(restaurantModalDomElements);
  $('#xroll_restaurant_item_pare').html(restaurantDomElements);
}


// update (prepend) <div class="prefive_comment_block"> 
// and the DB table "google_review_with_newbie"
function commentBtnClick() {
  $(document).on('click', ".CommentBtn", function () {
    let tid = $(this).attr("id").split("-")[1];
    let commentText = $(`#CommentText-${tid}`).val();
    let comment = {
      Tid: tid,
      Comment: commentText
    };
    $.ajax({
      url: './phpScript/updateComment.php',
      type: 'POST',
      data: comment,
      success: function () {
        $(`#prefive_comment_block_${tid}`).prepend(`<div class="prefive_comment">"${commentText}"</div>`);
        $(`#CommentText-${tid}`).val("");
      },
      error: function () {
        console.log("no response");
      }
    });
  });
}


// update the block content once click on the class button inside spot and restaurant
function cellClassBtnClick() {
  $(document).on('click', ".cell_class_btn", function () {
    let classChi = $(this).text();
    let cellClass = $(this).attr("class").split(" ")[1];

    if (cellClass == "spot_cell_class") {
      $(".theme_spot").hide(100);
      $(".theme_spot_serach").hide(100);
      $("#return_spot").show(100);
      spotClassClickedByUser = classChi;
      updateSpotsBlockContent(globalJson);

    } else if (cellClass == "restaurant_cell_class") {
      $(".theme_restaurant").hide(100);
      $(".theme_restaurant_serach").hide(100);
      $("#return_rest").show(100);
      restaurantClassClickedByUser = classChi;
      updateRestaurantsBlockContent(globalJson);
    }
  });
}

function return_theme_spot(){
	$(".theme_spot").show();
	$(".theme_spot_serach").show();
	$("#return_spot").hide();
  spotClassClickedByUser = "";
	updateSpotsBlockContent(globalJson);
}

function return_theme_rest(){
	$(".theme_restaurant").show();
	$(".theme_restaurant_serach").show();
	$("#return_rest").hide();
  restaurantClassClickedByUser = "";
	updateRestaurantsBlockContent(globalJson);
}

// https://stackoverflow.com/questions/7759237/how-do-i-pass-an-extra-parameter-to-the-callback-function-in-javascript-filter
function filterByClassAndSearchText(searchText, target) {
  return function (item) {
    // get all the class value if the checkbox is checked
    let classArray = [];
    if (target == "restaurant") {
      $(".restaurant-class:checkbox:checked").each(function () {
        let selectedClass = (this.checked ? $(this).val() : "");
        classArray.push(selectedClass);
      });
      restaurantClassClickedByUser == "" ? 0 : classArray.push(restaurantClassClickedByUser);
    } else if (target == "spot") {
      $(".spot-class:checkbox:checked").each(function () {
        let selectedClass = (this.checked ? $(this).val() : "");
        classArray.push(selectedClass);
        
      });
      spotClassClickedByUser == "" ? 0 : classArray.push(spotClassClickedByUser);
    }

    // https://stackoverflow.com/questions/5582574/how-to-check-if-a-string-contains-text-from-an-array-of-substrings-in-javascript
    let boolTown = (!classArray.length) ? true : (classArray.some(function (selectedClass) { return item.ClassChi.includes(selectedClass) }));
    let boolSearchText = (searchText == "") ? true : (item.Name.includes(searchText));
    return (boolTown && boolSearchText);
  }
}

// autocomplete
function autocompleteSearch() {
  $("#spotSearchText").autocomplete({
		source: spotAutocompleteList,
	});
  $("#restaurantSearchText").autocomplete({
		source: restaurantAutocompleteList,
	});
}

// update the map and sidebar whenever the user type in the search bar
function monitorSearchText() {
  $("#restaurantSearchText").keydown(function () {
    setTimeout(function () {
      updateRestaurantsBlockContent(globalJson);
    }, 200);
  });
  $("#spotSearchText").keydown(function () {
    setTimeout(function () {
      updateSpotsBlockContent(globalJson);
    }, 200);
  });
}


/*篩選器的reset*/
function resetFilter() {
  $("#filter_btn_spot").click(function () {
    $('.spot-class').removeAttr('checked');
    updateSpotsBlockContent(globalJson);
  });
  $("#filter_btn_restaurant").click(function () {
    $('.restaurant-class').removeAttr('checked');
    updateRestaurantsBlockContent(globalJson);
  });
  // $(item).attr("id") == "filter_btn_restaurant" ? $('.restaurant-class').removeAttr('checked') : $('.spot-class').removeAttr('checked');
  // $(item).attr("id") == "filter_btn_restaurant" ? updateRestaurantsBlockContent(globalJson) : updateSpotsBlockContent(globalJson);
}


// update the block content whenever the user use filter button
function clickFilter() {
  $("#cell_filter_btn_spot").click(function () {
    updateSpotsBlockContent(globalJson);
  });
  $("#cell_filter_btn_restaurant").click(function () {
    updateRestaurantsBlockContent(globalJson);
  });
}


$(function () {
  loadData();
  assignJsonToGlobal();
});

