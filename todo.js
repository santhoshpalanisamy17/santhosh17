let input = document.getElementById("missionInput");
let list = document.getElementById("missionList");
let colours = ["#eef2ff", "#ffe8e8", "#e8ffe8", "#fff8dc"];
let colourIndex = 0;

function updateCounts() {
  let total = list.children.length;
  let done = document.getElementsByClassName("completed").length;
  document.getElementById("total").textContent = total;
  document.getElementById("completed").textContent = done;
  document.getElementById("pending").textContent = total - done;
}

function addMission() {
  let text = input.value.trim();
  if (text === "") {
    return;
  }

  let li = document.createElement("li");
  let span = document.createElement("span");
  span.textContent = text;

  let delBtn = document.createElement("button");
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