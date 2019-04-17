/*jshint esversion:6*/

let categoryAdd = document.querySelector("#category");
let vehicleType = document.querySelector("#vehicle-type");
let vehicleList = document.querySelector("#veh-list");
let categoryTabs = document.querySelector("#category-tabs");

let categorys = JSON.parse(localStorage.getItem("categorys"));
let vehicles = JSON.parse(localStorage.getItem("vehicles"));
// let categorys = [];
// let vehicles = [];

if(categorys === null || categorys === undefined) { categorys = []; }
if(vehicles === null || vehicles === undefined) { vehicles = []; }

if(categoryAdd !== null && categoryAdd !== undefined) {
	categoryAdd.addEventListener("click", function() {
		let categoryId = vehicleType.value.replace(/[^a-z0-9]/gi,'');
		// kontroll kas juba on olemas.
		CreateCategory(categoryId, vehicleType.value);
		AddToCategorys(categoryId, vehicleType.value);
	});
}

function CreateCategory(categoryId, categoryName) {
	let existingBlock = document.querySelector("#category-"+categoryId);
	if(existingBlock !== null && existingBlock !== undefined) {
		alert("Selline sõidukitüüp on juba olemas!");
		return;
	}

	HideCategorys();

	// põhi kontainerid jms
	let categoryBlock = document.createElement("div");
	categoryBlock.classList.add("category");
	categoryBlock.classList.add("active");
	categoryBlock.id = "category-"+categoryId;
	let categoryLabel = document.createElement("span");
	categoryLabel.innerText = categoryName;
	let vehiclesContainer = document.createElement("div");
	vehiclesContainer.class = "vehicles";

	let vehiclesTable = document.createElement("table");
	let vehiclesThead = document.createElement("thead");
	let vehiclesTr = document.createElement("tr");
	let vehiclesTh = document.createElement("th");
	vehiclesTh.innerText = "Sõiduki nimi";
	vehiclesTh.className = "veh-name-head";
	vehiclesTh.setAttribute("onclick", "sortTableByName()");
	vehiclesTr.appendChild(vehiclesTh);
	vehiclesTh = document.createElement("th");
	vehiclesTh.innerText = "Numbrimärk";
	vehiclesTh.className = "veh-num-head";
	vehiclesTh.setAttribute("onclick", "sortTableByNum()");
	vehiclesTr.appendChild(vehiclesTh);
	vehiclesTh = document.createElement("th");
	vehiclesTh.innerText = "Töö tähtaeg";
	vehiclesTh.className = "veh-date-head";
	vehiclesTh.setAttribute("onclick", "sortTableByDate()");
	vehiclesTr.appendChild(vehiclesTh);
	vehiclesTh = document.createElement("th"); // btnite jaoks
	vehiclesTr.appendChild(vehiclesTh);
	vehiclesThead.appendChild(vehiclesTr);
	vehiclesTable.appendChild(vehiclesThead);
	vehiclesTh = document.createElement("th"); // alertide jaoks
	vehiclesTr.appendChild(vehiclesTh);
	vehiclesThead.appendChild(vehiclesTr);
	vehiclesTable.appendChild(vehiclesThead);
	let vehicleTbody = document.createElement("tbody");
	vehiclesTable.appendChild(vehicleTbody);
	vehiclesContainer.appendChild(vehiclesTable);

	// Sõiduki lisamise inputid.
	let vehicleName = document.createElement("input");
	vehicleName.type = "text";
	vehicleName.className = "vehicle-name";
	vehicleName.placeholder = "Sõiduki nimi";
	let vehicleNum = document.createElement("input");
	vehicleNum.className = "vehicle-num";
	vehicleNum.placeholder = "Numbrimärk";
	vehicleNum.type = "text";
	let vehicleDate = document.createElement("input");
	vehicleDate.className = "vehicle-date";
	vehicleDate.placeholder = "Töö tähtaeg";
	vehicleDate.type = "date";
	let vehicleAdd = document.createElement("input");
	vehicleAdd.type = "button";
	vehicleAdd.value = "Lisa sõiduk";
	let br = document.createElement("br");
	categoryLabel.classList.add("active");

	// Sõiduki lisamine
	vehicleAdd.addEventListener("click", function() {
		CreateVehicle(vehicleName.value, vehicleNum.value, vehicleDate.value, vehicleTbody, vehicles.length);
		AddToVehicles(categoryId, vehicleName.value, vehicleNum.value, vehicleDate.value);

		vehicleName.value = "";
		vehicleNum.value = "";
		vehicleDate.value = "";
	});

	// Zanri ja selle tabi aktiveerimine
	categoryLabel.addEventListener("click", function() {
		HideCategorys();
		categoryBlock.classList.add("active");
		categoryLabel.classList.add("active");
	});

	let inputContainer = document.createElement("div");
	inputContainer.className = "vehicle-inputs-container";
	categoryTabs.appendChild(categoryLabel);
	inputContainer.appendChild(vehicleName);
	inputContainer.appendChild(vehicleNum);
	inputContainer.appendChild(vehicleDate);
	inputContainer.appendChild(vehicleAdd);
	categoryBlock.appendChild(inputContainer);

	categoryBlock.appendChild(vehiclesContainer);
	vehicleList.appendChild(categoryBlock);
}

function AddToVehicles(categoryId, vehicleName, vehicleNum, vehicleDate) {
	let vhcl = {"category":categoryId, "name":vehicleName, "num":vehicleNum, "date":vehicleDate};
	vehicles.push(vhcl);
	localStorage.setItem("vehicles", JSON.stringify(vehicles));
}

function AddToCategorys(categoryId, categoryName) {
	let category = {"id":categoryId, "name":categoryName};
	categorys.push(category);
	localStorage.setItem("categorys", JSON.stringify(categorys));
}

// function AddToCategorys(categoryId, categoryName) {
// 	let category = {"id":categoryId, "name":categoryName};
// 	categorys.push(category);
// 	var data = new FormData();
// 		data.append("name", htmlElement.value);
//
// 		var req = new XMLHttpRequest();
// 		req.open('POST', "/url-kuhu-saata-info.php");
// 		req.onload = function() {
// 			if (req.status == 200) {
// 				console.log(req.response);
// 			}
// 		};
//
// 		req.onerror = function() {
// 			console.log("Error Network Error");
// 		};
//
// 		req.send(data);
// 	localStorage.setItem("categorys", JSON.stringify(categorys));
// }

function CreateVehicle(vehicleName, vehicleNum, vehicleDate, tbody, vehicleIndex) {
	let vNameContainer = document.createElement("td");
	let vName = document.createElement("input");
	vName.value = vehicleName;
	vName.id = "vehicle-name-"+vehicleIndex;
	vName.type = "text";
	vNameContainer.appendChild(vName);
	let vNumContainer = document.createElement("td");
	let vNum = document.createElement("input");
	vNum.value = vehicleNum;
	vNum.id = "vehicle-num-"+vehicleIndex;
	vNum.type = "text";
	vNumContainer.appendChild(vNum);
	let vDateContainer = document.createElement("td");
	let vDate = document.createElement("input");
	vDate.value = vehicleDate;
	vDate.id = "vehicle-date-"+vehicleIndex;
	vDate.type = "date";
	vDateContainer.appendChild(vDate);
	let vBtnContainer = document.createElement("td");
	let vEdit = document.createElement("input");
	vBtnContainer.appendChild(vEdit);
	vEdit.type = "button";
	vEdit.value = "✓";
	vEdit.addEventListener("click", function() {
		vehicles[vehicleIndex].name = vName.value;
		vehicles[vehicleIndex].num = vNum.value;
		vehicles[vehicleIndex].date = vDate.value;
		localStorage.setItem("vehicles", JSON.stringify(vehicles));
		RenderVehicles();
	});
	let vDelete = document.createElement("input");
	vBtnContainer.appendChild(vDelete);
	vDelete.type = "button";
	vDelete.value = "✖";
	vDelete.addEventListener("click", function() {
		vehicles.splice(vehicleIndex, 1);
		localStorage.setItem("vehicles", JSON.stringify(vehicles));
		RenderVehicles();
	});
	let date = new Date();
	let today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	let date2 = vDate.value.split("-");
	let dueDate = new Date(date2[0], date2[1] - 1, date2[2]);
	let vAlertContainer = document.createElement("td");
	let vAlert = document.createElement("p");
	vAlertContainer.appendChild(vAlert);
	if(dueDate.getTime() == today.getTime()){
		vAlert.innerHTML = "TÄNA!";
	}
	else if(dueDate.getTime() < today.getTime()){
		vAlert.innerHTML = "MÖÖDUNUD!";
	}
	let vRow = document.createElement("tr");
	vRow.className = "vhcl";
	vRow.appendChild(vNameContainer);
	vRow.appendChild(vNumContainer);
	vRow.appendChild(vDateContainer);
	vRow.appendChild(vBtnContainer);
	vRow.appendChild(vAlertContainer);
	tbody.appendChild(vRow);
}

function RenderCategorys() {
	for(let i = 0, category; category = categorys[i]; i++) {
		CreateCategory(category.id, category.name);
	}
}

function DeleteAllVehicleDOMs() {
	let vhcls = document.querySelectorAll(".vhcl");
	for(let i = 0, v; v = vhcls[i]; i++) {
		v.parentElement.removeChild(v);
	}
}

function RenderVehicles() {
	DeleteAllVehicleDOMs();
	for(let i = 0, vhcl; vhcl = vehicles[i]; i++) {
		let tbodyElement = document.querySelector("#category-"+vhcl.category+" table tbody");
		CreateVehicle(vhcl.name, vhcl.num, vhcl.date, tbodyElement, i);
	}
}

function HideCategorys() {
	let categorys = document.querySelectorAll(".category");
	for(let i = 0, category; category = categorys[i]; i++) {
		if(category.classList.contains("active")) {
			category.classList.remove("active");
		}
	}

	let tabs = document.querySelectorAll("#category-tabs span");
	for(let i = 0, tab; tab = tabs[i]; i++) {
		if(tab.classList.contains("active")) {
			tab.classList.remove("active");
		}
	}
}
/*
function GetCategories(){ //siin forEach loopi kasutades on max 2 väärtust, kus esimene on item(nt categoryId), teine on index. Vt: https://www.w3schools.com/jsref/jsref_foreach.asp
	$.get('categories.txt', function(data){
    let content = JSON.parse(data).content;
    content.forEach(function(categoryId, categoryName){
      console.log(categoryId);
      $('#todos').append('<ul><li>'+ todo.title+'</li><li>'+ todo.description+'</li><li>'+ todo.date+'</li></ul>');
  });
});
}
function GetVehicles(){
	$.get('vehicles.txt', function(data){
    let content = JSON.parse(data).content;
    content.forEach(function(categoryId, vehicleName.value, vehicleNum.value, vehicleDate.value){ //seepärast see siin ei tööta
      console.log(todoIndex);
      $('#todos').append('<ul><li>'+ todo.title+'</li><li>'+ todo.description+'</li><li>'+ todo.date+'</li></ul>');
  });
});
}
*/
let dirN = "asc";
let dirNum = "asc";
let dirD = "asc";

function sortTableByName() {
	let thName = document.querySelector(".veh-name-head");
	let thNum = document.querySelector(".veh-num-head");
	let thDate = document.querySelector(".veh-date-head");
	if(dirN == "asc"){
		vehicles.sort(function (a, b) {
			thName.innerText = "Sõiduki nimi ↓";
			thNum.innerText = "Numbrimärk";
			thDate.innerText = "Töö tähtaeg";
			return a.name.localeCompare(b.name);
		});
	} else if(dirN == "desc") {
		vehicles.sort(function (a, b) {
			thName.innerText = "Sõiduki nimi ↑";
			thNum.innerText = "Numbrimärk";
			thDate.innerText = "Töö tähtaeg";
			return a.name.localeCompare(b.name);
		}).reverse();
	}
	if(dirN == "asc"){
		dirN = "desc";
	} else if(dirN == "desc"){
		dirN = "asc";
	}
	RenderVehicles();	
}

function sortTableByNum() {
	let thName = document.querySelector(".veh-name-head");
	let thNum = document.querySelector(".veh-num-head");
	let thDate = document.querySelector(".veh-date-head");
	if(dirNum == "asc"){
		vehicles.sort(function (a, b) {
			thName.innerText = "Sõiduki nimi";
			thNum.innerText = "Numbrimärk ↓";
			thDate.innerText = "Töö tähtaeg";
			return a.num.localeCompare(b.num);
		});
	} else if(dirNum == "desc") {
		vehicles.sort(function (a, b) {
			thName.innerText = "Sõiduki nimi";
			thNum.innerText = "Numbrimärk ↑";
			thDate.innerText = "Töö tähtaeg";
			return a.num.localeCompare(b.num);
		}).reverse();
	}
	if(dirNum == "asc"){
		dirNum = "desc";
	} else if(dirNum == "desc"){
		dirNum = "asc";
	}
	RenderVehicles();	
}

function sortTableByDate() {
	let thName = document.querySelector(".veh-name-head");
	let thNum = document.querySelector(".veh-num-head");
	let thDate = document.querySelector(".veh-date-head");
	if(dirD == "asc"){
		vehicles.sort(function (a, b) {
			thName.innerText = "Sõiduki nimi";
			thNum.innerText = "Numbrimärk";
			thDate.innerText = "Töö tähtaeg ↓";
			return a.date.localeCompare(b.date);
		});
	} else if(dirD == "desc") {
		vehicles.sort(function (a, b) {
			thName.innerText = "Sõiduki nimi";
			thNum.innerText = "Numbrimärk";
			thDate.innerText = "Töö tähtaeg ↑";
			return a.date.localeCompare(b.date);
		}).reverse();
	}
	if(dirD == "asc"){
		dirD = "desc";
	} else if(dirD == "desc"){
		dirD = "asc";
	}
	RenderVehicles();	
}

(function() {
   RenderCategorys();
   RenderVehicles();
})();
