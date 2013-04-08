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

universeMapCtrl.onclick = function (){
	universeMap.style.display = "block";
	console.log("asd")

};

document.onclick = function (event) {

	if (event.toElement != universeMapCtrl && event.toElement != universeMap) {
		universeMap.style.display = "none";
	} 
};

universeMap.onclick = function (event) {
	console.log(getCosmoCoords(event.clientX, event.clientY));
	universeMap.style.display = "none";

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