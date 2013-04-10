
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
	goToCtrl.click();

};

goToCtrl.onclick = function (event) {
	
	if(!searchInput.value) return;

	var recentPlaces = recent.getElementsByTagName("li"),
		recentPlacesLength = recentPlaces.length,
		i;

	for(i =0; i < recentPlacesLength; i++) {

		if (recentPlaces[i].innerText == searchInput.value) {
			recentPlaces[i].click();
			return;
		}

	}

	var newPlace = document.createElement("li");
		newPlace.id = "U";
		newPlace.innerText = searchInput.value;
		bindClick(newPlace, changeWall);
		bindClick(newPlace, activate);

	recent.appendChild(newPlace);
	newPlace.click();
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
	bindClick(lists[i], activate);
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


function bindClick(item, toBind) {

	var click = item.onclick || function (){};

	item.onclick = function (event) {

		if(click) { click(event); }

		toBind(event);	
	};

}

// 
// Room manager
// 

var room = document.getElementById("room").getContext("2d");
var roomWidth = document.getElementById("room").width;
var roomHeight = document.getElementById("room").height;

function drawSofa(point, size){
	
	room.fillStyle = "#88D3DF";
	room.strokeStyle = "#000";
	room.strokeRect (point.left, point.top, 200 + size.w, 100 + size.h);
	room.fillRect (point.left, point.top, 200 + size.w, 100 + size.h);
	
	room.strokeRect (point.left + 5, point.top + 5, 20, 40);
	room.strokeRect (point.left + 5, point.top + 55, 20, 40);
}

function drawWindow(point){
	
	room.fillStyle = "#4E68FF";
	room.strokeStyle = "#000";
	room.strokeRect (point.left, point.top, 10, 200);
	room.fillRect (point.left, point.top, 10, 200);
	
}

function drawTv(point, color) {
	
	room.beginPath();
	room.moveTo(point.left, point.top);
	room.arcTo(point.left + 50,point.top, point.left + 50,point.top + 100,40);
	room.arcTo(point.left + 50,point.top + 200,point.left - 50, point.top + 100,30);
	room.arcTo(point.left - 50,point.top + 100, point.left - 50, point.top,20);
	room.arcTo(point.left - 50,point.top, point.left + 50, point.top - 50,10);
	room.closePath();
	room.strokeStyle = "#000";
	room.fillStyle = color;
	room.fill();
	room.stroke();

}

function draw(event) {

	var preset = presets[event.toElement.id];
	room.clearRect(0,0,roomWidth, roomHeight);
	drawSofa(preset.sofaPoint, preset.sofaSize);

	drawWindow(preset.windowPoint, preset.windowSize);

	drawTv(preset.tvPoint, preset.tvColor);
}

var presets = [];

presets["usual"] = {
	sofaPoint : {left: 10, top: 10},
	sofaSize : {w: 0, h: 0},
	windowPoint : {left: 1, top: 140},
	windowSize : {w: 10, h: 200},
	tvPoint : {left: 415, top: 50},
	tvColor : "#f0f"
};

presets["weekend"] = {
	sofaPoint : {left: 10, top: 100},
	sofaSize : {w: 10, h: 40},
	windowPoint : {left: roomWidth-10, top: 40},
	windowSize : {w: 10, h: 200},
	tvPoint : {left: 405, top: 50},
	tvColor : "#ff0"
};

presets["conference"] = {
	sofaPoint : {left: 210, top: 100},
	sofaSize : {w: -120, h: 0},
	windowPoint : {left: roomWidth+10, top: 40},
	windowSize : {w: 10, h: 200},
	tvPoint : {left: 405, top: 90},
	tvColor : "#00f"
};
presets["gym"] = {
	sofaPoint : {left: -1210, top: -1100},
	sofaSize : {w: -120, h: 0},
	windowPoint : {left: roomWidth+10, top: 40},
	windowSize : {w: 10, h: 200},
	tvPoint : {left: 395, top: 10},
	tvColor : "#0ff"
};



var presetsList = document.getElementById("presets").getElementsByTagName("li"), 
	presetsListLength = presetsList.length, i;

for(i = presetsListLength - 1; i >=0; i--) {
	bindClick(presetsList[i], draw);
}

presetsList[0].click();