/*jshint esversion:6*/

let categoryAdd = document.querySelector("#vehicle");
let categoryValue = document.querySelector("#vehicle-type");
let vehList = document.querySelector("#veh-list");
let categoryTabs = document.querySelector("#vehicle-tabs");

let categorys = JSON.parse(localStorage.getItem("categorys"));
let vehicles = JSON.parse(localStorage.getItem("vehicles"));
// let categorys = [];
// let vehicles = [];

if(categorys === null || categorys === undefined) { categorys = []; }
if(vehicles === null || vehicles === undefined) { vehicles = []; }

console.log(categorys);
console.log(vehicles);

if(categoryAdd !== null && categoryAdd !== undefined) {
	categoryAdd.addEventListener("click", function() {
		let categoryId = categoryValue.value.replace(/[^a-z0-9]/gi,'');
		// kontroll kas juba on olemas.
		CreateCategory(categoryId, categoryValue.value);
		AddToCategorys(categoryId, categoryValue.value);
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
	let vehicleThead = document.createElement("thead");
	let vehicleTr = document.createElement("tr");
	let vehicleTh = document.createElement("th");
	vehicleTh.innerText = "Sõiduki nimi";
	vehicleTr.appendChild(vehicleTh);
	vehicleTh = document.createElement("th");
	vehicleTh.innerText = "Sõiduki numbrimärk";
	vehicleTr.appendChild(vehicleTh);
	vehicleTh = document.createElement("th");
	vehicleTh.innerText = "Töö tähtaeg";
	vehicleTr.appendChild(vehicleTh);
	vehicleTh = document.createElement("th"); // btnite jaoks
	vehicleTr.appendChild(vehicleTh);
	vehicleThead.appendChild(vehicleTr);
	vehiclesTable.appendChild(vehicleThead);
	let vehicleTbody = document.createElement("tbody");
	vehiclesTable.appendChild(vehicleTbody);
	vehiclesContainer.appendChild(vehiclesTable);

	// Sõiduki lisamise inputid.
	let vehicleName = document.createElement("input");
	vehicleName.type = "text";
	vehicleName.className = "vehicle-title";
	vehicleName.placeholder = "Sõiduki nimi";
	let vehicleNum = document.createElement("input");
	vehicleNum.className = "vehicle-num";
	vehicleNum.placeholder = "Sõiduki numbrimärk";
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

	// categoryi ja selle tabi aktiveerimine
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
	vehList.appendChild(categoryBlock);
}

function AddToVehicles(categoryId, vehicleName, vehicleNum, vehicleDate) {
	let vehicle = {"category":categoryId, "name":vehicleName, "num":vehicleNum, "vNum":vehicleDate};
	vehicles.push(vehicle);
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
	let vDate = document.createElement("date");
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
		vehicles[vehicleIndex].vNum = vDate.value;
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
	vRow.className = "vehicles";
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

function DeleteAllVehicleDOMs() {
	let vhcl = document.querySelectorAll(".vehicle");
	for(let i = 0, v; v = vhcl[i]; i++) {
		v.parentElement.removeChild(v);
	}
}

function RenderVehicles() {
	DeleteAllVehicleDOMs();
	for(let i = 0, vehicle; vehicle = vehicles[i]; i++) {
		let tbodyElement = document.querySelector("#category-"+vehicle.category+" table tbody");
		let date = new Date();
		let today = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0');
		if(today == vehicle.vNum){
			document.getElementById("vehicle-tabs").style.color = "red";
			console.log("t2na");
		}
		CreateVehicle(vehicle.name, vehicle.num, vehicle.vNum, tbodyElement, i);
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
