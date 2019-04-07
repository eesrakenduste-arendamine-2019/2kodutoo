/*jshint esversion:6*/

﻿let categoryAdd = document.querySelector("#category");
let vehicleType = document.querySelector("#vehicle-type");
let vehicleList = document.querySelector("#veh-list");
let vehicleTabs = document.querySelector("#vehicle-tabs");

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
		alert("Selline category on juba olemas!");
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
	vehiclesTr.appendChild(vehiclesTh);
	vehiclesTh = document.createElement("th");
	vehiclesTh.innerText = "Numbrimärk";
	vehiclesTr.appendChild(vehiclesTh);
	vehiclesTh = document.createElement("th");
	vehiclesTh.innerText = "Töö tähtaeg";
	vehiclesTr.appendChild(vehiclesTh);
	vehiclesTh = document.createElement("th"); // btnite jaoks
	vehiclesTr.appendChild(vehiclesTh);
	vehiclesThead.appendChild(vehiclesTr);
	vehiclesTable.appendChild(vehiclesThead);
	let vehicleTbody = document.createElement("tbody");
	vehiclesTable.appendChild(vehicleTbody);
	vehiclesContainer.appendChild(vehiclesTable);

	// Raamatu lisamise inputid.
	let vehicleName = document.createElement("input");
	vehicleName.type = "text";
	vehicleName.className = "vehicle-title";
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

	// Raamatu lisamine
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
	vehicleTabs.appendChild(categoryLabel);
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
	vDate.type = "text";
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
	});
	let vDelete = document.createElement("input");
	vBtnContainer.appendChild(vDelete);
	vDelete.type = "button";
	vDelete.value = "X";
	vDelete.addEventListener("click", function() {
		vehicles.splice(vehicleIndex, 1);
		localStorage.setItem("vehicles", JSON.stringify(vehicles));
		RenderVehicles();
	});
	let vRow = document.createElement("tr");
	vRow.className = "vhcl";
	vRow.appendChild(vNameContainer);
	vRow.appendChild(vNumContainer);
	vRow.appendChild(vDateContainer);
	vRow.appendChild(vBtnContainer);
	tbody.appendChild(vRow);
}

function RenderCategorys() {
	for(let i = 0, category; category = categorys[i]; i++) {
		CreateCategory(category.id, category.name);
	}
}

function DeleteAllBookDOMs() {
	let vhcls = document.querySelectorAll(".vhcl");
	for(let i = 0, b; b = vhcls[i]; i++) {
		b.parentElement.removeChild(b);
	}
}

function RenderVehicles() {
	DeleteAllBookDOMs();
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

function saveCategory(){
	var data = new FormData();
		data.append("name", vehicle-type.value);

		var req = new XMLHttpRequest();
		req.open('POST', "server.php");
		req.onload = function() {
			if (req.status == 200) {
				console.log(req.response);
			}
		};

		req.onerror = function() {
			console.log("Error: Network Error");
		};

		req.send(data);
  //$.post('server.php', {save: category});
}

(function() {
   RenderCategorys();
   RenderVehicles();
})();
