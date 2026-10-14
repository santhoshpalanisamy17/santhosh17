var input = document.getElementById("missionInput");
var list = document.getElementById("missionList");
var colours = ["#eef2ff", "#ffe8e8", "#e8ffe8", "#fff8dc"];
var colourIndex = 0;

function updateCounts() {
  var total = list.children.length;
  var done = document.getElementsByClassName("completed").length;
  document.getElementById("total").textContent = total;
  document.getElementById("completed").textContent = done;
  document.getElementById("pending").textContent = total - done;
}

function addMission() {
  var text = input.value.trim();
  if (text === "") {
    return;
  }

  var li = document.createElement("li");
  var span = document.createElement("span");
  span.textContent = text;

  var delBtn = document.createElement("button");
  delBtn.textContent = "Delete";

  li.onclick = function () {
    li.classList.toggle("completed");
    updateCounts();
  };

  delBtn.onclick = function (event) {
    event.stopPropagation();
    li.remove();
    updateCounts();
  };

  li.appendChild(span);
  li.appendChild(delBtn);
  list.appendChild(li);

  input.value = "";
  updateCounts();
}

function changeColour() {
  colourIndex = (colourIndex + 1) % colours.length;
  document.body.style.backgroundColor = colours[colourIndex];
}

document.getElementById("addBtn").onclick = addMission;
document.getElementById("colourBtn").onclick = changeColour;