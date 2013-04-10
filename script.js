
//
// landscape change
// 

document.body.style.backgroundColor = "#000";

function changeLandscape(land) {
	document.body.style.backgroundImage = "url('/back/"+ land +".jpg')";
}

//
// universe map
//

var universeMapCtrl = document.getElementById("universeMapCtrl");
var universeMap = document.getElementById("universeMap");
var plane = document.getElementById("plane");
var searchInput = document.getElementById("searchInput");
var goToCtrl = document.getElementById("goToCtrl");
var recent = document.getElementById("recent");

universeMapCtrl.onclick = function (){
	universeMap.style.display = "block";


};

document.onclick = function (event) {

	if (event.toElement != universeMapCtrl && event.toElement != universeMap) {
		universeMap.style.display = "none";
	} 
};

universeMap.onclick = function (event) {
	searchInput.value = "(" + getCosmoCoords(event.clientX, event.clientY) + ")";
	universeMap.style.display = "none";

};

goToCtrl.onclick = function (event) {
	
	if(!searchInput.value) return;

	var recentPlaces = recent.getElementsByTagName("li"),
		recentPlacesLength = recentPlaces.length,
		i;

	for(i =0; i < recentPlacesLength; i++) {

		if (recentPlaces[i].innerText == searchInput.value) return;
	}

	var newPlace = document.createElement("li");
		newPlace.id = "U";
		newPlace.innerText = searchInput.value;
		newPlace.onclick = changeWall;

	recent.appendChild(newPlace);
};

function getCosmoCoords(x,y) {
	return x + ";" + y;
}

//
// Gravity slider change
//

var gravityCtrl = document.getElementById("gravityCtrl");
var speedValue = document.getElementById("speedValue");

gravityCtrl.onchange = function (){
	speedValue.innerText = gravityCtrl.value;
};

var noGravity = document.getElementById("noGravity");
var jupiter = document.getElementById("jupiter");
var normal = document.getElementById("normal");

noGravity.onclick = function () {
	gravityCtrl.value = gravityCtrl.min;
	gravityCtrl.onchange();
};

jupiter.onclick = function () {
	gravityCtrl.value = gravityCtrl.max;
	gravityCtrl.onchange();
};
normal.onclick = function () {
	gravityCtrl.value = 9.8;
	gravityCtrl.onchange();
};

gravityCtrl.value = 9.8;
gravityCtrl.onchange();

//
// Cange Wallpaper
//

var j, 
places = [], placeList = [], placeListLength;



placeList = recent.getElementsByTagName("li");
placeListLength = placeList.length;

for(j = placeListLength - 1; j >=0; j--) {

	placeList[j].onclick = changeWall;
	places.push (placeList[j]);
}


function changeWall(event){

	document.body.style.background =  "url('/back/" + event.toElement.id + ".jpg')";

}

// 
// Activate <li>
// 

var lists = document.getElementsByTagName("li"),
	listsLength = lists.length, i;


for(i = listsLength - 1; i >= 0; i--) {
	
	(function (item) {

		var click = item.onclick || function (){};

		item.onclick = function (event) {

			if(click) { click(event); }

			activate(event);	
		};

	})(lists[i]);
}

function activate(event) {
	var brothers = event.toElement.parentNode.children,
		brothersLength = brothers.length, i;

	for(i = brothersLength - 1; i >=0; i--) {
		
		if (brothers[i] != event.toElement) {
			brothers[i].classList.remove("active");
		} else {
			brothers[i].classList.add("active");
		}
	}	

}